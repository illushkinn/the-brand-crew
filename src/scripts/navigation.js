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
  
  // Store media query change handler for cleanup
  const handleMediaQueryChange = function(e) {
    if (e.matches && state.menuOpen) {
      closeMenu();
    }
  };

  // Close menu on viewport resize above mobile breakpoint
  // Prevents overflow:hidden getting stuck when resizing from mobile to desktop
  const mq = window.matchMedia('(min-width: 768px)');
  mq.addEventListener('change', handleMediaQueryChange);

  // Hamburger button click handler
  hamburgerBtn.addEventListener('click', toggleMenu);

  // Store link handlers for cleanup
  const linkClickHandlers = new WeakMap();
  const linkTouchStartHandlers = new WeakMap();
  const linkTouchEndHandlers = new WeakMap();

  // Close menu when clicking a link — wait for close animation before scrolling
  mobileLinks.forEach(function(link) {
    const clickHandler = function(e) {
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
    };

    const touchStartHandler = function() {
      this.classList.add('is-tapping');
    };

    const touchEndHandler = function() {
      this.classList.remove('is-tapping');
    };

    link.addEventListener('click', clickHandler);
    link.addEventListener('touchstart', touchStartHandler);
    link.addEventListener('touchend', touchEndHandler);

    // Store handlers for cleanup
    linkClickHandlers.set(link, clickHandler);
    linkTouchStartHandlers.set(link, touchStartHandler);
    linkTouchEndHandlers.set(link, touchEndHandler);
  });

  // Close menu on Escape key - store reference for cleanup
  const handleEscapeKey = function(e) {
    if (e.key === 'Escape' && state.menuOpen) {
      closeMenu();
      e.preventDefault();
    }
  };
  document.addEventListener('keydown', handleEscapeKey);
  
  // Close menu when clicking overlay (outside menu content)
  const handleOverlayClick = function(e) {
    if (e.target === mobileMenu) {
      closeMenu();
    }
  };
  mobileMenu.addEventListener('click', handleOverlayClick);

  /**
   * Cleanup function to prevent memory leaks
   * Removes all event listeners added by this script
   */
  function cleanup() {
    // Remove hamburger button listener
    hamburgerBtn.removeEventListener('click', toggleMenu);

    // Remove media query listener
    mq.removeEventListener('change', handleMediaQueryChange);

    // Remove all mobile link listeners
    mobileLinks.forEach(function(link) {
      const clickHandler = linkClickHandlers.get(link);
      const touchStartHandler = linkTouchStartHandlers.get(link);
      const touchEndHandler = linkTouchEndHandlers.get(link);

      if (clickHandler) link.removeEventListener('click', clickHandler);
      if (touchStartHandler) link.removeEventListener('touchstart', touchStartHandler);
      if (touchEndHandler) link.removeEventListener('touchend', touchEndHandler);
    });

    // Remove document-level listeners
    document.removeEventListener('keydown', handleEscapeKey);

    // Remove overlay click listener
    mobileMenu.removeEventListener('click', handleOverlayClick);

    // If menu is open, unlock scroll before cleanup
    if (state.menuOpen) {
      unlockScroll();
    }
  }

  // Listen for Astro page transitions to cleanup before swap
  document.addEventListener('astro:before-swap', cleanup);
})();
