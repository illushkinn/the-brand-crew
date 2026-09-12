// navigation.js - Mobile menu toggle logic with accessibility features
(function() {
  'use strict';
  
  const state = {
    menuOpen: false
  };
  
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const navbar = document.querySelector('.navbar');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');

  /**
   * Scroll lock via position:fixed — avoids overflow:clip reflow
   * that caused repaint flicker with content-visibility:auto sections.
   */
  let scrollY = 0;
  function lockScroll() {
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + scrollY + 'px';
    document.body.style.width = '100%';
    document.body.classList.add('menu-open');
  }

  function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.classList.remove('menu-open');
    window.scrollTo(0, scrollY);
  }

  /**
   * Opens the mobile menu with clip-path circle animation
   * Uses CSS custom properties for the circle origin so open/close animate smoothly.
   * Link stagger is CSS-only (nth-child transition-delay) — no inline styles.
   */
  function openMenu() {
    state.menuOpen = true;

    mobileMenu.removeAttribute('inert');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    
    // Trigger the CSS transition to circle(150%)
    mobileMenu.classList.add('is-open');
    navbar.classList.add('is-menu-open');
    
    lockScroll();
    setTimeout(function() { mobileLinks[0]?.focus(); }, 200);
  }
  
  /**
   * Closes the mobile menu — CSS handles reverse transition with same origin
   */
  function closeMenu() {
    state.menuOpen = false;
    
    mobileMenu.classList.remove('is-open');
    navbar.classList.remove('is-menu-open');
    mobileMenu.setAttribute('inert', '');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    unlockScroll();
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
      // Wait for close animation (550ms clip-path + stagger) before scrolling to target
      // Prevents scroll landing incorrectly due to menu overlay still animating
      if (href && href.startsWith('#')) {
        e.preventDefault();
        setTimeout(function() {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 650);
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
