import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'
import ViteFonts from 'unplugin-fonts/vite'
import {Options} from "unplugin-fonts/types";

const viteFontsConfig: Options = {
  fontsource: {
    families: [
      {
        name: 'Roboto',
        weights: [100, 300, 400, 500, 700, 900],
        styles: ['normal', 'italic'],
      },
    ],
  },
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  base: '/',
  plugins: [vue(), vueDevTools(), svgLoader(), ViteFonts(viteFontsConfig)],
  test: {
    globals: true,
    root: 'src'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'pinia', 'vue-router'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
        },
      },
    },
  },
})
