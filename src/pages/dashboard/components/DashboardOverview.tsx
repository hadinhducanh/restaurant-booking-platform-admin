import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { RecentSales } from "./RecentSales";
import { Overview } from "./RevenueBarChart";
import { useEffect, useState } from "react";
import agent from "@/api/agent";
import { PriceFormatter } from "@/utils/PriceFormatter";

export default function DashboardOverview() {
  const date = new Date();
  const [totalRevenue, setTotalRevenue] = useState<string>("0");
  const [totalBooking, setTotalBooking] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalLocations, setTotalLocations] = useState<number>(0);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const totalRevenueResult =
          await agent.AdminDashboard.getTotalRevenueOfSystem(
            date.getMonth() + 1,
            date.getFullYear()
          );
        setTotalRevenue(
          PriceFormatter.formatPrice(totalRevenueResult.toString())
        );

        const totalBookingResult =
          await agent.AdminDashboard.getNumberOfBookings(
            "SUCCESSFUL",
            date.getMonth() + 1,
            date.getFullYear()
          );
        setTotalBooking(totalBookingResult);

        const totalUsersResult = await agent.AdminDashboard.getActiveUsers();
        setTotalUsers(totalUsersResult);

        const totalLocationsResult =
          await agent.AdminDashboard.getActiveLocations();
        setTotalLocations(totalLocationsResult);
      } catch (error) {
        console.error("Error fetching api:", error);
      }
    };

    fetchTotalRevenue();
  }, []);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu hệ thống trong tháng</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue} vnđ</div>
            <p className="text-xs text-muted-foreground">+100% so với tháng trước</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Number of bookings
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBooking}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Locations
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLocations}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Các đơn booking gần nhất</CardTitle>
            <CardDescription>5 đơn booking gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
