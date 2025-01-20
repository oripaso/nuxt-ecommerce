import { defineEventHandler, readBody } from "h3";
import { addProduct } from "~/server/services/addProduct";
import { addProduct as schema } from "@/schemes/products";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const {
      product_name,
      category_id,
      category_name,
      description,
      price,
      image_url,
    } = body;

    const validationResult = schema.safeParse(body);

    if (!validationResult.success) {
      // check if the structure is valid
      return {
        status: 400,
        message: "Invalid request.",
      };
    }

    const newProduct = await addProduct({
      product_name,
      category_id,
      description: description || "",
      price,
      image_url,
      category_name,
    });
    console.log("????");
    

    return {
      status: 201,
      message: "Product added successfully!",
      data: newProduct,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    console.error("Error adding product:", errorMessage);

    return {
      status: 500,
      message: errorMessage || "Failed to add product.",
    };
  }
});
