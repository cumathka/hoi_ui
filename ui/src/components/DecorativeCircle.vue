<template>
  <div
    class="dc pointer-events-none select-none"
    :style="styleVars"
    aria-hidden="true"
  ></div>
</template>

<script>
export default {
  name: "DecorativeCircle",
  props: {
    baseSize: { type: Number, default: 400 },      // büyük ekranda taban boyut (px)
    smSize: { type: Number, default: 120 },         // küçük ekranda hedef boyut (px)
    color: { type: String, default: 'rgba(255, 243, 205, 1)' },
    transparentColor: { type: String, default: 'rgba(255, 243, 205, 0.4)' },
    top: { type: String, default: null },
    left: { type: String, default: null },
    right: { type: String, default: null },
    bottom: { type: String, default: null },
    z: { type: Number, default: 0 },
    breakpoint: { type: Number, default: 1024 },    // px
    responsiveMode: {                               
      type: String,
      default: 'scale', // 'scale' (performanslı) | 'resize' (genişlik/yükseklik değiştirir)
      validator: v => ['scale', 'resize'].includes(v)
    }
  },
  data() {
    return {
      isSmall: false,
      mql: null,               // matchMedia('(max-width: ...px)')
      reduceMotion: false
    }
  },
  computed: {
    styleVars() {
      const small = this.isSmall
      const bg = small ? this.transparentColor : this.color

      if (this.responsiveMode === 'scale') {
        // transform: scale ile akıcı geçiş (layout reflow yok)
        const scale = Math.max(0.05, Math.min(3, this.smSize / this.baseSize))
        return {
          '--dc-size': this.baseSize + 'px',
          '--dc-bg': bg,
          '--dc-scale': small ? scale : 1,
          position: 'absolute',
          zIndex: this.z,
          top: this.top,
          left: this.left,
          right: this.right,
          bottom: this.bottom
        }
      } else {
        // klasik width/height değiştirme (gerekirse)
        const size = small ? this.smSize : this.baseSize
        return {
          '--dc-size': size + 'px',
          '--dc-bg': bg,
          '--dc-scale': 1,
          position: 'absolute',
          zIndex: this.z,
          top: this.top,
          left: this.left,
          right: this.right,
          bottom: this.bottom
        }
      }
    }
  },
  mounted() {
    // Breakpoint takibi
    this.mql = window.matchMedia(`(max-width: ${this.breakpoint}px)`)
    this.isSmall = this.mql.matches
    this.mql.addEventListener?.('change', this.onMQChange)

    // Motion tercihi
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    this.reduceMotion = rm.matches
    rm.addEventListener?.('change', (e) => { this.reduceMotion = e.matches })
  },
  beforeUnmount() {
    this.mql?.removeEventListener?.('change', this.onMQChange)
  },
  methods: {
    onMQChange(e) {
      this.isSmall = e.matches
    }
  }
}
</script>

<style scoped>
.dc{
  width: var(--dc-size);
  height: var(--dc-size);
  background: var(--dc-bg);
  border-radius: 50%;
  transform: scale(var(--dc-scale));
  /* performans: transform + paint */
  will-change: transform, background-color;

  /* varsayılan geçişler */
  transition:
    transform 400ms ease,
    background-color 400ms ease;
}

/* prefers-reduced-motion: animasyonları yumuşat / kapat */
@media (prefers-reduced-motion: reduce){
  .dc{
    transition: none;
  }
}
</style>