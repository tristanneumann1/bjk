import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import {Session} from "@/models/session.ts";
import {Player} from "@/models/player.ts";
import {Rules} from "@/models/rules.ts";
import './lib/mitt'
// import {modelChangeEvent, modelEvents} from "@/lib/mitt.ts";
// import {Hand} from "@/models/hand.ts"; //initialize modelEvents

Session.initialize({
  player: new Player(10_000),
  rules: new Rules()
})
// document['_session'] = Session.getInstance()
// document['_hand'] = new Hand()
// modelEvents.on(modelChangeEvent, (e) => {
//   console.log('e', e)
// })
const app = createApp(App)

app.use(createPinia())

app.mount('#app')
