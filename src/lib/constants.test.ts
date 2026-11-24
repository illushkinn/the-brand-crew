import { describe, expect, it } from 'vitest';
import { CALENDLY_URL, DOMAIN, WHATSAPP_NUMBER } from './constants';

describe('constants', () => {
  it('pins the production WhatsApp number', () => {
    expect(WHATSAPP_NUMBER).toBe('5491169080533');
  });

  it('keeps the WhatsApp number as 13 digits with no "+" or separators', () => {
    expect(WHATSAPP_NUMBER).toMatch(/^\d{13}$/);
  });

  it('exposes the canonical site domain', () => {
    expect(DOMAIN).toBe('https://thebrandcrew.lat');
  });

  it('exposes an https Calendly URL', () => {
    expect(CALENDLY_URL.startsWith('https://calendly.com/')).toBe(true);
  });
});
