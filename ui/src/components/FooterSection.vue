<template>
  <footer class="w-full bg-yellow-600 py-16 relative overflow-hidden">
    <!-- Responsive Bayraklar: container'ın dışında! -->
    <div class="footer-flags">
      <img src="@/assets/images/uri-flag.png" alt="Uri Canton Flag" class="flag-img left-flag" />
      <img src="@/assets/images/swiss-flag.png" alt="Swiss Flag" class="flag-img right-flag" />
    </div>
    <div class="max-w-6xl w-full px-5 mx-auto relative z-10">
      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <div class="text-center px-4">
          <h5 class="text-black mb-3 font-bold">Kontakt</h5>
          <p class="text-black">+41 100 2064 5533</p>
          <p class="text-black">info@hoiuri.ch</p>
          <div class="flex justify-center gap-3 mt-3">
            <a href="#" class="text-black text-2xl hover:opacity-80"><i class="bi bi-facebook"></i></a>
            <a href="#" class="text-black text-2xl hover:opacity-80"><i class="bi bi-twitter"></i></a>
            <a href="#" class="text-black text-2xl hover:opacity-80"><i class="bi bi-instagram"></i></a>
            <a href="#" class="text-black text-2xl hover:opacity-80"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>
        <div class="text-center px-4">
          <h5 class="text-black mb-3 font-bold">Adresse</h5>
          <p class="text-black">
            Integrationmonitor e.V.<br>
            Goethestraße <br>
            6460 Altdorf<br>
          </p>
        </div>
        <div class="text-center px-4">
          <h5 class="text-black mb-3 font-bold">Tags</h5>
          <div class="flex flex-wrap gap-2 justify-center">
            <span class="bg-black/10 text-black px-3 py-1 rounded-full text-sm">#Integration</span>
            <span class="bg-black/10 text-black px-3 py-1 rounded-full text-sm">#Bildung</span>
            <span class="bg-black/10 text-black px-3 py-1 rounded-full text-sm">#Gemeinschaft</span>
            <span class="bg-black/10 text-black px-3 py-1 rounded-full text-sm">#Kultur</span>
          </div>
        </div>
      </div>
      <div class="mt-12 text-center z-10 relative">
        <p class="text-black">© 2025 Integrationmonitor. Alle Rechte vorbehalten.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection'
}
</script>

<style scoped>
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

.left-flag {
  margin-left: -200px;
}

.right-flag {
  margin-right: -200px;
}

/* 1600px ve üstü: Daha fazla taşma */
@media (min-width: 1600px) {
  .footer-flags {
    max-width: 1600px;
  }
  .flag-img {
    height: 180px;
    max-width: 18vw;
  }
  .left-flag {
    margin-left: -20px;
  }
  .right-flag {
    margin-right: -20px;
  }
}

/* 1000px - 1600px arası: Orta taşma */
@media (max-width: 1599px) and (min-width: 1000px) {
  .footer-flags {
    max-width: 1000px;
  }
  .flag-img {
    height: 160px;
    max-width: 20vw;
  }
  .left-flag {
    margin-left: -210px;
  }
  .right-flag {
    margin-right: -210px;
  }
}

/* 756px - 1000px arası: Daha az taşma */
@media (max-width: 999px) and (min-width: 756px) {
  .footer-flags {
    max-width: 120vw;
  }
  .flag-img {
    height: 100px;
    max-width: 25vw;
  }
  .left-flag {
    margin-left: -100px;
  }
  .right-flag {
    margin-right: -100px;
  }
}

/* 600px - 756px arası: Ortalanmış, taşma yok */
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

/* 100px - 600px arası: Ortalanmış, taşma yok */
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

/* 100px ve altı: Bayraklar kaybolur */
@media (max-width: 100px) {
  .flag-img {
    display: none;
  }
}
</style>
