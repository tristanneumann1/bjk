<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
@custom-media --bp-landscape-max (max-width: 699px);
@custom-media --bp-landscape-min (min-width: 700px);

html,
body,
#app {
  margin: 0;
}

body {
  background-color: #006400;
  overscroll-behavior-y: contain;
}
</style>
