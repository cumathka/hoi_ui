<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen px-4"
    style="background-color: rgb(252, 246, 231);"
  >
    <img
      src="@/assets/images/404.jpeg"
      alt="Logo"
      class="h-[36rem] w-auto mb-8"
      style="box-shadow: none; border-radius: 0;"
    />
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">Seite nicht gefunden</h2>
    <p class="text-gray-600 mb-6 text-center max-w-md">
      Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.<br>
      Nutzen Sie die Suche oder kehren Sie zur Startseite zurück.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <router-link
        to="/"
        class="inline-block px-6 py-3 bg-cyan-700 text-white rounded-lg font-medium shadow hover:bg-cyan-800 transition"
      >
        Zur Startseite
      </router-link>
      <router-link
        to="/events"
        class="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg font-medium shadow hover:bg-orange-700 transition"
      >
        Events entdecken
      </router-link>
    </div>
  </div>
</template>
