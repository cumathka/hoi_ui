<template>
  <div id="app">
    <TheNavbar />
    <router-view />
    <FooterSection />
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue'
import FooterSection from './components/FooterSection.vue'

export default {
  name: 'App',
  components: {
    TheNavbar,
    FooterSection
  }
}
</script>
