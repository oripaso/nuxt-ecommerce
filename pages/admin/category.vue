<template>
  <admin-layout>
    <v-container>
      <v-row>
        <v-col>
          <v-form @submit.prevent="onSubmit">
            <v-text-field
              v-model="category"
              :rules="[validateCategory]"
              label="קטגוריה"
              name="category"
              required
            ></v-text-field>

            <v-btn type="submit" color="primary">שמור</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import adminLayout from "@/layouts/admin_layout.vue";

// Define Zod schema
const formSchema = z.object({
  category: z
    .string()
    .nonempty({ message: "יש לכתוב קטגוריה" })
    .min(5, { message: "הקטגוריה צריכה להכיל 5 תווים לפחות." }),
});

// Validation rule
const validateCategory = (value: string) => {
  const result = formSchema.safeParse({ category: value });
  return result.success ? true : result.error.errors[0]?.message;
};

// Category model
const category = ref("");

// Submit handler
const onSubmit = async () => {
  const validation = formSchema.safeParse({ category: category.value });

  if (!validation.success) {
    console.error(validation.error.errors);
    alert("Validation failed!");
    return;
  }

  try {
    // send category to the server
    const response = await fetch("/api/categories/add_category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_name: category.value,
        category_id: Math.floor(Math.random() * 10000), // generate a random ID (replace with your logic if needed)
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to save category.");
    }

    const result = await response.json();
    console.log("Category saved successfully:", result);
    alert("קטגוריה נשמרה בהצלחה!");
    category.value = ""; // clear the input field
  } catch (error) {
    console.error("Error saving category:", error);
    alert("שגיאה בשמירת הקטגוריה. נסה שוב.");
  }
};
</script>
