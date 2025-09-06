<template>
  <nav class="py-2 shadow-sm bg-blue-100 relative z-30">
    <div class="container">
      <div class="flex items-center justify-between">
        <!-- Logo ve Brand -->
        <router-link to="/" class="flex items-center gap-2">
          <img 
            src="@/assets/images/logoh1.png" 
            alt="Logo" 
            class="w-[70px] h-[70px]"
          >
          <span class="body-lead text-gray-900 opacity-90">Griäzi!</span>
        </router-link>
        
        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-8">
          <ul class="flex items-center gap-6">
            <li>
              <router-link to="/info" class="nav-link">Informationen</router-link>
            </li>
            <li>
              <router-link to="/learning" class="nav-link">Lernen</router-link>
            </li>
            <li>
              <router-link to="/jobs" class="nav-link">Jobs</router-link>
            </li>
            <li>
              <router-link to="/events" class="nav-link">Events</router-link>
            </li>
          </ul>
          
          <!-- Search Form -->
          <form class="relative" @submit.prevent="onSearch">
            <div class="flex">
              <input 
                v-model="search"
                class="search-input" 
                type="search" 
                placeholder="Search" 
                @input="onInput"
                @focus="showResults = true"
                @blur="hideResults"
                autocomplete="off"
              >
              <button class="btn body-regular search-btn" type="submit">
                Search
              </button>
            </div>
            <!-- Search Results -->
            <div
              v-if="showResults && filteredResults.length"
              class="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50"
            >
              <div
                v-for="result in filteredResults"
                :key="result.path"
                @mousedown.prevent="goTo(result)"
                class="px-4 py-2 cursor-pointer hover:bg-blue-50"
              >
                <div class="font-semibold" style="color: var(--cyan-700);">{{ result.title }}</div>
                <div class="text-sm text-gray-500">{{ result.desc }}</div>
              </div>
            </div>
          </form>
        </div>
        
        <!-- Mobile Menu Button (accessible) -->
        <button
          class="lg:hidden btn inline-flex items-center justify-center"
          @click="openMenu"
          @keydown.enter.prevent="openMenu"
          :aria-expanded="menuOpen ? 'true' : 'false'"
          aria-controls="mobile-drawer"
          aria-label="Menü öffnen"
          type="button"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile Drawer + Backdrop -->
      <div class="lg:hidden">
        <!-- Backdrop -->
        <transition name="fade">
          <div
            v-if="menuOpen"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            role="presentation"
            aria-hidden="true"
            @click="closeMenu"
          />
        </transition>

        <!-- Drawer -->
        <transition name="slide">
          <aside
            v-if="menuOpen"
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            class="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white z-50 shadow-xl p-5 flex flex-col"
            @keydown.esc.prevent="closeMenu"
          >
            <div class="flex items-center justify-between mb-4">
              <span class="body-lead text-gray-900 opacity-90">Menü</span>
              <button class="btn py-1 px-3" @click="closeMenu" aria-label="Menü schließen">✕</button>
            </div>

            <nav class="flex-1 overflow-y-auto">
              <ul class="flex flex-col gap-2">
                <li>
                  <router-link
                    to="/info"
                    class="mobile-link"
                    @click.native="closeMenu"
                    ref="firstMobileLink"
                  >Informationen</router-link>
                </li>
                <li>
                  <router-link to="/learning" class="mobile-link" @click.native="closeMenu">Lernen</router-link>
                </li>
                <li>
                  <router-link to="/jobs" class="mobile-link" @click.native="closeMenu">Jobs</router-link>
                </li>
                <li>
                  <router-link to="/events" class="mobile-link" @click.native="closeMenu">Events</router-link>
                </li>
              </ul>
            </nav>

            <!-- Mobile Search -->
            <form class="mt-4 relative" @submit.prevent="onSearch">
              <div class="flex">
                <input 
                  v-model="search"
                  class="search-input flex-1" 
                  type="search" 
                  placeholder="Search" 
                  @input="onInput"
                  @focus="showResults = true"
                  @blur="hideResults"
                  autocomplete="off"
                >
                <button class="btn body-regular" type="submit">Search</button>
              </div>
              <!-- Mobile Search Results -->
              <div
                v-if="showResults && filteredResults.length"
                class="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50"
              >
                <div
                  v-for="result in filteredResults"
                  :key="result.path"
                  @mousedown.prevent="goTo(result)"
                  class="px-4 py-2 cursor-pointer hover:bg-blue-50"
                >
                  <div class="font-semibold" style="color: var(--cyan-700);">{{ result.title }}</div>
                  <div class="text-sm text-gray-500">{{ result.desc }}</div>
                </div>
              </div>
            </form>
          </aside>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheNavbar',
  data() {
    return {
      menuOpen: false,
      search: '',
      showResults: false,
      siteData: [
        { title: 'Informationen', path: '/info', desc: 'Fakten, Statistiken und nützliche Links für Neuankömmlinge in Uri.' },
        { title: 'Lernen', path: '/learning', desc: 'Deutschkurse, Weiterbildungen und Kulturangebote in Uri.' },
        { title: 'Jobs', path: '/jobs', desc: 'Arbeitsmöglichkeiten, Jobportale und Bewerbungstipps.' },
        { title: 'Events', path: '/events', desc: 'Integrationsevents, Networking und Gemeinschaftsveranstaltungen.' }
      ]
      ,
      // Section-level content index for in-page search results
      contentIndex: [
        // INFO PAGE
        { title: 'Info · Erwerbstätigkeit nach sieben Jahren', path: '/info', hash: 'erwerb-7', desc: 'Entwicklung der Erwerbstätigenquote nach sieben Jahren.' , keywords: ['erwerb', 'arbeit', 'quote', 'sieben', 'jahre', 'uri', 'statistik'] },
        { title: 'Info · Erwerbstätigkeit aktuell', path: '/info', hash: 'erwerb-aktuell', desc: 'Aktuelle Erwerbstätigkeit und Zahlen (März 2025).', keywords: ['aktuell', 'märz', '2025', 'erwerbstätigkeit', 'tabelle'] },
        { title: 'Info · Tipps für den Alltag', path: '/info', hash: 'tipps-alltag', desc: 'Praktische Tipps für den Alltag in Uri.', keywords: ['tipps', 'alltag', 'uri', 'integration'] },
        { title: 'Info · Urner Feste und Bräuche', path: '/info', hash: 'feste-braeuche', desc: 'Fasnacht, Samichlaus, Alpaufzug, 1. August.', keywords: ['feste', 'bräuche', 'tradition', 'fasnacht', 'samichlaus', 'alpaufzug'] },
        { title: 'Info · Nützliche Links', path: '/info', hash: 'nuetzliche-links', desc: 'Behörden, Integration Uri, SEM, Familien-Uri.', keywords: ['links', 'behörden', 'sem', 'integration', 'familien', 'uri'] },

        // LEARNING PAGE
        { title: 'Lernen · Deutschkurse', path: '/learning', hash: 'deutschkurse', desc: 'Deutsch üben: Treffpunkt26, Lernatelier Luzern.', keywords: ['deutsch', 'kurse', 'treffpunkt', 'lernatelier'] },
        { title: 'Lernen · Lebenslauf verbessern', path: '/learning', hash: 'lebenslauf', desc: 'CV, Bewerbungscoaching, Vorlagen.', keywords: ['lebenslauf', 'cv', 'bewerbung', 'coaching', 'vorlage'] },
        { title: 'Lernen · Kultur', path: '/learning', hash: 'kultur', desc: 'Schweizer- und Urner Kultur, Museen, Traditionen.', keywords: ['kultur', 'uri', 'tradition', 'museum'] },
        { title: 'Lernen · Weiterbildungen', path: '/learning', hash: 'weiterbildungen', desc: 'BWZ Uri, Kanton Uri, SRK Uri Kurse.', keywords: ['weiterbildung', 'bwz', 'srk', 'kurse'] },

        // JOBS PAGE
        { title: 'Jobs · Job-Room', path: '/jobs', hash: 'job-room', desc: 'Offizielles Jobportal mit Stellen in Uri.', keywords: ['job', 'jobroom', 'stellen', 'arbeit', 'rav'] },
        { title: 'Jobs · Path2Work', path: '/jobs', hash: 'p2w', desc: 'ETH-Projekt zur Integration in den Arbeitsmarkt.', keywords: ['path2work', 'eth', 'integration', 'arbeitsmarkt'] },
        { title: 'Jobs · arbeit.swiss', path: '/jobs', hash: 'arbeit-swiss', desc: 'SECO-Infos: Anerkennung, Programme.', keywords: ['arbeit.swiss', 'seco', 'anerkennung', 'programme'] },

        // EVENTS PAGE (examples)
        { title: 'Events · Yoga', path: '/events', hash: 'yoga', desc: 'Yoga mit Olena – Zentrum Sternen, Flüelen.', keywords: ['yoga', 'sport', 'sternen', 'flüelen'] },
        { title: 'Events · Fussball', path: '/events', hash: 'fussball', desc: 'Fussball – Hagenschulhaus, Altdorf.', keywords: ['fussball', 'sport', 'hagen', 'altdorf'] },
        { title: 'Events · Wanderungen', path: '/events', hash: 'wanderung', desc: 'SRK Wanderungen in Uri – Anmeldung nötig.', keywords: ['wanderung', 'srk', 'ausflug'] },
        { title: 'Events · Beratung', path: '/events', hash: 'beratung', desc: 'Offene Rechtsberatung – Caritas Luzern.', keywords: ['beratung', 'recht', 'caritas'] },
      ]
    }
  },
  computed: {
    filteredResults() {
      if (!this.search.trim()) return [];
      const q = this.search.trim().toLowerCase();

      // Page-level matches
      const pageHits = this.siteData.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      ).map(i => ({ title: i.title, path: i.path, desc: i.desc }));

      // Section-level matches
      const sectionHits = this.contentIndex.filter(sec =>
        (sec.title && sec.title.toLowerCase().includes(q)) ||
        (sec.desc && sec.desc.toLowerCase().includes(q)) ||
        (Array.isArray(sec.keywords) && sec.keywords.some(k => k.toLowerCase().includes(q)))
      ).map(s => ({ title: s.title, path: s.path, hash: s.hash, desc: s.desc }));

      // Deduplicate by path+hash (hash may be undefined for pageHits)
      const seen = new Set();
      const all = [...sectionHits, ...pageHits].filter(r => {
        const key = r.path + '#' + (r.hash || '');
        if (seen.has(key)) return false; seen.add(key); return true;
      });

      // Limit suggestions for UI neatness
      return all.slice(0, 10);
    }
  },
  methods: {
    openMenu() { this.menuOpen = true },
    closeMenu() { this.menuOpen = false; this.showResults = false },
    toggleMenu() { this.menuOpen ? this.closeMenu() : this.openMenu() },
    onInput() { this.showResults = !!this.search.trim(); },
    hideResults() { setTimeout(() => (this.showResults = false), 150); },
    goTo(pathOrObj) {
      const path = typeof pathOrObj === 'string' ? pathOrObj : pathOrObj.path;
      const hash = typeof pathOrObj === 'object' && pathOrObj.hash ? pathOrObj.hash : '';

      const navigate = () => {
        // Smooth scroll to anchor if present; highlight briefly
        if (hash) {
          const tryFocus = () => {
            const el = document.getElementById(hash);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              // temporary highlight ring
              const prev = el.style.boxShadow;
              el.style.boxShadow = '0 0 0 4px rgba(10,162,192,.35)';
              setTimeout(() => { el.style.boxShadow = prev; }, 2200);
              return true;
            }
            return false;
          };
          // try a few times in case content renders after route change
          let tries = 0;
          const iv = setInterval(() => {
            if (tryFocus() || ++tries > 15) clearInterval(iv);
          }, 120);
        }
      };

      if (hash) {
        this.$router.push({ path, hash: `#${hash}` }).then(() => navigate());
      } else {
        this.$router.push(path).then(() => navigate());
      }

      this.closeMenu();
      this.search = '';
    },
    onSearch() {
      if (this.filteredResults.length) {
        this.goTo(this.filteredResults[0]);
      } else if (this.search.trim()) {
        alert('Keine Ergebnisse gefunden.');
      }
    }
  },
  watch: {
    menuOpen(newVal) {
      // lock body scroll when drawer is open
      document.body.style.overflow = newVal ? 'hidden' : '';
      if (newVal) {
        this.$nextTick(() => {
          // focus first link for accessibility
          this.$refs.firstMobileLink && this.$refs.firstMobileLink.$el
            ? this.$refs.firstMobileLink.$el.focus()
            : (this.$refs.firstMobileLink && this.$refs.firstMobileLink.focus && this.$refs.firstMobileLink.focus());
        });
      }
    }
  }
}
</script>

