<template>
  <div class="page-container">
    <header class="page-header">
      <h1 class="category-title">{{ category?.category_name }}</h1>
    </header>

    <!-- back button to navigate to the homepage -->
    <button class="back-btn" @click="goToHomePage">חזור אחורה</button>

    <div v-if="category">
      <div class="filters">
        <!-- search input for filtering products -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="חפש מוצר..."
          class="search-input"
        />
        <!-- dropdown to sort products -->
        <select v-model="sortOption" class="sort-select">
          <option value="name-asc">מיין לפי שם (א' עד ת')</option>
          <option value="name-desc">מיין לפי שם (ת' עד א')</option>
          <option value="price-asc">מיין לפי מחיר (נמוך לגבוה)</option>
          <option value="price-desc">מיין לפי מחיר (גבוה לנמוך)</option>
        </select>
      </div>

      <!-- display products using a custom product component -->
      <div class="products-container">
        <productcomp
          v-for="product in filteredAndSortedProducts"
          :key="product.product_id"
          :product="product"
        />
      </div>
    </div>
    <div v-else>
      <!-- loading text if category is not yet loaded -->
      <p class="loading-text">טוען מוצרים...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Category } from "~/server/services/db";

const route = useRoute();
const router = useRouter();
const category = ref<Category>(null);

// state variables for search and sorting
const searchQuery = ref("");
const sortOption = ref("name-asc");

// fetch category data on component mount
onMounted(async () => {
  try {
    const categoryId = route.params.category_id;
    const response = await $fetch<Category>(`/api/categories/${categoryId}`);
    category.value = response;
  } catch (error) {
    console.error("error fetching products for category:", error);
  }
});

// computed property for filtering and sorting products
const filteredAndSortedProducts = computed(() => {
  if (!category.value) return [];

  // filter products by search query
  let products = category.value.products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  // sort products based on selected option
  // if (sortOption.value === "name-asc") {
  //   products.sort((a, b) => a.product_name.localeCompare(b.product_name));
  // } else if (sortOption.value === "name-desc") {
  //   products.sort((a, b) => b.product_name.localeCompare(a.product_name));
  // } else if (sortOption.value === "price-asc") {
  //   products.sort((a, b) => a.price - b.price);
  // } else if (sortOption.value === "price-desc") {
  //   products.sort((a, b) => b.price - a.price);
  // }

  const localeCompareSort = (a, b) =>
    a.product_name.localeCompare(b.product_name);
  const priceSort = (a, b) => b.price - a.price;
  const hashMap = {
    "name-asc": localeCompareSort,
    "name-desc": localeCompareSort,
    "price-asc": priceSort,
    "price-desc": priceSort,
  };

  if (hashMap[sortOption.value]) {
    products.sort(hashMap[sortOption.value]);
  }

  return products;
});

// navigate to the homepage
function goToHomePage() {
  router.push("/newhome");
}
</script>

<style>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
  background-color: #f9f9f9;
  color: #333;
}

.page-header {
  text-align: center;
  margin-bottom: 20px;
}

.category-title {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 15px;
}

.search-input,
.sort-select {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  direction: rtl;
  margin-top: 20px; /* ריווח עליון */
}

.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.product {
  background-color: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.product img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
  text-align: center;
}

.product-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #34495e;
}

.product-description {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin: 10px 0;
}

.product-price {
  font-size: 1rem;
  font-weight: bold;
  color: #e74c3c;
}

.loading-text {
  text-align: center;
  font-size: 1.2rem;
  color: #95a5a6;
}

/* back button styles */
.back-btn {
  background-color: #4caf50;
  border-radius: 25px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition: 0.3s;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.back-btn:hover {
  background-color: #45a049;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
}

.back-btn:active {
  background-color: #3e8e41;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(2px);
}
</style>
