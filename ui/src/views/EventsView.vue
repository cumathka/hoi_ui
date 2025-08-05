<template>
  <div class="events-view relative w-full min-h-screen">
    <!-- Hero Görsel ve Overlay -->
    <div class="relative w-full overflow-hidden">
      <img 
        src="@/assets/images/events.png"
        @click="toggleFullscreen"
        :class="isFullscreen 
          ? 'fixed inset-0 w-screen h-screen object-contain z-[1000] bg-black/90 cursor-zoom-out p-5 box-border transition-all duration-300'
          : 'w-full h-auto cursor-pointer transition-all duration-300'"
        alt="Events"
      />
      <!-- Hero Overlay -->
      <div class="hero-overlay-small">
        <div class="flex items-center justify-center gap-4">
          <img src="@/assets/images/logo1.png" alt="Uri Flag" class="h-20 w-auto m-0 shadow-md pointer-events-auto object-contain" />
          <h1 class="text-white m-0 drop-shadow-lg">Integrationsevents</h1>
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

    <!-- Sayfa İçeriği -->
    <div class="container">
      <div class="py-10">
        <header class="mb-8">
          <h1 class="text-h3 text-orange-600 mb-4">Netzwerken und Gemeinschaft erleben</h1>
        </header>

        <section class="content-section">
          <p class="body-lead mb-4">
            Veranstaltungen sind eine wunderbare Möglichkeit, neue Menschen kennenzulernen und sich in der Gemeinschaft zu integrieren.
            Auf dieser Seite finden Sie eine Übersicht über Networking-Events, Career Cafés und Tandem-Programme in Uri.
            Diese Veranstaltungen bieten Ihnen die Gelegenheit, Kontakte zu knüpfen, Erfahrungen auszutauschen und sich in einem
            unterstützenden Umfeld weiterzuentwickeln. Kommen Sie vorbei und werden Sie Teil unserer lebendigen Gemeinschaft!
          </p>

          <!-- Event Kategorileri -->
          <div class="flex flex-wrap gap-2 mb-6">
            <button 
              v-for="category in categories" 
              :key="category.id"
              @click="selectCategory(category.id)"
              :class="[
                'btn',
                'px-4 py-2',
                selectedCategory === category.id
                  ? 'selected-btn'
                  : ''
              ]"
              style="border-radius:9999px;"
            >
              {{ category.name }}
            </button>
          </div>

          <!-- Event Listesi -->
          <div class="mt-4 rounded-lg shadow">
            <div v-for="(events, date) in filteredEventsByCategory" :key="date" class="mb-4 border border-gray-100 rounded-lg overflow-hidden">
              <div 
                class="flex justify-between items-center px-6 py-4 bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
                @click="toggleEventDetails(date)"
              >
                <h3 class="text-h5 text-cyan-700">{{ date }}</h3>
                <span :class="['transition-transform', expandedDate === date ? 'rotate-180' : '']">▼</span>
              </div>
              <div v-if="expandedDate === date" class="px-6 py-4 bg-white">
                <div v-for="event in events" :key="event.id" class="mb-6 last:mb-0 bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h4 class="text-h5 text-cyan-700 mb-1">{{ event.title }}</h4>
                  <p class="body-small text-gray-600 mb-1">{{ event.time }}</p>
                  <p class="body-small text-gray-700 mb-1">📍 {{ event.location }}</p>
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
export default {
  name: 'EventsView',
  data() {
    return {
      isFullscreen: false,
      expandedDate: null,
      selectedCategory: 'all',
      categories: [
        { id: 'all', name: 'Alle Events' },
        { id: 'beruf', name: 'Berufsmesse' },
        { id: 'sprache', name: 'Sprachcafé' },
        { id: 'kurs', name: 'Konversationskurse' },
        { id: 'schnupper', name: 'Schnuppertage' },
        { id: 'sport', name: 'Sportevents' }
      ],
      events: {
        'April 2025': [
          {
            id: 1,
            category: 'beruf',
            title: 'Berufsmesse Uri 2025',
            time: '09:00 - 17:00',
            location: 'Messe Uri, Altdorf',
            description: 'Grosse Berufsmesse mit Ausbildungsmöglichkeiten und Karrierechancen.'
          }
        ],
        'Mai 2025': [
          {
            id: 2,
            category: 'sprache',
            title: 'Internationales Sprachcafé',
            time: '14:00 - 16:00',
            location: 'Kulturhaus Uri, Altdorf',
            description: 'Sprachenaustausch in entspannter Atmosphäre.'
          }
        ],
        'Juni 2025': [
          {
            id: 3,
            category: 'kurs',
            title: 'Deutsch Konversationskurs A2/B1',
            time: '18:00 - 19:30',
            location: 'VHS Uri',
            description: 'Praktischer Konversationskurs für Fortgeschrittene.'
          }
        ],
        'Juli 2025': [
          {
            id: 4,
            category: 'schnupper',
            title: 'Schnuppertag Gesundheitsberufe',
            time: '09:00 - 15:00',
            location: 'Kantonsspital Uri',
            description: 'Einblick in verschiedene Gesundheitsberufe.'
          }
        ],
        'August 2025': [
          {
            id: 5,
            category: 'sport',
            title: 'Internationales Fussballturnier',
            time: '13:00 - 18:00',
            location: 'Sportanlage Schützenmatte',
            description: 'Freundschaftsturnier mit Teams aus der Region.'
          }
        ]
      }
    }
  },
  computed: {
    filteredEventsByCategory() {
      if (this.selectedCategory === 'all') {
        return this.events;
      }
      const filtered = {};
      Object.entries(this.events).forEach(([date, eventsList]) => {
        const filteredEvents = eventsList.filter(event => event.category === this.selectedCategory);
        if (filteredEvents.length > 0) {
          filtered[date] = filteredEvents;
        }
      });
      return filtered;
    }
  },
  methods: {
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      document.body.style.overflow = this.isFullscreen ? 'hidden' : '';
    },
    toggleEventDetails(date) {
      this.expandedDate = this.expandedDate === date ? null : date;
    },
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
    }
  }
}
</script>
