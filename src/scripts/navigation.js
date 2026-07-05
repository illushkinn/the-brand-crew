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
   * Sets the clip-path circle origin to the hamburger button position
   * Uses inline style to override CSS with precise pixel coordinates
   */
  function setClipOrigin() {
    const rect = hamburgerBtn.getBoundingClientRect();
    const cx = Math.round(rect.left + rect.width / 2);
    const cy = Math.round(rect.top + rect.height / 2);
    mobileMenu.style.clipPath = 'circle(150% at ' + cx + 'px ' + cy + 'px)';
    mobileMenu.style.webkitClipPath = 'circle(150% at ' + cx + 'px ' + cy + 'px)';
  }

  /**
   * Resets inline clip-path so CSS class takes over for closing animation
   */
  function resetClipOrigin() {
    mobileMenu.style.clipPath = '';
    mobileMenu.style.webkitClipPath = '';
  }

  /**
   * Opens the mobile menu with animation
   */
  function openMenu() {
    state.menuOpen = true;
    setLinkDelays(true);
    // Set clip origin BEFORE adding is-open so the circle starts from 0%
    mobileMenu.style.clipPath = 'circle(0% at ' + (function() {
      const rect = hamburgerBtn.getBoundingClientRect();
      return Math.round(rect.left + rect.width / 2) + 'px ' + Math.round(rect.top + rect.height / 2) + 'px';
    })() + ')';
    mobileMenu.style.webkitClipPath = mobileMenu.style.clipPath;
    // Use rAF to ensure the 0% circle renders before transitioning to 150%
    requestAnimationFrame(function() {
      mobileMenu.classList.add('is-open');
      setClipOrigin();
    });
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
    resetClipOrigin();
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
  
  // Close menu when clicking a link — wait for close animation before scrolling
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      closeMenu();
      // Wait for menu close animation (400ms clip-path) before scrolling to target
      // Prevents scroll landing incorrectly due to menu overlay still animating
      if (href && href.startsWith('#')) {
        e.preventDefault();
        setTimeout(function() {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 420);
      }
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
