import { fileURLToPath } from 'node:url'
import { env } from 'node:process'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxt/devtools',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'unplugin-turbo-console/nuxt',
    '@nuxt/test-utils/module',
  ],
  i18n: {
    langDir: 'locales',
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
    icons: ['bi', 'gridicons', 'ri', 'icon-park-outline', 'tabler', 'ant-design'],
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
  },
  appConfig: {
    origin: env.ORIGIN || '',
  },
  runtimeConfig: {
    blockApps: '',
    blockUsers: '',
    steamKey: '',
    cacheTime: '',
  },
})