<style scoped>
.nav-link {
  color: var(--cyan-700);
  font-weight: 500;
  transition: color var(--transition-normal);
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  outline: none;
}
.nav-link:hover { color: var(--blue-600); }
/* ÖZGÜLLÜKLE aktif link — !important kaldırıldı */
.nav-link.router-link-active {
  color: var(--blue-600);
  font-weight: 600;
}
/* Klavye odak görünürlüğü */
.nav-link:focus-visible {
  box-shadow: 0 0 0 3px rgba(8,121,144,.2);
  border-radius: .375rem;
}

.search-input {
  border: 2px solid var(--cyan-700);
  border-right: none;
  border-radius: 0.5rem 0 0 0.5rem;
  padding: 0.5rem 1rem;
  color: var(--gray-600);
  outline: none;
  background: #fff;
  transition: border var(--transition-normal);
  min-width: 200px;
}

.search-btn {
  border: 2px solid var(--cyan-700);
  border-left: none;
  border-radius: 0 0.5rem 0.5rem 0;
  background-color: var(--cyan-700);
  color: var(--white);
  transition: background-color var(--transition-normal), border-color var(--transition-normal);
}
.search-btn:hover {
  background-color: var(--blue-600);
  border-color: var(--blue-600);
}

.mobile-link {
  display: block;
  padding: 0.5rem 0;
  color: var(--cyan-700);
  font-weight: 500;
  text-decoration: none;
  outline: none;
  transition: color var(--transition-normal);
}
.mobile-link:hover { color: var(--blue-600); }
.mobile-link:focus-visible {
  box-shadow: 0 0 0 3px rgba(8,121,144,.2);
  border-radius: .375rem;
}

/* Transitions for backdrop/drawer */
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform .28s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>