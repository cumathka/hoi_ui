import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import InfoView from '@/views/InfoView.vue'
import LearningView from '@/views/LearningView.vue'
import JobsView from '@/views/JobsView.vue'
import EventsView from '@/views/EventsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/info', name: 'info', component: InfoView },
    { path: '/learning', name: 'learning', component: LearningView },
    { path: '/jobs', name: 'jobs', component: JobsView },
    { path: '/events', name: 'events', component: EventsView },
  ]
})

export default router
