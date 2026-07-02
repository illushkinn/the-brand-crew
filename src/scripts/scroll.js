// scroll.js - Scroll-to-top button visibility and smooth scroll logic
(function() {
  'use strict';
  
  const scrollToTop = document.getElementById('scrollToTop');
  
  if (!scrollToTop) return;
  
  // Click handler for smooth scroll to top
  scrollToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Visibility toggle with hysteresis (dead zone 300-450 to prevent flicker)
  let scrollToTopVisible = false;
  
  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    
    if (scrollY > 450 && !scrollToTopVisible) {
      scrollToTopVisible = true;
      scrollToTop.classList.add('is-visible');
    } else if (scrollY < 300 && scrollToTopVisible) {
      scrollToTopVisible = false;
      scrollToTop.classList.remove('is-visible');
    }
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
