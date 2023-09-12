import { fileURLToPath } from 'node:url'
import { env } from 'node:process'
import { defineNuxtConfig } from 'nuxt/config'
import TurboConsole from 'vite-plugin-turbo-console'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxt/devtools',
  ],
  build: {
    transpile: ['vue-sonner'],
  },
  ssr: false,
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
