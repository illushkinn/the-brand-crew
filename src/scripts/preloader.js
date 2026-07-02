/**
 * Preloader — loading simulation + dismiss transition
 *
 * Scrollbar estable vía scrollbar-gutter: stable en CSS.
 * No se altera overflow del <html> en ningún momento.
 * Scroll bloqueado con event listener en el preloader.
 *
 * Usage:
 *   const preloader = createPreloader({
 *     preloader: document.getElementById('preloader'),
 *     fill:       document.getElementById('preloader-fill'),
 *     hint:       document.getElementById('preloader-hint'),
 *   })
 *   preloader.start()
 */

export function createPreloader({ preloader, fill, hint } = {}) {
  let loaded = 0
  let interval = null

  const api = {
    start,
    complete,
    dismiss,
  }

  function preventScroll(e) {
    e.preventDefault()
  }

  function tick() {
    loaded += Math.random() * 8
    if (loaded >= 100) {
      loaded = 100
      clearInterval(interval)
      interval = null
      api.complete()
    }
    if (fill) fill.style.width = loaded + '%'
  }

  function start() {
    if (fill) fill.style.width = '0%'
    if (preloader) {
      preloader.addEventListener('wheel', preventScroll, { passive: false })
      preloader.addEventListener('touchmove', preventScroll, { passive: false })
    }
    interval = setInterval(tick, 100)
  }

  function complete() {
    if (api._completed) return
    api._completed = true
    if (hint) hint.classList.add('visible')
    if (preloader) preloader.addEventListener('click', api.dismiss)
    const coreTrack = preloader ? preloader.querySelector('.core-track') : null
    if (coreTrack) coreTrack.classList.add('is-ready')
  }

  function dismiss() {
    if (!preloader) return
    var wrapper = document.getElementById('preloader-wrapper')

    // Liberar scroll
    preloader.removeEventListener('wheel', preventScroll)
    preloader.removeEventListener('touchmove', preventScroll)

    // Liberar reveal elements
    document.documentElement.classList.remove('preloading')

    preloader.style.opacity = '0'
    preloader.style.transform = 'scale(0.97)'
    preloader.style.transition = 'opacity 0.4s ease, transform 0.4s ease'
    setTimeout(() => {
      preloader.style.display = 'none'
      preloader.style.transform = ''
      if (wrapper) {
        wrapper.classList.add('is-dismissed')
        wrapper.style.display = 'none'
        wrapper.style.pointerEvents = 'none'
      }
    }, 450)
  }

  return api
}
