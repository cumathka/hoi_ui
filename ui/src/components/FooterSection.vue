<template>
  <footer class="footer-container">
    <!-- Responsive Bayraklar -->
    <div class="footer-flags">
      <img src="@/assets/images/uri-flag.png" alt="Uri Canton Flag" class="flag-img left-flag" />
      <img src="@/assets/images/swiss-flag.png" alt="Swiss Flag" class="flag-img right-flag" />
    </div>
    
    <div class="container relative z-10">
      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <div class="text-center px-4">
          <h5 class="text-h5 text-black mb-3 font-semibold">Kontakt</h5>
          <p class="body-regular text-black">+41 76 603 70 20</p>
          <p class="body-regular text-black">info@hoiuri.ch</p>
          <div class="footer-social-links">
            <a href="#" class="social-link"><i class="bi bi-facebook"></i></a>
            <a href="#" class="social-link"><i class="bi bi-twitter"></i></a>
            <a href="#" class="social-link"><i class="bi bi-instagram"></i></a>
            <a href="#" class="social-link"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>
        
        <div class="text-center px-4">
          <h5 class="text-h5 text-black mb-3 font-semibold">Adresse</h5>
          <p class="body-regular text-black">
            Integrationmonitor e.V.<br>
            Goethestraße <br>
            6460 Altdorf<br>
          </p>
        </div>
        
        <div class="text-center px-4">
          <h5 class="text-h5 text-black mb-3 font-semibold">Tags</h5>
          <div class="footer-tags">
            <span class="tag-item">#Integration</span>
            <span class="tag-item">#Bildung</span>
            <span class="tag-item">#Gemeinschaft</span>
            <span class="tag-item">#Kultur</span>
          </div>
        </div>
      </div>
      
      <div class="footer-copyright">
        <p class="body-regular text-black">© 2025 Integrationmonitor. Alle Rechte vorbehalten.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection'
}
</script>
