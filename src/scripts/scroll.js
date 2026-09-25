// scroll.js - Navbar background, scroll-to-top visibility, logo progress ring
(function() {
  'use strict';

  const scrollToTop = document.getElementById('scrollToTop');
  const navbar = document.querySelector('.navbar');
  const hero = document.getElementById('inicio');
  const ringFill = document.querySelector('.ring-fill');
  const CIRCUMFERENCE = 238.76; // 2 * π * 38

  // --- Logo progress ring ---
  function updateRing() {
    if (!ringFill) return;
    var scrollTop = window.scrollY || window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    ringFill.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  }

  // --- Navbar background threshold (siempre por scroll) ---
  function handleNavbar() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', (window.scrollY || window.pageYOffset) > 60);
  }

  // --- Scroll-to-top click ---
  const handleScrollToTopClick = function() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  if (scrollToTop) {
    scrollToTop.addEventListener('click', handleScrollToTopClick);
  }

  // --- Scroll-to-top visibility ---
  // IntersectionObserver sobre el hero: el botón aparece solo cuando el
  // hero salió COMPLETO del viewport y desaparece solo al volver (el
  // smooth scroll a top lo re-inserta en el viewport). Zero locks, zero
  // timers — y funciona en iOS, donde `scrollend` no existe.
  function setButtonVisible(visible) {
    if (scrollToTop) scrollToTop.classList.toggle('is-visible', visible);
  }

  let io = null;
  let onScrollFallback = null;

  if ('IntersectionObserver' in window && hero) {
    io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        setButtonVisible(!entry.isIntersecting);
      });
    }, { threshold: 0 });
    io.observe(hero);
  } else {
    // Fallback: sin IntersectionObserver o sin hero → scroll position
    onScrollFallback = function() {
      setButtonVisible((window.scrollY || window.pageYOffset) > window.innerHeight);
    };
    window.addEventListener('scroll', onScrollFallback, { passive: true });
    onScrollFallback();
  }

  // Red de seguridad (mobile): si el smooth scroll pierde el frame final
  // (toque que cancela el scroll, quirks de Chrome Android/iOS), el IO puede
  // no emitir el callback y el botón queda "sticky" visible en el top.
  // Cerca del tope, SIEMPRE se oculta — sin depender del IO.
  function handleScrollHide() {
    if ((window.scrollY || window.pageYOffset) < 200) {
      setButtonVisible(false);
    }
  }
  window.addEventListener('scroll', handleScrollHide, { passive: true });

  // scrollend fallback para browsers que lo soportan
  const handleScrollEnd = function() {
    if ((window.scrollY || window.pageYOffset) < 200) {
      setButtonVisible(false);
    }
  };

  if ('onscrollend' in window) {
    window.addEventListener('scrollend', handleScrollEnd);
  }

  // Navbar en todos los casos
  window.addEventListener('scroll', handleNavbar, { passive: true });
  window.addEventListener('scroll', updateRing, { passive: true });
  handleNavbar();
  updateRing();

  /**
   * Cleanup function to prevent memory leaks
   * Removes all event listeners and disconnects observers
   */
  function cleanup() {
    // Remove scroll-to-top click listener
    if (scrollToTop) {
      scrollToTop.removeEventListener('click', handleScrollToTopClick);
    }

    // Disconnect IntersectionObserver
    if (io) {
      io.disconnect();
    }

    // Remove fallback scroll listener if it was used
    if (onScrollFallback) {
      window.removeEventListener('scroll', onScrollFallback);
    }

    // Remove all scroll listeners
    window.removeEventListener('scroll', handleScrollHide);
    window.removeEventListener('scroll', handleNavbar);
    window.removeEventListener('scroll', updateRing);

    // Remove scrollend listener if it was added
    if ('onscrollend' in window) {
      window.removeEventListener('scrollend', handleScrollEnd);
    }
  }

  // Listen for Astro page transitions to cleanup before swap
  document.addEventListener('astro:before-swap', cleanup);
})();