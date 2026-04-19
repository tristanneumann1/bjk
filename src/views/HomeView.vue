<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import AuthContainer from '@/components/AuthContainer.vue'

const router = useRouter()
const isMounted = ref(false)
const currentUser = ref<User | null>(null)

onMounted(() => {
  isMounted.value = true
  onAuthStateChanged(getAuth(), user => {
    currentUser.value = user
  })
})

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

const features: Array<{ heading: string; comingSoon?: boolean; items: string[] }> = [
  {
    heading: 'Basic Strategy',
    items: [
      'Correct play for every hand vs every upcard',
      'Supports H17, S17, DAS, and custom rule sets',
      'Real-time feedback on every decision',
      'Build muscle memory through repetition',
    ],
  },
  {
    heading: 'Card Counting',
    items: [
      'Hi-Lo true count guidance as you play',
      'True count range accounts for deck estimation uncertainty',
      'Running count tracked automatically',
      'Count-dependent strategy shifts highlighted',
    ],
  },
  {
    heading: 'Illustrious 18 & Fab 4',
    items: [
      'All 18 highest-value basic strategy deviations',
      'Fab 4 surrender deviations by true count',
      'Know exactly when to deviate from basic strategy',
      'Fully customizable — build and save your own strategy grids and deviations',
    ],
  },
  {
    heading: 'Performance Tracking',
    comingSoon: true,
    items: [
      'Bankroll history across your last 100 games',
      'Action-by-action accuracy breakdown',
      'Track progress over time',
      'Identify your most common mistakes',
    ],
  },
]
</script>

<template>
  <main class="landing-shell">
    <section class="landing-shell__hero">
      <img
        src="/blackjack-strategy-trainer-logo.jpg"
        alt="Blackjack Strategy Trainer"
        class="landing-shell__logo"
      />
      <h1 class="landing-shell__title">Blackjack Strategy Trainer</h1>
      <p class="landing-shell__description">
        The free tool for serious advantaged players. Master blackjack basic strategy and card counting
        with real-time feedback, Illustrious 18 deviations, and session performance tracking.
      </p>
      <v-btn
        size="large"
        color="success"
        class="landing-shell__cta"
        @click="router.push('/game')"
      >
        Play Now
      </v-btn>

      <div v-if="isMounted && !currentUser" class="landing-shell__auth">
        <div class="landing-shell__auth-pitch">
          <p class="landing-shell__auth-heading">Track your progress</p>
          <ul class="landing-shell__auth-benefits">
            <li>Session history and accuracy over time</li>
            <li>Review every mistake after each shoe</li>
            <li>Save custom strategy grids to your account</li>
            <li>Sync across devices — free</li>
          </ul>
        </div>
        <AuthContainer />
      </div>
      <p v-else-if="isMounted && currentUser" class="landing-shell__signed-in">
        Signed in as <strong>{{ currentUser.displayName ?? currentUser.email }}</strong>
      </p>
      <v-skeleton-loader v-else type="button, text" width="280" color="transparent" />
    </section>

    <section class="landing-shell__features">
      <h2 class="landing-shell__features-heading">Everything you need to beat the house</h2>
      <div class="landing-shell__grid">
        <div
          v-for="feature in features"
          :key="feature.heading"
          class="landing-shell__card"
          :class="{ 'landing-shell__card--coming-soon': feature.comingSoon }"
        >
          <div class="landing-shell__card-header">
            <h3 class="landing-shell__card-heading">{{ feature.heading }}</h3>
            <span v-if="feature.comingSoon" class="landing-shell__badge">Coming Soon</span>
          </div>
          <ul class="landing-shell__card-list">
            <li v-for="item in feature.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.landing-shell {
  height: 100dvh;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1.5rem;
  box-sizing: border-box;
  background: linear-gradient(160deg, #041b0b, #0b3d1b);
  gap: 4rem;
}

/* Hero */
.landing-shell__hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  max-width: 600px;
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

.landing-shell__auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.25rem;
}

.landing-shell__auth-pitch {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 320px;
  text-align: left;
}

.landing-shell__auth-heading {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #a5d6a7;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.landing-shell__auth-benefits {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.landing-shell__auth-benefits li {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  padding-left: 1.1rem;
  position: relative;
}

.landing-shell__auth-benefits li::before {
  content: '✓';
  color: #66bb6a;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.landing-shell__signed-in {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

.landing-shell__description {
  color: #c8e6c9;
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 0;
}

.landing-shell__cta {
  min-width: 180px;
}

/* Features */
.landing-shell__features {
  width: 100%;
  max-width: 860px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.landing-shell__features-heading {
  color: #f5f5f5;
  font-size: 1.3rem;
  margin: 0;
  text-align: center;
}

.landing-shell__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  width: 100%;
}

.landing-shell__card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
}

.landing-shell__card--coming-soon {
  opacity: 0.6;
}

.landing-shell__card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.landing-shell__card-heading {
  color: #81c784;
  font-size: 1rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.landing-shell__badge {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #a5d6a7;
  border: 1px solid #a5d6a7;
  border-radius: 999px;
  padding: 0.15rem 0.5rem;
  white-space: nowrap;
}

.landing-shell__card-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.landing-shell__card-list li {
  color: #c8e6c9;
  font-size: 0.9rem;
  line-height: 1.4;
  padding-left: 1.1rem;
  position: relative;
}

.landing-shell__card-list li::before {
  content: '✓';
  color: #66bb6a;
  font-weight: bold;
  position: absolute;
  left: 0;
}


@media (max-width: 560px) {
  .landing-shell__title {
    font-size: 1.5rem;
  }

  .landing-shell__grid {
    grid-template-columns: 1fr;
  }
}
</style>
