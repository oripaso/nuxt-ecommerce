export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      welcome: "Welcome",
      hello: "Hello",
    },
    fr: {
      welcome: "Bienvenue",
      hello: "bonjour",
    },
  },
}));
