/**
 * URL routing helpers for The Brand Crew
 * Centralizes language-specific routing logic to avoid duplication
 */

export type Lang = 'es' | 'en';

/**
 * Get the home page link for the given language
 */
export function getHomeLink(lang: Lang): string {
  return lang === 'es' ? '/' : '/en/';
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
 * Generate the language switcher link based on current language and pathname
 * @param currentLang - The current language
 * @param pathname - The current pathname from Astro.url.pathname
 */
export function getLangSwitchLink(currentLang: Lang, pathname: string): string {
  return currentLang === 'en' ? pathname : '/en' + pathname;
}
