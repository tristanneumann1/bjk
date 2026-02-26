import prompt from 'prompt';
import { type PlayerAction } from '@/types/actions';
import {GameRigged} from "@/models/games/gameRigged";
import {Card} from "@/models/card";

async function run () {
  const game = new GameRigged()
  // game.start()
  game.start([new Card('Hearts', 'A'), new Card('Clubs', '5'), new Card('Hearts', '5'), new Card('Clubs', 'K')])
  let stop = false
  while(!stop) {
    let action: PlayerAction | null = null
    const { act } = await prompt.get(['act'])
    switch (act) {
      case 'i':
      case 'I':
        action = 'Insurance'
        break
      case 'di':
      case 'DI':
        action = 'DeclineInsurance'
        break
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
