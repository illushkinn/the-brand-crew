// scroll.js - Navbar background and scroll-to-top visibility
(function() {
  'use strict';

  const scrollToTop = document.getElementById('scrollToTop');
  const navbar = document.querySelector('.navbar');
  const hero = document.getElementById('inicio');

  // --- Navbar background threshold (siempre por scroll) ---
  function handleNavbar() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', (window.scrollY || window.pageYOffset) > 60);
  }

  // --- Scroll-to-top click ---
  if (scrollToTop) {
    scrollToTop.addEventListener('click', function() {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }

  // --- Scroll-to-top visibility ---
  // IntersectionObserver sobre el hero: el botón aparece solo cuando el
  // hero salió COMPLETO del viewport y desaparece solo al volver (el
  // smooth scroll a top lo re-inserta en el viewport). Zero locks, zero
  // timers — y funciona en iOS, donde `scrollend` no existe.
  function setButtonVisible(visible) {
    if (scrollToTop) scrollToTop.classList.toggle('is-visible', visible);
  }

  if ('IntersectionObserver' in window && hero) {
    const io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        setButtonVisible(!entry.isIntersecting);
      });
    }, { threshold: 0 });
    io.observe(hero);
  } else {
    // Fallback: sin IntersectionObserver o sin hero → scroll position
    function onScroll() {
      setButtonVisible((window.scrollY || window.pageYOffset) > window.innerHeight);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Red de seguridad (mobile): si el smooth scroll pierde el frame final
  // (toque que cancela el scroll, quirks de Chrome Android/iOS), el IO puede
  // no emitir el callback y el botón queda "sticky" visible en el top.
  // Cerca del tope, SIEMPRE se oculta — sin depender del IO.
  function handleScrollHide() {
    if ((window.scrollY || window.pageYOffset) < 100) {
      setButtonVisible(false);
    }
  }
  window.addEventListener('scroll', handleScrollHide, { passive: true });

  // Navbar en todos los casos
  window.addEventListener('scroll', handleNavbar, { passive: true });
  handleNavbar();
})();