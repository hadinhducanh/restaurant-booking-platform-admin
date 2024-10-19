import { z } from "zod";
export const productSchema = z.object({
  productId: z.number(),
  productName: z.string(),
  description: z.string(),
  price: z.number(),
  status: z.string(),
  image: z.array(z.string()),
  category: z.object({
    categoryId: z.number(),
    categoryName: z.string(),
  }),
  brand: z.object({
    brandId: z.number(),
    brandName: z.string(),
    image: z.string(),
  
  }),
});

export type ProductType = z.infer<typeof productSchema>;
