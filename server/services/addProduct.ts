import { usePg } from "../utils/pg";
import type { AddProduct, Product } from "./db";

export const addProduct = async (product: AddProduct): Promise<Product> => {
  let client = null;

  try {
    client = usePg();
    await client.connect();

    const productQuery = `
    INSERT INTO products (name, category_id, description, price, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING product_id, name AS product_name, category_id, description, price, image_url
  `;
  
    const productResult = await client.query(productQuery, [
      product.product_name,
      product.category_id,
      product.description,
      product.price,
      product.image_url,
    ]);

    return productResult.rows[0];
  } catch (error) {
    console.error("Error in addProduct:", error);
    throw error;
  } finally {
    if (client) {
      await client.end();
    }
  }
};
