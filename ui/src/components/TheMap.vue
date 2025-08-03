<template>
  <div id="map" style="height: 400px; width: 100%;"></div>
</template>

<script>
import { onMounted } from 'vue'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'TheMap',
  setup() {
    onMounted(() => {
      const map = L.map('map').setView([46.8806, 8.6446], 10)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map)
      L.marker([46.8806, 8.6446]).addTo(map)
        .bindPopup('Uri, Schweiz')
        .openPopup()
    })
  }
}
</script>
