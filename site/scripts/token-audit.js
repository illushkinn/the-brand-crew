#!/usr/bin/env node
/**
 * Token Audit Script — The Brand Crew Design System
 *
 * Reads index.html, extracts CSS from <style> tags, scans for hardcoded
 * values (colors, spacing, font sizes, radii, shadows, z-index, transitions),
 * and suggests the correct design token for each violation.
 *
 * Usage:
 *   node scripts/token-audit.js                    # check default index.html
 *   node scripts/token-audit.js --html path.html   # check specific file
 *   node scripts/token-audit.js --json             # JSON output
 *
 * Exit codes:
 *   0 — No errors (warnings only, or clean)
 *   1 — Errors found (hardcoded colors or spacing values)
 *
 * Categories:
 *   ERROR   — Hardcoded color, spacing, radius, font-size outside token
 *   WARNING — Uncommon values, potential inconsistencies
 */

const fs = require('fs');
const path = require('path');

// ─── Configuration ───────────────────────────────────────────────────────────

const DEFAULT_HTML = path.resolve(__dirname, '..', 'index.html');

// Known CSS variable tokens (from tokens.css / index.html :root)
const TOKENS = {
  colors: {
    // Primitives — OKLCH
    '--ds-gray-0': 'oklch(0.04 0.008 280)',
    '--ds-gray-1': 'oklch(0.08 0.012 280)',
    '--ds-gray-2': 'oklch(0.11 0.015 280)',
    '--ds-gray-3': 'oklch(0.2 0.018 280)',
    '--ds-gray-4': 'oklch(0.6 0.012 280)',
    '--ds-gray-5': 'oklch(0.8 0.008 280)',
    '--ds-gray-6': 'oklch(0.95 0.004 280)',
    '--ds-terracota': 'oklch(0.58 0.18 32)',
    '--ds-terracota-hover': 'oklch(0.5 0.16 32)',
    '--ds-verde': 'oklch(0.82 0.2 125)',
    '--ds-verde-hover': 'oklch(0.72 0.18 125)',
    '--ds-ocre': 'oklch(0.72 0.12 75)',
    '--ds-white': '#fff',
    '--ds-black': '#121212',
    '--ds-whatsapp': '#25D366',
    // Semantic
    '--color-text': 'var(--ds-gray-5)',
    '--color-text-dim': 'var(--ds-gray-4)',
    '--color-heading': 'var(--ds-gray-6)',
    '--color-headline': 'var(--ds-gray-6)',
    '--color-inverse': 'var(--ds-white)',
    '--color-bg': 'var(--ds-gray-0)',
    '--color-bg-alt': '#1A1A1A',
    '--color-bg-card': 'var(--ds-gray-1)',
    '--color-bg-elevated': 'var(--ds-gray-2)',
    '--color-bg-hero': '#0E0E0E',
    '--color-bg-glass': 'rgba(255,255,255,0.04)',
    '--color-bg-code': '#1A1A1A',
    '--color-border': 'var(--ds-gray-3)',
    '--color-border-thick': '#333',
    '--color-border-glass': 'rgba(255,255,255,0.08)',
    '--color-brand': 'var(--ds-terracota)',
    '--color-brand-hover': 'var(--ds-terracota-hover)',
    '--color-accent': 'var(--ds-terracota)',
    '--color-accent-hover': 'var(--ds-terracota-hover)',
    '--color-accent-glow': 'rgba(221,97,76,0.15)',
    '--color-verde': 'var(--ds-verde)',
    '--color-verde-hover': 'var(--ds-verde-hover)',
    '--color-ocre': 'var(--ds-ocre)',
    '--color-ocre-hover': '#C49032',
    '--color-nav-bg': 'rgba(18,18,18,0.85)',
    '--color-whatsapp': '#25D366',
  },
  spacing: [
    '--space-xs', '--space-sm', '--space-md', '--space-lg',
    '--space-xl', '--space-2xl', '--space-3xl', '--space-4xl',
  ],
  radii: [
    '--radius-sm', '--radius-md', '--radius-lg', '--radius-full', '--radius-round',
  ],
  zIndex: [
    '--z-base', '--z-overlay', '--z-fab', '--z-menu', '--z-nav', '--z-skip',
  ],
  shadows: [
    '--shadow-card', '--shadow-button', '--shadow-button-hover',
    '--shadow-whatsapp', '--shadow-whatsapp-hvr', '--shadow-step-active',
  ],
  motion: [
    '--duration-fast', '--duration-base', '--duration-slow',
    '--duration-reveal', '--duration-page',
    '--ease-default', '--ease-bounce', '--ease-reveal', '--ease-menu',
  ],
};

