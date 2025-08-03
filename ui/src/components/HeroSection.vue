<template>
  <section class="w-full relative">
    <div class="relative w-full">
      <img
        src="@/assets/images/1.jpg"
        alt="Hero Background"
        class="w-full h-[60vh] md:h-[800px] object-cover block"
      />
      <div
        class="hero-overlay absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               w-[95vw] max-w-3xl p-6 md:p-14 rounded-2xl text-center text-white shadow-2xl flex flex-col items-center z-10"
      >
        <div class="main-greeting flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 mb-8 w-full">
          <img src="@/assets/images/logo1.png" alt="Uri Flag"
               class="h-16 md:h-24 rounded shadow-md object-contain align-middle mb-2 sm:mb-0" />
          <h1 class="hero-title font-inter font-light text-[2.2rem] md:text-[5.5rem] leading-tight flex flex-col sm:flex-row gap-2 md:gap-4 items-center">
            <span>Griäzi!</span>
            <span>Willkommen!</span>
          </h1>
        </div>
        <div class="greetings grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 p-2 w-full">
          <p
            v-for="(greeting, index) in greetings"
            :key="index"
            :class="[
              'greeting-item text-[2rem] md:text-[2.5rem] font-light flex flex-col items-center gap-1',
              `pulse-${index % 5}`
            ]"
          >
            {{ greeting.text }}
            <span class="text-base md:text-xl opacity-70 mt-1 font-normal tracking-tight">{{ greeting.lang }}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- Turuncu Alan -->
    <div class="w-full py-6 relative z-20" style="background-color: rgba(253, 126, 20, 0.9)">
      <div class="max-w-5xl mx-auto text-center px-4">
        <h2 class="font-bold text-2xl md:text-4xl text-white mb-2 font-inter">
          Gemeinsam Weg und Wissen Teilen
        </h2>
        <p
          class="font-semibold text-lg md:text-2xl text-white transition-all duration-500"
          :key="currentIndex"
        >
          {{ translations[currentIndex].text }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  data() {
    return {
      currentIndex: 0,
      rotateInterval: null,
      translations: [
        { lang: 'tr', text: 'Yolu ve bilgiyi birlikte paylaşmak' },
        { lang: 'ar', text: 'مشاركة الطريق والمعرفة معا' },
        { lang: 'fa', text: 'به اشتراک گذاشتن راه و دانش با یکدیگر' },
        { lang: 'ps', text: 'د لارې او پوهې شریکول' },
        { lang: 'ti', text: 'መንገድን ፍልጠትን ብሓባር ምክፋል' },
        { lang: 'so', text: 'Wadajir u wadaagista wadada iyo aqoonta' },
        { lang: 'ur', text: 'راستہ اور علم کا مشترکہ اشتراک' },
        { lang: 'ku', text: 'Rê û zanînê bi hev re parve bikin' },
        { lang: 'am', text: 'መንገድና እውቀትን በአንድነት መካፈል' },
        { lang: 'sw', text: 'Kushiriki njia na maarifa pamoja' }
      ],
      greetings: [
        { text: 'مرحبا', lang: 'Arabisch' },
        { text: 'Merhaba', lang: 'Türkisch' },
        { text: 'سلام', lang: 'Persisch' },
        { text: 'ሰላም', lang: 'Tigrinya' },
        { text: 'Здравствуйте', lang: 'Russisch' },
        { text: 'வணக்கம்', lang: 'Tamil' },
        { text: 'Përshëndetje', lang: 'Albanisch' },
        { text: 'नमस्ते', lang: 'Hindi' },
        { text: 'Zdravo', lang: 'Serbisch' },
      ]
    }
  },
  mounted() {
    this.rotateInterval = setInterval(this.rotateText, 1500);
  },
  methods: {
    rotateText() {
      this.currentIndex = (this.currentIndex + 1) % this.translations.length;
    }
  },
  beforeUnmount() {
    clearInterval(this.rotateInterval);
  }
}
</script>

<style scoped>
.hero-overlay {
  background: rgba(8, 121, 144, 0.65);
}
.pulse-0 { animation: pulse 4s ease-in-out infinite; }
.pulse-1 { animation: pulse 4s ease-in-out infinite 0.8s; }
.pulse-2 { animation: pulse 4s ease-in-out infinite 1.6s; }
.pulse-3 { animation: pulse 4s ease-in-out infinite 2.4s; }
.pulse-4 { animation: pulse 4s ease-in-out infinite 3.2s; }
@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scale(0.95);}
  50% { opacity: 1; transform: scale(1);}
}
/* Footer flags responsive */
.footer-flags {
  position: absolute;
  width: 100vw;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 0;
  overflow: visible;
  max-width: 100vw;
}
.flag-img {
  opacity: 0.7;
  height: 160px;
  width: auto;
  max-width: 30vw;
  min-width: 60px;
  transition: height 0.3s, margin 0.3s, opacity 0.3s, max-width 0.3s;
  object-fit: contain;
  box-sizing: border-box;
}
.left-flag { margin-left: -200px; }
.right-flag { margin-right: -200px; }

@media (min-width: 1600px) {
  .footer-flags { max-width: 1600px; }
  .flag-img { height: 180px; max-width: 18vw; }
  .left-flag { margin-left: -20px; }
  .right-flag { margin-right: -20px; }
}
@media (max-width: 1599px) and (min-width: 1000px) {
  .footer-flags { max-width: 1000px; }
  .flag-img { height: 160px; max-width: 20vw; }
  .left-flag { margin-left: -210px; }
  .right-flag { margin-right: -210px; }
}
@media (max-width: 999px) and (min-width: 756px) {
  .footer-flags { max-width: 120vw; }
  .flag-img { height: 100px; max-width: 25vw; }
  .left-flag { margin-left: -100px; }
  .right-flag { margin-right: -100px; }
}
@media (max-width: 755px) and (min-width: 600px) {
  .footer-flags {
    position: static;
    transform: none;
    justify-content: center;
    margin-bottom: 1rem;
    gap: 1.5rem;
    max-width: 100vw;
  }
  .flag-img {
    height: 90px;
    max-width: 30vw;
    margin: 0 !important;
    opacity: 0.5;
  }
}
@media (max-width: 599px) and (min-width: 100px) {
  .footer-flags {
    position: static;
    transform: none;
    justify-content: center;
    margin-bottom: 1rem;
    gap: 1rem;
    max-width: 100vw;
  }
  .flag-img {
    height: 30px;
    max-width: 40vw;
    margin: 0 !important;
    opacity: 0.4;
  }
}
@media (max-width: 100px) {
  .flag-img { display: none; }
}

</style>
