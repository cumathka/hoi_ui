<template>
  <div class="landing-page relative overflow-x-hidden">
    <!-- Daireler -->
    <DecorativeCircle
      :size="400"
      color="rgba(255, 243, 205, 1)"
      top="40%"
      left="-250px"
    />
    <DecorativeCircle
      :size="350"
      color="rgba(255, 243, 205, 1)"
      top="55%"
      right="-200px"
    />
    <DecorativeCircle
      :size="250"
      color="rgba(255, 229, 208, 1)"
      top="67%"
      left="-150px"
    />
    <DecorativeCircle
      :size="475"
      color="rgba(255, 229, 208, 1)"
      top="32%"
      right="-300px"
    />

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
import DecorativeCircle from '@/components/DecorativeCircle.vue'
import TheNavbar from '@/components/TheNavbar.vue'
import FooterSection from '@/components/FooterSection.vue'
import HomeView from '@/views/HomeView.vue'
import BaseImage from '@/components/BaseImage.vue'

export default {
  name: 'App',
  components: {
    DecorativeCircle,
    TheNavbar,
    FooterSection,
    HomeView,
    BaseImage
  }
}
</script>
