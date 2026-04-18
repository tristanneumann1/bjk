<template>
  <button
    class="peek-bar"
    :class="{ 'peek-bar--visible': visible }"
    type="button"
    aria-label="Show menu"
    :aria-hidden="!visible"
    :tabindex="visible ? 0 : -1"
    @click="$emit('reveal')"
  >
    <span class="peek-bar__handle" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
defineProps<{ visible: boolean }>()
defineEmits<{ reveal: [] }>()
</script>

<style scoped>
.peek-bar {
  position: relative;
  flex: 0 0 auto;
  width: 100%;
  height: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  opacity: 0;
  overflow: visible;
  z-index: 19;
  transition:
    height 260ms cubic-bezier(0.22, 0.61, 0.36, 1),
    opacity 220ms linear;
}

.peek-bar--visible {
  height: 6px;
  opacity: 1;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 0, 0, 0.45) 35%,
    rgba(0, 0, 0, 0.45) 65%,
    transparent 100%
  );
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.peek-bar:not(.peek-bar--visible) {
  pointer-events: none;
}

.peek-bar__handle {
  display: block;
  width: 32px;
  height: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.35);
  margin: 1.5px auto 0;
  transition:
    background 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.peek-bar:hover .peek-bar__handle,
.peek-bar:focus-visible .peek-bar__handle {
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.18);
  transform: scaleX(1.15);
}

.peek-bar:focus-visible {
  outline: none;
}

.peek-bar::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 38px;
}

@media (prefers-reduced-motion: reduce) {
  .peek-bar,
  .peek-bar__handle {
    transition: none;
  }
}
</style>
