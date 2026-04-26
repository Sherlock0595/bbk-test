import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/stylelint-module',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  vite: {
    optimizeDeps: {
      include: ['valibot', 'zipson'],
    },
  },
  alias: {
    '@api': fileURLToPath(new URL('./api', import.meta.url)),
  },
  typescript: {
    strict: true,
    tsConfig: {
      include: [fileURLToPath(new URL('./api/**/*', import.meta.url))],
    },
  },
  // FIXME: убрать после отладки
  piniaPluginPersistedstate: {
    debug: true,
  },
});
