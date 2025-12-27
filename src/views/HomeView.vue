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
}
</style>
