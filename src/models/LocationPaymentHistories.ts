export interface LocationPaymentHistoriesObj {
    id: number,
    locationBookingId: number,
    paymentMethodId: number,
    paymentMethod: string,
    totalAmount: number,
    createdDate: string,
}

export interface RecentPaymentResponse {
    userFullName: string,
    userEmail: string,
    paymentPrice: number,
}

export interface PaymentHistoriesBetweenLocationAndSystemResponse {
    id: number,
    sender: string,
    receiver: string,
    message: string,
    paymentMethod: string,
    totalAmount: number,
    createdDate: string,
}