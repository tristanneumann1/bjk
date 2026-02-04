import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import 'unfonts.css'
import '@/assets/media.css'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

import App from '@/App.vue'
import router from '@/router'

import './lib/mitt'

import initializeSession from '@/lib/initializeSession.ts'

import '@/lib/firebase.ts'


initializeSession()
// document['_session'] = Session
// document['_events'] = modelEvents
// const eventsToLog = [HAND_OUTCOME_EVENT]
// modelEvents.on('*', (type, e) => {
//   if(type)
//   console.log('[Event]',type, e.value)
// })

const vuetify = createVuetify()

const pinia = createPinia()
const app = createApp(App)

const viewport = reactive({ size: `${window.innerWidth}×${window.innerHeight}` })

window.addEventListener('resize', () => {
  viewport.size = `${window.innerWidth}×${window.innerHeight}`
})

app.provide('viewport', viewport)

app.use(vuetify)
app.use(pinia)
app.use(router)

app.mount('#app')
