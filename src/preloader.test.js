import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createPreloader } from './preloader.js'

describe('createPreloader', () => {
  let preloader, fill, hint, doc
  let preloaderModule

  beforeEach(() => {
    vi.useFakeTimers()

    // Create DOM elements with just enough API for testing
    const coreTrack = { classList: { add: vi.fn() } }
    preloader = {
      style: {},
      addEventListener: vi.fn(),
      querySelector: vi.fn((selector) => selector === '.core-track' ? coreTrack : null),
    }
    fill = { style: {} }
    hint = { classList: { add: vi.fn() } }
    doc = { classList: { remove: vi.fn() } }
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('start()', () => {
    it('should start fill at 0%', () => {
      preloaderModule = createPreloader({ preloader, fill, hint, doc })
      preloaderModule.start()
      expect(fill.style.width).toBe('0%')
    })

    it('should increment fill width over time', () => {
      preloaderModule = createPreloader({ preloader, fill, hint, doc })
      preloaderModule.start()

      // After one interval tick
      vi.advanceTimersByTime(100)
      const width1 = parseFloat(fill.style.width)
      expect(width1).toBeGreaterThan(0)
      expect(width1).toBeLessThan(100)

      // After another tick
      vi.advanceTimersByTime(100)
      const width2 = parseFloat(fill.style.width)
      expect(width2).toBeGreaterThan(width1)
    })

    it('should call complete when loaded reaches 100%', () => {
      preloaderModule = createPreloader({ preloader, fill, hint, doc })
      const completeSpy = vi.spyOn(preloaderModule, 'complete')

      preloaderModule.start()

      // Advance enough time for fill to hit 100%
      // Each tick adds ~4 on average (random 0–8), so ~25 ticks ≈ 2500ms
      vi.advanceTimersByTime(3000)

      expect(completeSpy).toHaveBeenCalledOnce()
      expect(fill.style.width).toBe('100%')
    })
  })

  describe('complete()', () => {
    it('should add visible class to hint', () => {
      preloaderModule = createPreloader({ preloader, fill, hint, doc })
      preloaderModule.complete()

      expect(hint.classList.add).toHaveBeenCalledWith('visible')
    })

    it('should add click listener on preloader for dismiss', () => {
      preloaderModule = createPreloader({ preloader, fill, hint, doc })
      preloaderModule.complete()

      expect(preloader.addEventListener).toHaveBeenCalledWith('click', expect.any(Function))
    })

    it('should add is-ready class to core-track for heartbeat pulse', () => {
      preloaderModule = createPreloader({ preloader, fill, hint, doc })
      preloaderModule.complete()

      const coreTrack = preloader.querySelector('.core-track')
      expect(coreTrack.classList.add).toHaveBeenCalledWith('is-ready')
    })

    it('should not throw if hint is null', () => {
      preloaderModule = createPreloader({ preloader, fill, hint: null, doc })
      expect(() => preloaderModule.complete()).not.toThrow()
    })
  })

  describe('dismiss()', () => {
    it('should set opacity to 0', () => {
      preloaderModule = createPreloader({ preloader, fill, hint, doc })
      preloaderModule.dismiss()

      expect(preloader.style.opacity).toBe('0')
    })

    it('should set transform to scale(0.97)', () => {
      preloaderModule = createPreloader({ preloader, fill, hint, doc })
      preloaderModule.dismiss()

      expect(preloader.style.transform).toBe('scale(0.97)')
    })

    it('should set transition property', () => {
      preloaderModule = createPreloader({ preloader, fill, hint, doc })
      preloaderModule.dismiss()

      expect(preloader.style.transition).toBe('opacity 0.4s ease, transform 0.4s ease')
    })

    it('should remove preloading class after 450ms', () => {
      preloaderModule = createPreloader({ preloader, fill, hint, doc })
      preloaderModule.dismiss()

      vi.advanceTimersByTime(450)

      expect(doc.classList.remove).toHaveBeenCalledWith('preloading')
    })

    it('should set display none after 450ms', () => {
      preloaderModule = createPreloader({ preloader, fill, hint, doc })
      preloaderModule.dismiss()

      vi.advanceTimersByTime(450)

      expect(preloader.style.display).toBe('none')
    })

    it('should not throw if preloader is null', () => {
      preloaderModule = createPreloader({ preloader: null, fill, hint, doc })
      expect(() => preloaderModule.dismiss()).not.toThrow()
    })
  })
})
