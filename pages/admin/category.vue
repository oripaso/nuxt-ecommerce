<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form @submit.prevent="onSubmit">
          <v-text-field
            v-model="category"
            :rules="[validateCategory('category', formSchema)]"
            label="קטגוריה"
            name="category"
            required
          ></v-text-field>

          <v-btn type="submit" color="primary">שמור</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import { validateCategory } from "../../server/utils/zod";

// Define Zod schema
const formSchema = z.object({
  category: z
    .string()
    .nonempty({ message: "יש לכתוב קטגוריה" })
    .min(5, { message: "הקטגוריה צריכה להכיל 5 תווים לפחות." }),
});
// const validator = validateCategory(formSchema)
// Category model
const category = ref("");
// Submit handler
const onSubmit = () => {
  const validation = formSchema.safeParse({ category: category.value });
  console.log({ validation });

  if (!validation.success) {
    console.error(validation.error.errors);
    alert("Validation failed!");
    return;
  }
  alert("Form submitted successfully!");
};
</script>
