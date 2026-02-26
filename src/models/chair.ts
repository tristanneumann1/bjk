import { Card } from '@/models/card';
import {Hand} from '@/models/hand';
import { Dealer } from '@/models/dealer';
import chalk, { type ColorName, type ModifierName } from 'chalk';
import {Session} from "@/models/session";
import {attachModelEventEmitter, ensureInstanceId, getModelInstanceId} from "@/lib/modelEvents";
import {
  modelChangeEvent,
  modelCustomEvent,
  modelEvents, modelInstanceCustomEvent,
  type ModelPropertyChangeEvent
} from "@/lib/mitt";
import {type PlayerAction} from "@/types/actions";

export type HandResult = 'Win' | 'Lose' | 'Double_Lose' | 'Push' | 'BlackJack_Win' | 'Double_Win' | 'Double_Push' | 'Surrendered';
const HAND_VIEW_COLORS: { [result in HandResult]: ColorName | ModifierName} = {
  'Win': 'blue',          // Green
  'Lose': 'red',         // Red
  'Double_Lose': 'red',         // Red
  'Surrendered': 'red',         // Red
  'Push': 'white',         // Yellow
  'BlackJack_Win': 'bgYellow', // Magenta
  'Double_Win': 'blue',       // Blue
  'Double_Push': 'white'   // Cyan
}

export const NEW_HAND_EVENT = 'new_hand'

export class Chair {
  public bet = 0;
  public activeHandIndex = 0;
  public splitCount = 0;
  constructor(public hands: Hand[] = []) {
    ensureInstanceId(Chair, 'chair', this as Record<string | symbol, unknown>)
  }

  get activeHand(): Hand | undefined {
    return this.hands[this.activeHandIndex];
  }
  get chairDone(): boolean {
    return !this.activeHand || this.allHandsOff
  }
  get allHandsOff(): boolean {
    for (const hand of this.hands) {
      if (!hand.isBusted && !hand.isSurrendered && !hand.isBlackJack) {
        return false;
      }
    }
    return true;
  }

  start() {
    this.hands = [new Hand()];
    this.activeHandIndex = 0;
    this.splitCount = 0;
  }
  deal(card: Card) {
    if (!this.activeHand) {
      throw new Error('no active hand');
    }
    this.activeHand.addCard(card);
  }

  payout (dealerHand: Hand): number {
    let payout = 0

    for(const hand of this.hands) {
      payout += this.handPayout(hand, dealerHand)
    }
    return payout;
  }

  private handPayout(hand: Hand, other: Hand): number {
    if (hand.tookEvenMoney) {
      return this.bet * 2
    }

    let payout = 0
    if (hand.insuranceTaken && other.isBlackJack) {
        payout += hand.insuranceAmount * 2
      }

    switch (hand.beatsHand(other)) {
      case 'Win':
      case 'Double_Push':
        payout += this.bet * 2;
        break;
      case 'Push':
        payout += this.bet;
        break;
      case 'BlackJack_Win':
        payout += Math.floor(this.bet * (1 + Session.getInstance().rules.blackjackPayout));
        break;
      case "Double_Win":
        payout += this.bet * 4;
        break;
      case "Surrendered":
        payout += this.bet / 2;
        break;
      case 'Lose':
      case 'Double_Lose':
      default:
        break
    }
    return payout
  }

  moveToNextHand(dealer: Dealer) {
    this.activeHandIndex++
    if(this.activeHand && this.activeHand.cards.length < 2) {
      this.activeHand.addCard(dealer.dealCard())
    }
    if (this.activeHand && this.activeHand.isDone) {
      this.moveToNextHand(dealer);
    }
  }
  private static readonly ACTIONS: PlayerAction[] = ['Hit', 'Stand', 'Split', 'Double', 'Surrender', 'Insurance', 'DeclineInsurance']

  listViableActions(): Record<PlayerAction, boolean> {
    return Chair.ACTIONS.reduce((result, action) => {
      result[action] = !this.validateAction(action)
      return result
    }, {} as Record<PlayerAction, boolean>)
  }

