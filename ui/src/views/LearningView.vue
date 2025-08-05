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
      <!-- Hero Overlay - Main CSS'ten hero-overlay-small kullan -->
      <div class="hero-overlay-small">
        <div class="flex items-center justify-center gap-4">
          <img src="@/assets/images/logo1.png" alt="Uri Flag" class="h-20 w-auto m-0 shadow-md pointer-events-auto object-contain" />
          <h1 class="text-white m-0 drop-shadow-lg">Lebenslang Lernen</h1>
        </div>
      </div>

      <!-- Breadcrumb -->
      <div class="container">
        <nav class="breadcrumb">
          <router-link to="/" class="hover:underline">Home</router-link>
          <span>&gt;</span>
          <router-link to="/learning" class="hover:underline">Lernen</router-link>
        </nav>
      </div>
    </div>

    <!-- Sayfa İçeriği -->
    <div class="container">
      <div class="py-10">
        <!-- Başlık ve Açıklama -->
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
        </section>

        <!-- 2x2 Kart Sistemi -->
        <div class="py-10 rounded-lg">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Deutschkurse -->
            <div class="card h-full overflow-hidden">
              <img src="@/assets/images/lern1.png" class="w-full h-48 object-cover" alt="Deutschkurse">
              <div class="p-6">
                <h5 class="text-h5 text-orange-600 mb-3 font-semibold">Deutschkurse</h5>
                <p class="body-regular mb-3">
                  Das Verstehen und Sprechen der Deutschen Sprache ist ein wichtiger Schritt, um sich in Uri zurecht zu finden und Kontakte mit Urnerinnen und Urnern zu knüpfen.
                </p>
                <ul class="space-y-1">
                  <li>
                    <a href="https://treffpunkt26.jimdofree.com/angebote/lernpunkt26/deutschangebote/" target="_blank" class="external-link">Deutsch üben im Treffpunkt26 (Gratis)</a>
                  </li>
                  <li>
                    <a href="https://lernatelierluzern.ch/index.php/de-ch/" target="_blank" class="external-link">Lernatelier Luzern (Gratis)</a>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Lebenslauf verbessern -->
            <div class="card h-full overflow-hidden">
              <img src="@/assets/images/lern2.png" class="w-full h-48 object-cover" alt="Lebenslauf">
              <div class="p-6">
                <h5 class="text-h5 text-orange-600 mb-3 font-semibold">Lebenslauf verbessern</h5>
                <p class="body-regular mb-3">
                  Ein professioneller Lebenslauf ist Ihre Visitenkarte im Bewerbungsprozess. Hier finden Sie Hilfe bei der Erstellung und Optimierung Ihrer Bewerbungsunterlagen.
                </p>
                <ul class="space-y-1">
                  <li><a href="#" class="external-link">Kostenlose Lebenslauf-Vorlagen</a></li>
                  <li><a href="#" class="external-link">Bewerbungscoaching beim RAV</a></li>
                  <li><a href="#" class="external-link">Tipps für erfolgreiche Bewerbungen</a></li>
                </ul>
              </div>
            </div>

            <!-- Schweizer Kultur -->
            <div class="card h-full overflow-hidden">
              <img src="@/assets/images/lern3.png" class="w-full h-48 object-cover" alt="Kultur">
              <div class="p-6">
                <h5 class="text-h5 text-orange-600 mb-3 font-semibold">Schweizer- und Urner Kultur</h5>
                <p class="body-regular mb-3">
                  Als Gründungskanton ist Uri seit 1291 ein Teil der Schweizer Eidgenossenschaft. Der Kanton ist reich an Kulturgeschichte und Traditionen.
                </p>
                <ul class="space-y-1">
                  <li><a href="#" class="external-link">Alles über Uri auf urikon.ch</a></li>
                  <li><a href="#" class="external-link">Kultur in Urner Museen</a></li>
                  <li><a href="#" class="external-link">Gelebte Traditionen in Uri</a></li>
                </ul>
              </div>
            </div>

            <!-- Weiterbildungen -->
            <div class="card h-full overflow-hidden">
              <img src="@/assets/images/lern4.png" class="w-full h-48 object-cover" alt="Weiterbildungen">
              <div class="p-6">
                <h5 class="text-h5 text-orange-600 mb-3 font-semibold">Weiterbildungen</h5>
                <p class="body-regular mb-3">
                  Lebenslanges Lernen ist der Schlüssel zum beruflichen Erfolg. Entdecken Sie vielfältige Weiterbildungsangebote im Kanton Uri.
                </p>
                <ul class="space-y-1">
                  <li>
                    <a href="https://weiterbildung.bwzuri.ch/" target="_blank" class="external-link">BWZ Uri Weiterbildungen</a>
                  </li>
                  <li>
                    <a href="https://weiterbildung.ur.ch/" target="_blank" class="external-link">Weiterbildung Kanton Uri</a>
                  </li>
                  <li>
                    <a href="https://www.srk-uri.ch/kurswesen" target="_blank" class="external-link">SRK Uri Kurse</a>
                  </li>
                </ul>
              </div>
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
