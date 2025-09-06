// ui/src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'

// Views
import HomeView from '@/views/HomeView.vue'
import InfoView from '@/views/InfoView.vue'
import LearningView from '@/views/LearningView.vue'
import JobsView from '@/views/JobsView.vue'
import EventsView from '@/views/EventsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

// Use BASE_URL if provided (e.g. "/hoi_ui/") otherwise "/"
const base = (import.meta?.env?.BASE_URL && typeof import.meta.env.BASE_URL === 'string')
  ? import.meta.env.BASE_URL
  : '/'

const routes = [
  // Home with helpful aliases
  { path: '/', name: 'home', component: HomeView, alias: ['/home', '/index'] },

  // Main sections (accept trailing slashes via aliases)
  { path: '/info', name: 'info', component: InfoView, alias: ['/info/'] },
  { path: '/learning', name: 'learning', component: LearningView, alias: ['/learning/'] },
  { path: '/jobs', name: 'jobs', component: JobsView, alias: ['/jobs/'] },
  { path: '/events', name: 'events', component: EventsView, alias: ['/events/'] },

  // Legacy/hash-mismatch safety: if someone navigates to just "#/" or "" ensure home
  { path: '', redirect: { name: 'home' } },

  // 404 catch-all — always keep last
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
]

const router = createRouter({
  // Hash mode prevents 404s on GitHub Pages and static hosts
  history: createWebHashHistory(base),
  routes,
  scrollBehavior() { return { top: 0 } }
})

// Optional: log unresolved navigation errors to help diagnose issues like `s.name`
router.onError((err) => {
  // eslint-disable-next-line no-console
  console.error('[Router Error]', err)
})

export default router
