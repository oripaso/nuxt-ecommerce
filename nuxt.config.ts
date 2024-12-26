// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n", "@nuxt/image", "vue3-carousel-nuxt"],
  i18n: {
    vueI18n: "./plugin/i18n.js", // if you are using custom path, default
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
});