import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

/** Unit tests: plain data and functions, so they run in Node; a test that needs a DOM says so in its first line. */
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['src/**/*.test.{ts,tsx}'],
      environment: 'node',
    },
  }),
);
