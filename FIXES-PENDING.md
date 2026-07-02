# Pending Fixes for index.html

## Issue Summary
Three critical issues need to be fixed in `index.html`:

### 1. Scrollbar Flicker During Preloader
**Problem**: Scrollbar briefly appears during page load even with CSS hiding it.

**Root Cause**: The `.preloading` class is added via JavaScript AFTER the HTML loads, causing a brief flicker.

**Solution**: Add `class="preloading"` directly to the `<html>` tag.

**Changes Needed**:
```html
<!-- Line 2: Change FROM -->
<html lang="en" data-theme="terracotta">

<!-- Line 2: Change TO -->
<html lang="en" data-theme="terracotta" class="preloading">
```

```css
/* Line 89-91: Add !important to enforce rule */
html.preloading {
  scrollbar-width: none !important;
}
```

```javascript
/* Lines 2483-2485: Remove duplicate classList.add -->
<!-- OLD CODE -->
document.documentElement.classList.add('preloading');

<!-- NEW CODE (remove the line, update comment) -->
// Preloading class is set in <html> tag directly to prevent scrollbar flicker
```

### 2. Mobile Hero Text Overlapping Navbar (ZFold, Pixel)
**Problem**: On mobile devices like ZFold and Pixel, the hero text overlaps the navbar and hamburger menu.

**Current State**: `padding-top: 9rem` (line 1703)

**Solution**: Increase to `11rem`

**Changes Needed**:
```css
/* Line 1703: In @media (max-width: 767px) */
.hero {
  padding-top: 11rem;  /* Changed from 9rem */
  padding-bottom: 2rem;
  justify-content: flex-start;
}
```

### 3. Button Hover Effect Not Working
**Problem**: The "Book a Free Call" button hover effect (yellow-green background, black text) isn't showing in production.

**Current State**: Code appears correct in lines 362-366:
```css
.btn-premium:hover {
  background: var(--verde);
  color: var(--black);
  border-color: var(--verde);
}
```

**Possible Causes**:
- Cache issue (needs hard refresh or cache bust)
- CSS specificity conflict
- Build date not updated to trigger browser cache invalidation

**Solution**: Update build date and verify deployment
```html
<!-- Line 4: Update build date -->
<!-- Build: 2026-07-01 -->
```

## Verification Checklist
After applying fixes:
- [ ] Test scrollbar on fresh page load (hard refresh with Ctrl+Shift+R)
- [ ] Test mobile spacing on ZFold emulator (Chrome DevTools)
- [ ] Test mobile spacing on Pixel emulator (Chrome DevTools)
- [ ] Test button hover on desktop (requires deployed version, not local)
- [ ] Commit changes with message: "fix: eliminate scrollbar flicker, increase mobile hero spacing, update build date"
- [ ] Deploy to Vercel
- [ ] Clear browser cache and retest all three issues

## Technical Notes
- The scrollbar fix requires BOTH the HTML class attribute AND the CSS !important flag
- Mobile spacing may need further adjustment based on actual device testing
- Button hover may work locally but need cache clearing in production

---
Created: 2026-07-01
Status: Pending manual application due to WSL file system sync issues
