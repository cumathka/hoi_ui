<template>
  <div class="flex flex-col min-h-screen bg-white">
    <TheNavbar />
    <main class="flex-1">
      <router-view />
    </main>
    <FooterSection />
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import FooterSection from '@/components/FooterSection.vue'

export default {
  name: 'App',
  components: {
    TheNavbar,
    FooterSection
  }
}
</script>
