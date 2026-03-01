<script setup lang="ts">
import ProfileMenu from '@/components/ProfileMenu.vue'
import Table from '@/components/Table.vue'
</script>

<template>
  <div class="home-shell">
    <ProfileMenu />
    <Table />
  </div>
</template>

<style scoped>
.home-shell {
  position: relative;
  min-height: 100vh;
  padding: 1rem 1rem calc(env(safe-area-inset-bottom, 0px) + 120px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (--bp-landscape-min) {
  .home-shell {
    padding: 2rem 2rem calc(env(safe-area-inset-bottom, 0px) + 160px);
  }
}
</style>
