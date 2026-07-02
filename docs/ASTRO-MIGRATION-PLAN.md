# 🚀 Astro Migration Plan - The Brand Crew

## ✅ Completed Steps

1. ✅ **Scrollbar fix** committed and deployed
2. ✅ `astro.config.mjs` created
3. ✅ `package.json` updated with Astro scripts
4. ✅ Directory structure created (`src/pages`, `src/layouts`, `src/components`, `src/scripts`, `src/styles`)

---

## 📋 Next Steps

### Step 1: Create Base Layout ⏳
**File:** `src/layouts/BaseLayout.astro`

Extract `<head>` content from `index.html` lines 1-58:
- Meta tags (charset, viewport, theme-color)
- SEO (title, description, canonical)
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data
- Fonts (Google Fonts preconnect + links)
- Vercel analytics scripts
- Favicon

**Template:**
```astro
---
interface Props {
  title?: string;
  description?: string;
}

const {
  title = "Websites That Actually Work",
  description = "Websites that actually work. For businesses that mean business. Design + development + domain + hosting from $240.000 ARS."
} = Astro.props;
---

<!DOCTYPE html>
<html lang="en" data-theme="terracotta">
<head>
  <!-- Build date -->
  <script is:inline>history.scrollRestoration='manual';</script>
  
  <!-- Meta tags -->
  <meta charset="UTF-8">
  <meta name="color-scheme" content="dark only">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>{title}</title>
  <meta name="description" content={description}>
  <meta name="theme-color" content="#c47a68">
  <meta name="google-site-verification" content="k-kPS76zKdKwT-18dhJwvxuK56oZXsaMpiBEeOmjuQA" />

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://thebrandcrew.lat">
  <meta property="og:site_name" content="The Brand Crew">
  <meta property="og:title" content={`The Brand Crew — ${title}`}>
  <meta property="og:description" content={description}>
  <meta property="og:image" content="https://thebrandcrew.lat/assets/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="The Brand Crew - Websites That Actually Work">
  <meta property="og:locale" content="en_US">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://thebrandcrew.lat">
  <meta name="twitter:title" content={`The Brand Crew — ${title}`}>
  <meta name="twitter:description" content={description}>
  <meta name="twitter:image" content="https://thebrandcrew.lat/assets/og-image.png">
  <meta name="twitter:image:alt" content="The Brand Crew - Websites That Actually Work">

  <!-- SEO -->
  <link rel="canonical" href="https://thebrandcrew.lat">
  <meta name="robots" content="index, follow">
  
  <!-- JSON-LD -->
  <script type="application/ld+json" is:inline>
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Brand Crew",
    "url": "https://www.thebrandcrew.lat",
    "description": "Websites that actually work. For businesses that mean business.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.thebrandcrew.lat/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  </script>

  <!-- Favicon & Fonts -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Grand+Hotel&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- Analytics -->
  <script defer src="/_vercel/speed-insights/script.js"></script>
  <script defer src="/_vercel/insights/script.js"></script>
  
  <!-- Global Styles -->
  <link rel="stylesheet" href="/src/styles/global.css">
</head>
<body>
  <slot />
</body>
</html>
```

---

### Step 2: Extract Global CSS ⏳
**File:** `src/styles/global.css`

Extract CSS from `index.html` lines 59-2000+ to `global.css`

**Sections to extract:**
- CSS Reset
- CSS Variables (`:root`)
- Typography (h1-h4, p)
- Layout (sections, containers)
- Components (buttons, cards, navbar, etc.)
- Animations (@keyframes)
- Media queries
- Preloader styles

---

### Step 3: Create Components ⏳

#### 3.1 Preloader Component
**File:** `src/components/Preloader.astro`

Extract from `index.html` lines ~2400-2500 (preloader HTML)

```astro
---
// Preloader with 3D cube
---

<div id="preloader-wrapper">
  <div id="preloader">
    <div class="preloader-center">
      <div class="diamond-wrap">
        <div class="cube-3d">
          <div class="cube-face cube-front"></div>
          <div class="cube-face cube-back"></div>
          <div class="cube-face cube-left"></div>
          <div class="cube-face cube-right"></div>
          <div class="cube-face cube-top"></div>
          <div class="cube-face cube-bottom"></div>
        </div>
        <div class="core-track"><div class="diamond-core"></div></div>
      </div>
      <div class="preloader-hint" id="preloader-hint">
        <svg class="hint-arrow" width="26" height="48" viewBox="0 0 26 48" fill="none" aria-hidden="true">
          <path class="hint-arrow-shaft" d="M13 46 C18 40 8 34 16 28 C21 24 9 18 13 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path class="hint-arrow-head" d="M6 14 C9 12 11 8 13 5 C15 8 18 12 20 14 L6 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="hint-text">Tap the cube</span>
      </div>
    </div>
    <div class="preloader-glass"></div>
    <div id="preloader-ui">
      <div class="preloader-bar"><div class="preloader-fill" id="preloader-fill"></div></div>
    </div>
  </div>
</div>

<script>window.scrollTo(0,0);</script>
<script type="module">
import { createPreloader } from '/src/preloader.js'
const preloaderEl = document.getElementById('preloader');
const loader = createPreloader({ 
  preloader: preloaderEl, 
  fill: document.getElementById('preloader-fill'), 
  hint: document.getElementById('preloader-hint') 
});
loader.start();
</script>

<script is:inline>
  document.documentElement.classList.add('preloading');
  (function() {
    var check = setInterval(function() {
      if (!document.documentElement.classList.contains('preloading')) {
        clearInterval(check);
        document.querySelectorAll('.reveal').forEach(function(el) {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('visible');
          }
        });
      }
    }, 100);
  })();
</script>
```

