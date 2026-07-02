// carousel.js - Horizontal scroll carousel for case studies
(function() {
  'use strict';
  
  const grid = document.querySelector('.resultados-grid');
  const prev = document.getElementById('resultadosPrev');
  const next = document.getElementById('resultadosNext');
  
  if (grid && prev && next) {
    const scrollAmount = 300;
    
    next.addEventListener('click', () => {
      grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
    prev.addEventListener('click', () => {
      grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }
})();
