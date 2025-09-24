import { attachModelEventEmitter } from '@/lib/modelEvents'

export class Player {
  constructor(public balance: number) {}
  addMoney(amount: number) {
    this.balance += amount;
  }
  removeMoney(amount: number) {
    this.balance -= amount;
  }
}

attachModelEventEmitter(Player, {
  model: 'player',
  props: ['balance'],
})
