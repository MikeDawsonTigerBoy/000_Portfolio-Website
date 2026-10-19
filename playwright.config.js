import { defineConfig, devices } from '@playwright/test'

const PORT = 4173

// Smoke tests on the production build, in iOS Safari's engine (WebKit),
// Android Chrome (Chromium) and desktop Chromium.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'iphone-15-webkit', use: { ...devices['iPhone 15'] } },
    // Mike's own phone, and the narrowest current iPhone (375px wide)
    { name: 'iphone-12-mini-webkit', use: { ...devices['iPhone 12 Mini'] } },
    { name: 'pixel-7-chromium', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `npm run build && npm run preview -- --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
