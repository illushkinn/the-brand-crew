import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Unit tests colocate with the module they cover (src/**/*.test.ts).
    include: ['src/**/*.test.ts'],
    // Never pick up the Playwright specs: `pnpm test` owns tests/.
    exclude: ['tests/**', 'node_modules/**', 'dist/**', '.astro/**'],
    // Everything under src/lib and src/i18n is pure logic — no DOM needed.
    environment: 'node',
  },
});
