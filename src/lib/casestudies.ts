/**
 * Case study data for The Brand Crew
 * Centralized data structure for case studies displayed in carousel
 */

import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/ui';

type ImageLogo = {
  kind: 'img';
  src: string;
  alt: string;
  class?: 'invert-dark' | 'dark-bg';
};

type LetterLogo = {
  kind: 'letter';
  letter: string;
};

export type CaseStudyLogo = ImageLogo | LetterLogo;

export interface CaseStudyMetric {
  value: string;
  label: string;
  rating?: boolean;
}

export interface CaseStudy {
  key: string;
  name: string;
  url: string;
  logo: CaseStudyLogo;
  screenshot?: string;
  metrics: CaseStudyMetric[];
}

/**
 * Get case studies with translated metrics
 * @param lang - Current language
 * @returns Array of case studies with i18n-resolved metrics
 */
export function getCaseStudies(lang: Lang): CaseStudy[] {
  const t = useTranslations(lang);

  return [
    {
      key: 'luisito',
      name: 'Luisito Playa Grande',
      url: 'https://luisito-playa-grande.vercel.app',
      logo: { kind: 'img', src: '/assets/logos/luisito.svg', alt: 'Luisito Playa Grande', class: 'invert-dark' },
      screenshot: '/assets/Luisito.jpg',
      metrics: [
        { value: t('caseStudies.luisitoMetric1Value'), label: t('caseStudies.luisitoMetric1Label') },
        { value: t('caseStudies.luisitoMetric2Value'), label: t('caseStudies.luisitoMetric2Label'), rating: true },
      ],
    },
    {
      key: 'hoco',
      name: 'Catálogo Hoco',
      url: 'https://hococatalog.vercel.app',
      logo: { kind: 'letter', letter: 'H' },
      screenshot: '/assets/Hoco.jpg',
      metrics: [
        { value: t('caseStudies.hocoMetric1Value'), label: t('caseStudies.hocoMetric1Label') },
        { value: t('caseStudies.hocoMetric2Value'), label: t('caseStudies.hocoMetric2Label') },
        { value: t('caseStudies.hocoMetric3Value'), label: t('caseStudies.hocoMetric3Label') },
      ],
    },
    {
      key: 'escolta',
      name: 'Escolta Miami',
      url: 'https://escoltamiami.com',
      logo: { kind: 'img', src: '/assets/logos/escolta-miami.png', alt: 'Escolta Miami', class: 'dark-bg' },
      screenshot: '/assets/Escolta.jpg',
      metrics: [
        { value: t('caseStudies.escoltaMetric1Value'), label: t('caseStudies.escoltaMetric1Label') },
        { value: t('caseStudies.escoltaMetric2Value'), label: t('caseStudies.escoltaMetric2Label') },
      ],
    },
    {
      key: 'pragma',
      name: 'Pragma',
      url: 'https://pragma-gules.vercel.app',
      logo: { kind: 'img', src: '/assets/logos/pragma.webp', alt: 'Pragma', class: 'dark-bg' },
      screenshot: '/assets/Pragma.jpg',
      metrics: [
        { value: t('caseStudies.pragmaMetric1Value'), label: t('caseStudies.pragmaMetric1Label') },
        { value: t('caseStudies.pragmaMetric2Value'), label: t('caseStudies.pragmaMetric2Label') },
      ],
    },
  ];
}
