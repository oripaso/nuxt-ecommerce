<!-- <script setup>
const { setLocale } = useI18n()
</script>

<template>
  <div>
    <div>
      <button @click="setLocale('en')">en</button>
      <button @click="setLocale('fr')">fr</button>
      <p>{{ $t('welcome') + $t('hello') }}</p>
    </div>
  </div>
</template> -->


<!-- <script setup lang="ts">
const { t ,setLocale } = useI18n({
  useScope: 'local'
})
</script>

<template>
    <div>
      <div>
        <button @click="setLocale('en')">en</button>
        <button @click="setLocale('fr')">fr</button>
        <p>{{ $t('welcome')}} {{$t('hello1') }}</p>
      </div>
    </div>
  </template> 

<i18n lang="json">
{
  "en": {
    "hello1": "hello world!"
  },
  "fr": {
    "hello1": "こんにちは、世界!"
  }
}
</i18n> -->




<script setup>


const messages = {
  en: {
    welcome: 'Welcome',
    hello: 'Hello, {name}!'
  },
  fr: {
    welcome: 'Bienvenido',
    hello: '¡Hola, {name}!'
  }
}

const { t, locale , setLocale } = useI18n({
  messages,
  useScope: 'local'
})

const switchLanguage = () => {
//   locale.value = locale.value === 'en' ? 'fr' : 'en'
  setLocale(locale.value === 'en' ? 'fr' : 'en')
}
</script>

<template>
  <div>
    <h1>{{ t('welcome') }}</h1>
    <p>{{ t('hello', { name: 'User' }) }}</p>
    <button @click="switchLanguage">
      Switch to {{ locale === 'en' ? 'Spanish' : 'English' }}
    </button>
  </div>
</template>