<template>
  <div class="product">
    <img :src="product.image_url" :alt="product.product_name" />
    <div class="product-info">
      <h3 class="product-name">{{ product.product_name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">₪{{ product.price }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/server/services/db";

defineProps<{
  product: Product;
}>();
</script>

<style scoped>
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
  height: 20vh;
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
</style>
