/**
 * Preloader — loading simulation + dismiss transition
 *
 * Usage:
 *   const preloader = createPreloader({
 *     preloader: document.getElementById('preloader'),
 *     fill:       document.getElementById('preloader-fill'),
 *     hint:       document.getElementById('preloader-hint'),
 *     doc:        document.documentElement,
 *   })
 *   preloader.start()
 */

export function createPreloader({ preloader, fill, hint, doc } = {}) {
  let loaded = 0
  let interval = null

  const api = {
    start,
    complete,
    dismiss,
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
    interval = setInterval(tick, 100)
  }

  function complete() {
    if (api._completed) return
    api._completed = true
    if (hint) hint.classList.add('visible')
    if (preloader) preloader.addEventListener('click', api.dismiss)
  }

  function dismiss() {
    if (!preloader) return
    preloader.style.opacity = '0'
    preloader.style.transform = 'scale(0.97)'
    preloader.style.transition = 'opacity 0.4s ease, transform 0.4s ease'
    setTimeout(() => {
      preloader.style.display = 'none'
      preloader.style.transform = ''
      if (doc) doc.classList.remove('preloading')
    }, 450)
  }

  return api
}
