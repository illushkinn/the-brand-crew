# Implementation Plan: Astro Migration

## Overview

This implementation plan breaks down the Astro migration into discrete, incremental steps that maintain site functionality throughout the process. The migration follows a progressive componentization strategy, starting with foundation setup, moving through static sections, then tackling interactive components, and finally optimizing performance. Each task builds on previous work, ensuring the site remains deployable at every stage.

## Tasks

- [ ] 1. Set up Astro foundation and build configuration
  - Create src/layouts/BaseLayout.astro with HTML structure, meta tags, and global styles
  - Extract all CSS from index.html to src/styles/global.css
  - Configure astro.config.mjs for proper module resolution and Vercel adapter
  - Set up vite.resolve.alias to fix preloader.js import path
  - Verify `pnpm build` outputs to dist/ directory successfully
  - _Requirements: 7.1, 7.2, 7.6, 1.1, 1.4_

- [ ] 1.1 Write property test for build output
  - **Property 2: Progressive Migration Stability**
  - **Validates: Requirements 2.4**

- [ ] 2. Create index page and verify basic rendering
  - Create src/pages/index.astro importing BaseLayout
  - Add temporary placeholder content to verify layout renders
  - Test `pnpm dev` starts development server correctly
  - Verify hot reload works when editing files
  - _Requirements: 11.1, 11.2, 11.3_

- [-] 3. Extract static, non-interactive components
  - [x] 3.1 Create Blog.astro component
    - Extract blog section HTML from index.html
    - Include section-scoped styles
    - Add component to index.astro
    - _Requirements: 4.8_
  
  - [x] 3.2 Create About.astro component
    - Extract about section HTML
    - Include glass-card styling
    - Add component to index.astro
    - _Requirements: 4.9_
  
  - [ ] 3.3 Write visual regression test for static components
    - **Property 5: Visual Regression Preservation**
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7**

- [ ] 4. Checkpoint - Ensure dev server runs and static sections render
  - Verify dev server shows Blog and About sections correctly
  - Check browser console for any errors
  - Ensure all tests pass, ask the user if questions arise.

- [-] 5. Extract layout and navigation components
  - [x] 5.1 Create Navbar.astro component
    - Extract navbar HTML structure
    - Include hamburger button and desktop links
    - Add scroll-based styling logic
    - _Requirements: 4.1_
  
  - [x] 5.2 Create MobileMenu.astro component
    - Extract mobile menu HTML
    - Set up clip-path animation CSS
    - Include navigation links with stagger delays
    - _Requirements: 4.12_
  
  - [x] 5.3 Create navigation.js script
    - Move menu toggle logic from inline script
    - Implement openMenu, closeMenu, toggleMenu functions
    - Add event listeners for hamburger button, links, escape key
    - Handle resize listener to close menu on desktop breakpoint
    - _Requirements: 6.1_
  
  - [x] 5.4 Wire navigation.js to components
    - Import navigation.js in BaseLayout or index.astro with `<script>` tag
    - Ensure script runs after DOM is ready
    - Test menu open/close functionality
    - _Requirements: 6.1_
  
  - [ ] 5.5 Write property test for menu toggle
    - **Property 6: Menu Toggle Interaction**
    - **Validates: Requirements 6.1**

- [-] 6. Extract Hero section with animations
  - [x] 6.1 Create Hero.astro component
    - Extract hero HTML structure
    - Include 9 animated shape divs
    - Add hero content (title, subtitle, pricing, CTA buttons)
    - Include scoped styles for hero layout
    - _Requirements: 4.2_
  
  - [ ] 6.2 Verify shape animations work
    - Test hero-shape keyframes render correctly
    - Verify will-change and transform optimizations
    - Check animations on mobile vs desktop
    - _Requirements: 5.7_

- [-] 7. Extract and fix Preloader component (critical path)
  - [x] 7.1 Create Preloader.astro component
    - Extract preloader HTML structure (wrapper, cube, hint, progress bar)
    - Include preloader-specific styles
    - _Requirements: 4.13_
  
  - [x] 7.2 Set up preloader module import
    - Copy src/preloader.js to src/scripts/preloader.js (if not already there)
    - Add `<script type="module">` in Preloader.astro or BaseLayout
    - Use correct import path: `import { createPreloader } from '/src/scripts/preloader.js'`
    - Call createPreloader() with DOM references
    - _Requirements: 1.3, 1.4_
  
  - [ ] 7.3 Test preloader on local dev
    - Verify preloader animation plays
    - Verify "Tap the cube" hint appears after loading
    - Verify clicking cube dismisses preloader
    - Check browser console for module errors
    - _Requirements: 1.2, 6.6, 6.7_
  
  - [ ] 7.4 Write property test for preloader dismissal
    - **Property 10: Preloader Dismissal**
    - **Validates: Requirements 6.7**
  
  - [ ] 7.5 Write property test for preloader hint display
    - **Property 12: Preloader Hint Display**
    - **Validates: Requirements 6.6**

