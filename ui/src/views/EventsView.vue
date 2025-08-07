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
        { id: 'kurs', name: 'Kurse & Jugendtreff' },
        { id: 'schnupper', name: 'Schnuppertage' },
        { id: 'sport', name: 'Sportevents' },
        { id: 'kultur', name: 'Kulturelles' },
        { id: 'ausflug', name: 'Ausflüge & Wanderungen' },
        { id: 'beratung', name: 'Beratung' }
      ],
      events: {
        'August 2025': [
          {
            id: 1,
            category: 'kurs',
            title: 'treffpunkt26 Wiedereröffnung',
            time: 'ab 11. August',
            location: 'Hagenstr. 26, Altdorf',
            description: 'Der treffpunkt26 hat ab dem Montag, 11. August 2025, wieder geöffnet.'
          },
          {
            id: 2,
            category: 'sport',
            title: 'Yoga mit Olena',
            time: 'jeden Dienstag, 18:00 Uhr',
            location: 'Zentrum Sternen, Axenstr. 6, 6454 Flüelen',
            description: 'Für alle. 10 Franken pro 4 Yogalektionen.'
          },
          {
            id: 3,
            category: 'sport',
            title: 'Fussball',
            time: 'jeden Mittwoch, 15:00 - 16:30 Uhr',
            location: 'Turnhalle Hagenschulhaus, Bahnhofstrasse 36, Altdorf',
            description: 'Für SRK Klient:innen. Gratis.'
          },
          {
            id: 4,
            category: 'kurs',
            title: 'Offener Jugendtreff',
            time: 'jeden Mittwoch, 14:00 - 16:30 Uhr',
            location: 'Bunker, Winkel, Altdorf oder Bunker, Schulanlage Gehren, Flüelen',
            description: 'Für 12 - 16-jährige. Gratis.'
          },
          {
            id: 5,
            category: 'sport',
            title: 'Pilates mit Sevim',
            time: 'jeden Mittwoch und Donnerstag, 17:30 – 18:30 Uhr',
            location: 'Zentrum Sternen, Axenstr. 6, 6454 Flüelen',
            description: 'Für SRK-Klient:innen. Gratis. Mitbringen: Yogamatte oder Badetuch und Wasser.'
          },
          {
            id: 6,
            category: 'sport',
            title: 'Tischtennis-Kurs',
            time: 'jeden Freitag, 15:00 - 17:00 Uhr',
            location: 'Zentrum Sternen, Axenstr. 6, Flüelen',
            description: 'Für SRK Klient:innen. Gratis.'
          },
          {
            id: 7,
            category: 'kurs',
            title: 'Offener Jugendtreff',
            time: 'jeden Freitag, 19:00 - 22:00 Uhr',
            location: 'Bunker, Winkel, Altdorf oder Bunker, Schulanlage Gehren, Flüelen',
            description: 'Für 12 - 16-jährige. Gratis.'
          },
          {
            id: 8,
            category: 'sport',
            title: 'Unihockey in Schattdorf',
            time: 'jeden Samstag, 16:45 – 19:00 Uhr',
            location: 'Gräwimatt-Turnhalle, Schulhausstrasse 30, Schattdorf',
            description: 'Für alle. Gratis.'
          },
          {
            id: 9,
            category: 'kultur',
            title: 'Bundesfeier am 1. August',
            time: 'Freitag, 1. August, ab 10:00 Uhr',
            location: 'Zentrum von Altdorf',
            description: 'Für alle. Gratis.'
          },
          {
            id: 10,
            category: 'kultur',
            title: 'Altdorfer Fiirabig',
            time: 'Freitag, 8. August, ab 16:00 Uhr',
            location: 'Unterlehn, Altdorf',
            description: 'Für alle. Gratis.'
          },
          {
            id: 11,
            category: 'ausflug',
            title: 'Ausflug und Besichtigung Alp Hinterfeld mit Picknick',
            time: 'Mittwoch, 13. August, ca. 09:00 - 15:00 Uhr',
            location: 'Alp Hinterfeld',
            description: 'Für SRK Klient:innen. Gratis. Anmeldung bis am 6. August bei Rahel Feiler: rahel.feiler@redcross.ch. Die Teilnehmendenzahl ist beschränkt. Weitere Informationen nach Anmeldung.'
          },
          {
            id: 12,
            category: 'kultur',
            title: 'Alpentöne Altdorf 2025',
            time: '14. - 16. August, ganztätgig',
            location: 'Altdorf',
            description: 'Es gibt an diversen Orten Gratiskonzerte auf dem Lehn, im Garten der Musikschule, der Klangspaziergang und die Ausstellung zu KI & Volksmusik. Alle farbig markierten Veranstaltungen sind gratis.'
          },
          {
            id: 13,
            category: 'ausflug',
            title: 'Leichte Wanderung: Erstfeld Wilerli - Oberwiler - Zieriberg - Erstfeld',
            time: 'Sonntag, 17. August',
            location: 'Erstfeld',
            description: 'Für SRK-Klient:innen. 5.00 Franken. Anmeldung per Whatsapp bei Regula Zberg 079 721 73 68. Bitte Name, Vorname und Wohnort angeben sowie ob Sie ein Halbtax haben. Der Treffpunkt und die genaue Zeit werden nach Anmeldung bekannt gegeben.'
          },
          {
            id: 14,
            category: 'ausflug',
            title: 'Schwere Wanderung: Erstfeld Wilerli - Waldnacht - Angistock - Brüsti',
            time: 'Sonntag, 17. August',
            location: 'Erstfeld',
            description: 'Für SRK-Klient:innen. 5.00 Franken. Anmeldung per Whatsapp bei Regula Zberg 079 721 73 68. Bitte Name, Vorname und Wohnort angeben sowie ob Sie ein Halbtax haben. Der Treffpunkt und die genaue Zeit werden nach Anmeldung bekannt gegeben.'
          },
          {
            id: 15,
            category: 'beratung',
            title: 'Offene Rechtsberatung',
            time: 'Dienstag, 18. August, 14:00 - 16:00 Uhr',
            location: 'Caritas Schweiz, Adligenswilstrasse 15, Luzern',
            description: 'Für alle.'
          },
          {
            id: 16,
            category: 'kultur',
            title: 'Gschichtästund mit Gabriela',
            time: 'Mittwoch, 27. August, 14:15 - 14:45 Uhr',
            location: 'Kantonsbibliothek Uri, Bahnhofstrasse 13, Altdorf',
            description: 'Für Kinder von 1 - 4 Jahren in Begleitung einer erwachsenen Person, ältere und jüngere Geschwister sind auch willkommen. Gratis.'
          },
          {
            id: 17,
            category: 'kultur',
            title: 'Offener Brennpunkt',
            time: 'Samstag, 30. August, 19:30 – 23:00 Uhr',
            location: 'Brennpunkt Uri, Umfahrungsstrasse 32, Schattdorf',
            description: 'Für alle.'
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
