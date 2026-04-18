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
  height: 100%;
  margin: 0;
}

body {
  background-color: #006400;
  overflow: hidden;
}
</style>
