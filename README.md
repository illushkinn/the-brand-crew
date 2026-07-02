# The Brand Crew - Official Website

> Websites that actually work. For businesses that mean business.

Modern web design and development services for businesses in Argentina.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/illushkinn/the-brand-crew)

**Live Site:** [thebrandcrew.lat](https://thebrandcrew.lat)

---

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build) 5.1.5
- **Styling:** Vanilla CSS with Glassmorphism design system
- **Deployment:** [Vercel](https://vercel.com)
- **Analytics:** Vercel Analytics + Speed Insights
- **Testing:** Playwright

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended) or npm

### Installation

```fish
# Clone the repository
git clone https://github.com/illushkinn/the-brand-crew.git
cd the-brand-crew

# Install pnpm (if not installed)
npm install -g pnpm

# Install dependencies
pnpm install
```

### Development

```fish
# Start dev server (http://localhost:4321)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test

# Run tests with UI
pnpm test:headed
```

---

## 📁 Project Structure

```
the-brand-crew/
├── public/              # Static assets
│   ├── assets/
│   │   ├── logos/      # Client logos
│   │   └── og-image.png
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/     # Astro components
│   │   ├── About.astro
│   │   ├── Blog.astro
│   │   ├── CaseStudies.astro
│   │   ├── ComoFunciona.astro
│   │   ├── CTA.astro
│   │   ├── FAQ.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── MobileMenu.astro
│   │   ├── Navbar.astro
│   │   ├── Preloader.astro
│   │   ├── Pricing.astro
│   │   ├── Problema.astro
│   │   └── ScrollToTop.astro
│   ├── layouts/
│   │   └── BaseLayout.astro    # Main layout with SEO
│   ├── pages/
│   │   ├── index.astro         # Home page
│   │   ├── privacy.astro       # Privacy policy
│   │   └── terms.astro         # Terms of service
│   ├── scripts/         # Client-side JavaScript
│   │   ├── carousel.js         # Case studies carousel
│   │   ├── faq.js              # FAQ accordion
│   │   ├── navigation.js       # Mobile menu
│   │   ├── preloader.js        # Loading animation
│   │   ├── reveal.js           # Scroll animations
│   │   └── scroll.js           # Scroll-to-top
│   └── styles/
│       └── global.css          # Global styles
├── tests/              # Playwright tests
├── astro.config.mjs
├── package.json
└── vercel.json
```

---

## 🎨 Key Features

### Design
- **Glassmorphism UI** - Modern glass-card aesthetic
- **3D Animated Preloader** - Interactive cube with loading bar
- **Smooth Animations** - Scroll-triggered reveal effects
- **Responsive Design** - Mobile-first approach
- **Dark Theme** - Optimized for low-light viewing

### Functionality
- **Mobile Navigation** - Smooth hamburger menu with clip-path animation
- **Case Studies Carousel** - Horizontal scroll with navigation buttons
- **FAQ Accordion** - Expandable questions with smooth transitions
- **Scroll-to-Top** - Appears after scrolling with hysteresis
- **Interactive Shapes** - Animated background elements

### Performance
- **Fast Loading** - Optimized assets and code splitting
- **SEO Optimized** - Complete meta tags, Open Graph, Schema.org
- **Accessibility** - ARIA labels, keyboard navigation
- **Analytics Ready** - Vercel Analytics integrated

---

## 📝 Content Management

### Update Case Studies

Edit `src/components/CaseStudies.astro`:

```astro
<article class="glass-card resultado-card">
  <div class="resultado-header">
    <div class="resultado-avatar">
      <img src="/assets/logos/client-logo.svg" alt="Client Name">
    </div>
    <div class="resultado-info">
      <span class="mono resultado-tag">Industry · Location</span>
      <h3 class="resultado-nombre">Client Name</h3>
      <a href="https://client-site.com" class="resultado-link">
        View site →
      </a>
    </div>
  </div>
  <div class="resultado-historia">
    <p>"Client testimonial or project description..."</p>
  </div>
  <div class="resultado-metricas">
    <div class="resultado-metrica">
      <span class="resultado-metrica-valor">Metric Value</span>
      <span class="resultado-metrica-label">Metric Label</span>
    </div>
  </div>
</article>
```

### Update Pricing

Edit `src/components/Pricing.astro` - change prices and features list.

### Update FAQ

Edit `src/components/FAQ.astro` - add/remove questions and answers.

### Add New Section

1. Create component in `src/components/NewSection.astro`
2. Import in `src/pages/index.astro`
3. Add to layout where needed

---

## 🚀 Deployment

### Automatic Deployment

Pushes to `master` branch auto-deploy to Vercel:

```fish
git add .
git commit -m "feat: your changes"
git push origin master
```

### Manual Deployment

```fish
# Install Vercel CLI (if needed)
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables

No environment variables required for basic operation.

---

## 🧪 Testing

### Manual Testing

See `POST-MIGRATION-CHECKLIST.md` for complete testing checklist.

### Automated Testing

```fish
# Run Playwright tests
pnpm test

# Run tests with browser visible
pnpm test:headed

# Run specific test
pnpm test tests/hero.spec.ts
```

### Performance Testing

```fish
# Lighthouse audit
lighthouse https://thebrandcrew.lat --view

# Or use Chrome DevTools > Lighthouse tab
```

---

## 📊 Performance

- **Lighthouse Score:** 85+ (all categories)
- **Core Web Vitals:** All green
- **Mobile Optimized:** Touch-friendly, responsive
- **Fast Load Times:** <2s initial load

---

## 🔒 Security

- CSP headers configured
- XSS protection enabled
- HTTPS enforced
- Dependencies regularly audited

---

## 📄 License

Proprietary - © 2026 The Brand Crew. All rights reserved.

---

## 🤝 Contact & Support

- **Website:** [thebrandcrew.lat](https://thebrandcrew.lat)
- **Email:** hello@thebrandcrew.lat
- **WhatsApp:** +54 9 11 2406-3009
- **Developer:** [Illya Grytsyk](https://illushkinn.github.io)

---

## 📚 Additional Documentation

- `POST-MIGRATION-CHECKLIST.md` - Post-deployment guide
- `MIGRATION-COMPLETE.md` - Migration details
- `.kiro/specs/astro-migration/` - Technical specifications

---

## 🎯 Roadmap

### Completed ✅
- [x] Full Astro migration
- [x] Component architecture
- [x] Performance optimization
- [x] SEO implementation
- [x] Mobile responsiveness

### Planned 🚧
- [ ] Blog functionality
- [ ] Contact form
- [ ] Client testimonials
- [ ] Multi-language support (EN/ES)
- [ ] Dark mode toggle

---

**Built with ❤️ in Mar del Plata, Argentina**