// Known hardcoded hex values that ARE allowed (in :root semantic tokens themselves)
const ALLOWED_HEX = new Set([
  '#1A1A1A', '#0E0E0E', '#333', '#C49032', '#121212', '#fff', '#25D366',
  '#EDE8E0', '#F0EBE3', '#C4513E', '#A83D2E', '#7AB800', '#5C8C00',
  '#A67A28', '#B8AFA6', '#DD614C', '#DAA144', '#A8E100', '#8CC000',
  '#0a0a0f', '#1a1a2e', '#16213e', '#0f0f1a', '#0F0F14',
  '#F5F0EB', '#FFFFFF', '#ffffff',
]);

// Known allowed hardcoded rgba values (in :root semantic token definitions)
const ALLOWED_RGBA = new Set([
  'rgba(255,255,255,0.04)',
  'rgba(255,255,255,0.08)',
  'rgba(0,0,0,0.03)',
  'rgba(0,0,0,0.08)',
  'rgba(221,97,76,0.15)',
  'rgba(196,81,62,0.12)',
  'rgba(18,18,18,0.85)',
  'rgba(245,240,235,0.9)',
]);

// Known spacing values that are allowed (in token definitions themselves)
const ALLOWED_SPACING = new Set([
  '0.25rem', '0.5rem', '1rem', '1.5rem', '2.5rem', '4rem', '6rem', '8rem',
]);

// Tokens that are declared but never used (known issue)
const UNUSED_TOKENS = ['--shadow']; // declared but not referenced anywhere

// ─── Regex Patterns ──────────────────────────────────────────────────────────

// Match hex colors: #fff, #ffffff, #0a0a0f (but not CSS variable usage)
const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;

// Match rgba/hsla colors
const RGB_RE = /rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(?:,\s*[\d.]+\s*)?\)/g;
const HSL_RE = /hsla?\([^)]+\)/g;
const OKLCH_RE = /oklch\([^)]+\)/g;

// Match spacing-like rem values (potential hardcoded spacing)
// but NOT clamp() expressions, NOT var(), NOT font-size in properties
const SPACING_RE = /(\d+\.?\d*)rem/g;

// Match standalone px values for radii, spacing, etc.
const PX_RE = /(\d+)px/g;

// Match font-size values
const FONT_SIZE_RE = /font-size\s*:\s*([^;}]+)/gi;

// Match z-index values
const ZINDEX_RE = /z-index\s*:\s*(-?\d+)/gi;

// Match box-shadow values
const SHADOW_RE = /box-shadow\s*:\s*([^;}]+)/gi;

// Match transition values
const TRANSITION_RE = /transition\s*:\s*([^;}]+)/gi;

// Match existing token references — we need to exclude these from results
const VAR_REF_RE = /var\(--[^)]+\)/g;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Extract CSS from index.html <style> tags and inline style attributes.
 */
function extractCSS(html) {
  const results = [];

  // Extract <style> tag content
  const styleTagRe = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let match;
  while ((match = styleTagRe.exec(html)) !== null) {
    const css = match[1];
    // Track approximate line offset within the HTML file
    const htmlBefore = html.substring(0, match.index);
    const lineOffset = (htmlBefore.match(/\n/g) || []).length + 1;
    results.push({ css, lineOffset, source: '<style>' });
  }

  // Extract inline style attributes
  const inlineStyleRe = /style="([^"]*)"/gi;
  while ((match = inlineStyleRe.exec(html)) !== null) {
    const css = match[1];
    const htmlBefore = html.substring(0, match.index);
    const lineOffset = (htmlBefore.match(/\n/g) || []).length + 1;
    results.push({ css, lineOffset, source: 'inline' });
  }

  return results;
}

/**
 * Calculate absolute line number in the HTML file for a match within CSS.
 */
function calcLine(cssBlock, matchIndex, lineOffset) {
  const cssBefore = cssBlock.substring(0, matchIndex);
  const extraLines = (cssBefore.match(/\n/g) || []).length;
  return lineOffset + extraLines;
}

