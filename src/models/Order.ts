
import { VoucherObj } from "./Voucher";

export interface GiftResponse {
    productId: number;
    productName: string;
    description: string;
    quantityOfGift: number;
    image: string;
}

export interface Product {
    productId: number;
    productName: string;
    description: string;
    image: string;
    giftResponse?: GiftResponse;
}

export interface OrderDetail {
    orderDetailId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    product: Product;
}

export interface OrderDto {
    orderId: number;
    orderDate: string;
    status: String;
    totalAmount: number;
    afterTotalAmount: number;
    feedBack: boolean;
}

export interface VoucherDTO extends VoucherObj {
}

export interface OrderResponse {
    orderDto: OrderDto;
    voucherDto: VoucherDTO; 
    listOrderDetail: OrderDetail[];
}
