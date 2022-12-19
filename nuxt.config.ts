import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@anu-vue/nuxt',
    '@nuxtjs/color-mode',
    '@intlify/nuxt3',
  ],
  build: {
    transpile: ['vue-toastification'],
  },
  ssr: false,
  unocss: {
    preflight: true,
  },
  colorMode: {
    classSuffix: '',
  },
  alias: {
    server: fileURLToPath(new URL('./server', import.meta.url)),
  },
  css: [
    '@anu-vue/preset-theme-default/dist/styles.scss',
    'vue-toastification/dist/index.css',
  ],
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'en',
    },
  },
})
