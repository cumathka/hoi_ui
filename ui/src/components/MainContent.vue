<template>
  <main class="container relative z-10">
    <!-- Hakkımızda Bölümü -->
    <section class="mb-16">
      <h2 class="text-h1 text-orange-600 mb-7 mt-8">
        Hier kommen Sie weiter
      </h2>
      <p class="text-regular text-gray-900 leading-relaxed">
        Wir freuen uns, Sie auf unserer Plattform begrüssen zu dürfen! Wir wissen, dass der Start in einem
        neuen Land viele Herausforderungen mit sich bringt, aber auch unzählige Chancen bietet.
        <br><br>
        Hier finden Sie wertvolle Informationen und hilfreiche Angebote, die Ihnen den Start in
        Uri und der Schweiz erleichtern sollen.<br><br>
        Entdecken Sie die vielfältigen Möglichkeiten, die
        Uri zu bieten hat. Von Sprachkursen über Bewerbungstipps bis hin zu Veranstaltungen – wir sind für Sie
        da und unterstützen Sie auf eurem Weg.<br>
        Lassen Sie uns gemeinsam diese Reise antreten, voneinander
        lernen und uns gegenseitig helfen. Wir freuen uns darauf, Sie kennenzulernen!
      </p>
    </section>
    
    <!-- Kartlar Bölümü -->
    <section class="mb-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        <router-link 
          v-for="(card, index) in cards" 
          :key="index"
          :to="card.route"
          class="card-link"
        >
          <div :class="[
            'card-item',
            index % 2 ? 'card-cyan-light' : 'card-cyan-dark'
          ]">
            <div class="mb-5">
              <img :src="card.icon" :alt="card.title" class="w-20 h-20 object-contain" />
            </div>
            <h3 class="text-h5 text-white mt-2">
              {{ card.title }}
            </h3>
          </div>
        </router-link>
      </div>
    </section>
    
    <!-- Etkinlikler Bölümü -->
    <section class="mb-16">
      <h2 class="text-h1 text-orange-600 mb-7">
        Events
      </h2>
      <p class="text-regular text-gray-900 leading-relaxed">
        Entdecken Sie Veranstaltungen in Uri und Umgebung, die Ihnen helfen, neue Kontakte zu knüpfen und sich
        zu integrieren.
      </p>
      <div class="mt-7 rounded-lg overflow-hidden shadow-lg">
        <the-map />
      </div>
    </section>
  </main>
</template>

<script>
import TheMap from '@/components/TheMap.vue'
export default {
  name: 'MainContent',
  data() {
    return {
      cards: [
        { 
          title: 'Informationen',
          icon: 'https://c.animaapp.com/m939jagjfdOBIu/img/union-8.svg',
          route: '/info'
        },
        { 
          title: 'Lernen',
          icon: 'https://c.animaapp.com/m939jagjfdOBIu/img/union-23.svg',
          route: '/learning'
        },
        { 
          title: 'Jobs',
          icon: 'https://c.animaapp.com/m939jagjfdOBIu/img/union-11.svg',
          route: '/jobs'
        },
        { 
          title: 'Events',
          icon: 'https://c.animaapp.com/m939jagjfdOBIu/img/union-10.svg',
          route: '/events'
        }
      ]
    }
  },
  components: {
    TheMap
  },
}
</script>
