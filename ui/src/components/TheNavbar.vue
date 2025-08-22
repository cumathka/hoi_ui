<template>
  <nav class="py-2 shadow-sm" style="background-color: var(--blue-100);">
    <div class="container">
      <div class="flex items-center justify-between">
        <!-- Logo ve Brand -->
        <router-link to="/" class="flex items-center gap-2">
          <img 
            src="@/assets/images/logoh1.png" 
            alt="Logo" 
            class="w-[70px] h-[70px]"
          >
          <span class="body-lead text-dark opacity-90">Griäzi!</span>
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
                @mousedown.prevent="goTo(result.path)"
                class="px-4 py-2 cursor-pointer hover:bg-blue-50"
              >
                <div class="font-semibold" style="color: var(--cyan-700);">{{ result.title }}</div>
                <div class="text-sm text-gray-500">{{ result.desc }}</div>
              </div>
            </div>
          </form>
        </div>
        
        <!-- Mobile Menu Button -->
        <button 
          class="lg:hidden btn flex items-center" 
          @click="toggleMenu"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div v-if="menuOpen" class="lg:hidden mt-4 pb-4">
        <ul class="flex flex-col gap-2">
          <li>
            <router-link to="/info" class="mobile-link" @click="menuOpen = false">Informationen</router-link>
          </li>
          <li>
            <router-link to="/learning" class="mobile-link" @click="menuOpen = false">Lernen</router-link>
          </li>
          <li>
            <router-link to="/jobs" class="mobile-link" @click="menuOpen = false">Jobs</router-link>
          </li>
          <li>
            <router-link to="/events" class="mobile-link" @click="menuOpen = false">Events</router-link>
          </li>
        </ul>
        
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
            <button class="btn body-regular" type="submit">
              Search
            </button>
          </div>
          <!-- Mobile Search Results -->
          <div
            v-if="showResults && filteredResults.length"
            class="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50"
          >
            <div
              v-for="result in filteredResults"
              :key="result.path"
              @mousedown.prevent="goTo(result.path)"
              class="px-4 py-2 cursor-pointer hover:bg-blue-50"
            >
              <div class="font-semibold" style="color: var(--cyan-700);">{{ result.title }}</div>
              <div class="text-sm text-gray-500">{{ result.desc }}</div>
            </div>
          </div>
        </form>
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
      setTimeout(() => (this.showResults = false), 150);
    },
    goTo(path) {
      this.$router.push(path);
      this.showResults = false;
      this.search = '';
      this.menuOpen = false;
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
.nav-link {
  color: var(--cyan-700);
  font-weight: 500;
  transition: color 0.2s;
  text-decoration: none;
  padding: 0.75rem 1.25rem;
}

.nav-link:hover {
  color: var(--blue-600);
}

.router-link-active {
  font-weight: bold;
  color: var(--blue-600) !important;
}

.search-input {
  border: 2px solid var(--cyan-700);
  border-radius: 0.5rem 0 0 0.5rem;
  padding: 0.5rem 1rem;
  color: var(--gray-600);
  outline: none;
  background: #fff;
  transition: border 0.2s;
  min-width: 200px;
}

.search-input:focus {
  border-color: var(--blue-600);
}

.mobile-link {
  display: block;
  padding: 0.5rem 0;
  color: var(--cyan-700);
  font-weight: 500;
  text-decoration: none;
}

.mobile-link:hover {
  color: var(--blue-600);
}
</style>
