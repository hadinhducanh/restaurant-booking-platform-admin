import { ProductsObj } from "./Product";
import { User } from "./User";

export interface BlogObj {
    blogId: number,
    title: string,
    content: string,
    image: string,
    user: User,
    product: ProductsObj[],
    createdDate: string,
    lastModifiedDate: string
}