<template>
  <section class="w-full relative">
    <div class="relative w-full">
      <img
        src="@/assets/images/1.jpg"
        alt="Hero Background"
        class="w-full h-[60vh] md:h-[800px] object-cover block"
      />
      <!-- Mavi kutu overlay -->
      <div
        class="hero-overlay absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               w-[95vw] max-w-3xl p-6 md:p-14 rounded-2xl text-center text-white shadow-2xl flex flex-col items-center z-10"
      >
        <div class="main-greeting flex items-center justify-center gap-5 md:gap-8 mb-8">
          <img src="@/assets/images/logo1.png" alt="Uri Flag" class="h-16 md:h-24 rounded shadow" />
          <h1
            class="hero-title font-inter font-light text-[2.2rem] md:text-[5.5rem] leading-tight mb-2"
          >
            Griäzi! Willkommen!
          </h1>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 p-2 w-full">
          <p
            v-for="(greeting, index) in greetings"
            :key="index"
            :class="[
              'text-2xl md:text-3xl font-semibold flex flex-col items-center',
              `pulse-${index % 5}`
            ]"
          >
            {{ greeting.text }}
            <span class="text-base md:text-xl opacity-70 mt-1 font-medium tracking-tight">{{ greeting.lang }}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- Turuncu Alan -->
    <div class="w-full bg-orange-600 py-6 relative z-20">
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
  background: rgba(8, 121, 144, 0.65); /* Orijinaldeki gibi opak ve canlı mavi */
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
</style>
