# Requirements Document: Astro Migration

## Introduction

This document defines the requirements for migrating an existing 3049-line static HTML website to the Astro framework. The migration must maintain 100% feature parity while fixing critical deployment issues (preloader module loading), improving performance through code splitting and lazy loading, and establishing a maintainable component architecture. The site must remain operational throughout the progressive migration, with zero downtime and no visual changes to the end user.

## Glossary

- **Migration_System**: The Astro-based website that will replace the current static HTML implementation
- **Static_HTML_Site**: The current 3049-line index.html file containing all sections, styles, and scripts
- **Preloader**: The animated loading screen with 3D cube that displays before main content
- **Component**: An isolated, reusable Astro component representing a section or UI element
- **SSG**: Static Site Generation - Astro's build-time rendering approach
- **Module**: An ES6 JavaScript module file with import/export statements
- **Vercel**: The deployment platform hosting the website
- **Code_Splitting**: Technique of separating code into smaller bundles loaded on demand
- **Glassmorphism**: Visual design style using backdrop-filter blur effects and transparent backgrounds
- **Progressive_Migration**: Migration strategy that keeps the site operational while incrementally moving to new architecture

## Requirements

### Requirement 1: Module Loading System

**User Story:** As a developer, I want the preloader JavaScript to load as a proper ES6 module, so that it functions correctly on Vercel deployment.

#### Acceptance Criteria

1. WHEN the Migration_System builds for production, THE Module_System SHALL bundle preloader.js with correct module resolution
2. WHEN a user visits the deployed site on Vercel, THE Preloader SHALL load and execute without module errors
3. WHEN the page loads, THE Preloader SHALL import using `<script type="module">` syntax with correct path resolution
4. WHEN Astro processes the preloader module, THE build system SHALL maintain the ES6 export/import structure

### Requirement 2: Progressive Migration Architecture

**User Story:** As a developer, I want to migrate sections incrementally to Astro components, so that the site remains operational during the entire migration process.

#### Acceptance Criteria

1. WHEN any single section is converted to an Astro component, THE Migration_System SHALL continue to render all other sections correctly
2. WHEN the site is deployed mid-migration, THE Migration_System SHALL display all content without broken layouts or missing functionality
3. THE Migration_System SHALL support parallel development of multiple components without conflicts
4. WHEN components are added incrementally, THE build system SHALL successfully compile partial migrations

### Requirement 3: Performance Optimization Through Code Splitting

**User Story:** As an end user, I want the website to load faster, so that I experience better performance and responsiveness.

#### Acceptance Criteria

1. WHEN the Migration_System builds, THE build process SHALL split JavaScript into separate bundles per major section
2. WHEN a user visits the homepage, THE Migration_System SHALL load only critical above-the-fold code initially
3. WHEN a user scrolls to a section, THE Migration_System SHALL lazy-load that section's JavaScript on demand
4. WHEN measured, THE initial page load SHALL be at least 20% faster than the Static_HTML_Site
5. WHEN measured, THE Time to Interactive (TTI) SHALL be reduced by at least 15%

### Requirement 4: Component Architecture

**User Story:** As a developer, I want all HTML sections extracted into Astro components, so that the codebase is maintainable and follows modern development practices.

#### Acceptance Criteria

1. THE Migration_System SHALL extract Navbar functionality into a dedicated Navbar.astro component
2. THE Migration_System SHALL extract Hero section into a dedicated Hero.astro component
3. THE Migration_System SHALL extract CaseStudies section into a dedicated CaseStudies.astro component
4. THE Migration_System SHALL extract Problema section into a dedicated Problema.astro component
5. THE Migration_System SHALL extract ComoFunciona section into a dedicated ComoFunciona.astro component
6. THE Migration_System SHALL extract Pricing section into a dedicated Pricing.astro component
7. THE Migration_System SHALL extract FAQ section into a dedicated FAQ.astro component
8. THE Migration_System SHALL extract Blog section into a dedicated Blog.astro component
9. THE Migration_System SHALL extract About section into a dedicated About.astro component
10. THE Migration_System SHALL extract CTA section into a dedicated CTA.astro component
11. THE Migration_System SHALL extract Footer section into a dedicated Footer.astro component
12. THE Migration_System SHALL extract MobileMenu into a dedicated MobileMenu.astro component
13. THE Migration_System SHALL extract Preloader into a dedicated Preloader.astro component

### Requirement 5: Style Preservation

**User Story:** As an end user, I want the migrated site to look identical to the original, so that my experience remains consistent.

#### Acceptance Criteria

1. WHEN comparing the migrated site to the original, THE Migration_System SHALL render identical visual output for all sections
2. WHEN CSS is extracted to components, THE Migration_System SHALL maintain all glassmorphism effects
3. WHEN CSS is extracted to components, THE Migration_System SHALL preserve all animation keyframes
4. WHEN CSS is extracted to components, THE Migration_System SHALL maintain all responsive breakpoints
5. THE Migration_System SHALL preserve all CSS custom properties (--variables)
6. THE Migration_System SHALL maintain backdrop-filter effects for glass cards
7. THE Migration_System SHALL preserve all shape animations (hero-shape, pricing-shape, faq-shape, cta-shape)

