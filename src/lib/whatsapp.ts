// whatsapp.ts — link de contacto único para todo el sitio
import type { Lang } from '../i18n/ui';
import { WHATSAPP_NUMBER } from './constants';

const MESSAGES: Record<Lang, string> = {
  es: '¡Hola The Brand Crew! Vi tu sitio y me encantaría trabajar con ustedes.',
  en: "Hey The Brand Crew! I saw your site and I'd love to work with you.",
};

export function getWhatsAppLink(lang: Lang = 'es', message?: string): string {
  const text = message ?? MESSAGES[lang];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}