# Design Document: Astro Migration

## Overview

This design outlines the progressive migration strategy for converting a 3049-line static HTML website to Astro's component-based architecture. The migration follows a "strangler fig" pattern, where components are extracted incrementally while maintaining full site functionality. The design prioritizes fixing the preloader module loading issue, establishing proper code splitting, and creating a sustainable component architecture that improves performance without changing the user experience.

The migration will use Astro's Static Site Generation (SSG) capabilities with the Vercel adapter, maintaining all existing CSS (including glassmorphism effects and animations), JavaScript interactivity, and SEO elements.

## Architecture

### High-Level Structure

```
project-root/
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── MobileMenu.astro
│   │   ├── Hero.astro
│   │   ├── CaseStudies.astro
│   │   ├── Problema.astro
│   │   ├── ComoFunciona.astro
│   │   ├── Pricing.astro
│   │   ├── FAQ.astro
│   │   ├── Blog.astro
│   │   ├── About.astro
│   │   ├── CTA.astro
│   │   ├── Footer.astro
│   │   ├── Preloader.astro
│   │   └── ScrollToTop.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── scripts/
│   │   ├── preloader.js (existing)
│   │   ├── navigation.js
│   │   ├── faq.js
│   │   ├── carousel.js
│   │   ├── scroll.js
│   │   └── reveal.js
│   ├── styles/
│   │   └── global.css
│   └── pages/
│       ├── index.astro
│       ├── privacy.astro
│       └── terms.astro
├── public/
│   ├── assets/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── astro.config.mjs
└── package.json
```

### Migration Strategy: Progressive Componentization

The migration follows this sequence to minimize risk:

1. **Phase 1: Foundation**
   - Create BaseLayout.astro with global styles
   - Extract CSS to global.css
   - Set up proper module resolution

2. **Phase 2: Static Components**
   - Extract non-interactive sections first (Blog, About)
   - Validate visual output matches original

3. **Phase 3: Interactive Components**
   - Extract components with JavaScript (Navbar, FAQ, CaseStudies)
   - Migrate JavaScript to separate module files
   - Wire up client-side interactivity with `<script>` tags

4. **Phase 4: Critical Path**
   - Fix Preloader module loading
   - Extract Hero with animations
   - Ensure above-the-fold performance

5. **Phase 5: Polish**
   - Implement lazy loading for below-the-fold sections
   - Optimize bundle sizes
   - Run performance audits

## Components and Interfaces

### BaseLayout.astro

The root layout that wraps all pages, providing global structure, styles, and meta tags.

**Interface:**
```typescript
interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalURL?: string;
}
```

**Responsibilities:**
- Render HTML head with meta tags, Open Graph, Twitter Cards
- Include Google Fonts preconnect
- Load Vercel Analytics and Speed Insights
- Provide global CSS variables and base styles
- Render slot for page content
- Include structured data (JSON-LD)

**Implementation Details:**
- Use Astro.props to accept metadata
- Inline critical CSS for above-the-fold content
- Defer non-critical scripts
- Include skip-link for accessibility

### Preloader.astro

The animated loading screen with 3D rotating cube.

**Interface:**
```typescript
interface Props {}
```

**Responsibilities:**
- Render preloader HTML structure (wrapper, cube faces, hint)
- Import and execute preloader.js module
- Block scroll during loading
- Handle dismiss animation

**Implementation Details:**
- Use `<script type="module">` with proper import path
- Call `createPreloader()` from preloader.js
- Ensure module loads before DOM interaction
- Set `html.preloading` class initially, remove on dismiss

**Client-Side Script:**
```javascript
import { createPreloader } from '/src/scripts/preloader.js';
const preloaderEl = document.getElementById('preloader');
const loader = createPreloader({
  preloader: preloaderEl,
  fill: document.getElementById('preloader-fill'),
  hint: document.getElementById('preloader-hint')
});
loader.start();
```

### Navbar.astro

