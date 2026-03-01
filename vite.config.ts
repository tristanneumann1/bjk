import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import type { ViteSSGOptions } from 'vite-ssg'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'
import ViteFonts from 'unplugin-fonts/vite'
import postcssCustomMedia from 'postcss-custom-media'
import postcssGlobalData from '@csstools/postcss-global-data'
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
  ssgOptions: {
    includedRoutes: () => ['/'],
  } satisfies ViteSSGOptions,
  server: {
    port: 8080,
    host: '0.0.0.0',
  },
  base: '/',
  plugins: [
    vue({ template: { transformAssetUrls } }),
    vuetify({ autoImport: true }),
    vueDevTools(),
    svgLoader(),
    ViteFonts(viteFontsConfig),
  ],
  test: {
    globals: true,
    root: 'src'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  ssr: {
    noExternal: ['vuetify'],
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return
        warn(warning)
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/vue/') || id.includes('node_modules/pinia/') || id.includes('node_modules/vue-router/'))
            return 'vendor-vue'
          if (id.includes('node_modules/firebase/'))
            return 'firebase'
        },
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssGlobalData({
          files: ['./src/assets/media.css'],
        }),
        postcssCustomMedia(),
      ],
    }
  }
})
