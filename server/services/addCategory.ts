// import { usePg } from "../utils/pg";
// import type { Category } from "./db";

// export const addCategory = async (category: Omit<Category, "products">): Promise<Category> => {
//   let client = null;

//   try {
//     // Initialize PG client
//     client = usePg();
//     await client.connect();

//     // Check if the category with the given ID already exists
//     const existingCategoryQuery = `
//       SELECT * FROM categories WHERE category_id = $1
//     `;
//     const existingCategoryResult = await client.query(existingCategoryQuery, [category.category_id]);

//     // Ensure rowCount is a valid number
//     if (existingCategoryResult?.rowCount && existingCategoryResult.rowCount > 0) {
//       throw new Error("Category with this ID already exists.");
//     }

//     // Insert the new category into the database
//     const insertCategoryQuery = `
//       INSERT INTO categories (category_name, category_id)
//       VALUES ($1, $2)
//       RETURNING category_name, category_id
//     `;
//     const insertCategoryResult = await client.query(insertCategoryQuery, [
//       category.category_name,
//       category.category_id,
//     ]);

//     const newCategory = insertCategoryResult.rows[0];

//     // Return the newly created category with an empty products array
//     return { ...newCategory, products: [] };
//   } catch (error) {
//     console.error("Error in addCategory:", error);
//     throw error;
//   } finally {
//     // Ensure the connection is closed
//     if (client) {
//       await client.end();
//     }
//   }
// };


import { usePg } from "../utils/pg";
import type { Category } from "./db";

export const addCategory = async (category: Omit<Category, "products">): Promise<Category> => {
  let client = null;

  try {
    // Initialize PG client
    client = usePg();
    await client.connect();

    // Check if the category with the given ID already exists
    const existingCategoryQuery = `
      SELECT category_id, name AS category_name
      FROM categories
      WHERE category_id = $1
    `;
    const existingCategoryResult = await client.query(existingCategoryQuery, [category.category_id]);

    if (existingCategoryResult?.rowCount && existingCategoryResult.rowCount > 0) {
      throw new Error("Category with this ID already exists.");
    }

    // Insert the new category into the database
    const insertCategoryQuery = `
      INSERT INTO categories (name, category_id)
      VALUES ($1, $2)
      RETURNING name AS category_name, category_id
    `;
    const insertCategoryResult = await client.query(insertCategoryQuery, [
      category.category_name,
      category.category_id,
    ]);

    const newCategory = insertCategoryResult.rows[0];

    // Return the newly created category with an empty products array
    return { ...newCategory, products: [] };
  } catch (error) {
    console.error("Error in addCategory:", error);
    throw error;
  } finally {
    // Ensure the connection is closed
    if (client) {
      await client.end();
    }
  }
};
