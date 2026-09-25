// carousel.js - Horizontal scroll carousel for case studies
(function() {
  'use strict';
  
  const grid = document.querySelector('.resultados-grid');
  const prev = document.getElementById('resultadosPrev');
  const next = document.getElementById('resultadosNext');
  
  if (grid && prev && next) {
    function getCardWidth() {
      const card = grid.querySelector('.glass-card');
      if (!card) return 300;
      const style = getComputedStyle(grid);
      const gap = parseFloat(style.gap) || 12;
      return card.offsetWidth + gap;
    }

    function getMaxScroll() {
      return grid.scrollWidth - grid.clientWidth;
    }

    function updateArrows() {
      const maxScroll = getMaxScroll();
      const atStart = grid.scrollLeft <= 10;
      const atEnd = grid.scrollLeft >= maxScroll - 10;
      prev.style.opacity = atStart ? '0.3' : '1';
      prev.style.pointerEvents = atStart ? 'none' : 'auto';
      next.style.opacity = atEnd ? '0.3' : '1';
      next.style.pointerEvents = atEnd ? 'none' : 'auto';
    }

    const handleNextClick = function() {
      const maxScroll = getMaxScroll();
      const currentScroll = grid.scrollLeft;
      const step = getCardWidth();
      if (currentScroll + step >= maxScroll - 10) {
        grid.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        grid.scrollBy({ left: step, behavior: 'smooth' });
      }
    };

    const handlePrevClick = function() {
      grid.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    };

    next.addEventListener('click', handleNextClick);
    prev.addEventListener('click', handlePrevClick);
    grid.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();

    /**
     * Cleanup function to prevent memory leaks
     * Removes all event listeners
     */
    function cleanup() {
      next.removeEventListener('click', handleNextClick);
      prev.removeEventListener('click', handlePrevClick);
      grid.removeEventListener('scroll', updateArrows);
    }

    // Listen for Astro page transitions to cleanup before swap
    document.addEventListener('astro:before-swap', cleanup);
  }
})();
