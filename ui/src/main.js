// ui/src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

// 🔹 Leaflet CSS ve ikon yollarını düzelt
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Varsayılan ikonları doğru asset path'leriyle override et
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const app = createApp(App)
app.use(router)
app.mount('#app')