Fixed navigation bar with hamburger menu toggle and scroll-based styling.

**Interface:**
```typescript
interface Props {}
```

**Responsibilities:**
- Render navigation structure
- Provide hamburger button for mobile menu
- Show/hide desktop links based on viewport

**Client-Side Behavior:**
- Add `.scrolled` class when `window.scrollY > 0`
- Toggle `aria-expanded` on hamburger button
- Communicate with MobileMenu component

### MobileMenu.astro

Full-screen mobile navigation overlay.

**Interface:**
```typescript
interface Props {}
```

**Responsibilities:**
- Render navigation links with staggered animation delays
- Handle open/close transitions
- Trap focus when open

**Client-Side Behavior:**
- Add `.is-open` class for clip-path animation
- Set `inert` attribute when closed
- Close on link click, escape key, or backdrop click
- Apply transition delays to each link for staggered effect

### Hero.astro

Main hero section with animated background shapes.

**Interface:**
```typescript
interface Props {}
```

**Responsibilities:**
- Render hero content (title, subtitle, CTA buttons, pricing)
- Include 9 animated shape divs for desktop
- Provide B2B tags and metadata

**Styling:**
- Scoped styles for hero-specific layout
- Reference global keyframes for shape animations
- Use `will-change` and `transform: translateZ(0)` for performance

### CaseStudies.astro

Horizontal scrolling carousel of case study cards.

**Interface:**
```typescript
interface CaseStudy {
  company: string;
  category: string;
  location: string;
  logo: string;
  description: string;
  status: 'in development' | 'live';
  links: { url: string; label: string }[];
  metrics: { value: string; label: string }[];
}

interface Props {
  studies: CaseStudy[];
}
```

**Responsibilities:**
- Render scrollable grid of case study cards
- Provide prev/next navigation buttons
- Handle smooth horizontal scrolling

**Client-Side Behavior:**
- Scroll grid by fixed amount on button click
- Update button disabled state based on scroll position

### Problema.astro

Problem statement section with grid of pain point cards.

**Interface:**
```typescript
interface Props {}
```

**Responsibilities:**
- Render 3 glass cards highlighting customer problems
- Maintain grid layout (1 column mobile, 2+ columns desktop)

### ComoFunciona.astro

Three-step process section with numbered cards.

**Interface:**
```typescript
interface Step {
  number: string;
  title: string;
  description: string;
}

interface Props {
  steps: Step[];
}
```

**Responsibilities:**
- Render step cards in flexible container
- Support responsive layout (vertical mobile, horizontal desktop)

### Pricing.astro

Pricing card with animated background shapes.

**Interface:**
```typescript
interface Props {}
```

**Responsibilities:**
- Render pricing details with strike-through and current price
- Display payment split (2 payments)
- List included features with checkmarks
- Include CTA button

**Styling:**
- Include 3 animated pricing shapes (similar to hero shapes)
- Glass card with top gradient border

### FAQ.astro

Accordion-style FAQ section.

**Interface:**
```typescript
interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items: FAQItem[];
}
```

**Responsibilities:**
- Render collapsible FAQ items
- Handle expand/collapse with smooth height transition

**Client-Side Behavior:**
- Toggle `aria-expanded` on question button
- Calculate and set `max-height` for smooth transition
- Close other open items when one is opened (accordion behavior)
- Rotate chevron icon based on state

### Blog.astro

Under construction placeholder for blog.

**Interface:**
```typescript
interface Props {}
```

**Responsibilities:**
- Render construction message with icon
- Use glass card styling

### About.astro

About section with company description.

**Interface:**
```typescript
interface Props {}
```

**Responsibilities:**
- Render about text in glass card
- Highlight brand name in terracotta color

### CTA.astro

Full-height call-to-action section with footer.

**Interface:**
```typescript
interface Props {}
```

**Responsibilities:**
- Render final CTA heading
- Include animated background shapes
- Embed Footer component

**Styling:**
- Full viewport height with `dvh`
- Flex column layout with footer at bottom

