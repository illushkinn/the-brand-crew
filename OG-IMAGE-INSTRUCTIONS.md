# 📸 How to Generate OG Image

## Step 1: Open the Template
1. Open `og-card.html` in your browser
2. The page will show a 1200x630px card

## Step 2: Capture Screenshot

### Option A: Chrome DevTools (Recommended)
1. Open DevTools (F12 or Ctrl+Shift+I)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Click "Edit" next to device dropdown
4. Add custom device:
   - **Device name:** OG Card
   - **Width:** 1200
   - **Height:** 630
   - **Device pixel ratio:** 2 (for retina/high-DPI)
5. Select "OG Card" device
6. Press Ctrl+Shift+P → type "Capture screenshot" → select "Capture screenshot"
7. Save as `assets/og-image.jpg`

### Option B: Browser Extension
- Use "Full Page Screen Capture" or similar extension
- Capture visible area (1200x630px)
- Save as `assets/og-image.jpg`

### Option C: Manual Screenshot
- Set browser zoom to 100%
- Use Windows Snipping Tool or similar
- Capture only the card area (1200x630px)
- Save as `assets/og-image.jpg`

## Step 3: Optimize Image (Optional)
- Compress with TinyPNG or similar tool
- Target: <300KB for fast loading
- Format: JPG (better compression than PNG for photos/gradients)

## Step 4: Deploy
Once you have `assets/og-image.jpg`:
1. Commit the image: `git add assets/og-image.jpg`
2. Commit: `git commit -m "feat: add Open Graph image card"`
3. Push: `git push origin master`
4. Vercel will deploy automatically

## Step 5: Test
Test your OG tags with:
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/

Enter: `https://thebrandcrew.lat`

---

## Customization Options

Want to change the design? Edit `og-card.html`:

### Colors
```css
/* Terracotta accent */
oklch(0.58 0.18 32)

/* Verde accent */
oklch(0.82 0.2 125)

/* Background */
#0a0a0f
```

### Text
```html
<div class="brand">The Brand Crew</div>
<h1 class="headline">Websites That<br><span class="accent">Actually Work</span></h1>
<p class="tagline">Design + Development + Domain + Hosting</p>
<div class="price">From <span class="price-amount">$140.000 ARS</span></div>
```

### Shapes
Adjust position, size, and colors in `.shape1`, `.shape2`, `.shape3`

---

## Current Status

✅ OG meta tags updated in `index.html` (pointing to `/assets/og-image.jpg`)  
⏳ Waiting for you to generate and add `assets/og-image.jpg`  
⏳ Once image added, test with Facebook/Twitter debuggers

---

## Quick Deploy Checklist

- [ ] Open `og-card.html` in browser
- [ ] Capture screenshot (1200x630px)
- [ ] Save as `assets/og-image.jpg`
- [ ] Optimize (optional, <300KB)
- [ ] `git add assets/og-image.jpg`
- [ ] `git commit -m "feat: add OG image"`
- [ ] `git push origin master`
- [ ] Test with Facebook Debugger
- [ ] Test with Twitter Card Validator
