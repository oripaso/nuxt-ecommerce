import { defineEventHandler, readBody } from "h3";
import { addProduct } from "~/server/services/addProduct";


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

    console.log(body);

    // אימות נתונים
    if (!product_name || typeof product_name !== "string") {
      throw new Error(
        "Invalid input: product_name is required and must be a string."
      );
    }

    if (!category_id || typeof category_id !== "number") {
      throw new Error(
        "Invalid input: category_id is required and must be a number."
      );
    }

    if (price == null || typeof price !== "number" || price <= 0) {
      throw new Error(
        "Invalid input: price is required and must be a positive number."
      );
    }

    if (!image_url || typeof image_url !== "string") {
      throw new Error(
        "Invalid input: image_url is required and must be a valid URL."
      );
    }


    const product_id = generateUniqueProductId();

 
    const newProduct = await addProduct({
      product_name,
      category_id,
      description: description || "",
      price,
      image_url,
      category_name,
      product_id,
    });

 
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

function generateUniqueProductId(): number {
  return Math.floor(Math.random() * 1000000);
}
