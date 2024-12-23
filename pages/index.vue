<script setup>
const messages = {
  en: {
    welcome: "Welcome",
    hello: "Hello, {name}!",
  },
  fr: {
    welcome: "Bienvenido",
    hello: "¡Hola, {name}!",
  },
};

const { t, locale, setLocale } = useI18n({
  messages,
  useScope: "local",
});

const switchLanguage = () => {
  //   locale.value = locale.value === 'en' ? 'fr' : 'en'
  setLocale(locale.value === "en" ? "fr" : "en");
};
</script>

<template>
  <div>
    <h1>{{ t("welcome") }}</h1>
    <p>{{ t("hello", { name: "User" }) }}</p>
    <button @click="switchLanguage">
      Switch to {{ locale === "en" ? "Spanish" : "English" }}
    </button>
  </div>
</template>
