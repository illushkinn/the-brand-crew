# TODO - The Brand Crew

## High Priority

### Responsive Optimization
- [ ] **iPhone SE optimization** - Fix 1/4 black screen issue after hero pricing
  - Change hero from `height: 100vh` to `min-height: 100vh`
  - Add media query `@media (max-height: 700px) and (max-width: 400px)`
  - Reduce padding/spacing in hero meta and pricing for small screens
  - Compact font sizes for hero title/subtitle on very small devices

- [ ] **Unify Steps layout** - Make "Three steps. No fluff" consistent across mobile/desktop
  - Currently left-aligned on mobile, centered on desktop
  - Decide on single layout approach (recommend: centered on both)

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

- [x] Fix production domain (thebrandcrew.lat) - DNS configuration issue
- [x] Remove hero peep illustration
- [x] Fix preloader flickering
- [x] Align FAQ questions with title on desktop
- [x] Reduce hero subtitle size on mobile
- [x] Align steps to left on mobile
- [x] Update copy to agency tone (We → us)
- [x] Implement landscape orientation support (Phases 1-2)
- [x] Create mobile orientation handling spec
