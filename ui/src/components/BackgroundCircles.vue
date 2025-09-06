<template>
  <div aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10">
    <!-- A) Left yellow -->
    <DecorativeCircle
      class="hidden md:block"
      :baseSize="400" :smSize="120"
      color="rgba(255, 243, 205, 1)"
      transparentColor="rgba(255, 243, 205, 0.4)"
      top="40%" left="-50%" :z="-2"
    />
    <DecorativeCircle
      class="md:hidden"
      :baseSize="400" :smSize="140"
      color="rgba(255, 243, 205, 1)"
      transparentColor="rgba(255, 243, 205, 0.4)"
      top="18%" left="-50%" :z="-2"
    />

    <!-- B) Right yellow -->
    <DecorativeCircle
      class="hidden md:block"
      :baseSize="350" :smSize="100"
      color="rgba(255, 243, 205, 1)"
      transparentColor="rgba(255, 243, 205, 0.3)"
      top="55%" right="-50%" :z="-2"
    />
    <DecorativeCircle
      class="md:hidden"
      :baseSize="350" :smSize="120"
      color="rgba(255, 243, 205, 1)"
      transparentColor="rgba(255, 243, 205, 0.3)"
      top="58%" right="-50%" :z="-2"
    />

    <!-- C) Left orange -->
    <DecorativeCircle
      class="hidden sm:block"
      :baseSize="250" :smSize="80"
      color="rgba(255, 229, 208, 1)"
      transparentColor="rgba(255, 229, 208, 0.3)"
      top="67%" left="-50%" :z="-2"
    />

    <!-- D) Large orange -->
    <DecorativeCircle
      class="hidden lg:block"
      :baseSize="475" :smSize="140"
      color="rgba(255, 229, 208, 1)"
      transparentColor="rgba(255, 229, 208, 0.3)"
      top="32%" right="-50%" :z="-3"
    />
  </div>
</template>

<script>
import DecorativeCircle from './DecorativeCircle.vue'

export default {
  name: 'BackgroundCircles',
  components: { DecorativeCircle }
}
</script>