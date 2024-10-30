import agent from "@/api/agent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RecentPaymentResponse } from "@/models/LocationPaymentHistories";
import { useEffect, useState } from "react";

export function RecentSales() {
  const [data, setData] = useState<RecentPaymentResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await agent.AdminDashboard.getRecentPaymentHistories(
          "PAID",
          5
        );
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load recent sales data.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const getInitials = (fullName: string) => {
    const names = fullName.split(" ");
    const initials = names.map((name) => name.charAt(0).toUpperCase()).join("");
    return initials;
  };

  const defaultAvatars = [
    "/avatars/01.png",
    "/avatars/02.png",
    "/avatars/03.png",
    "/avatars/04.png",
    "/avatars/05.png",
  ];

  if (loading) {
    return <div>Loading recent sales...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (data.length === 0) {
    return <div>No recent sales data available.</div>;
  }

  return (
    <div className="space-y-8">
      {data.map((item, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            {defaultAvatars[index] ? (
              <AvatarImage src={defaultAvatars[index]} alt={`${item.userFullName} Avatar`} />
            ) : null}
            <AvatarFallback>{getInitials(item.userFullName)}</AvatarFallback>
          </Avatar>

          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.userFullName}</p>
            <p className="text-sm text-muted-foreground">{item.userEmail}</p>
          </div>

          {/* <div className="ml-auto font-medium">{PriceFormatter.formatPrice(item.paymentPrice)} vnđ</div> */}
          <div className="ml-auto font-medium">20.000 vnđ</div>
        </div>
      ))}
    </div>
  );
}
