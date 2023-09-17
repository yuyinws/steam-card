import { fileURLToPath } from 'node:url'
import { env } from 'node:process'
import { defineNuxtConfig } from 'nuxt/config'
import TurboConsole from 'vite-plugin-turbo-console'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxt/devtools',
    'unplugin-icons/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  i18n: {
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        iso: 'en',
        file: 'en.json',
        name: 'English',
      },
      {
        code: 'zhCN',
        iso: 'zh-CN',
        file: 'zh-CN.json',
        name: '简体中文',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  piniaPersistedstate: {
    storage: 'localStorage',
  },
  ssr: false,
  ui: {
    icons: ['bi', 'gridicons', 'ri'],
  },
  build: {
    transpile: ['vue-sonner'],
  },
  alias: {
    server: fileURLToPath(new URL('./server', import.meta.url)),
    types: fileURLToPath(new URL('./types', import.meta.url)),
  },
  css: [
    'atropos/css',
  ],
  vite: {
    define: {
      __ORIGIN__: JSON.stringify(env.ORIGIN || ''),
    },
    plugins: [
      TurboConsole(),
    ],
  },
})
