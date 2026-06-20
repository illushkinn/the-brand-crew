# Design: Mobile Orientation Handling

## Overview
CSS-based responsive solution using media queries to detect landscape orientation and adjust layout, typography, and spacing for optimal mobile UX across orientations.

## Design Decisions

### 1. Detection Strategy
**Decision:** Use CSS `@media (orientation: landscape)` combined with max-height breakpoints  
**Rationale:** Pure CSS solution is performant, requires no JS, and leverages native browser capabilities  
**Alternatives Considered:**
- JavaScript matchMedia API - rejected due to unnecessary complexity
- ResizeObserver - rejected due to performance overhead

### 2. Layout Adaptation Approach
**Decision:** Switch from fixed `vh` units to `auto` height in landscape + reduce padding  
**Rationale:** Fixed viewport heights cause content cutoff in short landscape viewports  
**Tradeoff:** Less dramatic full-screen sections, but better usability

### 3. Mobile Menu Handling
**Decision:** Reduce font size and gap in landscape, maintain same clip-path animation  
**Rationale:** Preserves visual continuity while fitting content in shorter viewport  
**Constraint:** Must keep minimum 44px tap targets (iOS guidelines)

## Architecture

### Media Query Strategy
```css
/* Base: Portrait (default) */
.hero { min-height: 100dvh; }

/* Short landscape: priority override */
@media (orientation: landscape) and (max-height: 500px) {
  .hero { height: auto; min-height: calc(100dvh - 64px); }
}

/* General landscape: all mobile devices */
@media (orientation: landscape) and (max-width: 767px) {
  /* Adjustments here */
}
```

### Component-Specific Adaptations

#### Hero Section (Landscape)
- **Height:** `auto` instead of fixed `100dvh`
- **Padding:** Reduce vertical to `0.5rem`
- **Typography:** 
  - Hero title: max 3rem (from 4.5rem)
  - Hero sub: max 1.5rem (from 2rem)
- **Peep illustration:** Hide or reduce size significantly
- **Actions:** Maintain but reduce gap

#### Mobile Menu (Landscape)
- **Link font-size:** `2rem` (from `2.8rem`)
- **Gap:** `0.25rem` (from `0.5rem`)
- **Padding:** Reduce vertical spacing
- **Max links visible:** 5-6 before overflow

#### Navbar (Landscape)
- **Height:** Keep min 64px for consistency
- **Logo/brand:** Consider hiding text, show icon only
- **Safe areas:** Maintain padding-top for notch

#### Sections (General)
- **Min-height:** Remove or reduce to `auto`
- **Padding:** Reduce to `1rem` vertical
- **Typography:** Use lower end of clamp() ranges

## Correctness Properties

### Property 1: Content Accessibility in Landscape
**Validates: Requirements 1.1, 3.2**

**Property:** For all mobile devices in landscape orientation with height < 500px, all primary content (hero title, CTA, navigation) must be visible without scrolling beyond one viewport height.

**Test Strategy:**
- Generate random viewport sizes: widths 568px-844px, heights 320px-500px
- Assert: Hero section height <= viewport height
- Assert: All hero CTAs within viewport bounds
- Assert: Navbar + hero content fits without overflow

### Property 2: Mobile Menu Functionality Across Orientations
**Validates: Requirements 1.2, 2.2, 4.1**

**Property:** The mobile menu must open, display all links, and close successfully in both portrait and landscape orientations.

**Test Strategy:**
- Test in portrait (375x667), landscape (667x375)
- Open menu, verify all links visible
- Click link, verify menu closes and scrolls
- Rotate device (change viewport), verify menu still functions

### Property 3: No Horizontal Overflow
**Validates: Requirements 1.4**

**Property:** For all orientations and mobile viewport sizes, `document.body.scrollWidth` must equal `window.innerWidth` (no horizontal scroll).

**Test Strategy:**
- Generate random mobile viewports (320px-767px wide)
- Test both orientations
- Assert: `scrollWidth === innerWidth`
- Assert: All sections fit within viewport width

### Property 4: Typography Legibility
**Validates: Requirements 1.5, 3.3**

**Property:** All text must maintain minimum legible sizes in landscape: body text >= 14px, headings >= 18px, interactive elements >= 16px.

**Test Strategy:**
- Compute all text elements in landscape
- Assert: `getComputedStyle()` font-size meets minimums
- Test at smallest landscape viewport (568x320)

### Property 5: Layout Stability During Rotation
**Validates: Requirements 2.1, 2.4**

**Property:** When rotating from portrait to landscape and back, all major layout boxes (hero, sections, menu) must return to their original positions with no visual artifacts.

**Test Strategy:**
- Capture screenshots in portrait
- Rotate to landscape
- Rotate back to portrait
- Compare screenshots (pixel diff < 1%)
- Assert: No lingering transform/translate values

## Testing Framework
**Library:** Playwright Test  
**Property-Based Testing:** Custom generators for viewport sizes

## Implementation Notes

### Phase 1: CSS Media Queries
1. Add landscape media query for hero
2. Add short landscape (<500px height) overrides
3. Adjust mobile menu sizing

### Phase 2: Typography Adjustments
1. Review all clamp() values
2. Add landscape-specific overrides where needed
3. Test readability

### Phase 3: Component Refinements
1. Hero peep illustration handling
2. Section padding adjustments
3. Navigation spacing

### Phase 4: Testing
1. Write property-based tests
2. Manual testing on real devices
3. Performance profiling

## Edge Cases
- **iPhone SE landscape (568x320):** Smallest common landscape viewport
- **iPhone 14 Pro Max landscape (932x430):** Largest mobile landscape
- **Menu open during rotation:** Must handle gracefully
- **Mid-scroll rotation:** Should maintain relative scroll position

## Performance Considerations
- CSS transitions may cause jank during rotation
- Use `will-change` sparingly
- Prefer transform/opacity over layout properties
- Test on low-end Android devices

## Accessibility
- Focus order must remain logical in landscape
- Touch targets minimum 44x44px maintained
- Screen reader announcements unaffected by rotation
- Reduced motion preferences respected

## Design References
- iOS Human Interface Guidelines: Adaptivity and Layout
- Material Design: Responsive Layout Grid
- WCAG 2.1: Orientation (AA criterion 1.3.4)
