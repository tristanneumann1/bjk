<script setup lang="ts">
import ProfileMenu from '@/components/ProfileMenu.vue'
import Table from '@/components/Table.vue'
</script>

<template>
  <div class="home-shell">
    <ProfileMenu />
    <div class="home-shell__body">
      <Table />
    </div>
  </div>
</template>

<style scoped>
.home-shell {
  position: relative;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: transparent;
}

.home-shell__body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
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
