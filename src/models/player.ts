export class Player {
  private static instance: Player;

  static initialize(player: Player) {
    this.instance = player;
  }
  static getInstance(): Player {
    if (!Player.instance) {
      Player.instance = new Player(0);
    }
    return Player.instance;
  }

  constructor(public balance: number) {}
  addMoney(amount: number) {
    this.balance += amount;
  }
  removeMoney(amount: number) {
    this.balance -= amount;
  }
}