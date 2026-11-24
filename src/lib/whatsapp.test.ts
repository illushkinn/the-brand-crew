import { describe, expect, it } from 'vitest';
import { WHATSAPP_NUMBER } from './constants';
import { getWhatsAppLink } from './whatsapp';

const ES_DEFAULT = 'Hola, vi su sitio y quiero saber más sobre sus servicios.';
const EN_DEFAULT = "Hi, I saw your site and I'd like to know more about your services.";
const BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

function textOf(link: string): string | null {
  return new URL(link).searchParams.get('text');
}

describe('getWhatsAppLink', () => {
  it('builds the ES default message exactly', () => {
    const link = getWhatsAppLink('es');

    expect(link).toBe(`${BASE_URL}?text=${encodeURIComponent(ES_DEFAULT)}`);
    expect(textOf(link)).toBe(ES_DEFAULT);
  });

  it('builds the EN default message exactly', () => {
    const link = getWhatsAppLink('en');

    expect(link).toBe(`${BASE_URL}?text=${encodeURIComponent(EN_DEFAULT)}`);
    expect(textOf(link)).toBe(EN_DEFAULT);
  });

  it('defaults to ES when no language is passed', () => {
    expect(getWhatsAppLink()).toBe(getWhatsAppLink('es'));
  });

  it('respects a custom message', () => {
    const custom = 'Hola, quiero el plan Crecé.';
    const link = getWhatsAppLink('es', custom);

    expect(link).toBe(`${BASE_URL}?text=${encodeURIComponent(custom)}`);
    expect(textOf(link)).toBe(custom);
  });

  it('uses a custom message in English too', () => {
    const custom = "Hi! I'd like the Grow plan.";
    const link = getWhatsAppLink('en', custom);

    expect(textOf(link)).toBe(custom);
  });

  it('URL-encodes accents, spaces and query separators', () => {
    const custom = 'Hola & chau? #1 + 100% ñandú';
    const link = getWhatsAppLink('es', custom);

    expect(link).not.toContain(' ');
    expect(link).toContain('%C3%B1');
    expect(link).toContain('%26');
    expect(link).toContain('%3F');
    expect(textOf(link)).toBe(custom);
  });

  it('always points at the production WhatsApp number', () => {
    expect(getWhatsAppLink('es').startsWith(`${BASE_URL}?text=`)).toBe(true);
    expect(getWhatsAppLink('en').startsWith(`${BASE_URL}?text=`)).toBe(true);
  });
});