#### 3.2 Navbar Component
**File:** `src/components/Navbar.astro`

Extract navbar HTML + mobile menu

#### 3.3 Hero Component
**File:** `src/components/Hero.astro`

#### 3.4 Other Components
- `CaseStudies.astro`
- `Problem.astro`
- `HowItWorks.astro`
- `Pricing.astro`
- `FAQ.astro`
- `Blog.astro`
- `About.astro`
- `CTA.astro`
- `Footer.astro`

---

### Step 4: Create Main Page ⏳
**File:** `src/pages/index.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Preloader from '../components/Preloader.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
import CaseStudies from '../components/CaseStudies.astro';
import Problem from '../components/Problem.astro';
import HowItWorks from '../components/HowItWorks.astro';
import Pricing from '../components/Pricing.astro';
import FAQ from '../components/FAQ.astro';
import Blog from '../components/Blog.astro';
import About from '../components/About.astro';
import CTA from '../components/CTA.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout>
  <Preloader />
  
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <Navbar />
  
  <main id="main-content">
    <div class="hero-problema-wrap">
      <div class="hero-shapes" aria-hidden="true">
        <div class="hero-shape"></div>
        <div class="hero-shape"></div>
        <div class="hero-shape"></div>
        <div class="hero-shape"></div>
        <div class="hero-shape"></div>
        <div class="hero-shape"></div>
        <div class="hero-shape"></div>
        <div class="hero-shape"></div>
        <div class="hero-shape"></div>
      </div>
      
      <Hero />
      <CaseStudies />
      <Problem />
    </div>
    
    <HowItWorks />
    <Pricing />
    <FAQ />
    <Blog />
    <About />
    <CTA />
  </main>
</BaseLayout>
```

---

### Step 5: Move Scripts ⏳
**Move:** `src/preloader.js` → keep as is (already in correct location)

**Create:** `src/scripts/main.js`
Extract all inline `<script>` logic from `index.html`:
- Menu toggle logic
- FAQ accordion
- Scroll reveal
- Scroll-to-top button
- Result carousel navigation

---

### Step 6: Move Assets ⏳
**Create:** `public/` directory (if not exists)

**Move:**
- `assets/` → `public/assets/`
- `favicon.svg` → `public/favicon.svg`
- `robots.txt` → `public/robots.txt`
- `sitemap.xml` → `public/sitemap.xml`
- `og-card.html` → `public/og-card.html` (or delete if unused)

---

### Step 7: Update Vercel Config ⏳
**File:** `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

---

### Step 8: Install Dependencies ⏳

From WSL terminal (not Windows PowerShell):
```bash
cd /home/illya/workspace/clientes/the-brand-crew
npm install
```

Or if pnpm works in WSL:
```bash
pnpm install
```

---

### Step 9: Test Locally ⏳
```bash
npm run dev
# Visit http://localhost:4321
```

**Checklist:**
- [ ] Preloader works
- [ ] All sections render
- [ ] Navbar scrolled state
- [ ] Mobile menu
- [ ] FAQ accordion
- [ ] Hover effects
- [ ] Scroll reveal animations
- [ ] Responsive design

---

### Step 10: Update Playwright Tests ⏳
**File:** `tests/*.spec.ts`

Update all test URLs from root `/` to Astro routes

---

### Step 11: Build & Deploy ⏳
```bash
npm run build
git add .
git commit -m "feat: migrate to Astro - progressive static site generator"
git push origin master
```

Vercel will auto-deploy.

---

## 🎯 Current Status

- ✅ Project structure created
- ✅ Config files ready
- ⏳ **NEXT**: Create `BaseLayout.astro`
- ⏳ Extract `global.css`
- ⏳ Create components
- ⏳ Build & test

---

## 📝 Notes

- Keep `index.html` until migration is complete and tested
- Test thoroughly before removing old files
- Astro builds to `dist/` instead of serving from root
- All paths in components must be absolute (`/assets/...`) or relative to `public/`

---

## 🚨 Potential Issues

1. **Windows/WSL symlink issues** - Install from within WSL terminal
2. **Preloader timing** - Test that preloader shows before content
3. **Script execution order** - Ensure scripts load after DOM
4. **Font loading** - Verify fonts still load correctly
5. **Analytics** - Confirm Vercel scripts still fire

---

**Estimated Time Remaining:** 30-40 minutes for full migration + testing

**Priority:** Create BaseLayout → Extract CSS → Test one component → Iterate
