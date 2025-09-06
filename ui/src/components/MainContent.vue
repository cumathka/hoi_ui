<template>
  <main class="mc-root relative z-20 isolate">
    <!-- About -->
    <section class="mc-section">
      <h2 class="mc-title mt-8">Hier kommen Sie weiter</h2>
      <p class="mc-text max-w-3xl">
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

    <!-- Cards -->
    <section class="mc-section">
      <div class="mc-grid max-w-5xl">
        <router-link
          v-for="(card, index) in cards"
          :key="index"
          :to="card.route"
          class="mc-card-link h-full"
        >
          <div class="mc-card-inner" :class="index % 2 ? 'mc-cyan-light' : 'mc-cyan-dark'">
            <div class="mc-card-icon">
              <img :src="card.icon" :alt="card.title" width="128" height="128" loading="lazy" decoding="async" />
            </div>
            <h3 class="mc-card-title">{{ card.title }}</h3>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Events -->
    <section class="mc-section">
      <h2 class="mc-title">Events</h2>
      <p class="mc-text max-w-3xl">
        Entdecken Sie Veranstaltungen in Uri und Umgebung, die Ihnen helfen, neue Kontakte zu knüpfen und sich
        zu integrieren.
      </p>
      <div class="mc-map mt-7 rounded-lg overflow-hidden shadow-lg">
        <TheMap />
      </div>
    </section>
  </main>
</template>

<script>
import TheMap from '@/components/TheMap.vue'
export default {
  name: 'MainContent',
  components: { TheMap },
  data() {
    return {
      cards: [
        { title: 'Informationen', icon: 'https://c.animaapp.com/m939jagjfdOBIu/img/union-8.svg',  route: '/info' },
        { title: 'Lernen',        icon: 'https://c.animaapp.com/m939jagjfdOBIu/img/union-23.svg', route: '/learning' },
        { title: 'Jobs',          icon: 'https://c.animaapp.com/m939jagjfdOBIu/img/union-11.svg', route: '/jobs' },
        { title: 'Events',        icon: 'https://c.animaapp.com/m939jagjfdOBIu/img/union-10.svg', route: '/events' }
      ]
    }
  }
}
</script>

<style scoped>
/* Root: centered container; extra laptop gutters to avoid overlapping circles */
.mc-root{
  max-width: var(--container-max-width);
  margin-inline: auto;
  padding-inline: 20px;
  padding-top: 12px;
  background: transparent;
}
@media (min-width:1024px) and (max-width:1440px){
  .mc-root{
    padding-left: clamp(32px, 8vw, 96px);
    padding-right: clamp(32px, 8vw, 96px);
    padding-top: 24px;
  }
}
@media (min-width:1441px){
  .mc-root{
    padding-left: clamp(40px, 10vw, 120px);
    padding-right: clamp(40px, 10vw, 120px);
    padding-top: 28px;
  }
}

/* Sections */
.mc-section{ margin-bottom: 60px; }

/* Headings & text (left-aligned) */
.mc-title{
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: var(--text-h1-size);
  line-height: 1.15;
  color: var(--orange-600);
  margin-bottom: 28px;
  text-align: left;
}
.mc-text{
  font-family: var(--font-body);
  font-weight: 400;
  font-size: var(--text-regular-size);
  line-height: 1.6;
  color: var(--gray-900);
  text-align: left;
}

/* Cards grid */
.mc-grid{
  display:grid;
  grid-template-columns: repeat(4, minmax(0,1fr));
  gap: 24px;
  align-items: stretch;
}
.mc-card-link{
  display:block; height:100%;
  text-decoration:none; cursor:pointer;
  transition: transform var(--transition-normal);
}
@media (hover:hover){ .mc-card-link:hover{ transform: translateY(-2px); } }

.mc-card-inner{
  height:100%;
  min-height:200px;
  border-radius:20px;
  padding:28px 24px;
  text-align:center;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px;
}
.mc-cyan-light{ background-color: var(--cyan-600); color: var(--white); }
.mc-cyan-dark{  background-color: var(--cyan-700); color: var(--white); }

.mc-card-icon img{ width:80px; height:80px; object-fit:contain; }
.mc-card-title{
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.2;
  margin:0; color: var(--white);
}

/* Map */
.mc-map{ max-width:100%; min-height:320px; }
@media (max-width:768px){
  .mc-map{ aspect-ratio:16/10; min-height:260px; }
}

/* Responsive grid */
@media (max-width:968px){
  .mc-grid{ grid-template-columns: repeat(2, minmax(0,1fr)); max-width:720px; margin-inline:auto; }
  .mc-card-inner{ min-height:184px; }
}
@media (max-width:480px){
  .mc-grid{ grid-template-columns:1fr; max-width:440px; margin-inline:auto; }
  .mc-card-inner{ min-height:172px; }
}

/* Smaller title on phones */
@media (max-width:768px){
  .mc-title{ font-size: 2rem; }
}
</style>