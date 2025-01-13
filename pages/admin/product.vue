<template>
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

          <!-- Category Name -->
          <v-text-field
            v-model="category_name"
            v-bind="categoryNameAttrs"
            label="שם הקטגוריה"
          ></v-text-field>

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
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
const vuetifyConfig = (state) => ({
  props: {
    "error-messages": state.errors,
  },
});

// Define the Zod schema
const schema = z.object({
  product_name: z
    .string()
    .nonempty("יש לכתוב שם מוצר")
    .min(3, "שם המוצר צריך להכיל לפחות 3 תווים."),
  category_name: z.string().nonempty("יש לכתוב שם קטגוריה"),
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
const [product_name, productNameAttrs] = defineField(
  "product_name",
  vuetifyConfig
);
const [category_name, categoryNameAttrs] = defineField(
  "category_name",
  vuetifyConfig
);
const [description, descriptionAttrs] = defineField(
  "description",
  vuetifyConfig
);
const [price, priceAttrs] = defineField("price", vuetifyConfig);
const [image_url, imageUrlAttrs] = defineField("image_url", vuetifyConfig);

// Refactored submit handler
const onSubmit = async () => {
  const { valid, errors, values } = await validate();

  if (!valid) {
    console.error("Validation errors:", errors);
    alert("Please correct the highlighted fields.");
    return;
  }

  console.log("Form submitted successfully with values:", values);
  alert("Product submitted successfully!");

  // You can add your API submission logic here
  // For example:
  // await axios.post('/api/products', values);
};
</script>
