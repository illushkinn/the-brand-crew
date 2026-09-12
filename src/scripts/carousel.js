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
    
    next.addEventListener('click', () => {
      grid.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
    });
    
    prev.addEventListener('click', () => {
      grid.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    });
  }
})();
