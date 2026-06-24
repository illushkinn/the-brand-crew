# Cleanup Analysis - The Brand Crew

## 🗑️ Dead Code & Unused Files

### Directories to Remove

#### 1. `site/` - DUPLICATE LEGACY VERSION
- **Size:** ~500KB (with specs, scripts, assets)
- **Issue:** Old Spanish version, completely redundant
- **Action:** DELETE entire directory
- **Files:**
  - `site/index.html` - Old Spanish version
  - `site/specs/` - Duplicate design system docs
  - `site/scripts/token-audit.js` - Unused audit script
  - `site/vercel.json` - Duplicate Vercel config
  - `site/tokens.css` - Duplicate token file

#### 2. `docs/` - UNUSED DOCUMENTATION
- **Files:**
  - `docs/llm-design-systems-standard.md` - Not referenced anywhere
  - `docs/referencias-estilo-visual/` - Empty or legacy
- **Action:** REVIEW and potentially move useful content to README, then DELETE

#### 3. Unused Root Files

**`business-card.html`**
- Personal business card, not part of main site
- Not linked anywhere in production
- **Action:** DELETE or move to `/drafts` folder

**`export-pdf.py`**
- Python script to convert business-card.html to PDF
- Depends on WeasyPrint (not in package.json)
- **Action:** DELETE (related to business-card.html)

**`copy-espanol.md`**
- Original Spanish copy before translation
- Archived for reference but not needed in production
- **Action:** KEEP in root (useful for reference)

**`tokens.css`**
- Duplicate design tokens (all are inline in index.html)
- Not imported anywhere
- **Action:** DELETE

**`CLAUDE.md`**
- Unknown content, likely AI assistant notes
- **Action:** REVIEW → DELETE if not needed

**`PRD.md`**
- Product Requirements Doc - useful for reference
- **Action:** KEEP

**`OPTIMIZATION-SUMMARY.md`**, **`PRELOADER-OPTIMIZATION.md`**, **`AUDIT-REPORT.md`**
- Listed in .gitignore but may exist
- Temporary documentation files
- **Action:** KEEP if useful, otherwise DELETE

#### 4. Unused Assets

**`assets/peep-hero.svg`** and **`assets/hero-variant.svg`**
- Hero illustrations that were removed in commit `be017df`
- No longer referenced in index.html
- **Action:** DELETE both files

#### 5. Test Artifacts

**`playwright-report/`** - Generated test reports
- **Action:** ADD to .gitignore, DELETE from repo

**`test-results/`** - Test run results
- **Action:** ADD to .gitignore, DELETE from repo

#### 6. Lock Files

**`pnpm-lock.yaml`**
- Project uses npm (package-lock.json exists)
- Conflicting lock file
- **Action:** DELETE

---

## 🧹 Code Quality Issues

### DRY Violations in index.html

#### 1. Duplicate Media Queries
**Problem:** Multiple `@media (max-width: 767px)` blocks scattered throughout
**Solution:** Consolidate into single mobile media query block

**Current structure:**
```css
@media (max-width: 767px) { /* Line 642 */ }
@media (max-width: 767px) { /* Line 1108 */ }
@media (max-width: 767px) { /* Line 1536 */ }
```

**Better structure:**
```css
@media (max-width: 767px) {
  /* All mobile rules here */
}
```

#### 2. Repeated Color Values
**Problem:** OKLCH colors repeated instead of using CSS variables
**Example:**
```css
background: oklch(0.58 0.18 32 / 0.15); /* Appears 20+ times */
```

**Solution:** Already using `var(--terracota)` in most places, audit remaining hardcoded values

#### 3. Duplicate Animations
**Problem:** Multiple similar hero shape animations
**Current:**
```css
@keyframes heroFloat { }
@keyframes heroFloatSlow { }
@keyframes heroFloatDiag { }
@keyframes heroTilt { }
@keyframes heroPulse { }
```

**Solution:** These are intentionally different for variety, KEEP AS IS

---

## ⚡ Performance Optimizations

### Critical Issues

#### 1. CSS Size
**Current:** ~85KB inline CSS in index.html
**Issue:** Blocks initial render
**Solutions:**
- Consider extracting to external stylesheet (better caching)
- Minify CSS in production (remove comments, whitespace)
- Use CSS containment: `contain: layout style paint`

#### 2. Font Loading
**Current:**
```html
<link href="https://fonts.googleapis.com/css2?family=Rethink+Sans:...&display=swap">
```
**Issue:** 3 font families (Rethink Sans, Grand Hotel, JetBrains Mono) = 3 separate requests
**Solutions:**
- Use `font-display: swap` ✅ (already doing this)
- Preload critical fonts:
  ```html
  <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
  ```
