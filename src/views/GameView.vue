<script setup lang="ts">
import { nextTick, ref } from 'vue'
import ProfileMenu from '@/components/ProfileMenu.vue'
import PeekBar from '@/components/PeekBar.vue'
import TableSection from '@/components/TableSection.vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
const profileMenuRef = ref<InstanceType<typeof ProfileMenu> | null>(null)

const handleReveal = () => {
  settingsStore.setMenuHidden(false)
  nextTick(() => {
    profileMenuRef.value?.focusToggle()
  })
}
</script>

<template>
  <div class="home-shell">
    <div class="home-shell__header">
      <PeekBar :visible="settingsStore.menuHidden" @reveal="handleReveal" />
      <ProfileMenu ref="profileMenuRef" />
    </div>
    <div class="home-shell__body">
      <TableSection />
    </div>
  </div>
</template>

<style scoped>
.home-shell {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: transparent;
}

.home-shell__header {
  position: sticky;
  top: 0;
  z-index: 20;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
}

.home-shell__body {
  flex: 1 1 auto;
  padding: 1rem 1rem calc(env(safe-area-inset-bottom, 0px) + 120px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (--bp-landscape-min) {
  .home-shell__body {
    padding: 1rem 2rem calc(env(safe-area-inset-bottom, 0px) + 160px);
  }
}
</style>
