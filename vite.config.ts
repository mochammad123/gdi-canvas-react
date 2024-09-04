import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from "vite-tsconfig-paths";

const manifestForPlugIn: any = {
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VitePWA({ ...manifestForPlugIn, devOptions: { enabled: true, type: 'module' } }), react(), tsconfigPaths() ],
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  }
});