  validateAction(action: PlayerAction): string | null {
    const activeHand = this.activeHand
    if (!activeHand) {
      return 'No active hand'
    }

    if (activeHand.isDone) {
      return 'Hand not active'
    }

    const table = Session.getInstance().table
    const rules = Session.getInstance().rules

    if (table.inInsurancePhase) {
      if (action !== 'Insurance' && action !== 'DeclineInsurance') {
        return 'Must decide on insurance first'
      }
    }

    switch (action) {
      case 'Stand':
        return null
      case 'Hit':
        return activeHand.softValue < 21 ? null : 'Cannot hit on 21 or more'
      case 'Double': {
        if (Session.getInstance().player.balance < this.bet) {
          return 'Not enough balance to double'
        }
        if (activeHand.cards.length !== 2) {
          return 'Can only double on first two cards'
        }
        if (activeHand.isSplit && !rules.doubleAllowedAfterSplit) {
          return 'Can not double after split'
        }
        return null
      }
      case 'Split': {
        if (activeHand.cards.length !== 2) {
          return 'Can only split with two cards'
        }
        if (activeHand.cards[0].value !== activeHand.cards[1].value) {
          return 'Can only split matching values'
        }
        if (this.splitCount >= rules.maxSplits) {
          return 'maximum split count reached'
        }
        if (activeHand.cards[0].isAce() && activeHand.isSplit && !rules.resplitAcesAllowed) {
          return 'Can not re-split aces'
        }
        return null
      }
      case 'Surrender':
        if (activeHand.cards.length !== 2) {
          return 'Can only surrender on first two cards'
        }
        if (!rules.surrenderAllowed) {
          return 'Surrender not allowed'
        }
        return null
      case 'Insurance': {
        if (!table.inInsurancePhase) {
          return 'Insurance only during insurance phase'
        }
        if (activeHand.insuranceTaken) {
          return 'Insurance already taken'
        }
        if (activeHand.cards.length !== 2) {
          return 'Insurance only available on first two cards'
        }
        const insuranceCost = this.bet / 2
        if (Session.getInstance().player.balance < insuranceCost) {
          return 'Not enough balance for insurance'
        }
        return null
      }
      case 'DeclineInsurance': {
        if (!table.inInsurancePhase) {
          return 'Can only decline insurance during insurance phase'
        }
        if (activeHand.insuranceTaken) {
          return 'Insurance already taken'
        }
        return null
      }
    }
  }

  act (action: PlayerAction, dealer: Dealer) {
    const rules = Session.getInstance().rules
    if (!this.activeHand) {
      throw new Error('No active hand');
    }

    const actionNotValidError = this.validateAction(action);
    if (actionNotValidError) {
      throw new Error(actionNotValidError)
    }

    switch (action) {
      case 'Stand':
        this.activeHand.hasStood = true;
        this.moveToNextHand(dealer);
        break;
      case 'Double':
        Session.getInstance().player.removeMoney(this.bet)
        this.activeHand.isDoubled = true;
        this.activeHand.addCard(dealer.dealCard())
        this.moveToNextHand(dealer);
        break;
      case 'Split':
        const splitCard = this.activeHand.splitCards();
        if (!splitCard) {
          throw new Error('No card to split');
        }
        const isSplittingAces = splitCard.isAce();
        const newHand = new Hand([splitCard]);
        newHand.split();
        this.activeHand.split();
        this.splitCount++
        this.addHand(newHand)

        // Deal one card to the first hand
        this.activeHand.addCard(dealer.dealCard())

        // If splitting aces and hitAfterSplitAces is false
        if (isSplittingAces && !rules.hitAfterSplitAces) {
          this.moveToNextHand(dealer);
          // Deal one card to the second hand
          if (this.activeHand) {
            this.activeHand.addCard(dealer.dealCard())
          }
          this.moveToNextHand(dealer);
        } else if (this.activeHand.isDone) {
          this.moveToNextHand(dealer);
        }
        break;
      case 'Hit':
        this.activeHand.addCard(dealer.dealCard())
        if (this.activeHand.isDone) {
          this.moveToNextHand(dealer);
        }
        break;
      case 'Surrender':
        this.activeHand.isSurrendered = true
        this.moveToNextHand(dealer);
        break;
      case 'Insurance': {
        const insuranceCost = this.bet / 2
        Session.getInstance().player.removeMoney(insuranceCost)
        this.activeHand.insuranceTaken = true
        this.activeHand.insuranceAmount = insuranceCost

        if (this.activeHand.isBlackJack) {
          this.activeHand.tookEvenMoney = true
        }
        break;
      }
      case 'DeclineInsurance':
        break;
    }
  }
  private addHand(newHand: Hand) {
    this.hands.push(newHand)
    const instanceId = getModelInstanceId(this);
    const payload: ModelPropertyChangeEvent = {
      model: 'chair',
      instanceId,
      event: NEW_HAND_EVENT,
      value: newHand,
      previous: undefined,
      target: this,
    }
    modelEvents.emit(modelChangeEvent, payload)
    modelEvents.emit(modelCustomEvent('hand', NEW_HAND_EVENT), payload)
    if (instanceId) modelEvents.emit(modelInstanceCustomEvent('chair', NEW_HAND_EVENT, instanceId), payload)
  }

  view(isActive: boolean, other?: Hand | null): void {
      console.log('Player Chair:', this.hands.map((hand: Hand, index: number) => {
        const result = other ? hand.beatsHand(other) : null
        const handString = this.chalkModify(hand, result)
        if (isActive && index === this.activeHandIndex) {
          return `>${handString}<`
        }

        return handString
      }).join(' | '), '  Bet:', this.bet);
  }
  private chalkModify(hand: Hand, result: HandResult | null): string {
    let handString = hand.cards.map(card => `${card.rank}${card.suitSymbol}`).join(', ')
    if (result) {
      const color = HAND_VIEW_COLORS[result]
      handString = chalk[color](handString)
    }
    if (hand.isDoubled || result == 'BlackJack_Win') {
      handString = chalk.underline(handString)
    }

    return handString
  }
}

attachModelEventEmitter(Chair, {
  model: 'chair',
  props: ['bet', 'activeHandIndex'],
  trackInstance: true,
})