- [ ] 8. Checkpoint - Test preloader works on local build
  - Run `pnpm build` and verify no module resolution errors
  - Run `pnpm preview` to test production build locally
  - Click through preloader and verify it dismisses
  - Ensure all tests pass, ask the user if questions arise.

- [-] 9. Extract remaining hero-adjacent sections
  - [x] 9.1 Create Problema.astro component
    - Extract problema section HTML
    - Include glass-card grid layout
    - Add animated background glow effect
    - _Requirements: 4.4_
  
  - [x] 9.2 Create CaseStudies.astro component
    - Extract resultados (case studies) section HTML
    - Include carousel grid and navigation buttons
    - Define CaseStudy TypeScript interface
    - Pass case study data as props
    - _Requirements: 4.3_
  
  - [x] 9.3 Create carousel.js script
    - Move carousel scroll logic from inline script
    - Implement prev/next button handlers
    - Add smooth scroll behavior
    - _Requirements: 6.3_
  
  - [x] 9.4 Wire carousel.js to CaseStudies component
    - Import carousel.js in index.astro or BaseLayout
    - Verify horizontal scrolling works with buttons
    - Test on mobile touch scrolling
    - _Requirements: 6.3_
  
  - [ ] 9.5 Write property test for carousel navigation
    - **Property 8: Carousel Navigation**
    - **Validates: Requirements 6.3**

- [-] 10. Extract middle sections with interactions
  - [x] 10.1 Create ComoFunciona.astro component
    - Extract como-funciona (how it works) section HTML
    - Include 3-step cards with glass-step styling
    - Define Step TypeScript interface
    - _Requirements: 4.5_
  
  - [x] 10.2 Create Pricing.astro component
    - Extract pricing section HTML
    - Include animated pricing shapes (3 shapes)
    - Add glass-card with pricing details and CTA
    - _Requirements: 4.6_
  
  - [x] 10.3 Create FAQ.astro component
    - Extract FAQ section HTML
    - Include animated FAQ shapes (3 shapes)
    - Set up accordion question/answer structure
    - Define FAQItem TypeScript interface
    - _Requirements: 4.7_
  
  - [x] 10.4 Create faq.js script
    - Move FAQ accordion logic from inline script
    - Implement expand/collapse with max-height transitions
    - Add click handlers to question buttons
    - Ensure only one item open at a time (accordion pattern)
    - _Requirements: 6.2_
  
  - [x] 10.5 Wire faq.js to FAQ component
    - Import faq.js in index.astro or BaseLayout
    - Test FAQ expand/collapse animations
    - Verify aria-expanded attributes update correctly
    - _Requirements: 6.2_
  
  - [ ] 10.6 Write property test for FAQ accordion
    - **Property 7: FAQ Accordion Behavior**
    - **Validates: Requirements 6.2**

- [-] 11. Extract footer and utility components
  - [x] 11.1 Create CTA.astro component
    - Extract cta-final section HTML
    - Include animated CTA shapes (3 shapes)
    - Add final call-to-action heading
    - _Requirements: 4.10_
  
  - [x] 11.2 Create Footer.astro component
    - Extract footer HTML structure
    - Include business info, CUIT, links, social media
    - Embed Footer within CTA component
    - _Requirements: 4.11_
  
  - [x] 11.3 Create ScrollToTop.astro component
    - Extract scroll-to-top button HTML
    - Include fixed positioning styles
    - _Requirements: 4.14_
  
  - [x] 11.4 Create scroll.js script
    - Move scroll-to-top logic from inline script
    - Implement visibility toggle (show at 450px, hide at 300px - hysteresis)
    - Add smooth scroll to top on click
    - Use requestAnimationFrame for scroll listener
    - _Requirements: 6.4, 6.5_
  
  - [x] 11.5 Wire scroll.js to ScrollToTop component
    - Import scroll.js in index.astro or BaseLayout
    - Test button appears/disappears at correct thresholds
    - Verify smooth scroll to top works
    - _Requirements: 6.4, 6.5_
  
  - [ ] 11.6 Write property test for scroll-to-top action
    - **Property 9: Scroll-to-Top Action**
    - **Validates: Requirements 6.5**

- [-] 12. Implement reveal animations
  - [x] 12.1 Create reveal.js script
    - Set up IntersectionObserver for `.reveal` elements
    - Add `.visible` class when elements enter viewport (15% threshold)
    - Unobserve elements after they become visible
    - _Requirements: 6.8_
  
  - [x] 12.2 Wire reveal.js to BaseLayout
    - Import reveal.js in BaseLayout
    - Ensure script runs after DOM loads
    - Test reveal animations as sections scroll into view
    - _Requirements: 6.8_
  
  - [ ] 12.3 Write property test for reveal animation
    - **Property 11: Reveal Animation Trigger**
    - **Validates: Requirements 6.8**

