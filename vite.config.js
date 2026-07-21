import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split vendor chunks to improve cache efficiency & reduce initial load
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
      },
    },
    // Raise chunk size warning threshold (dashboard apps legitimately exceed 500kb)
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'esbuild',
    // Enable source maps for production debugging
    sourcemap: false,
  },
  // Optimize dev server
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
