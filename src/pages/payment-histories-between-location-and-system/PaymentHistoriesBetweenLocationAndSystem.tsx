/* eslint-disable @typescript-eslint/no-unused-vars */
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/DataTable/data-table";
import { DataTablePagination } from "@/components/DataTable/data-table-pagination";
import { columns } from "./components/columns";
import { PaymentHistoriesBetweenLocationAndSystemResponse } from "@/models/LocationPaymentHistories";
import { useEffect, useState } from "react";

export const PaymentHistoriesBetweenLocationAndSystem = () => {
  const [data, setData] = useState<
    PaymentHistoriesBetweenLocationAndSystemResponse[]
  >([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const randomTotalAmount = Math.floor(Math.random() * (1200 - 500 + 1) + 500) * 1000;
        
        setData([
          {
            id: 1,
            sender: "Nhà hàng",
            receiver: "Hệ thống",
            message: "Thanh toán phí duy trì",
            paymentMethod: "Chuyển khoản",
            totalAmount: 300000,
            createdDate: "2024-10-30",
          },
          {
            id: 2,
            sender: "Hệ thống",
            receiver: "Nhà hàng",
            message: "Thanh toán tiền đặt bàn",
            paymentMethod: "Chuyển khoản",
            totalAmount: randomTotalAmount,
            createdDate: "2024-10-30",
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);
  

  return (
    <>
      <div className="flex items-center justify-between pt-4">
        <Heading
          title={`Lịch sử giao dịch giữa nhà hàng và hệ thống`}
          description=""
        />
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          columns={columns}
          data={data}
          searchKey="locationBookingId"
          placeholder="Tìm kiếm giao dịch..."
        />
      </div>
      <DataTablePagination
        currentPage={1}
        totalPages={1}
        pageSize={10}
        setPageNo={() => {}}
        setPageSize={() => {}}
      />
    </>
  );
};