### Requirement 6: JavaScript Functionality Preservation

**User Story:** As an end user, I want all interactive features to work exactly as before, so that the migration doesn't break my experience.

#### Acceptance Criteria

1. WHEN a user clicks the hamburger menu, THE Navigation SHALL open/close with animation
2. WHEN a user clicks a FAQ question, THE FAQ_System SHALL expand/collapse the answer with smooth transition
3. WHEN a user clicks navigation arrows, THE Case_Studies_Carousel SHALL scroll to next/previous items
4. WHEN a user scrolls past 450px, THE Scroll_To_Top_Button SHALL become visible
5. WHEN a user clicks the scroll-to-top button, THE page SHALL smooth scroll to the top
6. WHEN the preloader finishes loading, THE Preloader SHALL display the "Tap the cube" hint
7. WHEN a user clicks the preloader cube, THE Preloader SHALL dismiss with fade-out animation
8. WHEN sections enter viewport, THE Reveal_Animation SHALL fade and slide elements in
9. WHEN the navbar scrolls past header, THE Navbar SHALL add blur backdrop and compact padding

### Requirement 7: Build Configuration

**User Story:** As a developer, I want the Astro build to output optimized static files, so that Vercel deployment is fast and reliable.

#### Acceptance Criteria

1. WHEN running `pnpm build`, THE Migration_System SHALL output static HTML files to the `dist/` directory
2. WHEN building, THE Migration_System SHALL use the Vercel adapter for optimal deployment
3. WHEN building, THE Migration_System SHALL inline critical CSS for above-the-fold content
4. WHEN building, THE Migration_System SHALL minify HTML, CSS, and JavaScript
5. WHEN building, THE Migration_System SHALL generate source maps for debugging
6. THE build output SHALL be compatible with Vercel's static hosting

### Requirement 8: Asset Management

**User Story:** As a developer, I want all assets properly managed, so that images, fonts, and icons load correctly.

#### Acceptance Criteria

1. WHEN the Migration_System builds, THE Asset_Pipeline SHALL copy all images from `/assets` to the output directory
2. WHEN the Migration_System builds, THE Asset_Pipeline SHALL maintain the correct public path for favicon.svg
3. WHEN fonts load, THE Migration_System SHALL use the existing Google Fonts preconnect strategy
4. THE Migration_System SHALL preserve all SVG inline icons in components
5. THE Migration_System SHALL maintain OG image metadata

### Requirement 9: Vercel Deployment Compatibility

**User Story:** As a developer, I want the migrated site to deploy successfully on Vercel, so that the production environment works without issues.

#### Acceptance Criteria

1. WHEN deployed to Vercel, THE Migration_System SHALL serve all routes with 200 status codes
2. WHEN deployed to Vercel, THE Migration_System SHALL load Vercel Analytics script correctly
3. WHEN deployed to Vercel, THE Migration_System SHALL load Vercel Speed Insights script correctly
4. WHEN deployed to Vercel, THE Migration_System SHALL respect the vercel.json configuration
5. THE Migration_System SHALL maintain compatibility with Vercel's edge network caching

### Requirement 10: SEO and Metadata Preservation

**User Story:** As a website owner, I want all SEO elements preserved, so that search engine rankings are not affected.

#### Acceptance Criteria

1. WHEN the Migration_System renders pages, THE HTML_Head SHALL include all original meta tags
2. THE Migration_System SHALL preserve Open Graph metadata for social sharing
3. THE Migration_System SHALL preserve Twitter Card metadata
4. THE Migration_System SHALL maintain canonical URLs
5. THE Migration_System SHALL include the structured data (JSON-LD) for business information
6. THE Migration_System SHALL maintain robots.txt and sitemap.xml files

### Requirement 11: Development Experience

**User Story:** As a developer, I want a fast development server with hot reload, so that I can iterate quickly during migration.

#### Acceptance Criteria

1. WHEN running `pnpm dev`, THE Development_Server SHALL start on localhost
2. WHEN a component file is saved, THE Development_Server SHALL hot-reload the browser
3. WHEN a CSS change is made, THE Development_Server SHALL update styles without full page reload
4. WHEN a JavaScript error occurs, THE Development_Server SHALL display helpful error messages

### Requirement 12: Testing Infrastructure

**User Story:** As a developer, I want existing Playwright tests to pass, so that I can verify the migration didn't break functionality.

#### Acceptance Criteria

1. WHEN running `pnpm test`, THE Test_Suite SHALL execute all Playwright tests
2. THE Migration_System SHALL pass all tests in tests/hero.spec.ts
3. THE Migration_System SHALL pass all tests in tests/navigation.spec.ts
4. THE Migration_System SHALL pass all tests in tests/orientation.spec.ts
5. THE Migration_System SHALL pass all tests in tests/pricing.spec.ts
6. THE Migration_System SHALL pass all tests in tests/scroll-to-top.spec.ts
