import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import App from '@/App.vue'
import { Session } from '@/models/session'
import { Player } from '@/models/player'
import { Rules } from '@/models/rules'

describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    Session.initialize(new Session({
      player: new Player(100_000),
      rules: new Rules(),
    }))
  })

  it('mounts renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.exists()).toBe(true)
  })
})
