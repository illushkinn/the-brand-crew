// navigation.js - Mobile menu toggle logic with accessibility features
(function() {
  'use strict';
  
  const state = {
    menuOpen: false
  };
  
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
  
  /**
   * Sets staggered transition delays for mobile menu links
   * @param {boolean} open - true when opening menu, false when closing
   */
  function setLinkDelays(open) {
    const len = mobileLinks.length;
    mobileLinks.forEach(function(link, i) {
      const delay = open
        ? 0.04 + i * 0.04
        : 0.04 + (len - 1 - i) * 0.04;
      link.style.transitionDelay = delay + 's';
    });
  }
  
  /**
   * Opens the mobile menu with animation
   */
  function openMenu() {
    state.menuOpen = true;
    setLinkDelays(true);
    mobileMenu.classList.add('is-open');
    mobileMenu.removeAttribute('inert');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'clip';
    setTimeout(function() { mobileLinks[0]?.focus(); }, 200);
  }
  
  /**
   * Closes the mobile menu with animation
   */
  function closeMenu() {
    state.menuOpen = false;
    setLinkDelays(false);
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('inert', '');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    hamburgerBtn.focus();
  }
  
  /**
   * Toggles mobile menu open/closed
   */
  function toggleMenu() {
    if (state.menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }
  
  // Close menu on viewport resize above mobile breakpoint
  // Prevents overflow:hidden getting stuck when resizing from mobile to desktop
  const mq = window.matchMedia('(min-width: 768px)');
  mq.addEventListener('change', function(e) {
    if (e.matches && state.menuOpen) {
      closeMenu();
    }
  });
  
  // Hamburger button click handler
  hamburgerBtn.addEventListener('click', toggleMenu);
  
  // Hamburger button touch handler (for mobile)
  hamburgerBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    toggleMenu();
  }, {passive: false});
  
  // Close menu when clicking a link
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      closeMenu();
    });
    
    // Add visual feedback for touch events
    link.addEventListener('touchstart', function() {
      this.classList.add('is-tapping');
    });
    
    link.addEventListener('touchend', function() {
      this.classList.remove('is-tapping');
    });
  });
  
  // Close menu on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && state.menuOpen) {
      closeMenu();
      e.preventDefault();
    }
  });
  
  // Close menu when clicking overlay (outside menu content)
  mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });
})();
