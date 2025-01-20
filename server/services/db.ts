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

export type AddProduct = Omit<Product, "product_id">;

export type UpdateProduct = Partial<Product>;

export type DeleteProduct = Pick<Product, "product_id">;
