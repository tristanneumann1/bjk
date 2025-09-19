import prompt from 'prompt';
import { type Action } from '@/models/hand';
// import { GameRigged } from 'models/games/gameRigged';
// import { Card } from 'models/card';
import { Game3Chair } from '@/models/games/game3Chair';

async function run () {
  const game = new Game3Chair()
  game.start()
  // game.start([new Card('Hearts', 'K'), new Card('Clubs', 'A'), new Card('Hearts', '5'), new Card('Clubs', 'K')])
  let stop = false
  while(!stop) {
    let action: Action | null = null
    const { act } = await prompt.get(['act'])
    switch (act) {
      case 'h':
      case 'H':
        action = 'Hit'
        break
      case 's':
      case 'S':
        action = 'Stand'
        break
      case 'd':
      case 'D':
        action = 'Double'
        break
      case 'p':
      case 'P':
        action = 'Split'
        break
      case 'r':
      case 'R':
        action = 'Surrender'
        break
      case 'q':
      case 'Q':
        stop = true
        break
      case 'c':
      case 'C':
        game.nextRound()
        continue
      default:
        console.log('unknown action');
        stop = true
    }
    if(action) {
      game.table.act(action)
    }
  }
}

run().then(() => console.log('Game Over'))
