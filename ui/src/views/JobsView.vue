<template>
  <div class="relative w-full min-h-screen">
    <!-- Hero Görsel ve Overlay -->
    <div class="relative w-full overflow-hidden">
      <img 
        src="@/assets/images/arbeit.png"
        @click="toggleFullscreen"
        :class="isFullscreen 
          ? 'fixed inset-0 w-screen h-screen object-contain z-[1000] bg-cyan-900/90 cursor-zoom-out p-5 box-border transition-all duration-300'
          : 'w-full h-auto cursor-pointer transition-all duration-300'"
        alt="Information"
      />
      <!-- Hero Overlay -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 min-w-[200px] bg-cyan-900/80 p-8 rounded-2xl text-center text-white font-bold pointer-events-none md:w-3/5 md:p-4">
        <div class="flex items-center justify-center gap-4 md:gap-2">
          <img src="@/assets/images/logo1.png" alt="Uri Flag" class="h-20 w-auto m-0 shadow-md pointer-events-auto object-contain md:h-8" />
          <h1 class="m-0 text-5xl font-bold drop-shadow-lg md:text-2xl">Arbeitsmöglichkeiten</h1>
        </div>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div class="max-w-5xl mx-auto px-5">
      <nav class="py-4 text-sm text-gray-600 flex items-center gap-2">
        <router-link to="/" class="hover:underline">Home</router-link>
        <span>&gt;</span>
        <router-link to="/jobs" class="hover:underline">Arbeitsmöglichkeiten</router-link>
      </nav>
    </div>

    <!-- Sayfa İçeriği -->
    <div class="max-w-5xl mx-auto px-5 py-10">
      <header class="mb-8">
        <h1 class="text-4xl  text-orange-600 mb-4">Ihre Karrierechancen in Uri</h1>
      </header>
      <section class="mb-8 bg-white rounded-lg p-6 shadow">
        <p class="text-lg mb-4 text-gray-700 text-justify">
          Der Einstieg in den Arbeitsmarkt ist ein wichtiger Schritt auf Ihrem Weg in der Schweiz.
          Auf dieser Seite finden Sie Links zu Jobportalen, die speziell für Neuankömmlinge geeignet sind.
          Erfahren Sie mehr über die Arbeitswelt in Uri und nutzen Sie die Chance, Ihre beruflichen
          Ziele zu verwirklichen. Wir unterstützen Sie dabei, den passenden Job zu finden und sich
          erfolgreich in den Arbeitsmarkt zu integrieren. Ihre Karriere beginnt hier!
        </p>
      </section>

      <!-- Job Link Kartları -->
      <div class="flex flex-col gap-8 mt-8">
        <!-- Job Room -->
        <div class="rounded-xl shadow hover:shadow-lg transition-transform hover:-translate-y-1 bg-white overflow-hidden">
          <a href="https://www.job-room.ch/home/job-seeker" target="_blank"
             class="flex justify-between items-center px-6 py-4 bg-cyan-700 text-white font-medium text-base hover:bg-cyan-800 transition-colors rounded-t-xl">
            <span>www.job-room.ch/home/job-seeker</span>
            <span class="text-xl">↗</span>
          </a>
          <div class="px-6 py-4 bg-white">
            <p class="text-gray-700 text-base">
              Das offizielle Jobportal des Kantons Uri mit Stellenangeboten in der ganzen Region. Besonders nützlich für die Suche nach lokalen Arbeitsstellen in verschiedenen Branchen.
            </p>
          </div>
        </div>
        <!-- Path2Work -->
        <div class="rounded-xl shadow hover:shadow-lg transition-transform hover:-translate-y-1 bg-white overflow-hidden">
          <a href="https://www.path2work.ethz.ch/" target="_blank"
             class="flex justify-between items-center px-6 py-4 bg-cyan-700 text-white font-medium text-base hover:bg-cyan-800 transition-colors rounded-t-xl">
            <span>www.path2work.ethz.ch/</span>
            <span class="text-xl">↗</span>
          </a>
          <div class="px-6 py-4 bg-white">
            <p class="text-gray-700 text-base">
              Ein Projekt der ETH Zürich, das sich auf die Integration von qualifizierten Migrantinnen und Migranten in den Schweizer Arbeitsmarkt spezialisiert hat. Bietet Coaching und Netzwerkmöglichkeiten.
            </p>
          </div>
        </div>
        <!-- Arbeit.swiss -->
        <div class="rounded-xl shadow hover:shadow-lg transition-transform hover:-translate-y-1 bg-white overflow-hidden">
          <a href="https://www.arbeit.swiss/secola/v.de/home" target="_blank"
             class="flex justify-between items-center px-6 py-4 bg-cyan-700 text-white font-medium text-base hover:bg-cyan-800 transition-colors rounded-t-xl">
            <span>www.arbeit.swiss/secola/v.de/home</span>
            <span class="text-xl">↗</span>
          </a>
          <div class="px-6 py-4 bg-white">
            <p class="text-gray-700 text-base">
              Das Staatssekretariat für Wirtschaft (SECO) bietet hier Informationen zum Arbeitsmarkt, Berufsanerkennungen und spezielle Programme für Arbeitssuchende in der Schweiz.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobsView',
  data() {
    return {
      isFullscreen: false
    }
  },
  methods: {
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      document.body.style.overflow = this.isFullscreen ? 'hidden' : '';
    }
  }
}
</script>
