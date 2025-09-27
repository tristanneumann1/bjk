import { Card } from '@/models/card';
import { type HandResult } from '@/models/chair';
export type Action = 'Hit' | 'Stand' | 'Double' | 'Split' | 'Surrender';
export function isAction(value: string): value is Action {
  return ['Hit', 'Stand', 'Double', 'Split', 'Surrender'].includes(value);
}
import {Session} from "@/models/session.ts";
import {
  modelChangeEvent,
  modelCustomEvent,
  modelEvents,
  modelInstanceCustomEvent,
  type ModelPropertyChangeEvent
} from "@/lib/mitt";
import {ensureInstanceId, getModelInstanceId} from "@/lib/modelEvents";

export const NEW_CARD_EVENT = 'new_card'
export const SPLIT_CARDS_EVENT = 'split_cards'

export class Hand {
  public isSplit = false;
  private splitCount = 0;
  public isDoubled = false;
  public hasStood = false;
  public isSurrendered = false
  constructor(public cards: Card[] = []) {
    ensureInstanceId(Hand, 'hand', this as Record<string | symbol, unknown>)
  }

  get softValue(): number {
    let value = 0;
    for (const card of this.cards) {
      value += card.value;
    }
    return value;
  }
  get isSoft(): boolean {
    return this.cards.some(card => card.isAce()) && this.softValue + 10 <= 21;
  }
  get isDone(): boolean {
    return this.isBusted || this.hasStood || this.isSurrendered || this.bestValue === 21
  }
  get isBusted(): boolean {
    return this.softValue > 21;
  }
  get isBlackJack(): boolean {
    return !this.isSplit && this.bestValue === 21 && this.cards.length === 2;
  }
  get bestValue(): number {
    if (this.isSoft && this.softValue + 10 <= 21) {
      return this.softValue + 10;
    }
    return this.softValue;
  }

  listViableActions(betNumber: number): { [action in Action]: boolean } {
    return {
      Hit: !this.validateAction('Hit', betNumber),
      Stand: !this.validateAction('Stand', betNumber),
      Double: !this.validateAction('Double', betNumber),
      Split: !this.validateAction('Split', betNumber),
      Surrender: !this.validateAction('Surrender', betNumber),
      // Insurance: !this.validateAction('Insurance', betNumber),
    }
  }

  addCard (card: Card) {
    this.cards.push(card);
    const instanceId = getModelInstanceId(this);
    const payload: ModelPropertyChangeEvent = {
      model: 'hand',
      instanceId,
      event: NEW_CARD_EVENT,
      value: card,
      previous: undefined,
      target: this,
    }
    modelEvents.emit(modelChangeEvent, payload)
    modelEvents.emit(modelCustomEvent('hand', NEW_CARD_EVENT), payload)
    if (instanceId) modelEvents.emit(modelInstanceCustomEvent('hand', NEW_CARD_EVENT, instanceId), payload)
  }

  splitCards (): Card | undefined {
    const splitCard = this.cards.pop();
    const instanceId = getModelInstanceId(this);
    const payload: ModelPropertyChangeEvent = {
      model: 'hand',
      instanceId,
      event: SPLIT_CARDS_EVENT,
      value: splitCard,
      previous: undefined,
      target: this,
    }

    modelEvents.emit(modelChangeEvent, payload)
    modelEvents.emit(modelCustomEvent('hand', SPLIT_CARDS_EVENT), payload)
    if (instanceId) modelEvents.emit(modelInstanceCustomEvent('hand', SPLIT_CARDS_EVENT, instanceId), payload)
    return splitCard
  }

  split() {
    this.isSplit = true
    this.splitCount++
  }

  beatsHand(other: Hand): HandResult {
    if (this.isBlackJack && !other.isBlackJack) {
      return 'BlackJackWin';
    }
    if (!this.isBlackJack && other.isBlackJack) {
      return 'Lose';
    }
    if (this.isBusted) {
      return 'Lose';
    }
    if (other.isBusted) {
      return this.isDoubled ? 'Double' : 'Win';
    }
    if (this.bestValue > other.bestValue) {
      return this.isDoubled ? 'Double' : 'Win';
    }
    if (this.bestValue < other.bestValue) {
      return 'Lose';
    }
    return this.isDoubled ? 'Double_Push' : 'Push';
  }

  validateAction(action: Action, betValue: number): string | null {
    if (this.isDone) return 'Hand not active'
    switch (action) {
      case 'Stand':
        return null
      case 'Hit':
        return this.softValue < 21 ? null : 'Cannot hit on 21 or more'
      case "Double":
        if (Session.getInstance().player.balance < betValue) return 'Not enough balance to double'
        if (this.cards.length !== 2) return 'Can only double on first two cards'
        if (this.isSplit && !Session.getInstance().rules.doubleAllowedAfterSplit) {
          return 'Can not double after split'
        }
        return null
      case 'Split':
        if (this.cards.length !== 2) return 'Can only split with two cards'
        if (this.cards[0].value !== this.cards[1].value) return 'Can only split matching values'
        if (this.splitCount >= Session.getInstance().rules.maxSplits) return 'maximum split count reached'
        if (this.cards[0].isAce() && this.isSplit && !Session.getInstance().rules.resplitAcesAllowed) return 'Can not resplit aces'
        return null
      case "Surrender":
        if (this.cards.length !== 2) return 'Can only surrender on first two cards'
        if (!Session.getInstance().rules.surrenderAllowed) return 'Surrender not allowed'
        return  null
    }
  }
}
