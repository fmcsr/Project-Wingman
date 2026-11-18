import { defineConfig, devices } from '@playwright/test';

/** Its own port, so the checks never collide with a dev server you have open on Vite's default 5173. */
const PORT = 5199;
const CI = Boolean(process.env.CI);

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: CI,
  reporter: CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  use: {
    ...devices['Desktop Chrome'],
    baseURL: `http://localhost:${PORT}`,
    viewport: { width: 1440, height: 900 },
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium' }],
  webServer: {
    command: `npm run dev -- --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !CI,
  },
});
