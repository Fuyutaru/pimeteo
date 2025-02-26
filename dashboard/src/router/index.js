import { createRouter, createWebHistory } from 'vue-router'
import DataLiveView from '@/views/DataLiveView.vue'
import DataHistoryView from '@/views/DataHistoryView.vue'
import MapView from '@/views/MapView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DataLiveView,
    },
    {
      path: '/history',
      name: 'history',
      component: DataHistoryView,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    }
  ],
})

export default router
