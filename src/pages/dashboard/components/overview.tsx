import agent from "@/api/agent";
import { MonthlyRevenueResponse } from "@/models/Revenue";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export function Overview() {
  const currentYear = new Date().getFullYear();
  const [annualRevenue, setAnnualRevenue] = useState<
    MonthlyRevenueResponse[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnualRevenue = async () => {
      try {
        const result =
          await agent.AdminDashboard.getTotalRevenueOfSystemForYear(
            currentYear
          );
        setAnnualRevenue(result);
        console.log("Annual Revenue:", result);
      } catch (error) {
        console.error("Error fetching API:", error);
        setError("Failed to fetch revenue data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnualRevenue();
  }, [currentYear]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  if (!annualRevenue || annualRevenue.length === 0)
    return <div>No revenue data available.</div>;

  const chartData = annualRevenue.map((item) => ({
    name: item.month,
    total: item.totalRevenue,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        {/* Optional: Add grid and tooltip for better visualization */}
        <CartesianGrid strokeDasharray="2 2" />
        {/* <Tooltip formatter={(value: number) => `$${value}`} /> */}
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
