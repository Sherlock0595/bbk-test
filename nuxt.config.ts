import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxtjs/stylelint-module'],
  alias: {
    '@api': fileURLToPath(new URL('./api', import.meta.url)),
  },
  typescript: {
    strict: true,
    tsConfig: {
      include: [fileURLToPath(new URL('./api/**/*', import.meta.url))],
    },
  },
});
