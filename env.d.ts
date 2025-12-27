/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: 'local' | 'gh-pages'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
