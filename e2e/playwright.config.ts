import { defineConfig, devices } from '@playwright/test';

const ADMIN_URL = 'http://localhost:4200';
const PORTAL_URL = 'http://localhost:4201';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    locale: 'en-US',
  },

  projects: [
    // --- Auth Setup Projects ---
    {
      name: 'admin-setup',
      testDir: './auth',
      testMatch: 'admin.setup.ts',
      use: { ...devices['Desktop Chrome'], baseURL: ADMIN_URL },
    },
    {
      name: 'manager-setup',
      testDir: './auth',
      testMatch: 'manager.setup.ts',
      use: { ...devices['Desktop Chrome'], baseURL: PORTAL_URL },
    },
    {
      name: 'employee-setup',
      testDir: './auth',
      testMatch: 'employee.setup.ts',
      use: { ...devices['Desktop Chrome'], baseURL: PORTAL_URL },
    },

    // --- Test Projects ---
    {
      name: 'admin',
      testDir: './tests',
      testMatch: /\/(01-auth\/admin|02-|03-|04-|05-|06-|07-|08-|09-|10-|11-|14-|15-|16-.*admin).*\.spec\.ts$/,
      dependencies: ['admin-setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: ADMIN_URL,
        storageState: './auth/storage/admin.json',
      },
    },
    {
      name: 'portal-employee',
      testDir: './tests',
      testMatch: /\/(01-auth\/portal|12-|16-.*portal).*\.spec\.ts$/,
      dependencies: ['employee-setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: PORTAL_URL,
        storageState: './auth/storage/employee.json',
      },
    },
    {
      name: 'portal-manager',
      testDir: './tests',
      testMatch: /\/(13-).*\.spec\.ts$/,
      dependencies: ['manager-setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: PORTAL_URL,
        storageState: './auth/storage/manager.json',
      },
    },
    {
      name: 'e2e-workflows',
      testDir: './tests',
      testMatch: /\/15-.*\.spec\.ts$/,
      dependencies: ['admin-setup', 'manager-setup', 'employee-setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: ADMIN_URL,
      },
    },
  ],
});
