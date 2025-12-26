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
import {initializeHandlers} from "@/lib/handlers.ts";


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
  new Card( 'Hearts', 'A')
]

const nonStopBlackJack = [
  new Card('Spades', '2'),
  new Card( 'Hearts', '3'),
  new Card('Spades', 'K'),
  new Card( 'Hearts', 'A'),
  new Card('Spades', '6'),
  new Card( 'Hearts', '5'),
  new Card('Spades', 'K'),
  new Card( 'Hearts', 'A'),
  new Card('Spades', '2'),
  new Card( 'Hearts', '3'),
  new Card('Spades', 'K'),
  new Card( 'Hearts', 'A'),
  new Card('Spades', '6'),
  new Card( 'Hearts', '5'),
  new Card('Spades', 'K'),
  new Card( 'Hearts', 'A'),
]

const dealerBlackJack = [
  new Card('Spades', 'K'),
  new Card( 'Hearts', 'A'),
  new Card('Spades', '6'),
  new Card( 'Hearts', '5'),
  new Card('Spades', 'K'),
  new Card( 'Hearts', 'A'),
  new Card('Spades', '2'),
  new Card( 'Hearts', '3'),
  new Card('Spades', 'K'),
  new Card( 'Hearts', 'A'),
  new Card('Spades', '6'),
  new Card( 'Hearts', '5'),
  new Card('Spades', 'K'),
  new Card( 'Hearts', 'A'),
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

const manySplits = [
  new Card('Spades', '2'),
  new Card( 'Hearts', '3'),
  new Card('Spades', 'K'),
  new Card( 'Hearts', 'K'),
  new Card('Spades', 'J'),
  new Card( 'Hearts', 'Q'),
  new Card('Spades', 'K'),
  new Card( 'Hearts', 'K'),
  new Card('Spades', 'J'),
  new Card( 'Hearts', 'Q')
]

const secondHandBlackJack = [
  new Card('Spades', '2'),
  new Card( 'Hearts', '3'),
  new Card('Spades', '5'),
  new Card( 'Hearts', '6'),
  new Card('Spades', 'A'),
  new Card( 'Hearts', 'J'),
]

const tens = [
  new Card('Spades', 'K'),
  new Card('Diamonds', 'Q'),
  new Card( 'Clubs', 'J'),
  new Card( 'Hearts', '10'),
  new Card('Spades', 'K'),
  new Card('Diamonds', 'Q'),
  new Card( 'Clubs', 'J'),
  new Card( 'Hearts', '10'),
  new Card('Spades', 'K'),
  new Card('Diamonds', 'Q'),
  new Card( 'Clubs', 'J'),
  new Card( 'Hearts', '10'),
  new Card('Spades', 'K'),
  new Card('Diamonds', 'Q'),
  new Card( 'Clubs', 'J'),
  new Card( 'Hearts', '10')
]

const orderedDeck = [
  new Card('Diamonds', 'A'),
  new Card('Diamonds', 'K'),
  new Card('Diamonds', 'Q'),
  new Card( 'Diamonds', 'J'),
  new Card( 'Diamonds', '10'),
  new Card('Diamonds', '9'),
  new Card('Diamonds', '8'),
  new Card( 'Diamonds', '7'),
  new Card( 'Diamonds', '6'),
  new Card('Diamonds', '5'),
  new Card('Diamonds', '4'),
  new Card( 'Diamonds', '3'),
  new Card( 'Diamonds', '2'),
  new Card('Spades', 'A'),
  new Card('Spades', 'K'),
  new Card('Spades', 'Q'),
  new Card( 'Spades', 'J'),
  new Card( 'Spades', '10'),
  new Card('Spades', '9'),
  new Card('Spades', '8'),
  new Card( 'Spades', '7'),
  new Card( 'Spades', '6'),
  new Card('Spades', '5'),
  new Card('Spades', '4'),
  new Card( 'Spades', '3'),
  new Card( 'Spades', '2'),
  new Card('Hearts', 'A'),
  new Card('Hearts', 'K'),
  new Card('Hearts', 'Q'),
  new Card( 'Hearts', 'J'),
  new Card( 'Hearts', '10'),
  new Card('Hearts', '9'),
  new Card('Hearts', '8'),
  new Card( 'Hearts', '7'),
  new Card( 'Hearts', '6'),
  new Card('Hearts', '5'),
  new Card('Hearts', '4'),
  new Card( 'Hearts', '3'),
  new Card( 'Hearts', '2'),
  new Card('Clubs', 'A'),
  new Card('Clubs', 'K'),
  new Card('Clubs', 'Q'),
  new Card( 'Clubs', 'J'),
  new Card( 'Clubs', '10'),
  new Card('Clubs', '9'),
  new Card('Clubs', '8'),
  new Card( 'Clubs', '7'),
  new Card( 'Clubs', '6'),
  new Card('Clubs', '5'),
  new Card('Clubs', '4'),
  new Card( 'Clubs', '3'),
  new Card( 'Clubs', '2'),
]

// dealer.shoe.unshift(...tens)
dealer.resetDealIndex()
const table = new Table(dealer, dealerChair, [], { logAfterAction: false })

initializeHandlers(table)
Session.initialize({
  player: new Player(100_000),
  rules,
  table
})

// document['_session'] = Session.getInstance()
// document['_events'] = modelEvents
// const eventsToLog = [HAND_OUTCOME_EVENT]
modelEvents.on('*', (type, e) => {
  // if(type)
  // console.log('[Event]',type, e.value)
})
const app = createApp(App)

app.use(createPinia())

app.mount('#app')
