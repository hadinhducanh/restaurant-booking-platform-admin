import { z } from "zod";
export const blogSchema = z.object({
    blogId: z.number(),
    image: z.string(),
    title:  z.string(),
    content: z.string(),
    createdDate: z.string(),
    lastModifiedDate: z.string(),
    user: z.object({
        userId: z.string(),
        fullName: z.string(),
    }),
    product: 
    z.object({
    productId: z.array( z.number())
    })

});

export type BrandType = z.infer<typeof blogSchema>;