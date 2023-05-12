// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo',
    '@nuxtjs/google-fonts'
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
