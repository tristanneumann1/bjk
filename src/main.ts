import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import {Session} from "@/models/session.ts";
import {Player} from "@/models/player.ts";
import {Rules} from "@/models/rules.ts";
import './lib/mitt'
import {buildNDeckShoe, Card} from "@/models/card.ts";
import {Chair} from "@/models/chair.ts";
import {Dealer} from "@/models/dealer.ts";
import {Table} from "@/models/table.ts";
import {modelEvents} from "@/lib/mitt.ts";
import {initializeHandlers} from "@/lib/handlers.ts"; //initialize modelEvents


const rules = new Rules()
const shoe: Card[] = buildNDeckShoe(rules.deckCount)
const dealerChair = new Chair()
const dealer = new Dealer(shoe)
dealer.shuffle()

const playerSplitIntoBlackJack = [
  new Card('Spades', '2'),
  new Card( 'Hearts', '3'),
  new Card('Spades', 'K'),
  new Card( 'Hearts', 'K'),
  new Card('Spades', 'A'),
  new Card( 'Hearts', 'K')
]

const doubleWith2Players = [
  new Card('Spades', '2'),
  new Card( 'Hearts', '3'),
  new Card('Spades', '5'),
  new Card( 'Hearts', '6'),
  new Card('Spades', '6'),
  new Card( 'Hearts', 'J'),
  new Card( 'Hearts', '7')
]

const secondHandBlackJack = [
  new Card('Spades', '2'),
  new Card( 'Hearts', '3'),
  new Card('Spades', '5'),
  new Card( 'Hearts', '6'),
  new Card('Spades', 'A'),
  new Card( 'Hearts', 'J'),
]


dealer.shoe.unshift(...secondHandBlackJack)
dealer.resetDealIndex()
const table = new Table(dealer, dealerChair, [], { logAfterAction: false })

initializeHandlers(table)
Session.initialize({
  player: new Player(10_000),
  rules,
  table
})

document['_session'] = Session.getInstance()
document['_events'] = modelEvents
modelEvents.on('*', (type, e) => {
  console.log('type, value',type, e.value)
})
const app = createApp(App)

app.use(createPinia())

app.mount('#app')
