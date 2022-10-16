import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@intlify/nuxt3',
  ],
  experimental: {
    reactivityTransform: true,
  },
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
    'anu-vue/dist/style.css',
    'vue-toastification/dist/index.css',
  ],
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'zh-CN',
    },
  },
})
