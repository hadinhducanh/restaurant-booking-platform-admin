export interface VoucherObj {
    voucherId: number;
    voucherCode: string;
    voucherName: string;
    quantity: number;
    discount: number;
    minOrderAmount: number;
    startDate: string;
    endDate: string;
    status: string;
    quantityUse: number;
}