<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
@custom-media --bp-landscape-max (max-width: 760px);
@custom-media --bp-landscape-min (min-width: 761px);

html,
body,
#app {
  min-height: 100%;
}

body {
  margin: 0;
  background-color: #006400;
  min-height: 100vh;
  overflow-y: auto;
}
</style>
