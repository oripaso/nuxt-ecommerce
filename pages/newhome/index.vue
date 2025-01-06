<template>
  <header>
    <h1>SELTICO</h1>
  </header>

  <div v-for="(category, index) in categories" :key="index">
    <h2>
      <NuxtLink :to="`/category/${category.category_id}`" class="category_link">
        {{ category.category_name }}
      </NuxtLink>
    </h2>
    <slider :data="category.products" />
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import type { Category } from "~/server/services/db";

const categories = reactive<Category[]>([]);

onMounted(async () => {
  try {
    const response = await $fetch<Category[]>("/api/categories/categories");
    categories.push(...response);
    console.log("Fetched categories:", response);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});
</script>

<style scoped>
.category_link {
  direction: rtl;
}
</style>
