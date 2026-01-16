<template>
  <div class="profile-tab">
    <p class="profile-tab__intro">Log in or view your player details.</p>
    <Auth />
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
    </div>
  </div>
</template>

<script setup lang="ts">
import Auth from '@/components/Auth.vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
</script>

<style scoped>
.profile-tab {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.profile-tab__intro {
  margin: 0;
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

.profile-tab__settings h3 {
  margin: 0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