/**
 * Normalize a hex color (e.g., #fff → #ffffff).
 */
function normalizeHex(hex) {
  hex = hex.toLowerCase();
  if (hex.length === 4) {
    return '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  return hex;
}

/**
 * Normalize rgba spacing (e.g., rgba(255, 255, 255, 0.04) → rgba(255,255,255,0.04))
 */
function normalizeRGBA(rgba) {
  return rgba.replace(/\s+/g, '').toLowerCase();
}

/**
 * Check if a value is inside a CSS comment.
 */
function isInComment(css, matchIndex) {
  const before = css.substring(0, matchIndex);
  const lastCommentStart = before.lastIndexOf('/*');
  const lastCommentEnd = before.lastIndexOf('*/');
  if (lastCommentStart === -1) return false;
  if (lastCommentEnd > lastCommentStart) return false;
  return true;
}

/**
 * Check if a value is inside a var() reference.
 */
function isInVarRef(css, matchIndex) {
  const before = css.substring(0, matchIndex);
  const lastVar = before.lastIndexOf('var(');
  if (lastVar === -1) return false;
  // Count parens after lastVar
  const after = css.substring(lastVar, matchIndex);
  const opens = (after.match(/\(/g) || []).length;
  const closes = (after.match(/\)/g) || []).length;
  return opens > closes;
}

/**
 * Check if a value is part of a CSS variable declaration.
 * Looks backward from the match for `--var-name:` and forward for `;`
 * to determine if the value is inside a custom property declaration.
 */
function isInCSSVarDecl(css, matchIndex) {
  const before = css.substring(0, matchIndex);
  const lineStart = before.lastIndexOf('\n') + 1;
  const declLine = css.substring(lineStart, matchIndex);

  // Check if this line is a variable declaration
  const declMatch = declLine.match(/^\s*--[\w-]+\s*:\s*$/);
  if (declMatch) return true;

  // Check the full line context — from line start to end of value
  const lineEnd = css.indexOf('\n', matchIndex);
  const fullLine = lineEnd !== -1
    ? css.substring(lineStart, lineEnd)
    : css.substring(lineStart);

  // If the line contains `--var-name: value;` pattern
  if (/^\s*--[\w-]+\s*:\s*.+;$/.test(fullLine) ||
      /^\s*--[\w-]+\s*:\s*.+;/.test(fullLine)) {
    return true;
  }

  return false;
}

/**
 * Suggest a token replacement for a hardcoded color value.
 */
function suggestColorToken(value) {
  const lower = value.toLowerCase();

  // Hex suggestions
  const hexSuggestions = {
    '#ffffff': '--ds-white / --color-inverse',
    '#fff': '--ds-white / --color-inverse',
    '#121212': '--ds-black / --color-bg',
    '#0a0a0f': '--ds-gray-0 / --color-bg',
    '#1a1a1a': '--color-bg-alt',
    '#0e0e0e': '--color-bg-hero',
    '#333': '--color-border-thick',
    '#1a1a2e': '--ds-gray-0 (or add new token)',
    '#16213e': '--ds-gray-0 (or add new token)',
    '#0f0f1a': '--ds-gray-0 (or add new token)',
    '#0f0f14': '--ds-gray-0 (or add new token)',
    '#c49032': '--color-ocre-hover / --ds-ocre (wrong shade)',
    '#c4513e': '--color-brand (light) / --ds-terracota-hover (approx)',
    '#a83d2e': '--color-brand-hover (light)',
    '#7ab800': '--color-verde (light)',
    '#5c8c00': '--color-verde-hover (light)',
    '#a67a28': '--color-ocre-hover (light)',
    '#b8afa6': '--color-border-thick (light)',
    '#ede8e0': '--color-bg-alt (light)',
    '#f0ebe3': '--color-bg-hero (light)',
    '#f5f0eb': '--color-nav-bg (light)',
    '#dd614c': '--ds-terracota / --color-brand',
    '#daa144': '--ds-ocre / --color-ocre',
    '#a8e100': '--ds-verde / --color-verde (approx)',
    '#8cc000': '--ds-verde-hover / --color-verde-hover (approx)',
    '#25d366': '--ds-whatsapp / --color-whatsapp',
  };

  const normalized = normalizeHex(lower);
  if (hexSuggestions[normalized]) {
    return hexSuggestions[normalized];
  }
  if (hexSuggestions[lower]) {
    return hexSuggestions[lower];
  }

  // RGBA suggestions
  const normalizedRgba = normalizeRGBA(value);
  if (normalizedRgba.includes('221,97,76,0.3') || normalizedRgba.includes('226,92,58,0.3')) {
    return '--shadow-button / --ds-shadow-terracota (terracota glow)';
  }
  if (normalizedRgba.includes('221,97,76,0.45') || normalizedRgba.includes('226,92,58,0.45')) {
    return '--shadow-button-hover / --ds-shadow-terracota-lg';
  }
  if (normalizedRgba.includes('226,92,58,0.3')) {
    return '--shadow-button (INCONSISTENCY: uses #E25C3A instead of canonical #DD614C)';
  }
  if (normalizedRgba.includes('221,97,76,0.2')) {
    return '--color-accent-glow (weaker) or --color-border (adjusted)';
  }
  if (normalizedRgba.includes('37,211,102,0.35')) {
    return '--shadow-whatsapp';
  }
  if (normalizedRgba.includes('37,211,102,0.5')) {
    return '--shadow-whatsapp-hvr';
  }
  if (normalizedRgba.includes('221, 97, 76, 0.3')) {
    return '--shadow-step-active / --ds-shadow-step';
  }
  if (normalizedRgba.includes('0, 0, 0, 0.65')) {
    return '--ds-overlay-plus (new token needed) or adjust --z-overlay usage';
  }
  if (normalizedRgba.includes('168,225,0,0.06')) {
    return '--color-verde at low opacity (new token needed)';
  }

  return 'Use a design token (var(--color-*) or var(--ds-*))';
}

/**
 * Suggest a token for a spacing value.
 */
function suggestSpacingToken(value) {
  const map = {
    '0.25': '--space-xs',
    '0.5': '--space-sm',
    '1': '--space-md',
    '1.5': '--space-lg',
    '2.5': '--space-xl',
    '4': '--space-2xl',
    '6': '--space-3xl',
    '8': '--space-4xl',
  };
  const num = parseFloat(value);
  // Find closest match
  let closest = null;
  let closestDiff = Infinity;
  for (const [key, token] of Object.entries(map)) {
    const diff = Math.abs(num - parseFloat(key));
    if (diff < closestDiff) {
      closestDiff = diff;
      closest = { value: parseFloat(key), token };
    }
  }

  if (closestDiff === 0) return `${closest.token}`;
  if (closestDiff < 0.3) return `${closest.token} (closest; diff ${closestDiff}rem)`;
  return `No exact match. Closest: ${closest.token} (${closest.value}rem). Consider new token.`;
}

// ─── Main Audit ──────────────────────────────────────────────────────────────

function audit(html) {
  const issues = [];

  const cssBlocks = extractCSS(html);

  for (const block of cssBlocks) {
    const { css, lineOffset, source } = block;

    // ── Scan 1: Hex colors ──
    let hexMatch;
    while ((hexMatch = HEX_RE.exec(css)) !== null) {
      const hex = hexMatch[0];
      const idx = hexMatch.index;

      // Skip if in comment, var(), or part of a variable declaration
      if (isInComment(css, idx)) continue;
      if (isInVarRef(css, idx)) continue;
      if (isInCSSVarDecl(css, idx)) continue;

      // Check if it's a known allowed hex
      const normalized = normalizeHex(hex);
      if (ALLOWED_HEX.has(hex.toLowerCase()) || ALLOWED_HEX.has(normalized)) continue;

      const line = calcLine(css, idx, lineOffset);
      const suggestion = suggestColorToken(hex);
      issues.push({
        type: 'ERROR',
        category: 'color',
        file: 'index.html',
        line,
        value: hex,
        suggestion,
        source,
      });
    }

    // ── Scan 2: RGBA/HSL colors ──
    let rgbMatch;
    while ((rgbMatch = RGB_RE.exec(css)) !== null) {
      const rgb = rgbMatch[0];
      const idx = rgbMatch.index;

      if (isInComment(css, idx)) continue;
      if (isInVarRef(css, idx)) continue;
      if (isInCSSVarDecl(css, idx)) continue;

      const normalized = normalizeRGBA(rgb);

      // Skip if inside a gradient that uses multiple colors
      const lineContent = css.substring(css.lastIndexOf('\n', idx) + 1, css.indexOf('\n', idx) > -1 ? css.indexOf('\n', idx) : css.length);
      if (/linear-gradient|radial-gradient|conic-gradient/.test(lineContent) && /rgba|#/.test(lineContent)) continue;

      // Skip token definitions inside selector blocks (var() fallbacks)
      if (/--[\w-]+:\s*$/.test(lineContent.trim().split('{').pop() || '')) continue;

      if (ALLOWED_RGBA.has(normalized)) continue;

      const line = calcLine(css, idx, lineOffset);
      const suggestion = suggestColorToken(rgb);
      issues.push({
        type: 'ERROR',
        category: 'color',
        file: 'index.html',
        line,
        value: rgb,
        suggestion,
        source,
      });
    }

    // ── Scan 3: OKLCH outside :root ──
    let oklchMatch;
    while ((oklchMatch = OKLCH_RE.exec(css)) !== null) {
      const oklch = oklchMatch[0];
      const idx = oklchMatch.index;

      if (isInComment(css, idx)) continue;
      if (isInVarRef(css, idx)) continue;
      if (isInCSSVarDecl(css, idx)) continue;

      const line = calcLine(css, idx, lineOffset);
      issues.push({
        type: 'ERROR',
        category: 'color',
        file: 'index.html',
        line,
        value: oklch,
        suggestion: 'Use semantic var(--color-*) instead of raw OKLCH in component CSS',
        source,
      });
    }

    // ── Scan 4: Hardcoded rem spacing values ──
    let spacingMatch;
    while ((spacingMatch = SPACING_RE.exec(css)) !== null) {
      const value = spacingMatch[0];
      const idx = spacingMatch.index;

      if (isInComment(css, idx)) continue;
      if (isInVarRef(css, idx)) continue;
      if (isInCSSVarDecl(css, idx)) continue;

      // Skip if it's part of a clamp() expression
      const before = css.substring(0, idx);
      const after = css.substring(idx + value.length, idx + value.length + 5);
      if (before.match(/clamp\s*\([^)]*$/) || before.includes('clamp(')) {
        // Only flag standalone values, not clamp params
        continue;
      }

      // Skip font-size property values
      const lineStart = before.lastIndexOf('\n') + 1;
      const lineContent = css.substring(lineStart, css.indexOf('\n', idx) > -1 ? css.indexOf('\n', idx) : css.length);
      if (/font-size\s*:/.test(lineContent)) continue;
      if (/line-height\s*:/.test(lineContent)) continue;
      if (/letter-spacing\s*:/.test(lineContent)) continue;

      // Skip if it's a known spacing token value
      if (ALLOWED_SPACING.has(value)) {
        // Check if it's being used as a standalone hardcoded value vs token ref
        // If it's in a property value, it might be okay if it's exactly matching
        // But we should flag if it's not using var()
        const num = parseFloat(value);
        // Flag any spacing-like value that isn't a token reference
        const propertyLine = lineContent.trim();
        // Skip if it's 0 value
        if (parseFloat(value) === 0) continue;

        // Check for common CSS properties that should use token
        const spacingProps = /^(margin|padding|gap|border-radius|border-width|outline|inset|top|bottom|left|right)\s*:/;
        if (spacingProps.test(propertyLine)) {
          const line = calcLine(css, idx, lineOffset);
          issues.push({
            type: 'WARNING',
            category: 'spacing',
            file: 'index.html',
            line,
            value,
            suggestion: suggestSpacingToken(value),
            source,
          });
        }
      } else {
        // Non-token spacing value
        const propertyLine = lineContent.trim();
        const line = calcLine(css, idx, lineOffset);
        issues.push({
          type: 'ERROR',
          category: 'spacing',
          file: 'index.html',
          line,
          value,
          suggestion: suggestSpacingToken(value),
          source,
        });
      }
    }
  }

  // ── Scan 5: Declared but unused tokens ──
  for (const token of UNUSED_TOKENS) {
    const tokenPattern = new RegExp(`\\b${token}\\b`, 'g');
    // Count declarations vs usages
    const declRe = new RegExp(`${token}\\s*:`, 'g');
    const declCount = (html.match(declRe) || []).length;
    const useCount = (html.match(tokenPattern) || []).length - declCount;

    if (declCount > 0 && useCount === 0) {
      issues.push({
        type: 'WARNING',
        category: 'unused-token',
        file: 'index.html',
        line: 0,
        value: `${token} (declared ${declCount}x, used 0x in properties)`,
        suggestion: 'Either use it in component CSS or remove the declaration',
        source: 'analysis',
      });
    }
  }

  // ── Scan 6: Terracota inconsistency check ──
  const terracotaRe = /rgba\(226,\s*92,\s*58[^)]*\)/g;
  let terracotaMatch;
  while ((terracotaMatch = terracotaRe.exec(html)) !== null) {
    const match = terracotaMatch[0];
    const idx = terracotaMatch.index;
    const before = html.substring(0, idx);
    const line = (before.match(/\n/g) || []).length + 1;
    issues.push({
      type: 'ERROR',
      category: 'terracota-inconsistency',
      file: 'index.html',
      line,
      value: match,
      suggestion: 'Replace with --shadow-button / --shadow-button-hover. Uses #E25C3A instead of canonical #DD614C.',
      source: 'analysis',
    });
  }

  // Sort by line number
  issues.sort((a, b) => a.line - b.line || a.category.localeCompare(b.category));

  // Deduplicate: if a terracota-inconsistency and color share same line+value,
  // keep only the more specific terracota-inconsistency.
  // First, collect all terracota keys
  const terracotaKeys = new Set(
    issues
      .filter(i => i.category === 'terracota-inconsistency')
      .map(i => `${i.line}|${i.value}`)
  );
  const deduped = issues.filter(issue => {
    const key = `${issue.line}|${issue.value}`;
    return issue.category === 'terracota-inconsistency' || !terracotaKeys.has(key);
  });

  return deduped;
}

// ─── Output ──────────────────────────────────────────────────────────────────

function printReport(issues, format) {
  const errors = issues.filter(i => i.type === 'ERROR');
  const warnings = issues.filter(i => i.type === 'WARNING');

  if (format === 'json') {
    console.log(JSON.stringify({ errors, warnings, total: issues.length }, null, 2));
    return;
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('   THE BRAND CREW — Design Token Audit');
  console.log('═══════════════════════════════════════════════════════════════\n');

  if (issues.length === 0) {
    console.log('   ✓ No issues found. All values use design tokens.\n');
    return;
  }

  console.log(`   ${issues.length} issues found (${errors.length} errors, ${warnings.length} warnings)\n`);

  if (errors.length > 0) {
    console.log('   ─── ERRORS ───\n');
    for (const issue of errors) {
      console.log(`   [${issue.category.toUpperCase()}] Line ${issue.line} (${issue.source})`);
      console.log(`         Value: ${issue.value}`);
      console.log(`         Fix:   ${issue.suggestion}`);
      console.log();
    }
  }

  if (warnings.length > 0) {
    console.log('   ─── WARNINGS ───\n');
    for (const issue of warnings) {
      console.log(`   [${issue.category.toUpperCase()}] Line ${issue.line} (${issue.source})`);
      console.log(`         Value: ${issue.value}`);
      console.log(`         Fix:   ${issue.suggestion}`);
      console.log();
    }
  }

  console.log('───────────────────────────────────────────────────────────────');
  console.log(`   ${errors.length > 0 ? '✗ FAIL' : '✓ PASS'} — ${errors.length} errors, ${warnings.length} warnings`);
  console.log('───────────────────────────────────────────────────────────────\n');
}

// ─── CLI Entry ───────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const jsonMode = args.includes('--json');
  const htmlArgIndex = args.indexOf('--html');
  const htmlPath = htmlArgIndex !== -1 ? args[htmlArgIndex + 1] : DEFAULT_HTML;

  let html;
  try {
    html = fs.readFileSync(htmlPath, 'utf-8');
  } catch (err) {
    console.error(`Error reading ${htmlPath}: ${err.message}`);
    process.exit(1);
  }

  const issues = audit(html);
  printReport(issues, jsonMode ? 'json' : 'text');

  const errors = issues.filter(i => i.type === 'ERROR');
  process.exit(errors.length > 0 ? 1 : 0);
}

main();
