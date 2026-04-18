<template>
  <div
    class="profile-menu"
    :class="{ 'profile-menu--hidden': settingsStore.menuHidden }"
    :style="menuStyle"
    :aria-hidden="settingsStore.menuHidden"
  >
    <button
      class="profile-menu__button"
      type="button"
      aria-label="Home"
      :tabindex="settingsStore.menuHidden ? -1 : 0"
      @click="router.push('/')"
    >
      <svg class="profile-menu__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 12L12 3l9 9" />
        <path d="M9 21V12h6v9" />
        <path d="M3 12v9h18v-9" />
      </svg>
    </button>

    <button
      class="profile-menu__button"
      type="button"
      aria-label="Send feedback"
      :tabindex="settingsStore.menuHidden ? -1 : 0"
      @click="isFeedbackOpen = true"
    >
      <svg class="profile-menu__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </button>

    <button
      ref="toggleButtonRef"
      class="profile-menu__button profile-menu__toggle"
      type="button"
      aria-label="Hide menu"
      :tabindex="settingsStore.menuHidden ? -1 : 0"
      @click="settingsStore.setMenuHidden(true)"
    >
      <svg class="profile-menu__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M6 15l6-6 6 6" />
        <path d="M6 9h12" />
      </svg>
    </button>

    <FeedbackDialog v-model="isFeedbackOpen" />

    <v-menu
      v-model="isOpen"
      :close-on-content-click="false"
      location="bottom end"
      offset="8"
    >
      <template #activator="{ props }">
        <button
          v-if="authLoaded && !currentUser"
          class="profile-menu__sign-in"
          type="button"
          aria-haspopup="true"
          :aria-expanded="isOpen ? 'true' : 'false'"
          v-bind="props"
        >
          Sign In
        </button>
        <button
          v-else
          class="profile-menu__button"
          type="button"
          aria-haspopup="true"
          :aria-expanded="isOpen ? 'true' : 'false'"
          v-bind="props"
        >
          <img
            v-if="currentUser?.photoURL"
            :src="currentUser.photoURL"
            class="profile-menu__avatar"
            alt="Profile"
            referrerpolicy="no-referrer"
          />
          <span v-else-if="currentUser" class="profile-menu__initials" aria-label="Profile">{{ initials }}</span>
          <ProfileIcon v-else class="profile-menu__icon" aria-label="Profile" role="img" />
        </button>
      </template>

      <div v-if="!currentUser" class="profile-menu__panel profile-menu__panel--auth" role="dialog" aria-label="Sign in">
        <header class="profile-menu__auth-header">
          <p class="profile-menu__eyebrow">Your Account</p>
          <h2 class="profile-menu__auth-title">Sign in to track your game</h2>
          <ul class="profile-menu__auth-benefits">
            <li>Session history and accuracy over time</li>
            <li>Review every mistake after each shoe</li>
            <li>Save custom strategy grids to your account</li>
            <li>Sync across devices — free</li>
          </ul>
        </header>
        <Auth />
      </div>

      <div v-else class="profile-menu__panel" role="dialog" aria-label="Player menu">
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
            <p class="profile-menu__tab-label">{{ section.label }}</p>
          </button>
        </nav>

        <section class="profile-menu__content" role="tabpanel">
          <component v-if="activeSectionComponent" :is="activeSectionComponent" />
          <template v-else>
            <p>{{ activeSectionCopy }}</p>
            <p class="profile-menu__coming-soon">Content coming soon.</p>
          </template>
        </section>
      </div>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, type Component } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import Auth from '@/components/Auth.vue'
import ProfileTab from '@/components/menuTabs/ProfileTab.vue'
import GameTab from '@/components/menuTabs/GameTab.vue'
import StrategyTab from '@/components/menuTabs/StrategyTab.vue'
import StatsTab from '@/components/menuTabs/StatsTab.vue'
import FeedbackDialog from '@/components/FeedbackDialog.vue'
import ProfileIcon from '@/assets/icons/profile.svg?component'
import GameIcon from '@/assets/icons/game.svg?component'
import StrategyIcon from '@/assets/icons/strategy.svg?component'
import StatsIcon from '@/assets/icons/stats.svg?component'
import StyleIcon from '@/assets/icons/style.svg?component'
import { useSettingsStore } from '@/stores/settings'

const router = useRouter()
const settingsStore = useSettingsStore()
const isOpen = ref(false)
const isFeedbackOpen = ref(false)
const currentUser = ref<User | null>(null)
const authLoaded = ref(false)
const toggleButtonRef = ref<HTMLButtonElement | null>(null)

const focusToggle = () => {
  toggleButtonRef.value?.focus()
}

defineExpose({ focusToggle })

const menuStyle = computed(() => ({
  '--profile-menu-height': settingsStore.menuHidden ? '0px' : '52px',
  '--menu-opacity': settingsStore.menuHidden ? '0' : '1',
}))

onMounted(() => {
  onAuthStateChanged(getAuth(), user => {
    currentUser.value = user
    authLoaded.value = true
  })
})

const initials = computed(() => {
  if (!currentUser.value) return ''
  const name = currentUser.value.displayName
  if (name) {
    const parts = name.trim().split(' ')
    return parts.length >= 2 ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase() : parts[0][0].toUpperCase()
  }
  return (currentUser.value.email?.[0] ?? '?').toUpperCase()
})
const activeSection = ref<MenuSectionId>('profile')

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

const tabComponents: Partial<Record<MenuSectionId, Component>> = {
  profile: ProfileTab,
  game: GameTab,
  strategy: StrategyTab,
  stats: StatsTab,
}

const getIcon = (id: MenuSectionId) => iconMap[id]

const activeSectionCopy = computed(() => {
  const section = menuSections.find(entry => entry.id === activeSection.value)
  return section?.description ?? ''
})

const activeSectionComponent = computed(() => tabComponents[activeSection.value])
</script>

<style scoped>
.profile-menu {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.75rem;
  flex: 0 0 auto;
  height: var(--profile-menu-height, 52px);
  opacity: var(--menu-opacity, 1);
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition:
    height 260ms cubic-bezier(0.22, 0.61, 0.36, 1),
    opacity 220ms linear;
}

.profile-menu--hidden {
  pointer-events: none;
  border-bottom-color: transparent;
}

@media (prefers-reduced-motion: reduce) {
  .profile-menu {
    transition: none;
  }
}

.profile-menu__sign-in {
  height: 36px;
  padding: 0 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(102, 187, 106, 0.6);
  background: rgba(67, 160, 71, 0.2);
  color: #a5d6a7;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  white-space: nowrap;
}

.profile-menu__sign-in:hover {
  background: rgba(67, 160, 71, 0.35);
}

.profile-menu__panel--auth {
  min-width: 300px;
}

.profile-menu__auth-header {
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.profile-menu__auth-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #f5f5f5;
}

.profile-menu__auth-benefits {
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.profile-menu__auth-benefits li {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.65);
  padding-left: 1.1rem;
  position: relative;
}

.profile-menu__auth-benefits li::before {
  content: '✓';
  color: #66bb6a;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.profile-menu__button {
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
  overflow: hidden;
  flex-shrink: 0;
}

.profile-menu__avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 9999px;
}

.profile-menu__initials {
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
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
</style>
