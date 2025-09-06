<template>
  <section class="w-full relative z-0">
    <div class="relative w-full">
      <!-- Responsive hero background image -->
      <picture>
        <source srcset="@/assets/images/1.jpg" media="(min-width: 768px)" />
        <img
          src="@/assets/images/1.jpg"
          alt="Landscape of Uri"
          class="w-full h-[60vh] md:h-[800px] object-cover block"
          loading="eager"
          decoding="async"
          sizes="100vw"
        />
      </picture>

      <!-- Gradient overlay for better text contrast -->
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent z-0"
        aria-hidden="true"
      ></div>

      <!-- Hero overlay content -->
      <div class="hero-overlay px-4 md:px-10 relative z-10">
        <!-- Logo and headline -->
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 text-center"
        >
          <img
            src="@/assets/images/logo1.jpeg"
            alt="Kanton Uri Flag"
            class="h-14 sm:h-20 rounded shadow-md object-contain"
            loading="lazy"
            decoding="async"
          />
          <h1
            class="text-h1 text-white leading-tight flex flex-row flex-wrap gap-3 justify-center"
          >
            <span>Griäzi!</span>
            <span>Willkommen!</span>
          </h1>
        </div>

        <!-- Greetings grid (always 3x3 layout) -->
        <div
          class="greetings grid grid-cols-3 gap-3 md:gap-6 p-2 w-full max-w-5xl mx-auto"
        >
          <p
            v-for="(greeting, index) in greetings9"
            :key="index"
            :class="[
              'greeting-item body-lead text-white flex flex-col items-center justify-center gap-1 text-center min-h-[72px]',
              `pulse-${index % 5}`
            ]"
          >
            {{ greeting.text }}
            <span
              class="body-regular opacity-70 mt-1 font-normal tracking-tight"
              >{{ greeting.lang }}</span
            >
          </p>
        </div>
      </div>
    </div>

    <!-- Orange section below hero -->
    <div class="orange-section">
      <div class="max-w-5xl mx-auto text-center px-4">
        <h2 class="text-h3 hero-h1 text-white mb-2">
          Gemeinsam Weg und Wissen Teilen
        </h2>
        <!-- Rotating translations -->
        <p
          class="body-lead-2 text-white transition-all duration-500"
          :key="currentIndex"
          aria-live="polite"
        >
          {{ translations[currentIndex].text }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  data() {
    return {
      currentIndex: 0,
      rotateInterval: null,
      translations: [
        { lang: "tr", text: "Yolu ve bilgiyi birlikte paylaşmak" },
        { lang: "ar", text: "مشاركة الطريق والمعرفة معا" },
        { lang: "fa", text: "به اشتراک گذاشتن راه و دانش با یکدیگر" },
        { lang: "ps", text: "د لارې او پوهې شریکول" },
        { lang: "ti", text: "መንገድን ፍልጠትን ብሓባር ምክፋል" },
        { lang: "so", text: "Wadajir u wadaagista wadada iyo aqoonta" },
        { lang: "ur", text: "راستہ اور علم کا مشترکہ اشتراک" },
        { lang: "ku", text: "Rê û zanînê bi hev re parve bikin" },
        { lang: "am", text: "መንገድና እውቀትን በአንድነት መካፈል" },
        { lang: "sw", text: "Kushiriki njia na maarifa pamoja" },
      ],
      greetings: [
        { text: "مرحبا", lang: "Arabisch" },
        { text: "Merhaba", lang: "Türkisch" },
        { text: "سلام", lang: "Persisch" },
        { text: "ሰላም", lang: "Tigrinya" },
        { text: "Здравствуйте", lang: "Russisch" },
        { text: "வணக்கம்", lang: "Tamil" },
        { text: "Përshëndetje", lang: "Albanisch" },
        { text: "नमस्ते", lang: "Hindi" },
        { text: "Zdravo", lang: "Serbisch" },
      ],
    };
  },
  computed: {
    // Limit greetings to 9 items for consistent 3x3 layout
    greetings9() {
      return this.greetings.slice(0, 9);
    },
  },
  mounted() {
    document.addEventListener("visibilitychange", this.onVisibility);
    this.startRotation();
  },
  beforeUnmount() {
    this.stopRotation();
    document.removeEventListener("visibilitychange", this.onVisibility);
  },
  methods: {
    startRotation() {
      this.stopRotation();
      this.rotateInterval = setInterval(this.rotateText, 1500);
    },
    stopRotation() {
      if (this.rotateInterval) {
        clearInterval(this.rotateInterval);
        this.rotateInterval = null;
      }
    },
    onVisibility() {
      if (document.hidden) this.stopRotation();
      else this.startRotation();
    },
    rotateText() {
      this.currentIndex =
        (this.currentIndex + 1) % this.translations.length;
    },
  },
};
</script>

<style scoped>
/* Disable pulse animations if user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  .greetings [class*="pulse-"] {
    animation: none !important;
  }
}
</style>