- [ ] 13. Checkpoint - Full functionality verification
  - Test all interactive features work correctly (menu, FAQ, carousel, scroll-to-top)
  - Verify reveal animations trigger on scroll
  - Check preloader loads and dismisses properly
  - Run `pnpm build && pnpm preview` to test production build locally
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 14. Create additional pages
  - [ ] 14.1 Create src/pages/privacy.astro
    - Extract privacy.html content
    - Use BaseLayout
    - _Requirements: 10.6_
  
  - [ ] 14.2 Create src/pages/terms.astro
    - Extract terms.html content
    - Use BaseLayout
    - _Requirements: 10.6_

- [ ] 15. Set up asset management and public files
  - [ ] 15.1 Move assets to public directory
    - Ensure public/assets/logos/ contains all logo files
    - Verify public/assets/og-image.png exists
    - Keep public/favicon.svg
    - _Requirements: 8.1, 8.2, 8.4_
  
  - [ ] 15.2 Verify static files in public/
    - Ensure public/robots.txt exists
    - Ensure public/sitemap.xml exists
    - _Requirements: 10.6_
  
  - [ ] 15.3 Test asset paths
    - Verify images load correctly in components
    - Check OG image metadata in BaseLayout
    - Test favicon displays in browser tab
    - _Requirements: 8.1, 8.2, 8.4, 8.5_

- [ ] 16. Optimize bundle configuration for code splitting
  - [ ] 16.1 Configure Vite build settings in astro.config.mjs
    - Set up manual chunks for major sections
    - Configure code splitting thresholds
    - Enable CSS code splitting
    - _Requirements: 3.1_
  
  - [ ] 16.2 Implement lazy loading for below-the-fold scripts
    - Use dynamic imports for carousel.js, faq.js, scroll.js
    - Load scripts only when sections enter viewport
    - Test bundle sizes in dist/ output
    - _Requirements: 3.3_
  
  - [ ] 16.3 Write property test for lazy loading
    - **Property 3: Lazy Loading Behavior**
    - **Validates: Requirements 3.3**
  
  - [ ] 16.4 Write property test for critical resource loading
    - **Property 4: Critical Resource Loading**
    - **Validates: Requirements 3.2**

- [ ] 17. Deploy to Vercel and verify production
  - [ ] 17.1 Deploy to Vercel
    - Push changes to git repository
    - Trigger Vercel deployment
    - Wait for build to complete
    - _Requirements: 9.1, 9.5_
  
  - [ ] 17.2 Test deployed site
    - Visit deployed URL and verify preloader works
    - Check browser console for module errors
    - Test all interactive features (menu, FAQ, carousel, scroll-to-top)
    - Verify Vercel Analytics loads
    - Verify Vercel Speed Insights loads
    - _Requirements: 1.2, 9.2, 9.3, 6.1, 6.2, 6.3, 6.5_
  
  - [ ] 17.3 Write property test for module loading on Vercel
    - **Property 1: Module Loading Correctness**
    - **Validates: Requirements 1.2**

- [ ] 18. Run existing Playwright test suite
  - [ ] 18.1 Run all Playwright tests against migrated site
    - Execute `pnpm test`
    - Verify tests/hero.spec.ts passes
    - Verify tests/navigation.spec.ts passes
    - Verify tests/orientation.spec.ts passes
    - Verify tests/pricing.spec.ts passes
    - Verify tests/scroll-to-top.spec.ts passes
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_
  
  - [ ] 18.2 Fix any failing tests
    - Investigate test failures
    - Update component implementation or test expectations
    - Re-run tests until all pass
    - _Requirements: 12.1_

- [ ] 19. Performance audit and optimization
  - [ ] 19.1 Run Lighthouse audit
    - Measure performance metrics for migrated site
    - Compare initial load time to original Static_HTML_Site
    - Measure Time to Interactive (TTI)
    - Document metrics in comparison table
    - _Requirements: 3.4, 3.5_
  
  - [ ] 19.2 Optimize if needed
    - If performance goals not met (20% faster load, 15% better TTI), identify bottlenecks
    - Optimize bundle sizes, images, or code splitting strategy
    - Re-run Lighthouse audit
    - _Requirements: 3.4, 3.5_

- [ ] 20. Final checkpoint - Production validation
  - Verify all sections render identically to original site
  - Test on multiple devices (mobile, tablet, desktop)
  - Test on multiple browsers (Chrome, Firefox, Safari, Edge)
  - Verify SEO metadata is preserved (Open Graph, Twitter Cards, structured data)
  - Check Google Search Console for any indexing issues
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation and provide opportunities to pause for user feedback
- Property tests validate universal correctness properties across randomized inputs
- The migration maintains site functionality at every step - any checkpoint can be deployed to production
- All existing Playwright tests must pass to ensure no regression
