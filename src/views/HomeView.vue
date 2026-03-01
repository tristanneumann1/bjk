<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'

const router = useRouter()

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Blackjack Strategy Trainer',
        url: 'https://blackjackstrategytrainer.com',
        description:
          'Practice blackjack basic strategy and card counting with real-time feedback. Includes Illustrious 18 and Fab 4 count-dependent deviations, true count range guidance, and session performance tracking.',
        applicationCategory: 'GameApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      }),
    },
  ],
})
</script>

<template>
  <main class="landing-shell">
    <div class="landing-shell__content">
      <img src="/blackjack-strategy-trainer-logo.jpg" alt="Blackjack Strategyt Trainer" class="landing-shell__logo" />
      <h1 class="landing-shell__title">Blackjack Strategy Trainer</h1>
      <p class="landing-shell__description">
        Master blackjack basic strategy and card counting with real-time feedback,
        count-dependent play deviations, and detailed performance tracking.
      </p>
      <v-btn
        size="large"
        color="success"
        class="landing-shell__cta"
        @click="router.push('/game')"
      >
        Play Now
      </v-btn>
      <ul class="landing-shell__features">
        <li>Basic strategy for any rule set</li>
        <li>Illustrious 18 &amp; Fab 4 deviations</li>
        <li>True count range guidance</li>
        <li>Session performance history</li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.landing-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
  background: linear-gradient(160deg, #041b0b, #0b3d1b);
}

.landing-shell__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  max-width: 560px;
}

.landing-shell__logo {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
}

.landing-shell__title {
  color: #f5f5f5;
  font-size: 2rem;
  margin: 0;
  line-height: 1.2;
}

.landing-shell__description {
  color: #c8e6c9;
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 0;
}

.landing-shell__cta {
  min-width: 160px;
}

.landing-shell__features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.landing-shell__features li {
  color: #a5d6a7;
  font-size: 0.95rem;
}

.landing-shell__features li::before {
  content: '✓ ';
  color: #66bb6a;
  font-weight: bold;
}

@media (max-width: 480px) {
  .landing-shell__title {
    font-size: 1.5rem;
  }
}
</style>
