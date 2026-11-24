import { describe, expect, it } from 'vitest';
import {
  ES_ONLY_PATHS,
  LOCAL_LANDING_PATH,
  PRICE_GUIDE_PATH,
  getAlternatePaths,
  getGrowthPartnerLink,
  getHomeLink,
  getLangSwitchLinks,
  getPricingLink,
  getPrivacyLink,
  getTermsLink,
  getWebDesignLink,
  translatedPaths,
} from './routing';

describe('language link helpers', () => {
  it('returns the ES and EN home links', () => {
    expect(getHomeLink('es')).toBe('/');
    expect(getHomeLink('en')).toBe('/en');
  });

  it('returns the ES and EN pricing links', () => {
    expect(getPricingLink('es')).toBe('/pricing');
    expect(getPricingLink('en')).toBe('/en/pricing');
  });

  it('returns the ES and EN Growth Partner links', () => {
    expect(getGrowthPartnerLink('es')).toBe('/pricing/growth-partner');
    expect(getGrowthPartnerLink('en')).toBe('/en/pricing/growth-partner');
  });

  it('returns the ES and EN privacy links', () => {
    expect(getPrivacyLink('es')).toBe('/privacy');
    expect(getPrivacyLink('en')).toBe('/en/privacy');
  });

  it('returns the ES and EN terms links', () => {
    expect(getTermsLink('es')).toBe('/terms');
    expect(getTermsLink('en')).toBe('/en/terms');
  });

  it('returns the localized web design links (ES and EN paths differ)', () => {
    expect(getWebDesignLink('es')).toBe('/servicios/diseno-web');
    expect(getWebDesignLink('en')).toBe('/en/services/web-design');
  });
});

describe('ES-only paths', () => {
  it('exports the price guide and local landing paths', () => {
    expect(PRICE_GUIDE_PATH).toBe('/guias/cuanto-cuesta-una-pagina-web-en-argentina');
    expect(LOCAL_LANDING_PATH).toBe('/diseno-web-mar-del-plata');
  });

  it('lists both ES-only paths', () => {
    expect(ES_ONLY_PATHS).toContain(PRICE_GUIDE_PATH);
    expect(ES_ONLY_PATHS).toContain(LOCAL_LANDING_PATH);
    expect(ES_ONLY_PATHS).toHaveLength(2);
  });
});

describe('getAlternatePaths', () => {
  it('maps the home page in both directions', () => {
    expect(getAlternatePaths('/')).toEqual({ es: '/', en: '/en' });
    expect(getAlternatePaths('/en')).toEqual({ es: '/', en: '/en' });
  });

  it('maps top-level pages in both directions', () => {
    expect(getAlternatePaths('/pricing')).toEqual({ es: '/pricing', en: '/en/pricing' });
    expect(getAlternatePaths('/en/pricing')).toEqual({ es: '/pricing', en: '/en/pricing' });
    expect(getAlternatePaths('/privacy')).toEqual({ es: '/privacy', en: '/en/privacy' });
    expect(getAlternatePaths('/en/terms')).toEqual({ es: '/terms', en: '/en/terms' });
  });

  it('maps nested pages that share the same slug in both languages', () => {
    expect(getAlternatePaths('/pricing/growth-partner')).toEqual({
      es: '/pricing/growth-partner',
      en: '/en/pricing/growth-partner',
    });
    expect(getAlternatePaths('/en/pricing/growth-partner')).toEqual({
      es: '/pricing/growth-partner',
      en: '/en/pricing/growth-partner',
    });
  });

  it('uses the translated path table for pages whose slugs differ', () => {
    expect(getAlternatePaths('/servicios/diseno-web')).toEqual({
      es: '/servicios/diseno-web',
      en: '/en/services/web-design',
    });
    expect(getAlternatePaths('/en/services/web-design')).toEqual({
      es: '/servicios/diseno-web',
      en: '/en/services/web-design',
    });
  });

  it('returns en: null for ES-only pages', () => {
    expect(getAlternatePaths(PRICE_GUIDE_PATH)).toEqual({ es: PRICE_GUIDE_PATH, en: null });
    expect(getAlternatePaths(LOCAL_LANDING_PATH)).toEqual({ es: LOCAL_LANDING_PATH, en: null });
  });

  it('treats any /guias/* page as ES-only', () => {
    expect(getAlternatePaths('/guias/otra-guia')).toEqual({ es: '/guias/otra-guia', en: null });
    expect(getAlternatePaths('/en/guias/otra-guia')).toEqual({ es: '/guias/otra-guia', en: null });
  });

  it('normalizes trailing slashes, query strings and empty input', () => {
    expect(getAlternatePaths('/pricing/')).toEqual({ es: '/pricing', en: '/en/pricing' });
    expect(getAlternatePaths('/pricing?utm_source=test')).toEqual({
      es: '/pricing',
      en: '/en/pricing',
    });
    expect(getAlternatePaths('/en/')).toEqual({ es: '/', en: '/en' });
    expect(getAlternatePaths('')).toEqual({ es: '/', en: '/en' });
  });

  it('round-trips every entry in translatedPaths', () => {
    for (const [esPath, enPath] of Object.entries(translatedPaths)) {
      expect(getAlternatePaths(esPath)).toEqual({ es: esPath, en: enPath });
      expect(getAlternatePaths(enPath)).toEqual({ es: esPath, en: enPath });
    }
  });
});

describe('getLangSwitchLinks', () => {
  it('returns both language links for a translated page', () => {
    expect(getLangSwitchLinks('/pricing')).toEqual({ es: '/pricing', en: '/en/pricing' });
  });

  it('falls back to the EN home when the current page has no English twin', () => {
    expect(getLangSwitchLinks(PRICE_GUIDE_PATH)).toEqual({ es: PRICE_GUIDE_PATH, en: '/en' });
    expect(getLangSwitchLinks(LOCAL_LANDING_PATH)).toEqual({ es: LOCAL_LANDING_PATH, en: '/en' });
  });

  it('keeps the translated ES path when switching from EN to ES', () => {
    expect(getLangSwitchLinks('/en/services/web-design')).toEqual({
      es: '/servicios/diseno-web',
      en: '/en/services/web-design',
    });
  });
});
