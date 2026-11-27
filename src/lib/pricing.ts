/**
 * Plan prices live in the i18n dictionaries as display strings ("300", "1.500"),
 * so the payment split math lives here: one pure, testable place for the 50/50.
 */

export interface SplitPrice {
  total: number;
  half: number;
  halfLabel: string;
}

/** "1.500" | "1,500" -> 1500 */
export function parsePrice(value: string): number {
  const digits = value.replace(/[^\d]/g, '');
  const total = Number.parseInt(digits, 10);

  if (!Number.isFinite(total) || total <= 0) {
    throw new Error(`Invalid price: ${value}`);
  }

  return total;
}

/** 1500 -> "1.500" (dot thousands, matching the ES copy) */
export function formatPrice(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Splits a price into two equal payments. Throws on odd amounts instead of
 * rounding silently: a plan that cannot be split evenly is a copy bug, not a
 * number to fudge.
 */
export function splitPrice(value: string): SplitPrice {
  const total = parsePrice(value);
  const half = total / 2;

  if (!Number.isInteger(half)) {
    throw new Error(`Price must split evenly into two payments: ${value}`);
  }

  return { total, half, halfLabel: formatPrice(half) };
}
