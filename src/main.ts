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
import {modelChangeEvent, modelEvents} from "@/lib/mitt.ts";
import {Hand} from "@/models/hand.ts"; //initialize modelEvents


const rules = new Rules()
const shoe: Card[] = buildNDeckShoe(rules.deckCount)
const dealerChair = new Chair()
const dealer = new Dealer(shoe)
dealer.shuffle()
const table = new Table(dealer, dealerChair, [], { logAfterAction: false })

Session.initialize({
  player: new Player(10_000),
  rules,
  table
})

document['_session'] = Session.getInstance()
document['_hand'] = new Hand()
document['_events'] = modelEvents
modelEvents.on(modelChangeEvent, (e) => {
  console.log('e', e)
})
const app = createApp(App)

app.use(createPinia())

app.mount('#app')
