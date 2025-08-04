<template>
  <nav class="bg-blue-100 py-2 shadow-sm">
    <div class="container mx-auto flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-2">
        <img src="@/assets/images/logo1.png" alt="Logo" class="logo-img" />
        <span class="brand-text">Griäzi!</span>
      </router-link>
      <div class="nav-links hidden md:flex gap-6">
        <router-link to="/info" class="nav-link">Informationen</router-link>
        <router-link to="/learning" class="nav-link">Lernen</router-link>
        <router-link to="/jobs" class="nav-link">Jobs</router-link>
        <router-link to="/events" class="nav-link">Events</router-link>
      </div>
      <div class="relative hidden md:block w-64">
        <form @submit.prevent="onSearch">
          <div class="flex">
            <input
              v-model="search"
              class="search-input w-full"
              type="search"
              placeholder="Search"
              @input="onInput"
              @focus="showResults = true"
              @blur="hideResults"
              autocomplete="off"
            />
            <button class="btn" type="submit">
              Search
            </button>
          </div>
        </form>
        <div
          v-if="showResults && filteredResults.length"
          class="absolute left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow z-50"
        >
          <div
            v-for="result in filteredResults"
            :key="result.path"
            @mousedown.prevent="goTo(result.path)"
            class="px-4 py-2 cursor-pointer hover:bg-blue-50"
          >
            <div class="font-semibold text-cyan-700">{{ result.title }}</div>
            <div class="text-xs text-gray-500">{{ result.desc }}</div>
          </div>
        </div>
      </div>
      <!-- Mobile menu button -->
      <button class="btn md:hidden flex items-center" @click="toggleMenu">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    <!-- Mobile menu -->
    <div v-if="menuOpen" class="md:hidden bg-blue-100 px-4 pb-4">
      <router-link to="/info" class="mobile-link">Informationen</router-link>
      <router-link to="/learning" class="mobile-link">Lernen</router-link>
      <router-link to="/jobs" class="mobile-link">Jobs</router-link>
      <router-link to="/events" class="mobile-link">Events</router-link>
      <form class="mt-2" @submit.prevent="onSearch">
        <div class="flex">
          <input
            v-model="search"
            class="search-input w-full"
            type="search"
            placeholder="Search"
            @input="onInput"
            @focus="showResults = true"
            @blur="hideResults"
            autocomplete="off"
          />
          <button class="btn" type="submit">
            Search
          </button>
        </div>
        <div
          v-if="showResults && filteredResults.length"
          class="absolute left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow z-50"
        >
          <div
            v-for="result in filteredResults"
            :key="result.path"
            @mousedown.prevent="goTo(result.path)"
            class="px-4 py-2 cursor-pointer hover:bg-blue-50"
          >
            <div class="font-semibold text-cyan-700">{{ result.title }}</div>
            <div class="text-xs text-gray-500">{{ result.desc }}</div>
          </div>
        </div>
      </form>
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
      // Sitedeki arama yapılacak başlıklar ve kısa açıklamalar
      siteData: [
        { title: 'Informationen', path: '/info', desc: 'Fakten, Statistiken und nützliche Links für Neuankömmlinge in Uri.' },
        { title: 'Lernen', path: '/learning', desc: 'Deutschkurse, Weiterbildungen und Kulturangebote in Uri.' },
        { title: 'Jobs', path: '/jobs', desc: 'Arbeitsmöglichkeiten, Jobportale und Bewerbungstipps.' },
        { title: 'Events', path: '/events', desc: 'Integrationsevents, Networking und Gemeinschaftsveranstaltungen.' }
        // Daha fazla veri ekleyebilirsin
      ]
    }
  },
  computed: {
    filteredResults() {
      if (!this.search.trim()) return [];
      const q = this.search.trim().toLowerCase();
      return this.siteData.filter(
        item =>
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q)
      );
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    onInput() {
      this.showResults = !!this.search.trim();
    },
    hideResults() {
      // Küçük bir gecikme ile blur sonrası tıklamayı yakalar
      setTimeout(() => (this.showResults = false), 150);
    },
    goTo(path) {
      this.$router.push(path);
      this.showResults = false;
      this.search = '';
    },
    onSearch() {
      if (this.filteredResults.length) {
        this.goTo(this.filteredResults[0].path);
      } else if (this.search.trim()) {
        alert('Keine Ergebnisse gefunden.');
      }
    }
  }
}
</script>

<style scoped>
.logo-img {
  width: 70px;
  height: 70px;
}
.brand-text {
  font-weight: 600;
  font-size: 1.125rem;
  color: #1e293b;
  opacity: 0.9;
}
.nav-links .nav-link {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.nav-link {
  color: #0e7490;
  font-weight: 500;
  transition: color 0.2s;
  text-decoration: none;
}
.nav-link:hover {
  color: #2563eb;
}
.router-link-active {
  font-weight: bold;
  color: var(--blue-600) !important;
}
.search-input {
  border: 2px solid var(--btn-main-bg, #0e7490);
  border-radius: 0.5rem 0 0 0.5rem;
  padding: 0.5rem 1rem;
  color: #1e293b;
  outline: none;
  font-size: 1rem;
  background: #fff;
  transition: border 0.2s;
}
.search-input:focus {
  border-color: #2563eb;
}
.mobile-link {
  display: block;
  padding: 0.5rem 0;
  color: #0e7490;
  font-weight: 500;
  text-decoration: none;
}
.mobile-link:hover {
  color: #2563eb;
}
</style>
