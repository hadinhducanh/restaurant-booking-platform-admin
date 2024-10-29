export interface MonthlyRevenueResponse{
    month: string;
    totalRevenue: number;
}

export interface LocationRevenueReportResponse{
    id: string;
    locationName: string;
    locationPhoneNumber: string;
    numberOfBookingsInMonth: number;
    locationRevenueInMonth: number;
    revenueBroughtForSystemInMonth: number;
}