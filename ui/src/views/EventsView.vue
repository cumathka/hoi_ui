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

          <!-- Categories -->
          <div class="flex flex-wrap gap-2 mb-6">
            <button v-for="category in categories" :key="category.id" @click="selectCategory(category.id)" :class="[
              'btn',
              'px-4 py-2',
              selectedCategory === category.id ? 'selected-btn' : ''
            ]" style="border-radius:9999px;">
              {{ category.name }}
            </button>
          </div>

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

    // Source data grouped by month headings
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
        { id: 11, category: 'ausflug', title: 'Ausflug und Besichtigung Alp Hinterfeld mit Picknick', time: 'Mittwoch, 13. August, ca. 09:00 - 15:00 Uhr', location: 'Alp Hinterfeld', description: 'Für SRK Klient:innen. Gratis. Anmeldung bis am 6. August…' },
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
        { id: 200, category: 'kultur', title: 'Kreativ-Treff (Haus für Kunst Uri)', time: 'Freitag, 26. September, 14:00 – 16:45 Uhr', location: 'Haus für Kunst Uri', description: 'Offenes Kreativangebot mit SRK Uri. Kostenlos. (Quelle: uri.ch)' }
      ],
      'October 2025': [
        { id: 201, category: 'kultur', title: 'Kreativ-Treff (Haus für Kunst Uri)', time: 'Freitag, 24. Oktober, 14:00 – 16:45 Uhr', location: 'Haus für Kunst Uri', description: 'Offenes Kreativangebot. (Quelle: uri.ch)' }
      ],
      'December 2025': [
        { id: 202, category: 'kultur', title: 'Kreativ-Treff (Haus für Kunst Uri)', time: 'Freitag, 5. Dezember, 14:00 – 16:45 Uhr', location: 'Haus für Kunst Uri', description: 'Offenes Kreativangebot. (Quelle: uri.ch)' }
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
            events: buildCalendarEvents(),
            eventClick: handleEventClick,
            dateClick: handleDateClick
          })

          calendar.render()
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
    const handleDateClick = (info) => {
      selectedDate.value = info.dateStr
      const d = new Date(info.dateStr)
      expandedDate.value = monthKeyFromDate(d)
    }
    const handleEventClick = (info) => {
      const start = info.event.start
      if (start) {
        selectedDate.value = start.toISOString().slice(0, 10)
        expandedDate.value = monthKeyFromDate(start)
      }
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

    return {
      // Refs
      calendarEl,
      isFullscreen,
      expandedDate,
      selectedCategory,
      selectedDate,
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
      // Derived
      filteredEventsByCategoryAndDate
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
</style>