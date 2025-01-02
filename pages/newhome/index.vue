<template>
  <header>
    <h1>SELTICO</h1>
  </header>

  <div v-for="(category, index) in categories" :key="index">
    <h2>{{ category.category_name }}</h2>
    <slider :data="category.products" />
  </div>
</template>

<script setup lang="ts">
import type { ProductData } from "~/server/api/db";

const categories = reactive<ProductData[]>([]);

onMounted(async () => {
  try {
    const response = await $fetch<ProductData[]>("/api/categories");
    categories.push(...response);
    console.log("Fetched categories:", response);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});
</script>
