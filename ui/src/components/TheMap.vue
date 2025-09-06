<template>
  <div ref="mapEl" class="leaflet-map"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Vite için asset yollarını elle çöz
const iconUrl = new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href
const iconRetinaUrl = new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href
const shadowUrl = new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href

const defaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

export default {
  name: 'TheMap',
  setup() {
    const mapEl = ref(null)
    let map = null

    const locations = [
      { name: "Mitenand (Hilfswerk der Kirchen)", address: "Seedorferstr. 6a, 6460 Altdorf", coords: [46.8822, 8.6375] },
      { name: "Gemeinsam Kochen (Schulhaus Bernarda)", address: "Bahnhofstr. 40, 6460 Altdorf", coords: [46.8827, 8.6421] },
      { name: "Treffpunkt26", address: "Hagenstr. 26, 6460 Altdorf", coords: [46.8802, 8.6379] },
      { name: "Femmes-Tische / Männer-Tische (Gesundheitsförderung Uri)", address: "Gotthardstr. 14, 6460 Altdorf", coords: [46.8807, 8.6427] },
      { name: "Midnight Point Altdorf / OpenSunday", address: "Turnhalle Kollegi, Gotthardstr. 59, 6460 Altdorf", coords: [46.8778, 8.6372] },
      { name: "Frauentanz / Kulturelle Freizeitaktivitäten (TriffAltdorf)", address: "Dätwylerstr. 15, 6460 Altdorf", coords: [46.8792, 8.6370] },
      { name: "Jubla + (Pferdekuranstalt)", address: "Hellgasse 7, 6460 Altdorf", coords: [46.8809, 8.6420] },
      { name: "Hope – Kreativ- und Nähwerkstatt (Theater Uri)", address: "Schützengasse 11, 6460 Altdorf", coords: [46.8800, 8.6425] },
      { name: "Wanderungen durch Uri (Kulturkloster)", address: "Kapuzinerweg 22, 6460 Altdorf", coords: [46.8785, 8.6428] },
      { name: "Unihockey open (Gräwimatt-Turnhalle)", address: "Schulhausstrasse 30, 6467 Schattdorf", coords: [46.8555, 8.6520] },
      { name: "Kultur- und Sprachschule Uri (Brennpunkt Uri)", address: "Umfahrungsstrasse 32, 6467 Schattdorf", coords: [46.8570, 8.6540] }
    ]

    onMounted(() => {
      map = L.map(mapEl.value).setView([46.8806, 8.6446], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map)

      // Marker ve popup ekle
      locations.forEach((loc) => {
        const marker = L.marker(loc.coords, { icon: defaultIcon }).addTo(map)

        const popup = document.createElement('div')
        popup.innerHTML = `<strong>${loc.name}</strong><br>${loc.address}<br>`
        const btn = document.createElement('button')
        btn.textContent = 'Zum Event'
        Object.assign(btn.style, {
          marginTop: '8px',
          padding: '6px 12px',
          background: '#0aa2c0',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        })
        btn.addEventListener('click', () =>
          window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`, '_blank')
        )
        popup.appendChild(btn)

        marker.bindPopup(popup)
      })

      setTimeout(() => map.invalidateSize(), 0)
    })

    onBeforeUnmount(() => {
      if (map) map.remove()
    })

    return { mapEl }
  }
}
</script>

<style scoped>
.leaflet-map {
  width: 100%;
  height: 400px;
}
</style>