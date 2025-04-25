import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/Pwa/', // Add this line - must match your repo name
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Progress Tracker',
        short_name: 'ReactPWA',
        description: 'My PWA with React and Vite',
        theme_color: '#ffffff',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/Pwa/', // Update this to include your repo name
        icons: [
          {
            src: '/Pwa/icons/to-do-list-flat-icon-free-vector.png', // Update path to include repo name
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions: {
        enabled: true
      },
      workbox: {
        navigateFallback: '/Pwa/offline.html',
        navigateFallbackDenylist: [/^\/api\//]
      }
    })
  ]
});