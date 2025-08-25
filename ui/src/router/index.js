// ui/src/router/index.js (veya .ts)
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import InfoView from '@/views/InfoView.vue'
import LearningView from '@/views/LearningView.vue'
import JobsView from '@/views/JobsView.vue'
import EventsView from '@/views/EventsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  // Hash mode: GitHub Pages 404 vermez
  history: createWebHashHistory(import.meta.env.BASE_URL), 
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/info', name: 'info', component: InfoView },
    { path: '/learning', name: 'learning', component: LearningView },
    { path: '/jobs', name: 'jobs', component: JobsView },
    { path: '/events', name: 'events', component: EventsView },

    // 404 - en sonda kalsın
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
  ],
  // (opsiyonel) route değişince en üste dön
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
