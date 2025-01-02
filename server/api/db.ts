// https://hub.nuxt.com/docs/recipes/postgres
// https://www.npmjs.com/package/postgres

export interface Product {
  product_name: string; // Name of the product
  category_name: string; // Name of the category the product belongs to
  category_id: number; // ID of the category
  name: string; // Product name
  description: string | null; // Product description (optional)
  product_id: number; // Unique ID of the product
  price: string; // Price of the product as a string
  image_url: string; // URL for the product image
}

export interface Category {
  category_name: string; // Name of the category
  products: Product[]; // Array of products in the category
}

export type ProductData = Category[];

export const fetchCategoriesWithProducts = async (): Promise<ProductData[]> => {
  try {
    const sql = usePostgres();

    // Fetch categories and their products
    const categories = await sql`
              SELECT c.name as category_name,
                    p.name as product_name,
                    c.*,
                    p.* 
            FROM categories c
            JOIN products p ON p.category_id = c.category_id`;
    // Ensure the database connection is closed after the request is processed
    await sql.end();

    const reduced = categories.reduce((acc, c) => {
      // Find the existing category in the accumulator
      let category = acc.find(
        (item: any) => item.category_name === c.category_name
      );

      // If the category doesn't exist, create it
      if (!category) {
        category = { category_name: c.category_name, products: [] };
        acc.push(category);
      }

      // Add the product to the category's products array
      category.products.push({
        product_name: c.product_name,
        ...c, // Include other product-related fields if necessary
      });

      return acc;
    }, []);

    return reduced as unknown as ProductData[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
