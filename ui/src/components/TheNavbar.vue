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
      <form class="search-form hidden md:block">
        <div class="flex">
          <input class="form-input search-input" type="search" placeholder="Search" />
          <button class="search-btn" type="submit">
            Search
          </button>
        </div>
      </form>
      <!-- Mobile menu button -->
      <button class="menu-btn md:hidden flex items-center" @click="toggleMenu">
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
      <form class="mt-2">
        <div class="flex">
          <input class="form-input search-input" type="search" placeholder="Search" />
          <button class="search-btn" type="submit">
            Search
          </button>
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
      menuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
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
  font-size: 1.125rem; /* text-lg */
  color: #1e293b;      /* text-gray-800 */
  opacity: 0.9;
}


.nav-links .nav-link {
  padding-left: 1.25rem;  /* 20px */
  padding-right: 1.25rem; /* 20px */
}

.nav-link {
  color: #0e7490; /* text-cyan-700 */
  font-weight: 500;
  transition: color 0.2s;
  text-decoration: none;
}
.nav-link:hover {
  color: #2563eb; /* text-blue-600 */
}

.router-link-active {
  font-weight: bold;
  color: var(--blue-600) !important;
}

.search-form .search-input {
  border: 1px solid #cbd5e1; /* border */
  border-radius: 0.375rem 0 0 0.375rem; /* rounded-l */
  padding: 0.25rem 0.75rem; /* px-3 py-1 */
  color: #4b5563; /* text-gray-600 */
  outline: none;
}

.search-btn {
  background-color: #2563eb; /* bg-blue-600 */
  color: #fff;
  padding: 0.25rem 1rem; /* px-4 py-1 */
  border-radius: 0 0.375rem 0.375rem 0; /* rounded-r */
  border: none;
  transition: background 0.2s;
  font-weight: 500;
}
.search-btn:hover {
  background-color: #1d4ed8; /* bg-blue-700 */
}

.menu-btn {
  padding: 0.5rem 0.75rem;
  border: 1px solid #0e7490; /* border-cyan-700 */
  border-radius: 0.375rem;
  color: #0e7490;
  background: none;
  cursor: pointer;
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
