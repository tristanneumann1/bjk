import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import './lib/mitt'
import initializeSession from "@/lib/initializeSession.ts";
import '@/lib/firebase.ts'

// import {modelEvents} from "@/lib/mitt.ts";


initializeSession()
// document['_session'] = Session.getInstance()
// document['_events'] = modelEvents
// const eventsToLog = [HAND_OUTCOME_EVENT]
// modelEvents.on('*', (type, e) => {
  // if(type)
  // console.log('[Event]',type, e.value)

// })

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
