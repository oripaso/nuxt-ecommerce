<template>
  <admin-layout>
    <v-container>
      <v-row>
        <v-col>
          <v-form @submit.prevent="onSubmit">
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

            <v-btn type="submit" color="primary">שמור</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </admin-layout>
</template>

<script setup lang="ts">
import adminLayout from "@/layouts/admin_layout.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { ref, onMounted } from "vue";

// Categories array to populate the dropdown
const categories = ref([]);

// Define the Zod schema for validation
const schema = z.object({
  product_name: z
    .string()
    .nonempty("יש לכתוב שם מוצר")
    .min(3, "שם המוצר צריך להכיל לפחות 3 תווים."),
  selectedCategory: z.number().positive("יש לבחור קטגוריה חוקית."),
  description: z.string().nullable(),
  price: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().positive("המחיר צריך להיות מספר חיובי.")
  ),
  image_url: z.string().url("יש לספק כתובת URL חוקית."),
});

// Initialize the form with Vee-Validate
const { defineField, validate } = useForm({
  validationSchema: toTypedSchema(schema),
});

// Define fields with attributes for easy binding
const [product_name, productNameAttrs] = defineField("product_name");
const [selectedCategory, categoryNameAttrs] = defineField("selectedCategory");
const [description, descriptionAttrs] = defineField("description");
const [price, priceAttrs] = defineField("price");
const [image_url, imageUrlAttrs] = defineField("image_url");

// Fetch categories on component mount
onMounted(async () => {
  try {
    const result = await $fetch("/api/categories/fetchcategories");
    categories.value = result;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
});

const onSubmit = async () => {
  const { valid, errors, values } = await validate();

  if (!valid) {
    console.error("Validation errors:", errors);
    alert("Please correct the highlighted fields.");
    return;
  }

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

// Reset form fields
const resetForm = () => {
  product_name.value = "";
  selectedCategory.value = null;
  description.value = "";
  price.value = "";
  image_url.value = "";
};
</script>
