<template>
  <div class="events-view relative w-full min-h-screen">
    <!-- Hero image and overlay -->
    <div class="relative w-full overflow-hidden">
      <img src="@/assets/images/events.png" @click="toggleFullscreen" :class="isFullscreen
        ? 'fixed inset-0 w-screen h-screen object-contain z-[1000] bg-black/90 cursor-zoom-out p-5 box-border transition-all duration-300'
        : 'w-full h-auto cursor-pointer transition-all duration-300'" alt="Events" />
      <!-- Overlay -->
      <div class="hero-overlay-small">
        <div class="flex items-center justify-center gap-4">
          <img src="@/assets/images/logoh.jpeg" alt="Uri Logo"
            class="h-20 w-auto m-0 shadow-md pointer-events-auto object-contain rounded-md" />
          <h1 class="text-h3 text-white m-0 drop-shadow-lg">Integrationsevents</h1>
        </div>
      </div>

      <!-- Breadcrumb -->
      <div class="container">
        <nav class="breadcrumb">
          <router-link to="/" class="hover:underline">Home</router-link>
          <span>&gt;</span>
          <router-link to="/events" class="hover:underline">Events</router-link>
        </nav>
      </div>
    </div>

    <!-- Page content -->
    <div class="container">
      <div class="py-10">
        <header class="mb-8">
          <h1 class="text-h3 text-orange-600 mb-4">Netzwerken und Gemeinschaft erleben</h1>
        </header>

        <section class="content-section">
          <p class="body-lead mb-4">
            Veranstaltungen sind eine wunderbare Möglichkeit, neue Menschen kennenzulernen und sich in der Gemeinschaft
            zu integrieren.
            Auf dieser Seite finden Sie eine Übersicht über Networking-Events, Career Cafés und Tandem-Programme in Uri.
            Diese Veranstaltungen bieten Ihnen die Gelegenheit, Kontakte zu knüpfen, Erfahrungen auszutauschen und sich
            in einem
            unterstützenden Umfeld weiterzuentwickeln. Kommen Sie vorbei und werden Sie Teil unserer lebendigen
            Gemeinschaft!
          </p>

          <!-- Calendar (CDN/global FullCalendar v6) -->
          <div class="mb-6">
            <div ref="calendarEl" class="fc-container"></div>
          </div>

          <!-- Selected Event Details -->
          <div v-if="selectedEvent" class="event-detail-panel mb-8">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-semibold text-cyan-700">{{ selectedEvent.title }}</h3>
              <span :class="['badge', 'badge-' + selectedEvent.category]">
                {{categories.find(c => c.id === selectedEvent.category)?.name}}
              </span>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <!-- Event Info -->
              <div class="space-y-3">
                <p class="flex items-center gap-2 text-gray-600">
                  <span class="text-lg">📅</span> {{ selectedEvent.time }}
                </p>
                <p v-if="selectedEvent.location" class="flex items-center gap-2 text-gray-700">
                  <span class="text-lg">📍</span> {{ selectedEvent.location }}
                </p>
                <p class="mt-4 text-gray-800">{{ selectedEvent.description }}</p>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col gap-3 justify-start">
                <a :href="getEventMapLink(selectedEvent.location)" target="_blank"
                  class="btn btn-outline flex items-center gap-2">
                  <span>🗺️</span> Auf der Karte anzeigen
                </a>
                <button @click="registerForEvent(selectedEvent)" class="btn btn-primary flex items-center gap-2">
                  <span>✍️</span> Jetzt anmelden
                </button>
                <button @click="addToCalendar(selectedEvent)" class="btn btn-outline flex items-center gap-2">
                  <span>📅</span> Zum Kalender hinzufügen
                </button>
              </div>
            </div>
          </div>

          <!-- Category Filters -->
          <div class="filter-section mb-6">
            <div class="flex flex-wrap gap-2">
              <button v-for="category in categories" :key="category.id" @click="filterByCategory(category.id)" :class="[
                'filter-btn',
                selectedCategory === category.id ? 'filter-btn-active' : ''
              ]">
                {{ category.name }}
              </button>
            </div>
          </div>

          <!-- Synchronized detail panel under the calendar -->
          <section id="events-list" class="event-detail-panel">
            <header class="panel-header">
              <h3 class="panel-title">
                <span v-if="selectedDate">Events am {{ new Date(selectedDate).toLocaleDateString('de-CH') }}</span>
                <span v-else>Events nach Datum</span>
              </h3>
              <button v-if="selectedDate" class="btn py-1 px-3" @click="clearDateFilter">Filter aufheben</button>
            </header>

            <div v-if="selectedDate && selectedDateEvents().length" class="panel-list">
              <article v-for="ev in selectedDateEvents()" :key="'list-' + ev.id" class="panel-item"
                @click="focusCalendarEvent(ev.id)" role="button" tabindex="0">
                <div class="item-head">
                  <span class="badge" :class="'badge-' + (ev.category || 'kultur')">{{ ev.category }}</span>
                  <h4 class="item-title">{{ ev.title }}</h4>
                </div>
                <p class="item-meta">{{ ev.time }}<span v-if="ev.location"> · {{ ev.location }}</span></p>
                <p class="item-desc">{{ ev.description }}</p>
              </article>
            </div>

            <div v-else class="panel-empty">
              <p>Wählen Sie ein Datum im Kalender oder eine Kategorie, um die Events hier zu sehen.</p>
            </div>
          </section>

          <!-- Event List -->
          <div class="mt-4 rounded-lg shadow">
            <!-- Active date filter pill -->
            <div v-if="selectedDate" class="px-6 py-3 bg-blue-100 text-gray-800 flex items-center justify-between">
              <span>Gefiltert nach Datum: {{ new Date(selectedDate).toLocaleDateString('de-CH') }}</span>
              <button class="btn py-1 px-3" @click="clearDateFilter">Filter aufheben</button>
            </div>

            <div v-for="(events, date) in filteredEventsByCategoryAndDate" :key="date"
              class="mb-4 border border-gray-100 rounded-lg overflow-hidden">
              <div
                class="flex justify-between items-center px-6 py-4 bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
                @click="toggleEventDetails(date)">
                <h3 class="text-h5 text-cyan-700">{{ date }}</h3>
                <span :class="['transition-transform', expandedDate === date ? 'rotate-180' : '']">▼</span>
              </div>

              <div v-if="expandedDate === date" class="px-6 py-4 bg-white">
                <div v-for="event in events" :key="event.id" class="mb-6 last:mb-0 bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h4 class="text-h5 text-cyan-700 mb-1">{{ event.title }}</h4>
                  <p class="body-small text-gray-600 mb-1">{{ event.time }}</p>
                  <p class="body-small text-gray-700 mb-1" v-if="event.location">📍 {{ event.location }}</p>
                  <p class="body-regular text-gray-700 mb-2">{{ event.description }}</p>
                  <button class="btn px-6 py-2" style="border-radius:0.5rem;">Anmelden</button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'EventsView',
  setup() {
    const calendarEl = ref(null)
    let calendar = null

    const isFullscreen = ref(false)
    const expandedDate = ref(null)
    const selectedCategory = ref('all')
    const selectedDate = ref(null)
    const selectedEvent = ref(null)

    // Static categories
    const categories = ref([
      { id: 'all', name: 'Alle Events' },
      { id: 'beruf', name: 'Berufsmesse' },
      { id: 'sprache', name: 'Sprachcafé' },
      { id: 'kurs', name: 'Kurse & Jugendtreff' },
      { id: 'schnupper', name: 'Schnuppertage' },
      { id: 'sport', name: 'Sportevents' },
      { id: 'kultur', name: 'Kulturelles' },
      { id: 'ausflug', name: 'Ausflüge & Wanderungen' },
      { id: 'beratung', name: 'Beratung' }
    ])

    // Source data grouped by month headings- test info
    const eventsByMonth = ref({
      'August 2025': [
        { id: 1, category: 'kurs', title: 'treffpunkt26 Wiedereröffnung', time: 'ab 11. August', location: 'Hagenstr. 26, Altdorf', description: 'Der treffpunkt26 hat ab dem Montag, 11. August 2025, wieder geöffnet.' },
        { id: 2, category: 'sport', title: 'Yoga mit Olena', time: 'jeden Dienstag, 18:00 Uhr', location: 'Zentrum Sternen, Axenstr. 6, 6454 Flüelen', description: 'Für alle. 10 Franken pro 4 Yogalektionen.' },
        { id: 3, category: 'sport', title: 'Fussball', time: 'jeden Mittwoch, 15:00 - 16:30 Uhr', location: 'Turnhalle Hagenschulhaus, Bahnhofstrasse 36, Altdorf', description: 'Für SRK Klient:innen. Gratis.' },
        { id: 4, category: 'kurs', title: 'Offener Jugendtreff', time: 'jeden Mittwoch, 14:00 - 16:30 Uhr', location: 'Bunker, Winkel, Altdorf oder Bunker, Schulanlage Gehren, Flüelen', description: 'Für 12 - 16-jährige. Gratis.' },
        { id: 5, category: 'sport', title: 'Pilates mit Sevim', time: 'jeden Mittwoch und Donnerstag, 17:30 – 18:30 Uhr', location: 'Zentrum Sternen, Axenstr. 6, 6454 Flüelen', description: 'Für SRK-Klient:innen. Gratis. Mitbringen: Yogamatte oder Badetuch und Wasser.' },
        { id: 6, category: 'sport', title: 'Tischtennis-Kurs', time: 'jeden Freitag, 15:00 - 17:00 Uhr', location: 'Zentrum Sternen, Axenstr. 6, Flüelen', description: 'Für SRK Klient:innen. Gratis.' },
        { id: 7, category: 'kurs', title: 'Offener Jugendtreff', time: 'jeden Freitag, 19:00 - 22:00 Uhr', location: 'Bunker, Winkel, Altdorf oder Bunker, Schulanlage Gehren, Flüelen', description: 'Für 12 - 16-jährige. Gratis.' },
        { id: 8, category: 'sport', title: 'Unihockey in Schattdorf', time: 'jeden Samstag, 16:45 – 19:00 Uhr', location: 'Gräwimatt-Turnhalle, Schulhausstrasse 30, Schattdorf', description: 'Für alle. Gratis.' },
        { id: 9, category: 'kultur', title: 'Bundesfeier am 1. August', time: 'Freitag, 1. August, ab 10:00 Uhr', location: 'Zentrum von Altdorf', description: 'Für alle. Gratis.' },
        { id: 10, category: 'kultur', title: 'Altdorfer Fiirabig', time: 'Freitag, 8. August, ab 16:00 Uhr', location: 'Unterlehn, Altdorf', description: 'Für alle. Gratis.' },
        { id: 11, category: 'ausflug', title: 'Ausflug und Besichtigung Alp Hinterfeld mit Picknick', time: 'Mittwoch, 13. August, ca. 09:00 - 15:00 Uhr', location: 'Alp Hinterfeld', description: 'Für SRK-Klient:innen. Gratis. Anmeldung bis am 6. August…' },
        { id: 12, category: 'kultur', title: 'Alpentöne Altdorf 2025', time: '14. - 16. August, ganztätgig', location: 'Altdorf', description: 'Diverse Gratiskonzerte und Programm.' },
        { id: 13, category: 'ausflug', title: 'Leichte Wanderung: Erstfeld Wilerli - Oberwiler - Zieriberg - Erstfeld', time: 'Sonntag, 17. August', location: 'Erstfeld', description: 'SRK-Klient:innen. 5 CHF. Anmeldung per Whatsapp…' },
        { id: 14, category: 'ausflug', title: 'Schwere Wanderung: Erstfeld Wilerli - Waldnacht - Angistock - Brüsti', time: 'Sonntag, 17. August', location: 'Erstfeld', description: 'SRK-Klient:innen. 5 CHF. Anmeldung per Whatsapp…' },
        { id: 15, category: 'beratung', title: 'Offene Rechtsberatung', time: 'Dienstag, 18. August, 14:00 - 16:00 Uhr', location: 'Caritas Schweiz, Luzern', description: 'Für alle.' },
        { id: 16, category: 'kultur', title: 'Gschichtästund mit Gabriela', time: 'Mittwoch, 27. August, 14:15 - 14:45 Uhr', location: 'Kantonsbibliothek Uri', description: 'Für Kinder 1–4 Jahre. Gratis.' },
        { id: 17, category: 'kultur', title: 'Offener Brennpunkt', time: 'Samstag, 30. August, 19:30 – 23:00 Uhr', location: 'Brennpunkt Uri, Schattdorf', description: 'Für alle.' }
      ],
      'June 2025': [
        { id: 100, category: 'kultur', title: 'Urner Flüchtlingstag 2025', time: 'Samstag, 21. Juni, 12:00 – 22:00 Uhr', location: 'Unterlehn, 6460 Altdorf UR', description: 'Streetfood, Live-Musik, Podiumsdiskussion. (Quelle: uri.ch)' }
      ],
      'September 2025': [
        { id: 3001, category: 'kultur', title: 'Kinderfest Papilio – Musik | Spiel | Spass', time: 'Samstag, 6. September, 10:00 – 16:00 Uhr', location: 'Suworowplatz, 6460 Altdorf', description: 'Familienfest mit Musik, Spielen und Spass für Kinder. (Quelle: Gemeinde Altdorf) ' },
        { id: 3002, category: 'kultur', title: 'Türmli – ein bisschen Bichsel (Märchentheater)', time: 'Samstag, 13. September, 10:00 – 11:00 Uhr', location: 'Kantonsbibliothek Uri, Bahnhofstrasse 13, Altdorf', description: 'Märchentheater für Kinder in der Kantonsbibliothek Uri. (Quelle: Gemeinde Altdorf) ' },
        { id: 3003, category: 'umwelt', title: 'Klimaanlass – «Üs mängisch würks miär»', time: 'Mittwoch, 17. September, 19:00 – 21:00 Uhr', location: 'Altdorf', description: 'Klimaanlass der Gemeinde Altdorf. (Quelle: Gemeinde Altdorf) ' },
        { id: 3004, category: 'kultur', title: 'Malä & Mampfä – Workshop', time: 'Mittwoch, 17. September, 12:30 – 15:30 Uhr', location: 'Mundart Café, Gotthardstrasse 109, 6490 Andermatt', description: 'Workshop im Mundart Café Andermatt. (Quelle: UriAgenda) ' },
        { id: 3005, category: 'musik', title: 'TriffAltdorf – Offenes Singen', time: 'Freitag, 26. September, 19:00 – 21:00 Uhr', location: 'TriffAltdorf, Dätwylerstrasse 15, 6460 Altdorf', description: 'Gemeinsames Singen, offen für alle. (Quelle: UriAgenda) ' },
        { id: 3006, category: 'kultur', title: 'Lettering Workshop', time: 'Freitag, 26. September, 18:30 – 21:00 Uhr', location: 'Mundart Café, Gotthardstrasse 109, 6490 Andermatt', description: 'Handlettering-Workshop im Mundart Café. (Quelle: UriAgenda) ' },
        { id: 3007, category: 'kultur', title: 'Flüeler Chilbi', time: 'Samstag, 27. September, ganztägig', location: 'Dorfkern Flüelen', description: 'Traditionelle Chilbi mit Markt und Unterhaltung. (Quelle: Gemeinde Flüelen) ' },
        { id: 3008, category: 'natur', title: 'Wald-Nachmittag Hospental', time: 'Freitag, 5. September, 13:00 – 17:00 Uhr', location: '6493 Hospental', description: 'Natur- und Waldnachmittag, offen für alle. (Quelle: UriAgenda) ' }
      ],
      'October 2025': [
        { id: 3101, category: 'natur', title: 'Wald-Nachmittag Hospental', time: 'Montag, 20. Oktober, 13:00 – 17:00 Uhr', location: '6493 Hospental', description: 'Natur- und Waldnachmittag, offen für alle. (Quelle: UriAgenda) ' },
        { id: 3102, category: 'musik', title: 'TriffAltdorf – Offenes Singen', time: 'Freitag, 31. Oktober, 19:00 – 21:00 Uhr', location: 'TriffAltdorf, Dätwylerstrasse 15, 6460 Altdorf', description: 'Gemeinsames Singen, offen für alle. (Quelle: UriAgenda) ' }
      ],
      'December 2025': [
        { id: 202, category: 'kultur', title: 'Kreativ-Treff (Haus für Kunst Uri)', time: 'Freitag, 5. Dezember, 14:00 – 16:45 Uhr', location: 'Haus für Kunst Uri', description: 'Offenes Kreativangebot. (Quelle: uri.ch)' },
        { id: 4001, category: 'beratung', title: 'Landratssession 10. Dezember 2025', time: 'Mittwoch, 10. Dezember', location: '', description: 'Politische Sitzung.' },
        { id: 4002, category: 'beratung', title: 'Session des Urner Landrats', time: 'Mittwoch, 10. Dezember', location: 'Rathaus', description: 'Organisator: Zurfluh Org' },
        { id: 4003, category: 'beratung', title: 'Unterlagen für eine der nächsten Sessionen', time: 'Donnerstag, 11. Dezember', location: '', description: 'Noch nicht definitiv einer Session zugewiesen.' },
        { id: 4004, category: 'beratung', title: 'Trauercafé', time: 'Montag, 15. Dezember', location: 'Haus für Kunst Uri', description: 'Organisator: Gesundheitsförderung Uri' }
      ],
      'February 2026': [
        { id: 5001, category: 'beratung', title: 'Session des Urner Landrats', time: 'Mittwoch, 4. Februar', location: 'Rathaus', description: 'Organisator: Zurfluh Org' },
        { id: 5002, category: 'beratung', title: 'Landratssession 4. Februar 2026', time: 'Mittwoch, 4. Februar', location: '', description: '' }
      ],
      'March 2026': [
        { id: 5003, category: 'beratung', title: 'Eidgenössische und kantonale Abstimmungen', time: 'Sonntag, 8. März', location: 'Gemeinde', description: 'Die Abstimmungen werden in den Gemeinden durchgeführt. Wie wird der Stimmzettel richtig ausgefüllt?' },
        { id: 5004, category: 'beratung', title: 'Session des Urner Landrats', time: 'Mittwoch, 18. März', location: 'Rathaus', description: 'Organisator: Zurfluh Org' },
        { id: 5005, category: 'beratung', title: 'Landratssession 18. März 2026', time: 'Mittwoch, 18. März', location: '', description: '' }
      ],
      'April 2026': [
        { id: 5006, category: 'beratung', title: 'Session des Urner Landrats', time: 'Mittwoch, 22. April', location: 'Rathaus', description: 'Organisator: Zurfluh Org' },
        { id: 5007, category: 'beratung', title: 'Landratssession 22. April 2026', time: 'Mittwoch, 22. April', location: '', description: '' }
      ],
      'May 2026': [
        { id: 5008, category: 'beratung', title: 'Session des Urner Landrats', time: 'Mittwoch, 27. Mai', location: 'Rathaus', description: 'Organisator: Zurfluh Org' },
        { id: 5009, category: 'beratung', title: 'Landratssession 27. Mai 2026', time: 'Mittwoch, 27. Mai', location: '', description: '' }
      ],
      'June 2026': [
        { id: 5010, category: 'beratung', title: 'Eidgenössische und kantonale Abstimmungen', time: 'Sonntag, 14. Juni', location: 'Gemeinde', description: 'Die Abstimmungen werden in den Gemeinden durchgeführt.' },
        { id: 5011, category: 'beratung', title: 'Session des Urner Landrats', time: 'Mittwoch, 24. Juni', location: 'Rathaus', description: 'Organisator: Zurfluh Org' },
        { id: 5012, category: 'beratung', title: 'Landratssession 24. Juni 2026', time: 'Mittwoch, 24. Juni', location: '', description: '' }
      ],
      'August 2026': [
        { id: 5013, category: 'beratung', title: 'Session des Urner Landrats', time: 'Mittwoch, 26. August', location: 'Rathaus', description: 'Organisator: Zurfluh Org' },
        { id: 5014, category: 'beratung', title: 'Landratssession 26. August 2026', time: 'Mittwoch, 26. August', location: '', description: '' }
      ],
      'September 2026': [
        { id: 5015, category: 'beratung', title: 'Eidgenössische und kantonale Abstimmungen', time: 'Sonntag, 27. September', location: 'Gemeinde', description: 'Die Abstimmungen werden in den Gemeinden durchgeführt.' },
        { id: 5016, category: 'beratung', title: 'Session des Urner Landrats', time: 'Mittwoch, 30. September', location: 'Rathaus', description: 'Organisator: Zurfluh Org' },
        { id: 5017, category: 'beratung', title: 'Landratssession 30. September 2026', time: 'Mittwoch, 30. September', location: '', description: '' }
      ],
      'November 2026': [
        { id: 5018, category: 'beratung', title: 'Session des Urner Landrats', time: 'Mittwoch, 11. November', location: 'Rathaus', description: 'Organisator: Zurfluh Org' },
        { id: 5019, category: 'beratung', title: 'Landratssession 11. November 2026', time: 'Mittwoch, 11. November', location: '', description: '' },
        { id: 5020, category: 'beratung', title: 'Eidgenössische und kantonale Abstimmungen', time: 'Sonntag, 29. November', location: 'Gemeinde', description: 'Die Abstimmungen werden in den Gemeinden durchgeführt.' }
      ],
      'December 2026': [
        { id: 5021, category: 'beratung', title: 'Session des Urner Landrats', time: 'Mittwoch, 16. Dezember', location: 'Rathaus', description: 'Organisator: Zurfluh Org' },
        { id: 5022, category: 'beratung', title: 'Landratssession 16. Dezember 2026', time: 'Mittwoch, 16. Dezember', location: '', description: '' }
      ]
    })

    // Helpers
    const monthKeyFromDate = (d) => {
      const monthsDe = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
      const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const y = d.getFullYear()
      const de = monthsDe[d.getMonth()] + ' ' + y
      const en = monthsEn[d.getMonth()] + ' ' + y
      if (eventsByMonth.value[de]) return de
      if (eventsByMonth.value[en]) return en
      return de
    }

    const parseDateFromKeyAndTime = (monthKey, timeStr) => {
      if (!monthKey || !timeStr) return null
      const map = {
        januar: 1, februar: 2, märz: 3, maerz: 3, april: 4, mai: 5, juni: 6, juli: 7,
        august: 8, september: 9, oktober: 10, november: 11, dezember: 12,
        january: 1, february: 2, march: 3, april_en: 4, may: 5, june: 6, july: 7,
        august_en: 8, september_en: 9, october: 10, november_en: 11, december: 12
      }
      const yearMatch = monthKey.match(/(20\d{2})/)
      if (!yearMatch) return null
      const year = parseInt(yearMatch[1], 10)
      const token = monthKey.split(/\s+/)[0].toLowerCase()
      let month = null
      const tokenNorm = token.normalize('NFD').replace(/\p{Diacritic}/gu, '')
      const candidates = [token, tokenNorm]
      for (const t of candidates) {
        if (map[t] != null) { month = map[t]; break }
        if (t === 'april') { month = 4; break }
        if (t === 'august') { month = 8; break }
        if (t === 'september') { month = 9; break }
        if (t === 'november') { month = 11; break }
      }
      if (!month) return null
      // Try to extract a day; use day 01 as fallback if not specified.
      const dayMatch = timeStr.match(/(\d{1,2})\./) || timeStr.match(/\b(\d{1,2})\b/)
      const day = dayMatch ? parseInt(dayMatch[1], 10) : 1
      const mm = String(month).padStart(2, '0')
      const dd = String(day).padStart(2, '0')
      return `${year}-${mm}-${dd}`
    }

    // Build calendar event array from grouped data
    const buildCalendarEvents = () => {
      const out = []
      Object.entries(eventsByMonth.value).forEach(([monthKey, list]) => {
        list.forEach(ev => {
          const iso = parseDateFromKeyAndTime(monthKey, ev.time)
          if (iso) out.push({ id: String(ev.id), title: ev.title, start: iso, extendedProps: { monthKey, ev } })
        })
      })
      return out
    }

    // Calendar init
    onMounted(() => {
      const el = calendarEl.value
      if (!el) {
        console.error('[FullCalendar] calendarEl is null!')
        return
      }

      // Wait for FullCalendar to load
      const waitForFC = () => {
        if (window.FullCalendar) {
          initCalendar()
        } else {
          setTimeout(waitForFC, 100)
        }
      }

      const initCalendar = () => {
        try {
          calendar = new window.FullCalendar.Calendar(el, {
            initialView: 'dayGridMonth',
            height: 'auto',
            locale: 'de',
            firstDay: 1,
            headerToolbar: {
              left: 'title',
              center: '',
              right: 'prev,next'
            },
            eventClassNames: (arg) => {
              const cat = arg.event.extendedProps?.ev?.category || 'kultur'
              return ['cat-' + cat]
            },
            dayCellDidMount: (arg) => {
              if (arg.date) {
                arg.el.setAttribute('data-date', arg.date.toISOString().slice(0, 10))
              }
            },
            events: buildCalendarEvents(),
            eventClick: (info) => {
              const eventData = info.event.extendedProps.ev
              selectedEvent.value = eventData
              selectedDate.value = info.event.startStr
              highlightSelectedDate()
            },
            dateClick: handleDateClick
          })

          calendar.render()
          highlightSelectedDate()
          console.log('[FullCalendar] Calendar initialized')
        } catch (err) {
          console.error('[FullCalendar] Init error:', err)
        }
      }

      waitForFC()
    })

    onBeforeUnmount(() => { if (calendar) calendar.destroy() })

    // Filters & interactions
    const toggleFullscreen = () => {
      isFullscreen.value = !isFullscreen.value
      document.body.style.overflow = isFullscreen.value ? 'hidden' : ''
    }
    const toggleEventDetails = (date) => { expandedDate.value = (expandedDate.value === date ? null : date) }
    const selectCategory = (id) => { selectedCategory.value = id }
    const clearDateFilter = () => { selectedDate.value = null }

    const scrollListIntoView = () => {
      const el = document.getElementById('events-list')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const highlightSelectedDate = () => {
      const cells = document.querySelectorAll('.fc-daygrid-day[data-date]')
      cells.forEach((c) => c.classList.remove('fc-day-selected'))
      if (!selectedDate.value) return
      const sel = document.querySelector(`.fc-daygrid-day[data-date="${selectedDate.value}"]`)
      if (sel) sel.classList.add('fc-day-selected')
    }

    const handleDateClick = (info) => {
      selectedDate.value = info.dateStr
      const d = new Date(info.dateStr)
      expandedDate.value = monthKeyFromDate(d)
      highlightSelectedDate()
      scrollListIntoView()
    }
    const handleEventClick = (info) => {
      const start = info.event.start
      if (start) {
        selectedDate.value = start.toISOString().slice(0, 10)
        expandedDate.value = monthKeyFromDate(start)
        highlightSelectedDate()
        scrollListIntoView()
      }
    }

    const focusCalendarEvent = (id) => {
      if (!calendar) return
      const ev = calendar.getEventById(String(id))
      if (ev && ev.start) {
        calendar.gotoDate(ev.start)
        selectedDate.value = ev.start.toISOString().slice(0, 10)
        highlightSelectedDate()
      }
    }

    // Add new methods
    const filterByCategory = (categoryId) => {
      selectedCategory.value = categoryId
      if (calendar) {
        calendar.getEvents().forEach(event => {
          const cat = event.extendedProps?.ev?.category
          if (categoryId === 'all' || cat === categoryId) {
            event.setProp('display', 'auto')
          } else {
            event.setProp('display', 'none')
          }
        })
      }
    }

    const registerForEvent = (event) => {
      // TODO: Implement registration logic
      console.log('Register for event:', event)
    }

    // New helper methods
    const getEventMapLink = (location) => {
      if (!location) return '#'
      const query = encodeURIComponent(location)
      return `https://www.google.com/maps/search/?api=1&query=${query}`
    }

    const addToCalendar = (event) => {
      const dateStr = parseDateFromKeyAndTime(event.monthKey || 'August 2025', event.time)
      if (!dateStr) return

      const title = encodeURIComponent(event.title)
      const details = encodeURIComponent(event.description)
      const location = encodeURIComponent(event.location || '')
      const date = new Date(dateStr)

      // Create Google Calendar link
      const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${date.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${date.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`

      window.open(googleUrl, '_blank')
    }

    // Derived (computed-like) structures
    const filteredEventsByCategory = () => {
      if (selectedCategory.value === 'all') return eventsByMonth.value
      const filtered = {}
      Object.entries(eventsByMonth.value).forEach(([date, list]) => {
        const f = list.filter(e => e.category === selectedCategory.value)
        if (f.length) filtered[date] = f
      })
      return filtered
    }

    const filteredEventsByCategoryAndDate = () => {
      const base = filteredEventsByCategory()
      if (!selectedDate.value) return base
      const target = new Date(selectedDate.value)
      const yyyy = target.getFullYear()
      const mm = target.getMonth() + 1
      const dd = target.getDate()
      const filtered = {}
      Object.entries(base).forEach(([monthKey, list]) => {
        const f = list.filter(ev => {
          const iso = parseDateFromKeyAndTime(monthKey, ev.time)
          if (!iso) return false
          const d = new Date(iso)
          return d.getFullYear() === yyyy && (d.getMonth() + 1) === mm && d.getDate() === dd
        })
        if (f.length) filtered[monthKey] = f
      })
      return filtered
    }

    const selectedDateEvents = () => {
      if (!selectedDate.value) return []
      const result = []
      Object.entries(eventsByMonth.value).forEach(([monthKey, list]) => {
        list.forEach((ev) => {
          const iso = parseDateFromKeyAndTime(monthKey, ev.time)
          if (iso === selectedDate.value) result.push(ev)
        })
      })
      return result
    }

    return {
      // Refs
      calendarEl,
      isFullscreen,
      expandedDate,
      selectedCategory,
      selectedDate,
      selectedEvent,
      categories,
      // Data groups
      eventsByMonth,
      // Methods
      toggleFullscreen,
      toggleEventDetails,
      selectCategory,
      clearDateFilter,
      handleDateClick,
      handleEventClick,
      filterByCategory,
      registerForEvent,
      getEventMapLink,
      addToCalendar,
      // Derived
      filteredEventsByCategoryAndDate,
      selectedDateEvents,
      focusCalendarEvent
    }
  }
}
</script>

<style>
/* Make sure calendar container is visible while loading */
.fc-container {
  width: 100%;
  min-height: 500px;
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* FullCalendar tweaks to fit your design system */
.fc .fc-toolbar-title {
  font-family: var(--font-primary);
  font-size: 1.25rem;
}

.fc .fc-button {
  border-radius: 0.5rem;
  border: 2px solid var(--cyan-700);
  background: var(--cyan-700);
  color: #fff;
}

.fc .fc-button:hover {
  background: var(--blue-600);
  border-color: var(--blue-600);
}

.fc .fc-daygrid-day-number {
  font-family: var(--font-secondary);
}

/* Ensure the host div can expand */
.events-view .fc-container {
  display: block;
  min-height: 480px;
}

/* Update FullCalendar styles */
.fc {
  /* Force calendar to be visible */
  display: block !important;
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.fc-container {
  min-height: 500px !important;
  margin-bottom: 2rem;
}

/* Detail panel under calendar */
.event-detail-panel {
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, .08);
  padding: 1rem;
  margin-bottom: 2rem;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, .06);
  padding-bottom: .5rem;
  margin-bottom: 1rem;
}

.panel-title {
  font-family: var(--font-primary);
  font-size: 1.125rem;
  color: var(--gray-900);
}

.panel-list {
  display: grid;
  gap: 0.75rem;
}

.panel-item {
  background: var(--blue-100);
  border: 1px solid rgba(10, 88, 202, .12);
  border-radius: .75rem;
  padding: .75rem 1rem;
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease;
}

.panel-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(10, 88, 202, .12);
}

.item-head {
  display: flex;
  align-items: center;
  gap: .5rem;
  margin-bottom: .25rem;
}

.item-title {
  font-family: var(--font-secondary);
  font-weight: 600;
  font-size: 1rem;
  color: #053a63;
}

.item-meta {
  font-size: .875rem;
  color: var(--gray-700);
  margin: .125rem 0;
}

.item-desc {
  font-size: .9rem;
  color: var(--gray-900);
  opacity: .9;
}

/* Category badges */
.badge {
  display: inline-flex;
  align-items: center;
  gap: .25rem;
  padding: .125rem .5rem;
  border-radius: 9999px;
  font-size: .75rem;
  font-weight: 600;
  background: rgba(8, 121, 144, .1);
  color: var(--cyan-700);
  border: 1px solid rgba(8, 121, 144, .25);
}

.badge-beratung {
  background: rgba(102, 16, 242, .08);
  color: #6610f2;
  border-color: rgba(102, 16, 242, .25);
}

.badge-kultur {
  background: rgba(253, 126, 20, .10);
  color: #c65a0a;
  border-color: rgba(253, 126, 20, .25);
}

.badge-musik {
  background: rgba(13, 110, 253, .10);
  color: #0b5ed7;
  border-color: rgba(13, 110, 253, .25);
}

.badge-sport {
  background: rgba(25, 135, 84, .10);
  color: #1e7e34;
  border-color: rgba(25, 135, 84, .25);
}

.badge-ausflug {
  background: rgba(32, 201, 151, .10);
  color: #0f766e;
  border-color: rgba(32, 201, 151, .25);
}

.badge-kurs {
  background: rgba(255, 193, 7, .15);
  color: #a07800;
  border-color: rgba(255, 193, 7, .3);
}

.badge-schnupper {
  background: rgba(111, 66, 193, .10);
  color: #6f42c1;
  border-color: rgba(111, 66, 193, .25);
}

.badge-sprache {
  background: rgba(8, 121, 144, .10);
  color: #086f90;
  border-color: rgba(8, 121, 144, .25);
}

.badge-umwelt {
  background: rgba(40, 167, 69, .10);
  color: #2d7a43;
  border-color: rgba(40, 167, 69, .25);
}

.badge-natur {
  background: rgba(16, 185, 129, .10);
  color: #0f766e;
  border-color: rgba(16, 185, 129, .25);
}

/* Calendar category tint */
.fc .fc-event.cat-kultur {
  background: rgba(253, 126, 20, .15);
  border-color: rgba(253, 126, 20, .35);
  color: #6b3a09;
}

.fc .fc-event.cat-musik {
  background: rgba(13, 110, 253, .15);
  border-color: rgba(13, 110, 253, .35);
  color: #083b9a;
}

.fc .fc-event.cat-sport {
  background: rgba(25, 135, 84, .15);
  border-color: rgba(25, 135, 84, .35);
  color: #145c32;
}

.fc .fc-event.cat-ausflug {
  background: rgba(32, 201, 151, .15);
  border-color: rgba(32, 201, 151, .35);
  color: #0f5f56;
}

.fc .fc-event.cat-kurs {
  background: rgba(255, 193, 7, .18);
  border-color: rgba(255, 193, 7, .4);
  color: #7a5b00;
}

.fc .fc-event.cat-schnupper {
  background: rgba(111, 66, 193, .15);
  border-color: rgba(111, 66, 193, .35);
  color: #3f2a7a;
}

.fc .fc-event.cat-sprache {
  background: rgba(8, 121, 144, .15);
  border-color: rgba(8, 121, 144, .35);
  color: #08485a;
}

.fc .fc-event.cat-beratung {
  background: rgba(102, 16, 242, .15);
  border-color: rgba(102, 16, 242, .35);
  color: #3d0ca8;
}

.fc .fc-event.cat-umwelt {
  background: rgba(40, 167, 69, .15);
  border-color: rgba(40, 167, 69, .35);
  color: #1f7a3a;
}

.fc .fc-event.cat-natur {
  background: rgba(16, 185, 129, .15);
  border-color: rgba(16, 185, 129, .35);
  color: #0b5d4d;
}

/* Selected day highlight */
.fc-daygrid-day.fc-day-selected {
  outline: 3px solid rgba(8, 121, 144, .35);
  outline-offset: -3px;
}

.event-detail-panel {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.filter-btn {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  background: white;
  border: 2px solid var(--cyan-700);
  color: var(--cyan-700);
  transition: all 0.2s ease;
}

.filter-btn-active {
  background: var(--cyan-700);
  color: white;
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--cyan-700);
  color: var(--cyan-700);
}

.btn-outline:hover {
  background: var(--cyan-700);
  color: white;
}

.btn-primary {
  background: var(--cyan-700);
  color: white;
  border: 2px solid var(--cyan-700);
}

.btn-primary:hover {
  background: var(--cyan-600);
  border-color: var(--cyan-600);
  transform: translateY(-1px);
}

/* Make event titles black */
.fc-event-title {
  color: black !important;
  /* Override any other color settings */
  font-weight: 500;
}
</style>