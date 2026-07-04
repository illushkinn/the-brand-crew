// scroll.js - Navbar background and scroll-to-top visibility via footer IntersectionObserver
(function() {
  'use strict';
  
  const scrollToTop = document.getElementById('scrollToTop');
  const footer = document.querySelector('.footer');
  const navbar = document.querySelector('.navbar');
  
  // Flag to prevent observer from re-showing arrow during smooth scroll
  var dismissLock = false;
  
  // --- Scroll-to-top click ---
  if (scrollToTop) {
    scrollToTop.addEventListener('click', function() {
      scrollToTop.classList.remove('is-visible');
      dismissLock = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Release lock after smooth scroll should complete (~600ms for full page)
      setTimeout(function() {
        dismissLock = false;
      }, 700);
    });
  }
  
  // --- Scroll-to-top visibility: only when footer is in view ---
  if (scrollToTop && footer) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (dismissLock) return;
        if (entry.isIntersecting) {
          scrollToTop.classList.add('is-visible');
        } else {
          scrollToTop.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.1 });
    observer.observe(footer);
  }
  
  // --- Navbar background threshold ---
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
    handleNavbar(scrollY);
  }
  
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
  
  handleScroll();
})();
