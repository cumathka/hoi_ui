<template>
    <section class="w-full relative">
        <div class="relative w-full">
            <img src="@/assets/images/1.jpg" alt="Hero Background"
                class="w-full h-[60vh] md:h-[800px] object-cover block" />

            <div class="hero-overlay">
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                    <img src="@/assets/images/logo1.png" alt="Uri Flag"
                        class="h-16 sm:h-20 rounded shadow-md object-contain" />
                    <h1 class="text-h1 text-white leading-tight flex flex-row gap-3">
                        <span>Griäzi!</span>
                        <span>Willkommen!</span>
                    </h1>
                </div>

                <div class="greetings grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 p-2 w-full">
                    <p v-for="(greeting, index) in greetings" :key="index" :class="[
                        'greeting-item body-lead text-white flex flex-col items-center gap-1',
                        `pulse-${index % 5}`
                    ]">
                        {{ greeting.text }}
                        <span class="body-regular opacity-70 mt-1 font-normal tracking-tight">{{ greeting.lang }}</span>
                    </p>
                </div>
            </div>
        </div>
        
        <!-- Turuncu Alan -->
        <div class="orange-section">
            <div class="max-w-5xl mx-auto text-center px-4">
                <h1 class="text-h3 text-white mb-2">
                    Gemeinsam Weg und Wissen Teilen
                </h1>
                <p class="body-lead text-white transition-all duration-500" :key="currentIndex">
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
