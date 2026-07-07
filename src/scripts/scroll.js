// scroll.js - Navbar background and scroll-to-top visibility
(function() {
  'use strict';
  
  const scrollToTop = document.getElementById('scrollToTop');
  const navbar = document.querySelector('.navbar');
  var dismissLock = false;
  
  // --- Scroll-to-top click ---
  if (scrollToTop) {
    scrollToTop.addEventListener('click', function() {
      // Immediately hide, lock to prevent re-show during animation
      scrollToTop.classList.remove('is-visible');
      dismissLock = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Release lock when smooth scroll lands at the top
  function releaseDismissLock() {
    var scrollY = window.scrollY || window.pageYOffset;
    if (scrollY <= 50) {
      // Near top — safe to release
      dismissLock = false;
      // Force re-check (button should stay hidden since we're at the top)
      handleScrollToTop();
    } else {
      // Still far from top — keep lock, check again later
      setTimeout(releaseDismissLock, 300);
    }
  }
  
  // --- Scroll-to-top visibility via scroll position ---
  function handleScrollToTop() {
    if (!scrollToTop) return;
    
    var scrollY = window.scrollY || window.pageYOffset;
    
    // If we're near the top, always hide (overrides dismissLock for edge cases)
    if (scrollY <= 50) {
      scrollToTop.classList.remove('is-visible');
      return;
    }
    
    if (dismissLock) return; // Don't re-show during animation to top
    
    // Show when scrolled past 60% of viewport height
    if (scrollY > window.innerHeight * 0.6) {
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
  
  // Fallback: also check on every scroll tick (handles browsers without scrollend support)
  var ticking = false;
  window.addEventListener('scroll', function() {
    if (dismissLock) {
      // On mobile, smooth scroll might not fire scrollend. Check periodically.
      releaseDismissLock();
    }
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