- Consider subsetting fonts (only Latin characters)

#### 3. Lucide Icons
**Current:**
```html
<script defer src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
```
**Issue:** 
- Loading entire icon library (~100KB) for 2-3 icons
- Using `@latest` (cache-busting on every update)

**Solutions:**
- Replace with inline SVG icons (5 icons = ~2KB)
- Or use specific version: `lucide@0.263.1` instead of `@latest`

#### 4. Preloader JavaScript
**File:** `src/preloader.js`
**Issue:** Module import blocks render
**Current:**
```html
<script type="module">
import { createPreloader } from '/src/preloader.js'
```

**Solution:**
- Keep as-is (defer is implicit for modules)
- Could inline the ~2KB script into HTML for faster FCP

---

## 🧪 Testing & Quality

### Missing Tests
**Exists:**
- `tests/hero.spec.ts`
- `tests/navigation.spec.ts`
- `tests/orientation.spec.ts`
- `tests/pricing.spec.ts`
- `tests/scroll-to-top.spec.ts`

**Missing:**
- Accessibility tests (mentioned in TODO but file doesn't exist in tests/)
- Visual regression tests
- Performance budget tests

### Test Coverage
**Current:** E2E tests only (Playwright)
**Missing:**
- Unit tests for preloader.js
- Component tests for FAQ accordion, mobile menu
- Performance benchmarks

---

## 📦 Dependencies Audit

### package.json Analysis

**Dev Dependencies:**
```json
{
  "playwright": "^1.49.1",
  "vitest": "^2.1.8"
}
```

**Issues:**
1. **Vitest installed but unused** - No vitest tests in project
   - Only Playwright tests exist
   - **Action:** REMOVE vitest + related deps if not planning to add unit tests
   
2. **No build tooling** - Pure HTML/CSS/JS project
   - Good for simplicity
   - Could benefit from minification step

---

## 🎯 Recommended Actions

### Immediate (High Impact, Low Effort)

1. ✅ **DELETE unused files and directories:**
   ```bash
   rm -rf site/
   rm -rf docs/
   rm business-card.html export-pdf.py
   rm tokens.css
   rm assets/peep-hero.svg assets/hero-variant.svg
   rm pnpm-lock.yaml
   ```

2. ✅ **Update .gitignore:**
   ```
   playwright-report/
   test-results/
   *.pdf
   ```

3. ✅ **Replace Lucide with inline SVG** for the 5 icons used

4. ✅ **Add version to Lucide** (if keeping): `lucide@0.263.1` instead of `@latest`

### Short Term (High Impact, Medium Effort)

5. ⏳ **Consolidate media queries** into organized blocks

6. ⏳ **Minify CSS** - Add build step with cssnano

7. ⏳ **Font optimization:**
   - Subset fonts to Latin only
   - Preload critical font files

### Long Term (Medium Impact, High Effort)

8. 📅 **Extract CSS to external file** for better caching

9. 📅 **Add visual regression tests** with Playwright

10. 📅 **Performance budget** with Lighthouse CI

---

## 📊 Expected Impact

### File Size Reduction
- **Before:** ~2.5MB repo size
- **After cleanup:** ~1.8MB (-28%)

### Performance Improvements
- **Lucide inline:** -100KB transfer, -50ms parse time
- **CSS consolidation:** Better compression (-5KB gzipped)
- **Font optimization:** -30KB transfer, +100ms FCP

### Maintainability
- **Single source of truth** (no site/ duplicate)
- **Organized CSS** (consolidated media queries)
- **Clear documentation** (no confusion between versions)

---

## 🚀 Implementation Plan

### Phase 1: Cleanup (30 min)
- Delete unused files and directories
- Update .gitignore
- Run tests to verify nothing breaks

### Phase 2: Inline Icons (20 min)
- Extract 5 Lucide icons to inline SVG
- Remove Lucide script tag
- Test icon rendering

### Phase 3: CSS Consolidation (45 min)
- Merge duplicate media query blocks
- Audit and deduplicate color values
- Test responsive behavior

### Phase 4: Performance (60 min)
- Add font preloading
- Consider CSS extraction
- Run Lighthouse and optimize

---

**Total estimated time:** 2.5-3 hours
**Risk level:** Low (mostly deletions and non-breaking optimizations)
**Rollback strategy:** Git revert if any issues arise