### Footer.astro

Site footer with business information and links.

**Interface:**
```typescript
interface Props {}
```

**Responsibilities:**
- Render brand name, CUIT, and links
- Include privacy policy and terms of service links
- Display social media links

### ScrollToTop.astro

Floating button to scroll back to top of page.

**Interface:**
```typescript
interface Props {}
```

**Responsibilities:**
- Render fixed position button with arrow icon
- Show/hide based on scroll position

**Client-Side Behavior:**
- Add `.is-visible` class when `scrollY > 450`
- Remove class when `scrollY < 300` (hysteresis to prevent flicker)
- Smooth scroll to top on click

## Data Models

### Case Study Data

```typescript
interface CaseStudy {
  company: string;          // "Luisito Playa Grande"
  category: string;         // "Rotisería"
  location: string;         // "Mar del Plata"
  logo: string;             // "/assets/logos/luisito.svg"
  description: string;      // Story paragraph
  status: 'in development' | 'live';
  links: {
    url: string;
    label: string;
  }[];
  metrics: {
    value: string;          // "Digital Menu", "4.7 ★"
    label: string;          // "Online menu + orders"
  }[];
}
```

### FAQ Data

```typescript
interface FAQItem {
  question: string;
  answer: string;
}
```

### Step Data

```typescript
interface Step {
  number: string;      // "1", "2", "3"
  title: string;       // "Let's talk"
  description: string; // "You reach out and tell us your idea."
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Before defining the correctness properties, I need to perform a prework analysis of each acceptance criterion from the requirements document to determine which are testable as properties, examples, or edge cases.


### Property Reflection

After analyzing all acceptance criteria, I've identified the following consolidation opportunities:

1. **Component extraction (Requirements 4.1-4.13)**: All 13 component extraction checks can be verified by a single property that checks all expected components exist
2. **Visual output (5.1) and CSS preservation (5.2-5.7)**: Visual regression testing (5.1) would inherently catch CSS issues, making specific CSS checks redundant if we use comprehensive visual comparison
3. **Build output checks (7.1-7.6)**: Related build configuration checks can be consolidated
4. **Interactive behaviors (6.1-6.9)**: Each represents distinct interaction patterns and should remain separate

### Correctness Properties

**Property 1: Module Loading Correctness**
*For any* production build of the Migration_System, when deployed to Vercel and accessed by a user, the preloader module should load and execute without console errors related to module resolution
**Validates: Requirements 1.2**

**Property 2: Progressive Migration Stability**
*For any* subset of sections that have been migrated to Astro components, the build system should successfully compile and the site should render all content (both migrated and non-migrated sections) without layout breaks
**Validates: Requirements 2.1, 2.4**

**Property 3: Lazy Loading Behavior**
*For any* below-the-fold section with lazy loading enabled, the section's JavaScript should only load when the section enters the viewport, not on initial page load
**Validates: Requirements 3.3**

**Property 4: Critical Resource Loading**
*For any* page load of the homepage, only the critical above-the-fold resources (HTML, critical CSS, preloader JS) should be loaded before First Contentful Paint
**Validates: Requirements 3.2**

**Property 5: Visual Regression Preservation**
*For any* section of the migrated site, when rendered at any standard viewport size (mobile, tablet, desktop), the visual output should be pixel-perfect identical to the original Static_HTML_Site within a 0.1% diff threshold
**Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7**

**Property 6: Menu Toggle Interaction**
*For any* click event on the hamburger button, the mobile menu should toggle its open state (closed → open or open → closed) with the clip-path animation and update the aria-expanded attribute
**Validates: Requirements 6.1**

**Property 7: FAQ Accordion Behavior**
*For any* FAQ question button click, the corresponding answer should expand if closed (or collapse if open), the max-height should transition smoothly, and all other FAQ items should collapse (accordion pattern)
**Validates: Requirements 6.2**

**Property 8: Carousel Navigation**
*For any* click on the case studies carousel navigation buttons (prev/next), the carousel should scroll by the defined amount in the corresponding direction with smooth scroll behavior
**Validates: Requirements 6.3**

**Property 9: Scroll-to-Top Action**
*For any* click on the scroll-to-top button when visible, the page should animate scroll to position 0 with smooth behavior
**Validates: Requirements 6.5**

**Property 10: Preloader Dismissal**
*For any* click on the preloader area after the loading bar reaches 100% and the "Tap the cube" hint is visible, the preloader should fade out with opacity and scale transitions and remove the scrollbar lock
**Validates: Requirements 6.7**

**Property 11: Reveal Animation Trigger**
*For any* element with the `.reveal` class, when it enters the viewport with at least 15% visibility, the element should receive the `.visible` class and animate from opacity 0 to 1 with a translateY transition
**Validates: Requirements 6.8**

**Property 12: Preloader Hint Display**
*For any* preloader loading sequence, when the progress bar reaches 100%, the "Tap the cube" hint should become visible by adding the `.visible` class and triggering the hint animations
**Validates: Requirements 6.6**

## Error Handling

### Build-Time Error Handling

**Module Resolution Failures:**
- If preloader.js import fails, build should fail with clear error message indicating the missing module path
- Provide suggestion to check astro.config.mjs vite.resolve.alias configuration

**Component Import Errors:**
- If a component import fails in BaseLayout or pages, Astro should display helpful error with component name and expected path
- Development mode should show error overlay with stack trace

**Asset Missing Errors:**
- If referenced images or fonts are missing, build should warn (not fail) and continue
- Log missing asset paths to help developer identify issues

### Runtime Error Handling

**JavaScript Interaction Failures:**
- Wrap all interactive JavaScript (menu, FAQ, carousel) in try-catch blocks
- Log errors to console without breaking other functionality
- Gracefully degrade: if FAQ JavaScript fails, FAQs should remain expanded by default

**Module Loading Failures:**
- If preloader.js fails to load, page should automatically dismiss preloader wrapper after 3 seconds timeout
- Remove `html.preloading` class to restore scroll
- Log error to console for debugging

**Scroll Event Errors:**
- If scroll-to-top or navbar scroll listeners fail, should not prevent other functionality
- Use passive event listeners where possible to improve performance

**Animation Failures:**
- If IntersectionObserver is not supported (older browsers), elements should be immediately visible instead of animating in
- Provide fallback for backdrop-filter (glassmorphism) using solid semi-transparent backgrounds

### User-Facing Error States

**Slow Network:**
- Preloader timeout mechanism ensures page becomes usable even if loading simulation hangs
- Critical CSS inlined ensures basic styling loads immediately

**JavaScript Disabled:**
- All content must be accessible without JavaScript
- FAQs should be expanded by default in HTML
- Mobile menu should degrade to anchor links that work without JavaScript

**Browser Compatibility:**
- Feature detect IntersectionObserver, provide fallback
- Feature detect backdrop-filter, provide fallback background
- Feature detect CSS scroll-snap, provide fallback horizontal scroll

## Testing Strategy

The testing strategy uses both unit tests and property-based tests to ensure comprehensive coverage. Unit tests verify specific examples and edge cases, while property tests verify universal properties across all inputs.

### Property-Based Testing Configuration

We will use **Playwright** for property-based testing of UI interactions, as it already exists in the project. Each property test will:
- Run minimum **100 iterations** with randomized inputs (viewport sizes, scroll positions, etc.)
- Tag tests with comments referencing design properties
- Use Playwright's built-in retry logic for flaky tests

**Property Test Examples:**

```javascript
// Feature: astro-migration, Property 6: Menu Toggle Interaction
test.describe('Menu Toggle Property', () => {
  test('clicking hamburger toggles menu state', async ({ page }) => {
    await page.goto('/');
    
    // Property test: verify toggle works from any initial state
    for (let i = 0; i < 100; i++) {
      const initialState = await page.getAttribute('[aria-expanded]', 'aria-expanded');
      await page.click('.hamburger-btn');
      const newState = await page.getAttribute('[aria-expanded]', 'aria-expanded');
      expect(newState).not.toBe(initialState);
    }
  });
});

