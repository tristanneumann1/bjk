<template>
  <div
    class="profile-menu"
    @mouseenter="toggleHover(true)"
    @mouseleave="toggleHover(false)"
  >
    <button
      class="profile-menu__button"
      type="button"
      aria-haspopup="true"
      :aria-expanded="isOpen ? 'true' : 'false'"
    >
      <svg
        class="profile-menu__icon"
        viewBox="0 0 24 24"
        role="img"
        aria-label="Profile"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-3.3137 3.134-6 8-6s8 2.6863 8 6" />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="profile-menu__panel"
      role="dialog"
      aria-label="Profile menu"
    >
      <Auth />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Auth from "@/components/Auth.vue";

const isOpen = ref(false)

const toggleHover = (value: boolean) => {
  isOpen.value = value
}
</script>

<style scoped>
.profile-menu {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 20;
}

.profile-menu__button {
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.profile-menu__button:hover,
.profile-menu__button:focus-visible {
  background: rgba(255, 255, 255, 0.2);
}

.profile-menu__button:active {
  transform: scale(0.97);
}

.profile-menu__icon {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
}

.profile-menu__panel {
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: #fff;
  min-width: 220px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.profile-menu__placeholder {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.85;
}
</style>
