# Tasks: Mobile Orientation Handling

## Implementation Tasks

### Phase 1: CSS Foundation
- [x] 1.1 Add landscape media query for hero section height adjustment
- [x] 1.2 Add short landscape (<500px) media query overrides
- [x] 1.3 Update mobile menu styles for landscape orientation
- [x] 1.4 Adjust section padding for landscape viewports
- [x] 1.5 Review and update all vh/dvh/svh usage for landscape compatibility

### Phase 2: Typography & Spacing
- [x] 2.1 Audit all clamp() values for landscape readability
- [x] 2.2 Add landscape-specific font size overrides where needed
- [x] 2.3 Adjust hero content spacing for landscape
- [x] 2.4 Update mobile menu link spacing for landscape
- [x] 2.5 Test minimum font sizes across orientations

### Phase 3: Component Refinements
- [ ] 3.1 Handle hero peep illustration in landscape (hide or scale)
- [ ] 3.2 Adjust hero shapes positioning for landscape
- [ ] 3.3 Update navbar brand text handling in landscape
- [ ] 3.4 Refine CTA button positioning in landscape hero
- [ ] 3.5 Test glass card sizing across orientations

### Phase 4: Property-Based Testing
- [ ] 4.1 **[PBT]** Write property test for content accessibility in landscape
  - **Property 1:** Content Accessibility in Landscape
  - **Validates:** Requirements 1.1, 3.2
  - **Generator:** Random viewport sizes (568-844w × 320-500h)
  - **Assertions:** Hero height <= viewport, CTAs visible, no overflow

- [ ] 4.2 **[PBT]** Write property test for mobile menu functionality
  - **Property 2:** Mobile Menu Functionality Across Orientations
  - **Validates:** Requirements 1.2, 2.2, 4.1
  - **Generator:** Portrait/landscape viewport pairs
  - **Assertions:** Menu opens, all links visible, closes correctly

- [ ] 4.3 **[PBT]** Write property test for horizontal overflow prevention
  - **Property 3:** No Horizontal Overflow
  - **Validates:** Requirements 1.4
  - **Generator:** Random mobile viewports (320-767w, both orientations)
  - **Assertions:** scrollWidth === innerWidth

- [ ] 4.4 **[PBT]** Write property test for typography legibility
  - **Property 4:** Typography Legibility
  - **Validates:** Requirements 1.5, 3.3
  - **Generator:** Smallest landscape viewports
  - **Assertions:** Font sizes meet minimums (body≥14px, headings≥18px)

- [ ] 4.5 **[PBT]** Write property test for layout stability during rotation
  - **Property 5:** Layout Stability During Rotation
  - **Validates:** Requirements 2.1, 2.4
  - **Generator:** Portrait/landscape rotation sequences
  - **Assertions:** Screenshots match, no transform artifacts

### Phase 5: Manual Testing & Refinement
- [ ] 5.1 Test on iPhone SE (smallest modern iPhone)
- [ ] 5.2 Test on iPhone 14 Pro Max (largest iPhone)
- [ ] 5.3 Test on common Android devices (Samsung, Pixel)
- [ ] 5.4 Test menu behavior during mid-rotation
- [ ] 5.5 Verify focus management during rotation
- [ ] 5.6 Test with iOS/Android accessibility features enabled

### Phase 6: Performance & Polish
- [ ] 6.1 Profile rotation performance on low-end device
- [ ] 6.2 Add will-change hints where needed
- [ ] 6.3 Verify 60fps during rotation transition
- [ ] 6.4 Test with prefers-reduced-motion
- [ ] 6.5 Document landscape-specific behavior in component specs

## Task Execution Order
1. Start with Phase 1 (CSS Foundation) - establishes base behavior
2. Move to Phase 2 (Typography) - ensures readability
3. Phase 3 (Component Refinements) - polish details
4. Phase 4 (PBT) - validate with property-based tests
5. Phase 5 (Manual Testing) - real device validation
6. Phase 6 (Performance) - optimize and document

## Dependencies
- Requires existing mobile menu component
- Requires existing viewport meta tag configuration
- Requires Playwright for testing
- Fast-check or similar PBT library for generators

## Success Criteria
- All property-based tests pass
- Manual testing shows no layout breaks on 5+ devices
- Performance metrics: < 300ms reflow, 60fps maintained
- No regressions in existing portrait layout
