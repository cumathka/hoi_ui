<template>
  <!-- Landmark for screen readers -->
  <footer class="footer-container" role="contentinfo">
    <!-- Decorative flags (non-interactive, responsive via CSS) -->
    <div class="footer-flags" aria-hidden="true">
      <img
        src="@/assets/images/uri-flag.png"
        alt=""
        class="flag-img left-flag"
        loading="lazy"
        decoding="async"
        sizes="(max-width: 755px) 30vw, (max-width: 999px) 25vw, 18vw"
      />
      <img
        src="@/assets/images/swiss-flag.png"
        alt=""
        class="flag-img right-flag"
        loading="lazy"
        decoding="async"
        sizes="(max-width: 755px) 30vw, (max-width: 999px) 25vw, 18vw"
      />
    </div>

    <div class="container relative z-10">
      <!-- Three-column grid collapses to single column on mobile -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <!-- Contact -->
        <section class="text-center px-4" aria-labelledby="footer-contact">
          <h5 id="footer-contact" class="text-h5 text-black mb-3 font-semibold">Kontakt</h5>

          <!-- Clickable phone & email -->
          <p class="body-regular text-black">
            <a href="tel:+41766037020" class="nav-link" aria-label="Telefonnummer anrufen">
              +41 76 603 70 20
            </a>
          </p>
          <p class="body-regular text-black">
            <a href="mailto:info@hoiuri.ch" class="nav-link" aria-label="E-Mail an info@hoiuri.ch">
              info@hoiuri.ch
            </a>
          </p>

          <!-- Social links with labels -->
          <nav class="footer-social-links" aria-label="Social media">
            <a href="#" class="social-link" aria-label="Facebook" rel="noopener">
              <i class="bi bi-facebook" aria-hidden="true"></i>
            </a>
            <a href="#" class="social-link" aria-label="X (Twitter)" rel="noopener">
              <i class="bi bi-twitter" aria-hidden="true"></i>
            </a>
            <a href="#" class="social-link" aria-label="Instagram" rel="noopener">
              <i class="bi bi-instagram" aria-hidden="true"></i>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn" rel="noopener">
              <i class="bi bi-linkedin" aria-hidden="true"></i>
            </a>
          </nav>
        </section>

        <!-- Address -->
        <section class="text-center px-4" aria-labelledby="footer-address">
          <h5 id="footer-address" class="text-h5 text-black mb-3 font-semibold">Adresse</h5>
          <!-- Use semantic <address>; keep styling neutral via existing classes -->
          <address class="not-italic body-regular text-black">
            Integrationmonitor e.V.<br />
            Goethestraße<br />
            6460 Altdorf
          </address>
        </section>

        <!-- Tags -->
        <section class="text-center px-4" aria-labelledby="footer-tags">
          <h5 id="footer-tags" class="text-h5 text-black mb-3 font-semibold">Tags</h5>
          <ul class="footer-tags" role="list">
            <li class="tag-item">#Integration</li>
            <li class="tag-item">#Bildung</li>
            <li class="tag-item">#Gemeinschaft</li>
            <li class="tag-item">#Kultur</li>
          </ul>
        </section>
      </div>

      <!-- Legal / Copyright -->
      <div class="footer-copyright">
        <p class="body-regular text-black">
          © 2025 Integrationmonitor. Alle Rechte vorbehalten.
        </p>
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
/* Ensure footer never overlaps content on tiny screens */
.footer-container {
  position: relative;
}

/* Slightly tighten flag opacity on small screens (keeps text dominant) */
@media (max-width: 755px) {
  .flag-img { opacity: 0.5; }
}

/* Make social icons accessible on focus (matches your token system) */
.social-link:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(8,121,144,.25); /* cyan-700-ish */
  border-radius: .5rem;
}
</style>