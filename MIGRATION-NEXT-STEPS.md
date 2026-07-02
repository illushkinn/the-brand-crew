# 🚀 Astro Migration - Remaining Work Plan

## Quick Command to Continue

Para continuar con la migración en otra sesión de Kiro:

```
"Continúa con la migración a Astro desde donde quedó. Lee ASTRO-MIGRATION-STATUS.md y .kiro/specs/astro-migration/tasks.md para el contexto. Sigue con la Tarea 5: Extract layout and navigation components"
```

---

## 📋 Remaining Components (Priority Order)

### 1. Navigation (Tarea 5) - HIGH PRIORITY
**Files to create:**
- `src/components/Navbar.astro`
- `src/components/MobileMenu.astro`
- `src/scripts/navigation.js`

**Extract from:** Lines ~2545-2571 of index.html

**Key features:**
- Hamburger menu toggle
- Scroll-based backdrop blur
- Mobile menu with clip-path animation

---

### 2. Case Studies (Tarea 9.2) - MEDIUM PRIORITY
**File to create:**
- `src/components/CaseStudies.astro`
- `src/scripts/carousel.js`

**Extract from:** Lines ~2616-2772 of index.html

**Key features:**
- Horizontal scrolling carousel
- Prev/Next navigation buttons
- 4 case study cards (Luisito, Apolonia, Hoco, Pragma)

---

### 3. Content Sections (Tareas 9.1, 10.1, 10.2) - MEDIUM PRIORITY

#### Problema.astro
**Extract from:** Lines ~2774-2808
- 3 glass cards in grid
- Background glow effect

#### ComoFunciona.astro
**Extract from:** Lines ~2810-2840
- 3 step cards
- Number badges

#### Pricing.astro
**Extract from:** Lines ~2842-2864
- Animated background shapes (3)
- Pricing card with split payments
- Feature list with checkmarks

---

### 4. FAQ + CTA (Tareas 10.3, 11) - MEDIUM PRIORITY

#### FAQ.astro
**Extract from:** Lines ~2866-2915
- Animated shapes (3)
- Accordion questions/answers
- Chevron V icons

**Script:**
- `src/scripts/faq.js` - Accordion logic

#### CTA.astro + Footer.astro
**Extract from:** Lines ~2916-2960
- Final call-to-action
- Footer with links
- Animated shapes (3)

---

### 5. Utility Components (Tarea 11.3-11.5) - LOW PRIORITY

#### ScrollToTop.astro
**Extract from:** Lines ~2961-2970
- Fixed position button
- Visibility based on scroll (>450px)

**Script:**
- `src/scripts/scroll.js` - Show/hide logic + smooth scroll

---

### 6. Reveal Animation (Tarea 12) - LOW PRIORITY

**Script:**
- `src/scripts/reveal.js` - IntersectionObserver for fade-in animations

---

### 7. Pages (Tarea 14) - LOW PRIORITY

**Files to create:**
- `src/pages/privacy.astro` (copy from privacy.html)
- `src/pages/terms.astro` (copy from terms.html)

---

## 🛠️ Helper Commands

### Extract HTML sections from index.html
```powershell
# Get lines 2545-2571 (Navbar)
Get-Content "index.html" | Select-Object -Skip 2544 -First 27

# Get lines 2616-2772 (Case Studies)
Get-Content "index.html" | Select-Object -Skip 2615 -First 157
```

### Test as you go
```fish
pnpm dev  # After each component
```

### Final build
```fish
pnpm build
pnpm preview
```

---

## 📊 Estimated Time

| Component Group | Estimated Time |
|----------------|----------------|
| Navigation | 30 min |
| Case Studies + Carousel | 45 min |
| Content Sections (3) | 60 min |
| FAQ + Scripts | 45 min |
| CTA + Footer + ScrollToTop | 30 min |
| Reveal Animation | 15 min |
| Privacy/Terms Pages | 15 min |
| **Total** | **~4 hours** |

---

## 🎯 Success Criteria

### Must Work
- ✅ Preloader loads and dismisses
- ✅ All sections visible and styled correctly
- ✅ Mobile menu opens/closes
- ✅ FAQ accordion expands/collapses
- ✅ Case studies carousel scrolls
- ✅ All animations work (shapes, reveal, etc.)

### Performance
- ✅ Lighthouse score > 85
- ✅ No console errors
- ✅ Fast initial load

---

## 🚨 Common Pitfalls

1. **Module imports** - Always use relative paths: `../scripts/file.js`
2. **Script tags in Astro** - Use `<script>` (not `is:inline` for client JS)
3. **CSS conflicts** - All CSS already in global.css, no duplication needed
4. **Event listeners** - Scripts should use `DOMContentLoaded` or run at end of body

---

## 📝 Template for New Component

```astro
---
// ComponentName.astro - Description
interface Props {
  // Add props if needed
}
---

<section class="section component-name" id="id" aria-label="Label">
  <!-- HTML content from index.html -->
</section>

<script>
  // Client-side JavaScript (if needed)
  // Import from ../scripts/ if complex
</script>
```

---

## 🎉 When Complete

1. Run full build: `pnpm build`
2. Test production: `pnpm preview`
3. Run Playwright tests: `pnpm test`
4. Commit: `git commit -m "feat: complete Astro migration"`
5. Deploy: `git push origin master`
6. Verify on https://thebrandcrew.lat

---

**Current Progress**: ~20%  
**Remaining**: ~80%  
**Most Critical Already Done**: ✅ Preloader fix

**Next Component**: Navbar.astro (Tarea 5.1)
