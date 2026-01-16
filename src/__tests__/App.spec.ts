import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createVuetify } from 'vuetify'

import App from '@/App.vue'
import { Session } from '@/models/session'
import { Rules } from '@/models/rules'

describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    Session.initialize(new Rules())
  })

  it('mounts renders properly', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/',
          alias: [''],
          name: 'home',
          component: { template: '<div />' },
        },
      ],
    })

    const vuetify = createVuetify()

    const wrapper = mount(App, {
      global: {
        plugins: [router, vuetify],
      },
    })

    await router.isReady()
    expect(wrapper.exists()).toBe(true)
  })
})
