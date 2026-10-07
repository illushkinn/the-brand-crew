/**
 * URL routing helpers for The Brand Crew
 * Centralizes language-specific routing logic to avoid duplication
 */

export type Lang = 'es' | 'en';

/**
 * Get the home page link for the given language
 */
export function getHomeLink(lang: Lang): string {
  return lang === 'es' ? '/' : '/en';
}

/**
 * Get the pricing page link for the given language
 */
export function getPricingLink(lang: Lang): string {
  return lang === 'es' ? '/pricing' : '/en/pricing';
}

/**
 * Get the Growth Partner kit page link for the given language
 */
export function getGrowthPartnerLink(lang: Lang): string {
  return lang === 'es' ? '/pricing/growth-partner' : '/en/pricing/growth-partner';
}

/**
 * Get the privacy policy page link for the given language
 */
export function getPrivacyLink(lang: Lang): string {
  return lang === 'es' ? '/privacy' : '/en/privacy';
}

/**
 * Get the terms of service page link for the given language
 */
export function getTermsLink(lang: Lang): string {
  return lang === 'es' ? '/terms' : '/en/terms';
}

/**
 * Get the web design service page link for the given language
 */
export function getWebDesignLink(lang: Lang): string {
  return lang === 'es' ? '/servicios/diseno-web' : '/en/services/web-design';
}

/** Spanish-only price guide (no English twin yet) */
export const PRICE_GUIDE_PATH = '/guias/cuanto-cuesta-una-pagina-web-en-argentina';

/**
 * Pages whose ES and EN paths differ. Used for hreflang alternates.
 * Key = ES path, value = EN path.
 */
export const translatedPaths: Record<string, string> = {
  '/servicios/diseno-web': '/en/services/web-design',
};
