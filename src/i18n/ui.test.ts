import { describe, expect, it } from 'vitest';
import {
  defaultLang,
  dictionaries,
  getTranslation,
  useTranslations,
  type Lang,
} from './ui';

const LANGS: Lang[] = ['es', 'en'];

/**
 * Blanks that are deliberate, not missing translations:
 * - cta.title2: the final CTA renders it only when non-empty.
 * - footer.guide / footer.local: ES-only pages, hidden in the EN footer.
 */
const INTENTIONAL_BLANK_KEYS = [
  'es.cta.title2',
  'en.cta.title2',
  'en.footer.guide',
  'en.footer.local',
] as const;

/**
 * Flattens a dictionary into `a.b.c` paths. Arrays are walked by index, so an
 * extra or missing array item in one language also shows up as a key mismatch.
 */
function flatten(
  value: unknown,
  prefix = '',
  out = new Map<string, unknown>()
): Map<string, unknown> {
  if (Array.isArray(value)) {
    value.forEach((item, index) => flatten(item, `${prefix}.${index}`, out));
    return out;
  }

  if (value !== null && typeof value === 'object') {
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      flatten(child, prefix ? `${prefix}.${key}` : key, out);
    }
    return out;
  }

  out.set(prefix, value);
  return out;
}

const flat: Record<Lang, Map<string, unknown>> = {
  es: flatten(dictionaries.es),
  en: flatten(dictionaries.en),
};

const esKeys = [...flat.es.keys()].sort();
const enKeys = [...flat.en.keys()].sort();

describe('i18n dictionaries', () => {
  it('defaults to Spanish', () => {
    expect(defaultLang).toBe('es');
  });

  it('has the same translation keys in ES and EN', () => {
    expect(enKeys).toEqual(esKeys);
  });

  it('has no keys missing from EN', () => {
    expect(esKeys.filter(key => !flat.en.has(key))).toEqual([]);
  });

  it('has no extra keys in EN', () => {
    expect(enKeys.filter(key => !flat.es.has(key))).toEqual([]);
  });

  it('only contains string leaves in both languages', () => {
    for (const lang of LANGS) {
      for (const [key, value] of flat[lang]) {
        expect(typeof value, `${lang}.${key} should be a string`).toBe('string');
      }
    }
  });

  it('has no empty translations outside the documented allowlist', () => {
    const allowed = new Set<string>(INTENTIONAL_BLANK_KEYS);
    const blanks = LANGS.flatMap(lang =>
      [...flat[lang]]
        .filter(([, value]) => typeof value === 'string' && value.trim() === '')
        .map(([key]) => `${lang}.${key}`)
    );

    expect(blanks.filter(key => !allowed.has(key))).toEqual([]);
  });

  it('keeps the intentional-blank allowlist in sync', () => {
    for (const key of INTENTIONAL_BLANK_KEYS) {
      const [lang, ...pathParts] = key.split('.');
      const path = pathParts.join('.');

      expect(flat[lang as Lang].has(path), `${key} should still exist`).toBe(true);
      expect(flat[lang as Lang].get(path), `${key} should still be blank`).toBe('');
    }
  });
});

describe('getTranslation', () => {
  it('reads the same value the dictionary holds', () => {
    expect(getTranslation('es', 'nav.pricing')).toBe(dictionaries.es.nav.pricing);
    expect(getTranslation('en', 'nav.pricing')).toBe(dictionaries.en.nav.pricing);
    expect(getTranslation('es', 'scrollToTop.label')).toBe(dictionaries.es.scrollToTop.label);
    expect(getTranslation('en', 'scrollToTop.label')).toBe(dictionaries.en.scrollToTop.label);
  });

  it('falls back to the requested key when it does not exist', () => {
    expect(getTranslation('es', 'does.not.exist')).toBe('does.not.exist');
    expect(getTranslation('en', 'nav.nope')).toBe('nav.nope');
  });

  it('returns a bound translator per language', () => {
    const tEs = useTranslations('es');
    const tEn = useTranslations('en');

    expect(tEs('scrollToTop.label')).toBe(dictionaries.es.scrollToTop.label);
    expect(tEn('scrollToTop.label')).toBe(dictionaries.en.scrollToTop.label);
    expect(tEs('missing.key')).toBe('missing.key');
  });
});
