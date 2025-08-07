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
    const locations = [
      {
        name: "Mitenand (Hilfswerk der Kirchen)",
        address: "Seedorferstr. 6a, 6460 Altdorf",
        coords: [46.8822, 8.6375]
      },
      {
        name: "Gemeinsam Kochen (Schulhaus Bernarda)",
        address: "Bahnhofstr. 40, 6460 Altdorf",
        coords: [46.8827, 8.6421]
      },
      {
        name: "Treffpunkt26",
        address: "Hagenstr. 26, 6460 Altdorf",
        coords: [46.8802, 8.6379]
      },
      {
        name: "Femmes-Tische / Männer-Tische (Gesundheitsförderung Uri)",
        address: "Gotthardstr. 14, 6460 Altdorf",
        coords: [46.8807, 8.6427]
      },
      {
        name: "Midnight Point Altdorf / OpenSunday",
        address: "Turnhalle Kollegi, Gotthardstr. 59, 6460 Altdorf",
        coords: [46.8778, 8.6372]
      },
      {
        name: "Frauentanz / Kulturelle Freizeitaktivitäten (TriffAltdorf)",
        address: "Dätwylerstr. 15, 6460 Altdorf",
        coords: [46.8792, 8.6370]
      },
      {
        name: "Jubla + (Pferdekuranstalt)",
        address: "Hellgasse 7, 6460 Altdorf",
        coords: [46.8809, 8.6420]
      },
      {
        name: "Hope – Kreativ- und Nähwerkstatt (Theater Uri)",
        address: "Schützengasse 11, 6460 Altdorf",
        coords: [46.8800, 8.6425]
      },
      {
        name: "Wanderungen durch Uri (Kulturkloster)",
        address: "Kapuzinerweg 22, 6460 Altdorf",
        coords: [46.8785, 8.6428]
      },
      {
        name: "Unihockey open (Gräwimatt-Turnhalle)",
        address: "Schulhausstrasse 30, 6467 Schattdorf",
        coords: [46.8555, 8.6520]
      },
      {
        name: "Kultur- und Sprachschule Uri (Brennpunkt Uri)",
        address: "Umfahrungsstrasse 32, 6467 Schattdorf",
        coords: [46.8570, 8.6540]
      }
    ]

    onMounted(() => {
      const map = L.map('map').setView([46.8806, 8.6446], 13)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map)

      locations.forEach((loc, idx) => {
        const marker = L.marker(loc.coords).addTo(map)
        const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`
        // Her popup'a benzersiz bir button id veriyoruz
        const popupContent = `
          <b>${loc.name}</b><br>
          ${loc.address}<br>
          <button id="event-btn-${idx}" style="margin-top:8px;padding:6px 12px;background:#0aa2c0;color:#fff;border:none;border-radius:4px;cursor:pointer;">
            Zum Event
          </button>
        `
        marker.bindPopup(popupContent)

        // Popup açıldığında butona event ekle
        marker.on('popupopen', () => {
          setTimeout(() => { // DOM'a eklenmesini bekle
            const btn = document.getElementById(`event-btn-${idx}`)
            if (btn) {
              btn.onclick = () => window.open(gmapsUrl, '_blank')
            }
          }, 10)
        })
      })
    })
  }
}
</script>
