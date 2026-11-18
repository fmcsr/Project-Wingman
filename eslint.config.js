import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'playwright-report', 'test-results']),
  {
    files: ['**/*.{js,ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    rules: {
      // TypeScript's noUnusedParameters convention: a leading underscore marks a parameter kept for the signature
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended],
  },
  {
    // useDemoMotion() returns { ref, started, playing, final }. Because of the `ref` field, the compiler rule takes
    // the whole object for a ref and reports every read of the plain state next to it during render
    files: ['src/demos/**', 'src/library/**', 'src/landing/gallery/**'],
    rules: { 'react-hooks/refs': 'off' },
  },
  {
    // The scene gets its refs in one object ({ scene, thumb, … }), so the compiler can't tell they're refs: it takes
    // the effect's writes to the DOM nodes behind them for changes to the hook's arguments
    files: ['src/showcase/useScrollScene.ts'],
    rules: { 'react-hooks/immutability': 'off', 'react-hooks/preserve-manual-memoization': 'off' },
  },
  {
    // The sway effect reads the divider's starting position once on purpose (see the comment on its dependencies)
    files: ['src/showcase/Compare.tsx'],
    rules: { 'react-hooks/exhaustive-deps': 'off' },
  },
  {
    // The model menu closes in an effect when the inspection ends; the render in between already shows it closed
    files: ['src/demos/MuseApp.tsx'],
    rules: { 'react-hooks/set-state-in-effect': 'off' },
  },
]);
