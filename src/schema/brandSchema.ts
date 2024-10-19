import { z } from "zod";
export const brandSchema = z.object({
    brandId: z.number(),
    brandName: z.string(),
    image: z.string(),
    // products: productSchema
});

export type BrandType = z.infer<typeof brandSchema>;