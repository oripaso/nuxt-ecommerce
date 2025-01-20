import { z } from "zod";

export const addProduct = z.object({
  product_name: z
    .string()
    .nonempty("יש לכתוב שם מוצר")
    .min(3, "שם המוצר צריך להכיל לפחות 3 תווים."),
  selectedCategory: z.number().positive("יש לבחור קטגוריה חוקית."),
  description: z.string().nullable(),
  price: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().positive("המחיר צריך להיות מספר חיובי.")
  ),
  image_url: z.string().url("יש לספק כתובת URL חוקית."),
});


export const updateProduct = z.object({
  product_id: z.number().positive("יש לספק מזהה מוצר חוקי."),
  product_name: z
    .string()
    .nonempty("יש לכתוב שם מוצר")
    .min(3, "שם המוצר צריך להכיל לפחות 3 תווים.")
    .optional(),
  selectedCategory: z.number().positive("יש לבחור קטגוריה חוקית.").optional(),
  description: z.string().nullable().optional(),
  price: z
    .preprocess(
      (val) => (val !== null && val !== undefined ? parseFloat(val as string) : undefined),
      z.number().positive("המחיר צריך להיות מספר חיובי.").optional()
    ),
  image_url: z.string().url("יש לספק כתובת URL חוקית.").optional(),
});
