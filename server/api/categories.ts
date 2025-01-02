import { defineEventHandler } from "h3";
import { fetchCategoriesWithProducts } from "./db";

export default defineEventHandler(async () => {
  try {
    return await fetchCategoriesWithProducts();
  } catch (error) {
    console.log("erorr", error);
    return [];
  }
});
