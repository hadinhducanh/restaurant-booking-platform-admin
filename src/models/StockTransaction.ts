import { ProductsObj } from "./Product";

export interface Supplier {
    supplierId: number;
    supplierName: string;
    contactInfo: string;
    address: string;
    email: string;
    phone: string;
}

export interface StockTransaction {
    stockTransactionId: number;
    stockTransactionDate: string;
    quantity: number;
    totalPrice: number;
    supplier: Supplier;
    product: ProductsObj;
}