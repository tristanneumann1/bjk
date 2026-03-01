import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import { reactive } from 'vue'

import 'vuetify/styles'
import 'unfonts.css'
import '@/assets/media.css'
import { createVuetify } from 'vuetify'

import App from '@/App.vue'
import { routes } from '@/router'

import './lib/mitt'
import initializeSession from '@/lib/initializeSession.ts'
import { initColorVariables } from '@/constants/colors'

const vuetify = createVuetify()

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  ({ app, router }) => {
    const pinia = createPinia()

    app.use(vuetify)
    app.use(pinia)

    router.afterEach((to) => {
      if (!import.meta.env.SSR) {
        document.title = (to.meta.title as string) ?? 'Blackjack Strategy Trainer'
      }
    })

    if (!import.meta.env.SSR) {
      import('@/lib/firebase.ts')
      initColorVariables()
      initializeSession()

      const viewport = reactive({ size: `${window.innerWidth}×${window.innerHeight}` })
      window.addEventListener('resize', () => {
        viewport.size = `${window.innerWidth}×${window.innerHeight}`
      })
      app.provide('viewport', viewport)
    }
  },
)
