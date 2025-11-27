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

export class Hand {
  public isSplit = false;
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
}
