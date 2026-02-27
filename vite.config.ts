import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vitest/config';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import generateEnvPlugin from './config/generate-env-plugin';
import { playwright } from '@vitest/browser-playwright';
/// <reference types="vitest" />

const manifestForPlugIn = {
  registerType: 'prompt',
  includeAssests: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'Template Vite Preact Typescript Knitto v0.1.0',
    short_name: 'template-vite-preact-typescript',
    description: 'Template Vite Preact Typescript Knitto using Vite+PreactJS',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'favicon_',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: '/maskable_icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
  },
};

export default defineConfig({
  plugins: [
    generateEnvPlugin(),
    VitePWA({ ...manifestForPlugIn, registerType: 'autoUpdate', devOptions: { enabled: true, type: 'module' } }),
    react(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', '**/*.d.ts'],
    },
    setupFiles: './src/test/setup.ts',
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      viewport: { width: 1920, height: 1080 },
    },
  },
});
