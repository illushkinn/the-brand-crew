// whatsapp.ts — link de contacto único para todo el sitio
import type { Lang } from '../i18n/ui';
import { WHATSAPP_NUMBER } from './constants';

const MESSAGES: Record<Lang, string> = {
  es: 'Hola, vi su sitio y quiero saber más sobre sus servicios.',
  en: "Hi, I saw your site and I'd like to know more about your services.",
};

export function getWhatsAppLink(lang: Lang = 'es', message?: string): string {
  const text = message ?? MESSAGES[lang];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}