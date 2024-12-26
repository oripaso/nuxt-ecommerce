<template>
    <header>
      <h1>SELTICO</h1>
    </header>

    <div v-for="category in mockData" :key="category.id">
      <h1>{{ category.name }}</h1>
      <slider :data="category" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const mockData = ref([]);
  
  onMounted(async () => {
    const response = await $fetch("/api/mockdata");
    mockData.value = response;
  });
  </script>
  