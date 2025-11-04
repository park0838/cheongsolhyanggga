import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // GitHub Pages 배포를 위한 base path 설정
  base: process.env.NODE_ENV === 'production' ? '/cheongsolhyanggga/' : '/',
  plugins: [
    react({
      // React Fast Refresh 최적화
      fastRefresh: true,
      // JSX runtime 자동 설정
      jsxRuntime: 'automatic'
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,webp,svg}']
      },
      includeAssets: ['favicon.ico'],
      manifest: {
        name: '청솔향 펜션',
        short_name: '청솔향',
        description: '자연 속에서 찾는 진정한 휴식',
        theme_color: '#2d5a27',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon'
          }
        ]
      }
    })
  ],
  build: {
    target: ['es2020', 'chrome80', 'firefox78', 'safari14'],
    minify: 'esbuild', // terser보다 빠름
    sourcemap: false,
    reportCompressedSize: false, // 빌드 속도 향상
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animations: ['framer-motion'],
          ui: ['swiper', 'react-select', 'react-hook-form'],
          maps: ['leaflet', 'react-leaflet'],
          utils: ['date-fns', 'clsx', 'lucide-react', 'react-intersection-observer']
        },
        // 파일명 최적화
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 800,
    // CSS 코드 분할 최적화
    cssCodeSplit: true
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'leaflet',
      'date-fns',
      'clsx'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
  server: {
    port: 3000,
    open: false, // 자동 브라우저 열기 비활성화
    hmr: {
      overlay: false
    }
  },
  preview: {
    port: 4173,
    open: false
  },
  // 빌드 성능 최적화
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  }
})