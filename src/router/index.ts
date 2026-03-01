import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Blackjack Strategy Trainer — Card Counting & Illustrious 18' },
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('@/views/GameView.vue'),
    meta: { title: 'Play — Blackjack Strategy Trainer' },
  },
  {
    path: '/finishSignUp',
    name: 'finish-sign-up',
    component: () => import('@/components/FinishSignUp.vue'),
    meta: { title: 'Sign In — Blackjack Strategy Trainer' },
  },
]
