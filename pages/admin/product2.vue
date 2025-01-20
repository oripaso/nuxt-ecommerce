<template>
  <admin-layout>
    <v-container>
      <v-row>
        <v-col>
          <v-form @submit.prevent="onSubmit">
            <!-- Create/Update Switch -->
            <v-switch
              v-model="isUpdateMode"
              label="עדכון מוצר קיים"
              color="primary"
            ></v-switch>

            <!-- Product Name -->
            <v-text-field
              v-model="product_name"
              v-bind="productNameAttrs"
              label="שם המוצר"
            ></v-text-field>

            <!-- Category Name Dropdown -->
            <v-select
              v-model="selectedCategory"
              :items="categories"
              item-title="category_name"
              item-value="category_id"
              v-bind="categoryNameAttrs"
              label="שם הקטגוריה"
            ></v-select>

            <!-- Description -->
            <v-textarea
              v-model="description"
              v-bind="descriptionAttrs"
              label="תיאור המוצר"
            ></v-textarea>

            <!-- Price -->
            <v-text-field
              v-model="price"
              v-bind="priceAttrs"
              label="מחיר"
              type="number"
            ></v-text-field>

            <!-- Image URL -->
            <v-text-field
              v-model="image_url"
              v-bind="imageUrlAttrs"
              label="כתובת URL של התמונה"
            ></v-text-field>

            <v-btn type="submit" color="primary">
              {{ isUpdateMode ? "עדכן" : "שמור" }}
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </admin-layout>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { ref } from "vue";
import type { Category } from "~/server/services/db";
import { addProduct as schema, updateProduct } from "@/schemes/products";

const isUpdateMode = ref<boolean>(false); // Toggle for Create/Update mode
const categories = ref<Category[]>([]);

// Fetch categories on component mount
onMounted(async () => {
  try {
    const result = await $fetch("/api/categories/fetchcategories");
    categories.value = result;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
});
//
// const formSchema = computed(() => {
//   return isUpdateMode ? updateProduct : schema;
// });

// const { defineField, validate, resetForm } = useForm({
//   validationSchema: toTypedSchema(formSchema.value),
// });

//////

let form; // Store the form instance globally

const initializeForm = () => {
  form = useForm({
    validationSchema: toTypedSchema(isUpdateMode ? updateProduct : schema),
  });
};

// Initialize the form initially
initializeForm();

// Watch for changes in `isUpdateMode` and reinitialize the form
watch(isUpdateMode, () => {
  

  initializeForm();
});

const { defineField, validate, resetForm } = form;

////////

// Define fields with attributes for easy binding
const [product_name, productNameAttrs] = defineField("product_name");
const [selectedCategory, categoryNameAttrs] = defineField("selectedCategory");
const [description, descriptionAttrs] = defineField("description");
const [price, priceAttrs] = defineField("price");
const [image_url, imageUrlAttrs] = defineField("image_url");

// Methods
const onSubmit = async () => {
  const { valid, errors, values } = await validate();

  if (!valid) {
    console.error("Validation errors:", errors);
    alert("Please correct the highlighted fields.");
    return;
  }

  if (isUpdateMode.value) {
    console.log("Updating product:", {
      product_name: product_name.value,
      selectedCategory: selectedCategory.value,
      description: description.value,
      price: price.value,
      image_url: image_url.value,
    });
    // Add logic for updating the product

    return;
  }

  /// add product
  // Prepare payload to send
  const payload = {
    product_name: values.product_name,
    category_id: values.selectedCategory,
    description: values.description || null, // Ensure null for empty description
    price: values.price,
    image_url: values.image_url,
  };

  try {
    const response = await $fetch("/api/products/add_product", {
      method: "POST",
      body: payload,
    });

    if (response) {
      alert("המוצר נוסף בהצלחה!");
      // Clear form after successful submission
      resetForm();
    } else {
      alert("נכשל להוסיף את המוצר.");
    }
  } catch (error) {
    console.error("Error submitting product:", error);
    alert(`אירעה שגיאה במהלך שמירת המוצר: ${error.message}`);
  }
};
</script>
