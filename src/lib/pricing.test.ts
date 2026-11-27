import { describe, expect, it } from 'vitest';
import { formatPrice, parsePrice, splitPrice } from './pricing';

describe('splitPrice', () => {
  it('splits every current plan price into two equal payments', () => {
    expect(splitPrice('300')).toEqual({ total: 300, half: 150, halfLabel: '150' });
    expect(splitPrice('700').halfLabel).toBe('350');
    expect(splitPrice('1.500').halfLabel).toBe('750');
  });

  it('accepts the EN thousands separator', () => {
    expect(splitPrice('1,500').total).toBe(1500);
    expect(splitPrice('1,500').halfLabel).toBe('750');
  });

  it('rejects odd prices instead of rounding silently', () => {
    expect(() => splitPrice('301')).toThrow(/split evenly/);
  });
});

describe('parsePrice', () => {
  it('ignores currency noise', () => {
    expect(parsePrice('USD 1.500')).toBe(1500);
  });

  it('rejects empty or zero values', () => {
    expect(() => parsePrice('')).toThrow(/Invalid price/);
    expect(() => parsePrice('0')).toThrow(/Invalid price/);
  });
});

describe('formatPrice', () => {
  it('groups thousands with dots and leaves short values alone', () => {
    expect(formatPrice(150)).toBe('150');
    expect(formatPrice(750)).toBe('750');
    expect(formatPrice(1500)).toBe('1.500');
  });
});
