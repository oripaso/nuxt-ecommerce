import { defineEventHandler } from "h3";
import type { Category } from "~/server/services/db";

export default defineEventHandler(async (event) => {
  try {
    const params = event.context.params;

    // validate that parameters are defined
    if (!params || !params.category_id) {
      throw new Error("Missing category_id in request parameters");
    }

    const category_id = parseInt(params.category_id, 10); // Convert category_id to a number
    if (isNaN(category_id)) {
      throw new Error("Invalid category_id");
    }

    const sql = usePostgres();

    // Fetch category with products
    const results = await sql`
      SELECT c.name AS category_name,
             c.category_id,
             p.name AS product_name,
             p.product_id,
             p.description,
             p.price,
             p.image_url
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.category_id
      WHERE c.category_id = ${category_id}`;

    // Close the database connection
    await sql.end();

    // Transform data into the desired structure
    if (results.length === 0) {
      return {
        statusCode: 404,
        message: "Category not found",
      };
    }

    const category: Category = {
      category_name: results[0].category_name,
      category_id: results[0].category_id,
      products: results.map((product) => ({
        product_name: product.product_name,
        category_name: product.category_name,
        category_id: product.category_id,
        product_id: product.product_id,
        description: product.description,
        price: product.price,
        image_url: product.image_url,
      })),
    };

    return category;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching category:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
    return {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Internal server error",
    };
  }
});