// Feature: astro-migration, Property 11: Reveal Animation Trigger
test.describe('Reveal Animation Property', () => {
  test('elements animate when entering viewport', async ({ page }) => {
    await page.goto('/');
    
    const reveals = await page.locator('.reveal').all();
    
    // Property: any reveal element should animate on viewport entry
    for (const reveal of reveals) {
      await reveal.scrollIntoViewIfNeeded();
      await expect(reveal).toHaveClass(/visible/);
    }
  });
});
```

### Unit Testing Strategy

Unit tests will focus on:

1. **Specific Examples:**
   - Preloader module loads without errors
   - Build outputs dist/ directory with HTML files
   - All 13 components extracted (Navbar, Hero, CaseStudies, etc.)
   - Scroll-to-top button appears at exactly 450px threshold
   - Performance metrics (20% faster load, 15% better TTI)

2. **Edge Cases:**
   - Preloader timeout after 3 seconds if stuck
   - Menu close on resize from mobile to desktop
   - FAQ accordion with all items closed or all open
   - Carousel at first/last item (button states)
   - Empty case studies array

3. **Integration Tests:**
   - Full page renders without console errors
   - All Playwright tests pass (hero, navigation, orientation, pricing, scroll-to-top)
   - Visual regression against original HTML

**Example Unit Tests:**

```javascript
// Specific example: Scroll threshold
test('scroll-to-top appears at 450px', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 449));
  await expect(page.locator('.scroll-to-top')).not.toHaveClass(/is-visible/);
  
  await page.evaluate(() => window.scrollTo(0, 451));
  await expect(page.locator('.scroll-to-top')).toHaveClass(/is-visible/);
});

