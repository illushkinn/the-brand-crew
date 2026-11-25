// faq.js - FAQ accordion logic with expand/collapse
(function() {
  'use strict';

  const faqItems = document.querySelectorAll('.faq-item');
  const questionHandlers = new WeakMap();
  const releaseTimers = new WeakMap();

  function clearRelease(answer) {
    const timer = releaseTimers.get(answer);
    if (timer) {
      clearTimeout(timer);
      releaseTimers.delete(answer);
    }
  }

  function releaseCap(answer) {
    clearRelease(answer);
    answer.style.maxHeight = 'none';
  }

  function collapse(answer) {
    clearRelease(answer);
    // A fully open answer has no height cap. Pin the current height first so
    // the max-height transition has a numeric starting point.
    if (answer.style.maxHeight === 'none') {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      void answer.offsetHeight;
    }
    answer.classList.remove('is-open');
    answer.style.maxHeight = '0';
  }

  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    // Once the expand transition ends, drop the height cap. A px cap measured
    // once would clip the answer if its content reflows later (font swap,
    // resize, zoom).
    answer.addEventListener('transitionend', function(event) {
      if (event.propertyName === 'max-height' && answer.classList.contains('is-open')) {
        releaseCap(answer);
      }
    });

    const handleQuestionClick = function(e) {
      e.stopPropagation();
      const isOpen = question.getAttribute('aria-expanded') === 'true';

      // Close all items
      faqItems.forEach(function(otherItem) {
        const otherQ = otherItem.querySelector('.faq-question');
        const otherA = otherItem.querySelector('.faq-answer');
        otherQ.setAttribute('aria-expanded', 'false');
        collapse(otherA);
      });

      // Open this item if it was closed
      if (!isOpen) {
        question.setAttribute('aria-expanded', 'true');
        answer.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        // Reduced motion has no transition (so no transitionend), and a
        // dropped transition must never leave the cap stuck: release it now
        // or on a timer that mirrors the transition duration.
        const duration = parseFloat(window.getComputedStyle(answer).transitionDuration) || 0;
        if (duration === 0) {
          releaseCap(answer);
        } else {
          clearRelease(answer);
          releaseTimers.set(
            answer,
            setTimeout(function() {
              releaseCap(answer);
            }, duration * 1000 + 100)
          );
        }
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
      const answer = item.querySelector('.faq-answer');
      const handler = questionHandlers.get(question);
      if (handler) {
        question.removeEventListener('click', handler);
      }
      clearRelease(answer);
    });
  }

  // Listen for Astro page transitions to cleanup before swap
  document.addEventListener('astro:before-swap', cleanup);
})();
