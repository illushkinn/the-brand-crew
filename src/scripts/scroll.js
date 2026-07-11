// scroll.js - Navbar background and scroll-to-top visibility
(function() {
  'use strict';
  
  const scrollToTop = document.getElementById('scrollToTop');
  const navbar = document.querySelector('.navbar');
  var dismissLock = false;
  var dismissTimer = null;
  var mobileDismissed = false;
  
  // --- Scroll-to-top click ---
  if (scrollToTop) {
    scrollToTop.addEventListener('click', function() {
      scrollToTop.classList.remove('is-visible');
      dismissLock = true;
      if (window.innerWidth <= 768) {
        mobileDismissed = true;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // --- Release dismiss lock ---
  function releaseDismissLock() {
    dismissTimer = null;
    if (!dismissLock) return;
    var scrollY = window.scrollY || window.pageYOffset;
    if (scrollY <= 50) {
      dismissLock = false;
      handleScrollToTop();
    } else if (dismissLock) {
      dismissTimer = setTimeout(releaseDismissLock, 300);
    }
  }
  
  // --- Scroll-to-top visibility via scroll position ---
  function handleScrollToTop() {
    if (!scrollToTop) return;
    if (mobileDismissed) return;
    var scrollY = window.scrollY || window.pageYOffset;
    
    if (dismissLock) return;
    
    // Show only when scrolled past the hero (full viewport)
    if (scrollY > window.innerHeight) {
      scrollToTop.classList.add('is-visible');
    } else {
      scrollToTop.classList.remove('is-visible');
    }
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
    var scrollY = window.scrollY || window.pageYOffset;
    handleNavbar(scrollY);
    handleScrollToTop();
  }
  
  // Listen for scrollend to release the dismiss lock
  window.addEventListener('scrollend', function() {
    if (dismissLock) releaseDismissLock();
  });
  
  // Fallback for browsers without scrollend support
  window.addEventListener('scroll', function() {
    if (dismissLock && !dismissTimer) {
      dismissTimer = setTimeout(releaseDismissLock, 300);
    }
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Tracking var for rAF
  var ticking = false;
  handleScroll();
})();
