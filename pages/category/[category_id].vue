<template>
  <v-container>
    <v-row>
      <v-col>
        <header class="page-header">
          <h1 class="category-title">{{ category?.category_name }}</h1>
        </header>

        <!-- back button to navigate to the homepage -->
        <v-btn color="red" @click="goToHomePage">חזור אחורה</v-btn>
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
        <div v-if="category">
          <!-- display products using a custom product component -->
          <div class="products-container">
            <productcomp
              v-for="product in filteredAndSortedProducts"
              :key="product.product_id"
              :product="product"
            />
          </div>
        </div>
        <v-row v-else>
          <v-col v-for="n in 4" :col="n">
            <v-skeleton-loader type="card"></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
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
  router.push("/home");
}
</script>

<style>
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
