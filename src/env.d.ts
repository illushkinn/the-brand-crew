/// <reference types="astro/client" />

interface Window {
  Calendly?: {
    initPopupWidget: (options: { url: string }) => void;
  };
  __calendlyBound?: boolean;
}
