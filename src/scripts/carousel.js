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
    
    next.addEventListener('click', () => {
      const maxScroll = getMaxScroll();
      const currentScroll = grid.scrollLeft;
      const step = getCardWidth();
      if (currentScroll + step >= maxScroll - 10) {
        grid.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        grid.scrollBy({ left: step, behavior: 'smooth' });
      }
    });
    
    prev.addEventListener('click', () => {
      grid.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    });
    
    function updateArrows() {
      const maxScroll = getMaxScroll();
      const atStart = grid.scrollLeft <= 10;
      const atEnd = grid.scrollLeft >= maxScroll - 10;
      prev.style.opacity = atStart ? '0.3' : '1';
      prev.style.pointerEvents = atStart ? 'none' : 'auto';
      next.style.opacity = atEnd ? '0.3' : '1';
      next.style.pointerEvents = atEnd ? 'none' : 'auto';
    }
    
    grid.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();
  }
})();
