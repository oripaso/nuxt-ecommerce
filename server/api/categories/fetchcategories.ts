import { defineEventHandler } from "h3";
import { fetchCategoriesWithProducts } from "../../services/fetchdata";

export default defineEventHandler(async () => {
  try {
    return await fetchCategoriesWithProducts();
  } catch (error) {
    console.error("Error fetching categories with products:", error);
    return [];
  }
});


