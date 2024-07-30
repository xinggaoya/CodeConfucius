import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/code',
          name: 'Code',
          component: () => import('../views/CodeView.vue')
        },
        {
          path: '/',
          name: 'Translate',
          component: () => import('../views/TranslateView.vue')
        }
      ]
    }

  ]
})

export default router
