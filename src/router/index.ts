import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/finishSignUp',
      name: 'finish-sign-up',
      component: () => import('@/components/FinishSignUp.vue'),
    },
  ],
})

export default router
