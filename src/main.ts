import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import 'unfonts.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

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
const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
