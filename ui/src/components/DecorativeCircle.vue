<template>
  <div
    :style="circleStyle"
    class="pointer-events-none select-none "
    aria-hidden="true"
  
  ></div>
</template>

<script>
export default {
  name: "DecorativeCircle",
  props: {
    baseSize: { type: Number, default: 400 },
    smSize: { type: Number, default: 120 },
    color: { type: String, default: 'rgba(255, 243, 205, 1)' },
    transparentColor: { type: String, default: 'rgba(255, 243, 205, 0.4)' },
    top: { type: String, default: null },
    left: { type: String, default: null },
    right: { type: String, default: null },
    bottom: { type: String, default: null },
    z: { type: Number, default: 0 }
  },
  data() {
    return {
      isSmall: false
    }
  },
  computed: {
    circleStyle() {
      const size = this.isSmall ? this.smSize : this.baseSize
      const bg = this.isSmall ? this.transparentColor : this.color
      return {
        position: 'absolute',
        width: size + 'px',
        height: size + 'px',
        backgroundColor: bg,
        borderRadius: '50%',
        zIndex: this.z,
        top: this.top,
        left: this.left,
        right: this.right,
        bottom: this.bottom,
        transition: 'width 0.4s, height 0.4s, background-color 0.4s'
      }
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.isSmall = window.innerWidth < 1024
    }
  }
}
</script>
