// https://hub.nuxt.com/docs/recipes/postgres
// https://www.npmjs.com/package/postgres

export interface Product {
  product_name: string; // Name of the product
  category_name: string; // Name of the category the product belongs to
  category_id: number; // ID of the category
  description: string | null; // Product description (optional)
  product_id: number; // Unique ID of the product
  price: number; // Price of the product as a string
  image_url: string; // URL for the product image
}

export interface Category {
  category_name: string; // Name of the category
  category_id: number; // Unique ID of the category
  products: Product[]; // Array of products in the category
}

export type ProductData = Category[];


export const fetchCategoriesWithProducts = async (): Promise<Category[]> => {
  try {
    const sql = usePostgres();

    // Fetch categories and their products
    const categories: any[] = await sql`
      SELECT c.name AS category_name,
             c.category_id,
             p.name AS product_name,
             p.product_id,
             p.category_id,
             p.description,
             p.price,
             p.image_url
      FROM categories c
      JOIN products p ON p.category_id = c.category_id`;

    // Close the database connection
    await sql.end();

    // Transform data into the desired structure
    const reduced: Category[] = categories.reduce((acc: Category[], c: any) => {
      // Find existing category
      let category = acc.find((item) => item.category_id === c.category_id);

      // If not found, create a new category
      if (!category) {
        category = {
          category_name: c.category_name,
          category_id: c.category_id,
          products: [],
        };
        acc.push(category);
      }

      // Add product to the category's products array
      category.products.push({
        product_name: c.product_name,
        category_name: c.category_name,
        category_id: c.category_id,
        product_id: c.product_id,
        description: c.description,
        price: c.price,
        image_url: c.image_url,
      });

      return acc;
    }, []);

    return reduced;
  } catch (error) {
    console.error("Error in fetchCategoriesWithProducts:", error);
    return [];
  }
};
