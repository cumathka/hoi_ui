<template>
  <div class="info-view relative w-full min-h-screen">
    <!-- Hero image + overlay -->
    <div class="relative w-full overflow-hidden">
      <!-- Click to toggle fullscreen -->
      <img
        src="@/assets/images/info.png"
        alt="Information header"
        loading="lazy"
        decoding="async"
        @click="toggleFullscreen"
        :class="isFullscreen
          ? 'fixed inset-0 w-screen h-screen object-contain z-[1000] bg-black/90 cursor-zoom-out p-5 box-border transition-all duration-300'
          : 'w-full h-auto cursor-zoom-in transition-all duration-300'"
      />

      <!-- Hero overlay: title + logo -->
      <div class="hero-overlay-small">
        <div class="flex items-center justify-center gap-4">
          <!-- keep your updated logo; swap to logo1.png if you want the old one -->
          <img
            src="@/assets/images/logoh.jpeg"
            alt="Uri Logo"
            class="h-20 w-auto m-0 shadow-md pointer-events-auto object-contain rounded-md"
            loading="lazy"
            decoding="async"
          />
          <h1 class="text-h3 text-white m-0 drop-shadow-lg">Fakten und Links</h1>
        </div>
      </div>

      <!-- Breadcrumb -->
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <router-link to="/" class="hover:underline">Home</router-link>
          <span aria-hidden="true">›</span>
          <router-link to="/info" class="hover:underline">Information</router-link>
        </nav>
      </div>
    </div>

    <!-- Page content -->
    <div class="container">
      <div class="py-10">
        <!-- Intro -->
        <header class="mb-8">
          <h1 class="text-h3 text-orange-600 mb-4">Wissenswertes über Neuankömmlinge in Uri</h1>
        </header>

        <section class="content-section">
          <p class="body-lead mb-4">
            Auf dieser Seite finden Sie wichtige Informationen und Statistiken über Neuankömmlinge in Uri.
            Erfahren Sie mehr über die Herausforderungen, denen Menschen begegnen, die neu in der Region sind,
            und wie Sie diese meistern können. Wir bieten Ihnen hilfreiche Links zu Ämtern, Behörden und
            wichtigen Anlaufstellen, die Sie bei Ihren Fragen und Anliegen unterstützen. Lassen Sie uns
            gemeinsam die Hürden überwinden und den Weg in eine erfolgreiche Zukunft ebnen.
          </p>
        </section>

        <!-- Erwerbstätigkeit nach sieben Jahren -->
        <header class="section-header">
          <h2 class="text-h3 text-orange-600 mb-2">Erwerbstätigkeit nach sieben Jahren</h2>
        </header>

        <section class="content-section">
          <p class="body-regular mb-4">
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

        <!-- Map image + source -->
        <div class="image-section">
          <img
            src="@/assets/images/map1.png"
            alt="Kanton Uri map"
            class="max-w-full h-auto rounded-lg shadow"
            loading="lazy"
            decoding="async"
          />
          <div class="image-source">
            Quelle:
            <a
              href="https://www.sem.admin.ch/sem/de/home/integration-einbuergerung/integrationsfoerderung/monitoring/erwerb-va-fl.html"
              target="_blank"
              rel="noopener noreferrer"
              class="source-link"
            >
              Staatssekretariat für Migration SEM
            </a>
          </div>
        </div>

        <!-- Erwerbstätigkeit aktuell -->
        <header class="section-header">
          <h2 class="text-h3 text-orange-600 mb-2">Erwerbstätigkeit aktuell</h2>
        </header>

        <div class="image-section">
          <img
            src="@/assets/images/inper.png"
            alt="Erwerbstätigkeit Statistik"
            class="max-w-full h-auto rounded-lg shadow"
            loading="lazy"
            decoding="async"
          />
        </div>

        <section class="content-section">
          <p class="body-regular mb-4">
            Die Tabelle zeigt den Stand im März 2025. Von den 782 Flüchtlingen im Kanton Uri
            (aus allen Aufenthaltsstatus), sind 515 arbeitsfähig. Von diesen sind 245 derzeit
            erwerbstätig, was 47,57% entspricht.
          </p>
        </section>

        <!-- Additional stats -->
        <div class="image-section">
          <img
            src="@/assets/images/img6.png"
            alt="Weitere Statistiken"
            class="max-w-full h-auto rounded-lg shadow"
            loading="lazy"
            decoding="async"
          />
          <div class="image-source">
            Quelle:
            <a
              href="https://www.sem.admin.ch/sem/de/home/integration-einbuergerung/integrationsfoerderung/monitoring/erwerb-va-fl.html"
              target="_blank"
              rel="noopener noreferrer"
              class="source-link"
            >
              Staatssekretariat für Migration SEM
            </a>
            <span class="ml-2">(Stand: 11.03.2025)</span>
          </div>
        </div>

        <!-- Tipps -->
        <header class="section-header">
          <h2 class="text-h3 text-orange-600 mb-2">Tipps für den Alltag in Uri</h2>
        </header>

        <section class="content-section">
          <p class="body-regular mb-4">
            Die Integration in eine neue Umgebung kann herausfordernd sein, aber mit ein paar hilfreichen Tipps
            wird Ihnen der Einstieg leichter fallen. Diese Tipps sollen Sie dabei unterstützen, sich in Uri
            zurechtzufinden und Teil der Gemeinschaft zu werden.
          </p>
        </section>

        <!-- Teilnahme und Sprache -->
        <header class="section-header">
          <h3 class="text-h3 text-orange-600 mb-2">Teilnahme und Sprache</h3>
        </header>

        <section class="content-section">
          <p class="body-regular mb-4">
            Wochenmärkte und Konzerte, aber auch Spaziergänge und Wanderungen sind gute Gelegenheiten,
            die kulturellen Regeln und Menschen in Uri kennenzulernen. Es braucht keine Sprachkenntnisse,
            um den öffentlichen Raum zu nutzen, um erste Kontakte mit Urnerinnen und Urnern zu knüpfen.
            Das Lernen der Sprache ist allerdings ein wichtiger Aspekt, um Sprachbarrieren und Missverständnisse
            zu verhindern und um Teil der Urner Gemeinschaft zu werden.
          </p>
        </section>

        <!-- Bräuche -->
        <header class="section-header">
          <h2 class="text-h3 text-orange-600 mb-2">Urner Feste und Bräuche</h2>
        </header>

        <section class="content-section">
          <p class="body-regular mb-4">
            Fasnacht, Samichlaus, Alpaufzug, 1. August – die Menschen im Kanton Uri feiern viele
            traditionelle Feste. Zu diesen Festen finden auch jedes Jahr grosse Märkte und Events
            in Altdorf statt. Feiern Sie mit!
            <br><br>
            Ein Brauchtum, der das ganze Jahr stattfindet, ist das gegenseitige Begrüssen in der
            Nachbarschaft, beim Spazieren oder auf Wanderungen. Gegrüsst wird mit «Griäzi» und «Guete Tag».
            <br><br>
            Weitere Informationen über Urner Bräuche und gelebte Traditionen finden Sie auf der
            <router-link to="/learning" class="nav-link">Lernen-Seite</router-link>.
          </p>
        </section>

        <!-- Links -->
        <header class="section-header">
          <h1 class="text-h3 text-orange-600 mb-2">Nützliche Links</h1>
        </header>

        <section class="mb-8">
          <div class="links-grid">
            <div class="link-card">
              <h4 class="text-h5 text-orange-600 mb-2 font-semibold">Fachstelle Integration und Vernetzung Uri</h4>
              <p class="body-regular mb-2">
                Die Fachstelle Integration und Vernetzung Uri ist Ihre Anlaufstelle, wenn Sie
                Beratungen in Anspruch nehmen möchten oder wenn Sie sich über bestehende Angebote im Kanton Uri
                informieren möchten.
              </p>
              <a href="https://www.ur.ch/unterinstanzen/1436" target="_blank" class="external-link">www.ur.ch/unterinstanzen/1436</a>
            </div>

            <div class="link-card">
              <h4 class="text-h5 text-orange-600 mb-2 font-semibold">Integration Uri</h4>
              <p class="body-regular mb-2">
                Die Integrations-Agenda beschreibt den Best-Case-Integrationsprozess («Soll-Integrationsprozess») für 16–25-Jährige.
                Die einzelnen Phasen der Integration werden im Dokument «Integrationsagenda Schweiz: Bericht der Koordinationsgruppe vom 1. März 2018» ausführlich beschrieben.
              </p>
              <a href="https://www.integration-uri.ch" target="_blank" class="external-link">www.integration-uri.ch</a>
            </div>

            <div class="link-card">
              <h4 class="text-h5 text-orange-600 mb-2 font-semibold">Staatssekretariat für Migration SEM</h4>
              <p class="body-regular mb-2">Weiterführende Informationen zur Integrationsagenda:</p>
              <div class="flex flex-col gap-2">
                <a
                  href="https://www.sem.admin.ch/sem/fr/home/integration-einbuergerung/integrationsfoerderung/kantonale-programme/integrationsagenda"
                  target="_blank"
                  class="external-link"
                >Integrationsagenda</a>
                <a
                  href="https://www.sem.admin.ch/dam/sem/de/data/integration/agenda/ber-koordinationsgruppe-integrationsagenda-d.pdf.download.pdf/ber-koordinationsgruppe-integrationsagenda-d.pdf"
                  target="_blank"
                  class="external-link"
                >Bericht der Koordinationsgruppe (PDF)</a>
              </div>
            </div>

            <div class="link-card">
              <h4 class="text-h5 text-orange-600 mb-2 font-semibold">Familien Uri</h4>
              <p class="body-regular mb-2">
                Familien Uri ist eine Plattform für Familienevents, Betreuungsangebote und
                Bildungsangebote für Familien im Kanton Uri.
              </p>
              <a href="https://www.familien-uri.ch" target="_blank" class="external-link">www.familien-uri.ch</a>
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
    return { isFullscreen: false }
  },
  methods: {
    // Toggle hero image fullscreen; lock body scroll when active
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen
      document.body.style.overflow = this.isFullscreen ? 'hidden' : ''
    }
  }
}
</script>