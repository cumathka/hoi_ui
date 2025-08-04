<template>
  <div class="learning-view relative w-full min-h-screen">
    <!-- Hero Görsel ve Overlay -->
    <div class="relative w-full overflow-hidden">
      <img 
        src="@/assets/images/lebenslag.png"
        @click="toggleFullscreen"
        :class="isFullscreen 
          ? 'fixed inset-0 w-screen h-screen object-contain z-[1000] bg-black/90 cursor-zoom-out p-5 box-border transition-all duration-300'
          : 'w-full h-auto cursor-pointer transition-all duration-300'"
        alt="Lernen"
      />
      <!-- Hero Overlay -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 min-w-[200px] p-8 rounded-2xl text-center text-white pointer-events-none hero-overlay">
        <div class="flex items-center justify-center gap-4">
          <img src="@/assets/images/logo1.png" alt="Uri Flag" class="h-20 w-auto m-0 shadow-md pointer-events-auto object-contain" />
          <h1 class="m-0 text-4xl drop-shadow-lg font-normal">Lebenslang Lernen</h1>
        </div>
      </div>
      <!-- Breadcrumb -->
      <div class="max-w-5xl mx-auto px-5">
        <nav class="py-4 text-sm text-gray-600 flex items-center gap-2">
          <router-link to="/" class="hover:underline">Home</router-link>
          <span>&gt;</span>
          <router-link to="/learning" class="hover:underline">Lernen</router-link>
        </nav>
      </div>
    </div>

    <!-- Sayfa İçeriği -->
    <div class="max-w-5xl mx-auto px-5">
      <div class="py-10">
        <!-- Başlık ve Açıklama -->
        <header class="mb-8">
          <h1 class="text-4xl text-orange-600 mb-4">Lernen und Weiterkommen in Uri</h1>
        </header>
        <section class="mb-8 bg-white rounded-lg p-6 shadow">
          <p class="text-lg mb-4 text-gray-700 text-justify">
            Bildung und lebenslanges Lernen sind der Schlüssel zur Integration und zum beruflichen Erfolg. 
            In Uri gibt es zahlreiche Möglichkeiten, Deutsch zu lernen, sich weiterzubilden und die Schweizer Kultur kennenzulernen. 
            Auf dieser Seite finden Sie Angebote, Tipps und Anlaufstellen, die Sie auf Ihrem Weg unterstützen.
          </p>
        </section>

        <!-- Kartlar -->
        <div class="flex flex-col gap-8 py-8">
          <!-- Deutschkurse -->
          <div class="bg-white rounded-lg shadow hover:shadow-lg transition-transform hover:-translate-y-1 flex flex-col md:flex-row">
            <img src="@/assets/images/lern1.png" class="w-full md:w-64 h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none" alt="Deutschkurse">
            <div class="p-6 flex-1 flex flex-col">
              <h2 class="text-2xl font-normal text-orange-600 mb-2">Deutschkurse</h2>
              <p class="mb-3 text-gray-700 flex-1">
                Deutsch zu verstehen und zu sprechen ist ein wichtiger Schritt, um sich in Uri zurechtzufinden und Kontakte zu knüpfen.
                Es gibt kostenlose und kostenpflichtige Angebote für jedes Sprachniveau.
              </p>
              <ul class="space-y-1">
                <li>
                  <a href="https://treffpunkt26.jimdofree.com/angebote/lernpunkt26/deutschangebote/" target="_blank" class="text-cyan-700 hover:underline">Deutsch üben im Treffpunkt26 (Gratis)</a>
                </li>
                <li>
                  <a href="https://lernatelierluzern.ch/index.php/de-ch/" target="_blank" class="text-cyan-700 hover:underline">Lernatelier Luzern (Gratis)</a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Lebenslauf verbessern -->
          <div class="bg-white rounded-lg shadow hover:shadow-lg transition-transform hover:-translate-y-1 flex flex-col md:flex-row">
            <img src="@/assets/images/lern2.png" class="w-full md:w-64 h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none" alt="Lebenslauf">
            <div class="p-6 flex-1 flex flex-col">
              <h2 class="text-2xl font-normal text-orange-600 mb-2">Lebenslauf verbessern</h2>
              <p class="mb-3 text-gray-700 flex-1">
                Ein professioneller Lebenslauf ist Ihre Visitenkarte im Bewerbungsprozess. Hier finden Sie Hilfe bei der Erstellung und Optimierung Ihrer Bewerbungsunterlagen.
              </p>
              <ul class="space-y-1">
                <li><a href="#" class="text-cyan-700 hover:underline">Kostenlose Lebenslauf-Vorlagen</a></li>
                <li><a href="#" class="text-cyan-700 hover:underline">Bewerbungscoaching beim RAV</a></li>
                <li><a href="#" class="text-cyan-700 hover:underline">Tipps für erfolgreiche Bewerbungen</a></li>
              </ul>
            </div>
          </div>

          <!-- Schweizer Kultur -->
          <div class="bg-white rounded-lg shadow hover:shadow-lg transition-transform hover:-translate-y-1 flex flex-col md:flex-row">
            <img src="@/assets/images/lern3.png" class="w-full md:w-64 h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none" alt="Kultur">
            <div class="p-6 flex-1 flex flex-col">
              <h2 class="text-2xl font-normal text-orange-600 mb-2">Schweizer- und Urner Kultur</h2>
              <p class="mb-3 text-gray-700 flex-1">
                Uri ist reich an Kulturgeschichte und Traditionen. Lernen Sie die Bräuche, Feste und das Alltagsleben im Kanton kennen.
              </p>
              <ul class="space-y-1">
                <li><a href="#" class="text-cyan-700 hover:underline">Alles über Uri auf urikon.ch</a></li>
                <li><a href="#" class="text-cyan-700 hover:underline">Kultur in Urner Museen</a></li>
                <li><a href="#" class="text-cyan-700 hover:underline">Gelebte Traditionen in Uri</a></li>
              </ul>
            </div>
          </div>

          <!-- Weiterbildungen -->
          <div class="bg-white rounded-lg shadow hover:shadow-lg transition-transform hover:-translate-y-1 flex flex-col md:flex-row">
            <img src="@/assets/images/lern4.png" class="w-full md:w-64 h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none" alt="Weiterbildungen">
            <div class="p-6 flex-1 flex flex-col">
              <h2 class="text-2xl font-normal text-orange-600 mb-2">Weiterbildungen</h2>
              <p class="mb-3 text-gray-700 flex-1">
                Lebenslanges Lernen ist der Schlüssel zum beruflichen Erfolg. Entdecken Sie vielfältige Weiterbildungsangebote im Kanton Uri.
              </p>
              <ul class="space-y-1">
                <li>
                  <a href="https://weiterbildung.bwzuri.ch/" target="_blank" class="text-cyan-700 hover:underline">BWZ Uri Weiterbildungen</a>
                </li>
                <li>
                  <a href="https://weiterbildung.ur.ch/" target="_blank" class="text-cyan-700 hover:underline">Weiterbildung Kanton Uri</a>
                </li>
                <li>
                  <a href="https://www.srk-uri.ch/kurswesen" target="_blank" class="text-cyan-700 hover:underline">SRK Uri Kurse</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LearningView',
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