// Edge case: Preloader timeout
test('preloader auto-dismisses after timeout', async ({ page }) => {
  // Mock preloader that never completes
  await page.addInitScript(() => {
    window.__MOCK_PRELOADER_HANG__ = true;
  });
  
  await page.goto('/');
  await page.waitForTimeout(3500);
  
  // Should auto-dismiss even though loading didn't complete
  await expect(page.locator('#preloader-wrapper')).toHaveClass(/is-dismissed/);
});

// Component extraction check
test('all components extracted', async ({ page }) => {
  await page.goto('/');
  
  const components = [
    '.navbar', '.mobile-menu', '.hero', '.resultados',
    '.problema', '.como-funciona', '.pricing', '.faq',
    '.blog', '.about', '.cta-final', '.footer',
    '#preloader-wrapper', '.scroll-to-top'
  ];
  
  for (const selector of components) {
    await expect(page.locator(selector)).toBeVisible();
  }
});
```

### Visual Regression Testing

Use Playwright's screenshot comparison:

```javascript
test('visual regression - homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    threshold: 0.001 // 0.1% diff tolerance
  });
});
```

### Performance Testing

Use Lighthouse CI in the build pipeline:

```javascript
// lighthouse-config.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],
        'interactive': ['error', { maxNumericValue: 4000 }]
      }
    }
  }
};
```

### Test Coverage Goals

- **Unit Test Coverage:** 80% of JavaScript functions
- **Property Test Coverage:** All interactive behaviors (menu, FAQ, carousel, scroll)
- **Visual Regression:** All pages at mobile, tablet, desktop viewports
- **Performance:** Lighthouse score > 90 for Performance, Accessibility, Best Practices, SEO

### Continuous Integration

All tests run on:
- Every PR to main branch
- Before deployment to Vercel
- Nightly for visual regression baseline updates

**Test Execution Order:**
1. Unit tests (fastest feedback)
2. Property tests (interaction verification)
3. Visual regression (slowest, but comprehensive)
4. Performance tests (Lighthouse CI)
