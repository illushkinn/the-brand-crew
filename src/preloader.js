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
    // Latido del core cuando la carga termina
    const coreTrack = preloader ? preloader.querySelector('.core-track') : null
    if (coreTrack) coreTrack.classList.add('is-ready')
  }

  function dismiss() {
    if (!preloader) return
    // Compensar scrollbar width para que el hero NO se mueva
    // al pasar de overflow:hidden → overflow-y:scroll
    var scrollW = window.innerWidth - document.documentElement.clientWidth
    if (scrollW > 0) document.body.style.paddingRight = scrollW + 'px'

    // Buscar wrapper si existe (para aislamiento de capas en LT Browser)
    var wrapper = document.getElementById('preloader-wrapper')

    preloader.style.opacity = '0'
    preloader.style.transform = 'scale(0.97)'
    preloader.style.transition = 'opacity 0.4s ease, transform 0.4s ease'
    setTimeout(() => {
      preloader.style.display = 'none'
      preloader.style.transform = ''
      if (wrapper) {
        wrapper.style.display = 'none'
        wrapper.style.pointerEvents = 'none'
      }
      if (doc) {
        doc.classList.remove('preloading')
        // Sacar el padding después que el layout se estabilice
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            document.body.style.paddingRight = ''
          })
        })
      }
    }, 450)
  }

  return api
}
