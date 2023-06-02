// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // Disable Server Side rendering
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo',
    '@pinia/nuxt',
    '@formkit/nuxt'
  ],
  // @ts-ignore
  css: ["@/assets/main.css"],
  apollo: {
    clients: {
      default: {
        authType: 'Bearer',
        authHeader: 'Authorization',
        tokenStorage: 'localStorage',
        tokenName: 'auth-token',
        httpEndpoint: 'http://localhost:3000/graphql'
      }
    },
  },
})
