import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import {Session} from "@/models/session.ts";
import {Player} from "@/models/player.ts";
import {Rules} from "@/models/rules.ts";

Session.initialize({
  player: new Player(10_000),
  rules: new Rules()
})
const app = createApp(App)

app.use(createPinia())

app.mount('#app')
