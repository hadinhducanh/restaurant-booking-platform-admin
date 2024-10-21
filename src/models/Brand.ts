import { ProductsObj } from "./Product";
import { EntityStatus } from "./Status";

export interface BrandObj{
    brandId: number,
      brandName: string,
      image:string,
      products: ProductsObj,
}

export interface BrandResponse {
  id: number;
  name: string;
  status: EntityStatus;
  image: string;
  createdBy: string;
}
