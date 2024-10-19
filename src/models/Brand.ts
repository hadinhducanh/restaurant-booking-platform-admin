import { ProductsObj } from "./Product";

export interface BrandObj{
    brandId: number,
      brandName: string,
      image:string,
      products: ProductsObj,
}