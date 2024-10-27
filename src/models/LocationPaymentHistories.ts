export interface LocationPaymentHistoriesObj {
    id: number,
    locationBookingId: number,
    paymentMethodId: number,
    totalAmount: number,
    createdDate: string,
}

export interface RecentPaymentResponse {
    userFullName: string,
    userEmail: string,
    paymentPrice: number,
}