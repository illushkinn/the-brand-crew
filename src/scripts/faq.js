// faq.js - FAQ accordion logic with expand/collapse
(function() {
  'use strict';
  
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = question.getAttribute('aria-expanded') === 'true';
      
      // Close all items
      faqItems.forEach(function(otherItem) {
        const otherQ = otherItem.querySelector('.faq-question');
        const otherA = otherItem.querySelector('.faq-answer');
        otherQ.setAttribute('aria-expanded', 'false');
        otherA.classList.remove('is-open');
        otherA.style.maxHeight = '0';
      });
      
      // Open this item if it was closed
      if (!isOpen) {
        question.setAttribute('aria-expanded', 'true');
        answer.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
})();
