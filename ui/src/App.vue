<template>
  <div class="landing-page relative overflow-x-hidden">
    <BackgroundCircles />
    <TheNavbar />
    <div>
      <router-view v-if="$route.path !== '/'" />
      <HomeView v-else />
    </div>
    <BaseImage />
    <FooterSection />
  </div>
</template>

<script>
import BackgroundCircles from '@/components/BackgroundCircles.vue'
import TheNavbar from '@/components/TheNavbar.vue'
import FooterSection from '@/components/FooterSection.vue'
import HomeView from '@/views/HomeView.vue'
import BaseImage from '@/components/BaseImage.vue'

export default {
  name: 'App',
  components: {
    BackgroundCircles,
    TheNavbar,
    FooterSection,
    HomeView,
    BaseImage
  }
}
</script>