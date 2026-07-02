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
  
  // --- Navbar scroll effect ---
  function handleNavbar(scrollY) {
    if (!navbar) return;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  // --- Visibility toggle with hysteresis (dead zone 300-450 to prevent flicker) ---
  let scrollToTopVisible = false;
  
  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    
    if (scrollToTop) {
      if (scrollY > 450 && !scrollToTopVisible) {
        scrollToTopVisible = true;
        scrollToTop.classList.add('is-visible');
      } else if (scrollY < 300 && scrollToTopVisible) {
        scrollToTopVisible = false;
        scrollToTop.classList.remove('is-visible');
      }
    }
    
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
