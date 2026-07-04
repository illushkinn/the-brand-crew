// scroll.js - Scroll-to-top button visibility, navbar background, and smooth scroll logic
(function() {
  'use strict';
  
  const scrollToTop = document.getElementById('scrollToTop');
  const navbar = document.querySelector('.navbar');
  
  // --- Scroll-to-top ---
  if (scrollToTop) {
    scrollToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // --- Scroll-to-top visibility (no hysteresis, clean thresholds) ---
  function handleScrollToTop(scrollY) {
    if (!scrollToTop) return;
    if (scrollY > 500) {
      scrollToTop.classList.add('is-visible');
    } else {
      scrollToTop.classList.remove('is-visible');
    }
  }
  
  function handleNavbar(scrollY) {
    if (!navbar) return;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    handleScrollToTop(scrollY);
    handleNavbar(scrollY);
  }
  
  // Use requestAnimationFrame for better performance
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Initial check
  handleScroll();
})();
