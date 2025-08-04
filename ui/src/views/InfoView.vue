<template>
  <div class="info-view relative w-full min-h-screen">
    <!-- Hero Görsel ve Overlay -->
    <div class="relative w-full overflow-hidden">
      <img 
        src="@/assets/images/info.png"
        @click="toggleFullscreen"
        :class="isFullscreen 
          ? 'fixed inset-0 w-screen h-screen object-contain z-[1000] bg-black/90 cursor-zoom-out p-5 box-border transition-all duration-300'
          : 'w-full h-auto cursor-pointer transition-all duration-300'"
        alt="Information"
      />
      <!-- Hero Overlay -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 min-w-[200px] bg-cyan-900/80 p-8 rounded-2xl text-center text-white font-bold pointer-events-none
                  md:w-3/5 md:p-4">
        <div class="flex items-center justify-center gap-4 md:gap-2">
          <img src="@/assets/images/logo1.png" alt="Uri Flag" class="h-20 w-auto m-0 shadow-md pointer-events-auto object-contain md:h-8" />
          <h1 class="m-0 text-5xl font-bold drop-shadow-lg md:text-2xl">Fakten und Links</h1>
        </div>
      </div>
      <!-- Breadcrumb -->
      <div class="max-w-5xl mx-auto px-5">
        <nav class="py-4 text-sm text-gray-600 flex items-center gap-2">
          <router-link to="/" class="hover:underline">Home</router-link>
          <span>&gt;</span>
          <router-link to="/info" class="hover:underline">Information</router-link>
        </nav>
      </div>
    </div>

    <!-- Sayfa İçeriği -->
    <div class="max-w-5xl mx-auto px-5">
      <div class="py-10">
        <!-- Başlık ve Açıklama -->
        <header class="mb-8">
          <h1 class="text-3xl font-bold text-orange-700 mb-4">Wissenswertes über Neuankömmlinge in Uri</h1>
        </header>
        <section class="mb-8 bg-white rounded-lg p-6 shadow">
          <p class="text-lg mb-4">
            Auf dieser Seite finden Sie wichtige Informationen und Statistiken über Neuankömmlinge in Uri. 
            Erfahren Sie mehr über die Herausforderungen, denen Menschen begegnen, die neu in der Region sind, 
            und wie Sie diese meistern können. Wir bieten Ihnen hilfreiche Links zu Ämtern, Behörden und 
            wichtigen Anlaufstellen, die Sie bei Ihren Fragen und Anliegen unterstützen. Lassen Sie uns 
            gemeinsam die Hürden überwinden und den Weg in eine erfolgreiche Zukunft ebnen.
          </p>
        </section>
        
        <!-- Erwerbstätigkeit nach sieben Jahren -->
        <header class="mb-4">
          <h2 class="text-2xl font-bold text-orange-700 mb-2">Erwerbstätigkeit nach sieben Jahren</h2>
        </header>
        <section class="mb-8 bg-white rounded-lg p-6 shadow">
          <p class="text-base mb-4">
            Im Jahr 2023 lag die Erwerbstätigenquote von vorläufig Aufgenommenen und Flüchtlingen in Uri 
            sieben Jahre nach ihrer Einreise bei 83%. Dies ist im Vergleich zu anderen Kantonen ein hoher 
            Wert, weil sich die Daten auf wenige Personen im erwerbsfähigen Alter beziehen, können die 
            Unterschiede pro Jahr stark schwanken.
            <br><br>
            Die Aufnahme einer Arbeit wird von verschiedenen persönlichen und strukturellen Faktoren beeinflusst. 
            Unterschiede in der Erwerbstätigenquote können nicht nur durch erfolgreiche Integrationsförderung 
            erklärt werden. Auch die Struktur des Arbeitsmarktes und die wirtschaftliche Lage spielen eine 
            wichtige Rolle.
          </p>
        </section>
        
        <!-- Harita -->
        <div class="my-8 text-center">
          <img 
            src="@/assets/images/map1.png" 
            alt="Uri Map" 
            class="max-w-full h-auto rounded-lg shadow"
          />
          <div class="mt-2 text-sm text-gray-600 text-right">
            Quelle: 
            <a href="https://www.sem.admin.ch/sem/de/home/integration-einbuergerung/integrationsfoerderung/monitoring/erwerb-va-fl.html" 
               target="_blank" rel="noopener noreferrer" class="text-orange-700 hover:underline">
              Staatssekretariat für Migration SEM
            </a>
          </div>
        </div>
        
        <!-- Erwerbstätigkeit aktuell -->
        <header class="mb-4">
          <h2 class="text-2xl font-bold text-orange-700 mb-2">Erwärbstätigkeit aktuell</h2>
        </header>
        <div class="my-8 text-center bg-white p-6 rounded-lg shadow">
          <img 
            src="@/assets/images/inper.png" 
            alt="Erwerbstätigkeit Statistik" 
            class="max-w-full h-auto rounded-lg shadow"
          />
        </div>
        <section class="mb-8 bg-white rounded-lg p-6 shadow">
          <p class="text-base mb-4">
            Die Tabelle zeigt den Stand im März 2025. Von den 782 Flüchtlingen im Kanton Uri 
            (aus allen Aufenthaltsstatus), sind 515 arbeitsfähig. Von diesen sind 245 derzeit 
            erwerbstätig, was 47,57% entspricht.
          </p>
        </section>
        <div class="my-8 text-center bg-white p-6 rounded-lg shadow">
          <img 
            src="@/assets/images/img6.png" 
            alt="Additional Statistics" 
            class="max-w-full h-auto rounded-lg shadow"
          />
          <div class="mt-2 text-sm text-gray-600 text-right">
            Quelle: 
            <a href="https://www.sem.admin.ch/sem/de/home/integration-einbuergerung/integrationsfoerderung/monitoring/erwerb-va-fl.html" 
               target="_blank" rel="noopener noreferrer" class="text-orange-700 hover:underline">
              Staatssekretariat für Migration SEM
            </a>
            <span class="ml-2">(Stand: 11.03.2025)</span>
          </div>
        </div>

        <!-- Tipps für den Alltag in Uri -->
        <header class="mb-4">
          <h2 class="text-2xl font-bold text-orange-700 mb-2">Tipps für den Alltag in Uri</h2>
        </header>
        <section class="mb-8 bg-white rounded-lg p-6 shadow">
          <p class="text-base mb-4">
            Die Integration in eine neue Umgebung kann herausfordernd sein, aber mit ein paar hilfreichen Tipps 
            wird Ihnen der Einstieg leichter fallen. Diese Tipps sollen Sie dabei unterstützen, sich in Uri 
            zurechtzufinden und Teil der Gemeinschaft zu werden.
          </p>
        </section>
        <header class="mb-4">
          <h3 class="text-xl font-bold text-orange-700 mb-2">Teilnahme und Sprache</h3>
        </header>
        <section class="mb-8 bg-white rounded-lg p-6 shadow">
          <p class="text-base mb-4">
            Wochenmärkte und Konzerte, aber auch Spaziergänge und Wanderungen sind gute Gelegenheiten, 
            die Kulturellen Regeln und Menschen in Uri kennenzulernen. Es braucht keine Sprachkenntnisse, 
            um den öffentlichen Raum zu nutzen, um erste Kontakte mir Urnerinnen und Urnern zu knüpfen. 
            Das Lernen der Sprache ist allerdings ein wichtiger Aspekt, um Sprachbarrieren und Missverständnisse 
            zu verhindern und um Teil der Urner Gemeinschaft zu werden.
          </p>
        </section>
        <header class="mb-4">
          <h2 class="text-2xl font-bold text-orange-700 mb-2">Urner Feste und Bräuche</h2>
        </header>
        <section class="mb-8 bg-white rounded-lg p-6 shadow">
          <p class="text-base mb-4">
            Fasnacht, Samichlaus, Alpaufzug, 1.August - die Menschen im Kanton Uri feiern viele 
            traditionelle Feste. Zu diesen Festen finden auch jedes Jahr grosse Märkte und Events 
            in Altdorf statt. Feiern Sie mit!
            <br><br>
            Ein Brauchtum, der das ganze Jahr stattfindet ist das gegenseitige Begrüssen in der 
            Nachbarschaft, beim Spazieren oder auf Wanderungen. Gegrüsst wird mit "Griäzi" und "Guete Tag".
            <br><br>
            Weitere Informationen über Urner Bräuche und gelebte Traditionen finden Sie auf der 
            <router-link to="/learning" class="text-orange-700 hover:underline">Lernen-Seite</router-link>.
          </p>
        </section>
        <header class="mb-4">
          <h1 class="text-2xl font-bold text-orange-700 mb-2">Nützliche Links</h1>
        </header>
        <section class="mb-8">
          <div class="flex flex-col gap-6">
            <div class="p-5 bg-white rounded-lg shadow">
              <h4 class="text-orange-700 mb-2 font-semibold">Fachstelle Integration und Vernetzung Uri</h4>
              <p class="mb-2">Die Fachstelle Integration und Vernetzung Uri ist Ihre Anlaufstelle, wenn sie Beratungen in Anspruch nehmen möchten, oder wenn Sie sich über bestehenden Angebote im Kanton Uri informieren möchten.</p>
              <a href="https://www.ur.ch/unterinstanzen/1436" target="_blank" class="text-orange-700 font-medium hover:underline">www.ur.ch/unterinstanzen/1436</a>
            </div>
            <div class="p-5 bg-white rounded-lg shadow">
              <h4 class="text-orange-700 mb-2 font-semibold">Integration Uri</h4>
              <p class="mb-2">Die Integrations-Agenda beschreibt den best-case Integrationsprozess, den "Soll-Integrationsprozess" für die 16-25- Jährige. Die einzelnen Phasen der Integration werden im Dokument "Integrationsagenda Schweiz: Bericht der Koordinationsgruppe vom 1. März 2018" ausführlich beschrieben.</p>
              <a href="https://www.integration-uri.ch" target="_blank" class="text-orange-700 font-medium hover:underline">www.integration-uri.ch</a>
            </div>
            <div class="p-5 bg-white rounded-lg shadow">
              <h4 class="text-orange-700 mb-2 font-semibold">Staatssekretariat für Migration SEM</h4>
              <p class="mb-2">Weiterführende Informationen zur Integrationsagenda:</p>
              <div class="flex flex-col gap-2">
                <a href="https://www.sem.admin.ch/sem/fr/home/integration-einbuergerung/integrationsfoerderung/kantonale-programme/integrationsagenda" target="_blank" class="text-orange-700 font-medium hover:underline">Integrationsagenda</a>
                <a href="https://www.sem.admin.ch/dam/sem/de/data/integration/agenda/ber-koordinationsgruppe-integrationsagenda-d.pdf.download.pdf/ber-koordinationsgruppe-integrationsagenda-d.pdf" target="_blank" class="text-orange-700 font-medium hover:underline">Bericht der Koordinationsgruppe (PDF)</a>
              </div>
            </div>
            <div class="p-5 bg-white rounded-lg shadow">
              <h4 class="text-orange-700 mb-2 font-semibold">Familien Uri</h4>
              <p class="mb-2">Familien Uri ist eine Plattform für Familienevents, Betreuungsangebote und Bildungsangebote für Familien im Kanton Uri.</p>
              <a href="https://www.familien-uri.ch" target="_blank" class="text-orange-700 font-medium hover:underline">www.familien-uri.ch</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoView',
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
