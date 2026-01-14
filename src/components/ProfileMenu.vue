<template>
  <div class="profile-menu">
    <button
      class="profile-menu__button"
      type="button"
      aria-haspopup="true"
      :aria-expanded="isOpen ? 'true' : 'false'"
      @click="toggleMenu"
    >
      <ProfileIcon class="profile-menu__icon" aria-label="Profile" role="img" />
    </button>

    <div v-if="isOpen" class="profile-menu__panel" role="dialog" aria-label="Player menu" ref="menuContainerRef">
      <header class="profile-menu__header">
        <p class="profile-menu__eyebrow">Player Hub</p>
      </header>

      <nav class="profile-menu__tabs" role="tablist">
        <button
          v-for="section in menuSections"
          :key="section.id"
          class="profile-menu__tab"
          role="tab"
          type="button"
          :aria-selected="section.id === activeSection ? 'true' : 'false'"
          @click="activeSection = section.id"
        >
          <component :is="getIcon(section.id)" class="profile-menu__tab-icon" aria-hidden="true" />
          <div>
            <p class="profile-menu__tab-label">{{ section.label }}</p>
<!--            <p class="profile-menu__tab-description">{{ section.description }}</p>-->
          </div>
        </button>
      </nav>

      <section class="profile-menu__content" role="tabpanel">
        <template v-if="activeSection === 'profile'">
          <p>Log in or view your player details.</p>
          <Auth />
          <v-divider class="profile-menu__divider" />
          <div class="profile-menu__settings">
            <h3>Preferences</h3>
            <v-switch
              class="profile-menu__switch"
              color="primary"
              hide-details
              inset
              density="compact"
              label="Show running counter"
              :model-value="settingsStore.showCounter"
              @update:model-value="settingsStore.setShowCounter"
            />
          </div>
        </template>
        <template v-else>
          <p>{{ activeSectionCopy }}</p>
          <p class="profile-menu__coming-soon">Content coming soon.</p>
        </template>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type Component } from 'vue'
import Auth from "@/components/Auth.vue";
import { useSettingsStore } from '@/stores/settings'
import ProfileIcon from '@/assets/icons/profile.svg?component'
import GameIcon from '@/assets/icons/game.svg?component'
import StrategyIcon from '@/assets/icons/strategy.svg?component'
import StatsIcon from '@/assets/icons/stats.svg?component'
import StyleIcon from '@/assets/icons/style.svg?component'

const isOpen = ref(false)
const activeSection = ref<MenuSectionId>('profile')
const menuContainerRef = ref<HTMLElement | null>(null)
const settingsStore = useSettingsStore()

type MenuSectionId = 'profile' | 'game' | 'strategy' | 'stats' | 'style'

const menuSections: Array<{ id: MenuSectionId; label: string; description: string }> = [
  { id: 'profile', label: 'Profile', description: 'Log in and view profile information.' },
  { id: 'game', label: 'Game', description: 'Customize table rules and preferences.' },
  { id: 'strategy', label: 'Strategy', description: 'Adjust and review your strategy charts.' },
  { id: 'stats', label: 'Stats', description: 'Review historical performance and bankroll.' },
  { id: 'style', label: 'Style', description: 'Personalize the look and feel of the game.' },
]

const iconMap: Record<MenuSectionId, Component> = {
  profile: ProfileIcon,
  game: GameIcon,
  strategy: StrategyIcon,
  stats: StatsIcon,
  style: StyleIcon,
}

const getIcon = (id: MenuSectionId) => iconMap[id]

const activeSectionCopy = computed(() => {
  const section = menuSections.find(entry => entry.id === activeSection.value)
  return section?.description ?? ''
})

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeOnOutsideClick = (event: MouseEvent) => {
  const target = event.target as Node | null
  if (!menuContainerRef.value || !target) return
  if (!menuContainerRef.value.contains(target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', closeOnOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', closeOnOutsideClick)
})
</script>

<style scoped>
.profile-menu {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 20;
  display: flex;
  gap: 1rem;
}

.profile-menu__button {
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.profile-menu__button:hover,
.profile-menu__button:focus-visible {
  background: rgba(255, 255, 255, 0.2);
}

.profile-menu__button:active {
  transform: scale(0.97);
}

.profile-menu__icon {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
}

.profile-menu__panel {
  margin-top: 0.5rem;
  padding: 1rem 1.25rem;
  background: rgba(0, 0, 0, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: #fff;
  max-width: 380px;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  overscroll-behavior: contain;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.profile-menu__header {
  margin-bottom: 0.75rem;
}

.profile-menu__header h2 {
  margin: 0.25rem 0 0;
  font-size: 1.1rem;
}

.profile-menu__eyebrow {
  margin: 0;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.75;
}

.profile-menu__tabs {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin: 0 0 0.75rem;
}

.profile-menu__tab {
  border: none;
  background: rgba(255, 255, 255, 0.05);
  color: inherit;
  text-align: left;
  padding: 0.5rem;
  border-radius: 0.6rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.profile-menu__tab[aria-selected='true'] {
  background: rgba(255, 255, 255, 0.15);
}

.profile-menu__tab:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.6);
  outline-offset: 2px;
}

.profile-menu__tab-icon {
  width: 32px;
  height: 32px;
  stroke: currentColor;
}

.profile-menu__tab-label {
  margin: 0;
  font-weight: 600;
}

.profile-menu__tab-description {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.75;
}

.profile-menu__content {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.profile-menu__coming-soon {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.7;
}

.profile-menu__divider {
  margin: 0.75rem 0;
  opacity: 0.5;
}

.profile-menu__settings {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.profile-menu__settings h3 {
  margin: 0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
