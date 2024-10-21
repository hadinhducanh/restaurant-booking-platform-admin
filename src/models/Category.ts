import { EntityStatus } from "./Status";

export interface CategoryObj {
    categoryId: number,
        categoryName: string
}

export interface CategoryResponse {
    id: number;
    image: string;
    name: string;
    status: EntityStatus;
    createdBy: string;
}
