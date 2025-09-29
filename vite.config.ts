import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    host: '0.0.0.0', // Allow external connections (required for Docker)
    port: 3000,
    https: {
      key: fs.existsSync('./certificates/key.pem')
        ? fs.readFileSync('./certificates/key.pem')
        : undefined,
      cert: fs.existsSync('./certificates/cert.pem')
        ? fs.readFileSync('./certificates/cert.pem')
        : undefined,
    },
    hmr: {
      port: 3000, // HMR port for Docker
    },
    watch: {
      usePolling: true, // Enable polling for Docker volumes
      interval: 100,
    },
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['animejs'],
        },
      },
    },
  },
  
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
      '@components': path.resolve(process.cwd(), './src/components'),
      '@sections': path.resolve(process.cwd(), './src/sections'),
      '@utils': path.resolve(process.cwd(), './src/utils'),
      '@hooks': path.resolve(process.cwd(), './src/hooks'),
      '@types': path.resolve(process.cwd(), './src/types'),
    },
  },
  
  css: {
    postcss: './postcss.config.js',
  },
})