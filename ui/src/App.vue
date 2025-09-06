<template>
  <div class="landing-page relative overflow-x-hidden">
    <!-- ===== Decorative Circles (Responsive) ===== -->

    <!-- A) Sol soluk sarı -->
    <!-- Desktop / Tablet -->
    <DecorativeCircle
      class="hidden md:block"
      :baseSize="400"
      :smSize="120"
      color="rgba(255, 243, 205, 1)"
      transparentColor="rgba(255, 243, 205, 0.4)"
      top="40%"
      left="-200px"
      :z="-2"
      responsiveMode="scale"
      :breakpoint="1024"
    />
    <!-- Mobile varyant (farklı konum) -->
    <DecorativeCircle
      class="md:hidden"
      :baseSize="400"
      :smSize="120"
      color="rgba(255, 243, 205, 1)"
      transparentColor="rgba(255, 243, 205, 0.4)"
      top="22%"
      left="-80px"
      :z="-2"
      responsiveMode="scale"
      :breakpoint="1024"
    />

    <!-- B) Sağ soluk sarı -->
    <!-- Desktop / Tablet -->
    <DecorativeCircle
      class="hidden md:block"
      :baseSize="350"
      :smSize="100"
      color="rgba(255, 243, 205, 1)"
      transparentColor="rgba(255, 243, 205, 0.3)"
      top="55%"
      right="-175px"
      :z="-2"
      responsiveMode="scale"
      :breakpoint="1024"
    />
    <!-- Mobile varyant -->
    <DecorativeCircle
      class="md:hidden"
      :baseSize="350"
      :smSize="100"
      color="rgba(255, 243, 205, 1)"
      transparentColor="rgba(255, 243, 205, 0.3)"
      top="35%"
      right="-60px"
      :z="-2"
      responsiveMode="scale"
      :breakpoint="1024"
    />

    <!-- C) Sol turuncu açık -->
    <!-- Her boyutta; mobilde daha aşağıda -->
    <DecorativeCircle
      class=""
      :baseSize="250"
      :smSize="80"
      color="rgba(255, 229, 208, 1)"
      transparentColor="rgba(255, 229, 208, 0.3)"
      top="67%"
      left="-125px"
      :z="-2"
      responsiveMode="scale"
      :breakpoint="1024"
    />
    <!-- Mobile alternatif konum (çakışma olursa aç) -->
    <!--
    <DecorativeCircle
      class="md:hidden"
      :baseSize="250"
      :smSize="80"
      color="rgba(255, 229, 208, 1)"
      transparentColor="rgba(255, 229, 208, 0.3)"
      top="60%"
      left="-40px"
      :z="-2"
      responsiveMode="scale"
      :breakpoint="1024"
    />
    -->

    <!-- D) Büyük turuncu açık -->
    <!-- Sadece büyük ekranlarda göster (lg+) -->
    <DecorativeCircle
      class="hidden lg:block"
      :baseSize="475"
      :smSize="140"
      color="rgba(255, 229, 208, 1)"
      transparentColor="rgba(255, 229, 208, 0.3)"
      top="32%"
      right="-237px"
      :z="-3"
      responsiveMode="scale"
      :breakpoint="1024"
    />

    <!-- ===== Content ===== -->
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