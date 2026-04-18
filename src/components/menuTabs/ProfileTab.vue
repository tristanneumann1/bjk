<template>
  <div class="profile-tab">
    <div v-if="currentUser" class="profile-tab__user">
      <p class="profile-tab__email">{{ currentUser.displayName ?? currentUser.email }}</p>
      <button class="profile-tab__sign-out" type="button" @click="handleSignOut">Sign Out</button>
      <p v-if="errorMessage" class="profile-tab__error">{{ errorMessage }}</p>
    </div>
    <p v-else class="profile-tab__intro">Use the <strong>Sign In</strong> button in the top bar to log in.</p>
    <v-divider class="profile-tab__divider" />
    <div class="profile-tab__settings">
      <h3>Preferences</h3>
      <v-switch
        class="profile-tab__switch"
        color="primary"
        hide-details
        inset
        density="compact"
        label="Show running counter"
        :model-value="settingsStore.showCounter"
        @update:model-value="settingsStore.setShowCounter"
      />
      <v-switch
        class="profile-tab__switch"
        color="primary"
        hide-details
        inset
        density="compact"
        label="Inform on mistakes"
        :model-value="settingsStore.showMistakeSnackbar"
        @update:model-value="settingsStore.setShowMistakeSnackbar"
      />
    </div>

    <v-divider class="profile-tab__divider" />

    <div class="profile-tab__section">
      <h3>Bet spread</h3>
      <p class="profile-tab__hint">
        Up to 10 bets, from $5 to $300. The chair buttons cycle through these values in order.
      </p>
      <BetSpreadEditor />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { useSettingsStore } from '@/stores/settings'
import BetSpreadEditor from '@/components/BetSpreadEditor.vue'

const settingsStore = useSettingsStore()
const currentUser = ref<User | null>(null)
const errorMessage = ref('')

onMounted(() => {
  onAuthStateChanged(getAuth(), user => {
    currentUser.value = user
  })
})

const handleSignOut = async () => {
  try {
    await signOut(getAuth())
  } catch {
    errorMessage.value = 'Unable to sign out. Please retry.'
  }
}
</script>

<style scoped>
.profile-tab {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.profile-tab__user {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.profile-tab__email {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.85;
}

.profile-tab__sign-out {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: inherit;
  font-size: 0.875rem;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease;
}

.profile-tab__sign-out:hover {
  background: rgba(255, 255, 255, 0.12);
}

.profile-tab__error {
  margin: 0;
  font-size: 0.8rem;
  color: #fecaca;
}

.profile-tab__intro {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.75;
}

.profile-tab__divider {
  margin: 0.75rem 0;
  opacity: 0.5;
}

.profile-tab__settings {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.profile-tab__settings h3,
.profile-tab__section h3 {
  margin: 0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.profile-tab__section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.profile-tab__hint {
  margin: 0;
  font-size: 0.75rem;
  opacity: 0.7;
}
</style>
