import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FinishSignUp from '@/components/FinishSignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/finishSignUp',
      name: 'finish-sign-up',
      component: FinishSignUp,
    },
  ],
})

export default router
