// faq.js - FAQ accordion logic with expand/collapse
(function() {
  'use strict';

  const faqItems = document.querySelectorAll('.faq-item');
  const questionHandlers = new WeakMap();

  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    const handleQuestionClick = function(e) {
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
    };

    question.addEventListener('click', handleQuestionClick);
    questionHandlers.set(question, handleQuestionClick);
  });

  /**
   * Cleanup function to prevent memory leaks
   * Removes all event listeners
   */
  function cleanup() {
    faqItems.forEach(function(item) {
      const question = item.querySelector('.faq-question');
      const handler = questionHandlers.get(question);
      if (handler) {
        question.removeEventListener('click', handler);
      }
    });
  }

  // Listen for Astro page transitions to cleanup before swap
  document.addEventListener('astro:before-swap', cleanup);
})();
