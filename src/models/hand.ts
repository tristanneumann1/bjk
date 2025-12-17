import { Card } from '@/models/card';
import { type HandResult } from '@/models/chair';
export type Action = 'Hit' | 'Stand' | 'Double' | 'Split' | 'Surrender';
export function isAction(value: string): value is Action {
  return ['Hit', 'Stand', 'Double', 'Split', 'Surrender'].includes(value);
}
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
export const HAND_OUTCOME_EVENT = 'hand_outcome'

export class Hand {
  public isSplit = false;
  public isDoubled = false;
  public hasStood = false;
  public isSurrendered = false
  public lastOutcome: HandResult | null = null
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
  }

  private emitOutcomeChange(nextOutcome: HandResult, previous: HandResult | null) {
    const instanceId = getModelInstanceId(this)
    const payload: ModelPropertyChangeEvent = {
      model: 'hand',
      instanceId,
      event: HAND_OUTCOME_EVENT,
      value: nextOutcome,
      previous,
      target: this,
    }

    modelEvents.emit(modelChangeEvent, payload)
    modelEvents.emit(modelCustomEvent('hand', HAND_OUTCOME_EVENT), payload)
    if (instanceId) {
      modelEvents.emit(modelInstanceCustomEvent('hand', HAND_OUTCOME_EVENT, instanceId), payload)
    }
  }

  private setOutcome(result: HandResult) {
    if (this.lastOutcome === result) {
      return
    }
    const previous = this.lastOutcome
    this.lastOutcome = result
    this.emitOutcomeChange(result, previous)
  }

  beatsHand(other: Hand): HandResult {
    let result: HandResult
    if (this.isSurrendered) {
      result = 'Surrendered'
    } else if (this.isBlackJack && !other.isBlackJack) {
      result = 'BlackJack_Win'
    } else if (!this.isBlackJack && other.isBlackJack) {
      result = 'Lose'
    } else if (this.isBusted) {
      result = this.isDoubled ? 'Double_Lose' : 'Lose'
    } else if (other.isBusted) {
      result = this.isDoubled ? 'Double_Win' : 'Win'
    } else if (this.bestValue > other.bestValue) {
      result = this.isDoubled ? 'Double_Win' : 'Win'
    } else if (this.bestValue < other.bestValue) {
      result = this.isDoubled ? 'Double_Lose' : 'Lose'
    } else {
      result = this.isDoubled ? 'Double_Push' : 'Push'
    }

    this.setOutcome(result)
    return result
  }
}
