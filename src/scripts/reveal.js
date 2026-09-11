// reveal.js - IntersectionObserver for reveal animations on scroll
// Un engine: .reveal (elemento) y .reveal-stagger (sección con hijos .rv)
// El stagger usa transitionDelay inline, mismo patrón que el typewriter del hero.
(function() {
  'use strict';

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('visible');
      observer.unobserve(el);

      // Stagger: si la sección tiene hijos .rv, escalonar sus delays (una sola vez)
      if (el.classList.contains('reveal-stagger') && !el.dataset.staggered) {
        el.dataset.staggered = 'true';
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const kids = el.querySelectorAll('.rv');
        kids.forEach(function(kid, i) {
          kid.style.transitionDelay = (0.1 + i * 0.08).toFixed(2) + 's';
        });
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(el) {
    observer.observe(el);
  });
})();