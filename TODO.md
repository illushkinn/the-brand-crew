# TODO - The Brand Crew

## High Priority

### Open Graph Optimization
- [x] ✅ Create OG meta tags (complete)
- [x] ✅ Create og-card.html template (complete)
- [x] ✅ Generate OG image (complete - assets/og-image.png)
- [x] ✅ Deploy OG image (complete)
- [ ] Test with Facebook Debugger
- [ ] Test with Twitter Card Validator

### Responsive Optimization
- [x] ✅ iPhone SE optimization (min-height strategy)
- [x] ✅ Unify Steps layout (centered on mobile/desktop)
- [x] ✅ Hero content centered better on desktop
- [ ] Test on real devices (iPhone SE, Galaxy S8+)

- [ ] **Test on real devices**
  - iPhone SE (375x667px) - portrait
  - iPhone 12 Mini (375x812px)
  - iPhone 14 Pro Max (430x932px)
  - Samsung Galaxy S8+ (360x740px)

### Performance
- [x] ✅ Enable Vercel Speed Insights
- [x] ✅ Enable Vercel Analytics
- [ ] Wait for Speed Insights data and optimize based on metrics

### Design Polish
- [x] ✅ Move FAQ title outside glass-card box
- [ ] Review hero spacing on tablet (768px-1024px)
- [ ] Consider adding subtle animations for FAQ expand/collapse

## Medium Priority

### Code Quality
- [ ] Run DRY code cleanup
  - Remove duplicate CSS rules
  - Consolidate media queries
  - Remove unused CSS (if any)

- [ ] Accessibility audit
  - Run WCAG 2.1 AA tests (tests/accessibility.spec.ts exists)
  - Fix any contrast issues
  - Verify keyboard navigation

### Content
- [ ] Update OG image to actual screenshot
- [ ] Replace placeholder `fb:app_id` if using Facebook sharing

## Low Priority

### Future Enhancements
- [ ] Consider adding dark/light theme toggle
- [ ] Blog section (currently shows "under construction")
- [ ] Add more case studies as they become available

## Completed Recently ✅

- [x] Code cleanup: remove 43 dead files (-700KB, 28% repo reduction)
- [x] Replace Lucide library with inline SVG (-100KB transfer)
- [x] Replace 4 rgba(179,107,72) instances with canonical OKLCH terracota
- [x] Fix scroll-to-top: <div role=button> → <button>, inline handlers → addEventListener
- [x] Remove dead CSS: .text-ochra, .mobile-link-empecemos, .resultado-historia blockquote, --text alias
- [x] Extract backdrop-filter pattern to CSS variable --glass-effect (DRY)
- [x] Reduce FAQ list margin from 3rem to 1.5rem (tighten spacing above first question)
- [x] Increase .progreso-tag font-size from 0.6rem to 0.7rem (WCAG readability)
- [x] Remove redundant document.activeElement.blur() calls in menu toggle
- [x] Rename variable 'p' to 'preloaderEl'
- [x] Optimize Open Graph meta tags (og:site_name, locale, dimensions, Twitter card)
- [x] Create og-card.html template for OG image generation
- [x] Move Steps title outside glass-card (like FAQ)
- [x] Center hero content on desktop (better spacing from navbar)
- [x] Update .gitignore (test artifacts, generated files)
- [x] Implement responsive design philosophy (iPhone SE optimization)
