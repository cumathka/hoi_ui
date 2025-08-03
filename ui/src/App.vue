<template>
  <div class="landing-page relative overflow-x-hidden">
    <DecorativeCircle
      :baseSize="400"
      :smSize="120"
      color="rgba(255, 243, 205, 1)"
      transparentColor="rgba(255, 243, 205, 0.4)"
      top="40%"
      left="-180px"
    />
    <DecorativeCircle
      :baseSize="350"
      :smSize="100"
      color="rgba(255, 243, 205, 1)"
      transparentColor="rgba(255, 243, 205, 0.3)"
      top="55%"
      right="-150px"
    />
    <DecorativeCircle
      :baseSize="250"
      :smSize="80"
      color="rgba(255, 229, 208, 1)"
      transparentColor="rgba(255, 229, 208, 0.3)"
      top="67%"
      left="-100px"
    />
    <DecorativeCircle
      :baseSize="475"
      :smSize="140"
      color="rgba(255, 229, 208, 1)"
      transparentColor="rgba(255, 229, 208, 0.3)"
      top="32%"
      right="-200px"
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