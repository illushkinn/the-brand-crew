// preloader-init.js - Initialize preloader on page load
import { createPreloader } from './preloader.js';

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPreloader);
} else {
  initPreloader();
}

function initPreloader() {
  const preloaderEl = document.getElementById('preloader');
  const fillEl = document.getElementById('preloader-fill');
  const hintEl = document.getElementById('preloader-hint');
  
  if (!preloaderEl) {
    console.warn('Preloader element not found');
    return;
  }
  
  const loader = createPreloader({
    preloader: preloaderEl,
    fill: fillEl,
    hint: hintEl
  });
  
  loader.start();
  
  // Wait for preloader dismiss, then reveal visible elements
  const checkInterval = setInterval(() => {
    if (!document.documentElement.classList.contains('preloading')) {
      clearInterval(checkInterval);
      // Reveal elements already in viewport when preloader covered them
      document.querySelectorAll('.reveal').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('visible');
        }
      });
    }
  }, 100);
}
