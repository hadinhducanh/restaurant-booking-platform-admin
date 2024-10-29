import { useEffect, useState } from "react";
import agent from "@/api/agent";
import { LoaderCircle } from "lucide-react";
import { DataTable } from "@/components/DataTable/data-table";
import { DataTablePagination } from "@/components/DataTable/data-table-pagination";
import { columns } from "@/pages/location/components/LocationColumns";
import { LocationRevenueReportResponse } from "@/models/Revenue";

export const RevenueReport = () => {
  const date = new Date();
  const [data, setData] = useState<LocationRevenueReportResponse[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState<string>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [month, setMonth] = useState<number>(date.getMonth() + 1);
  const [year, setYear] = useState<number>(date.getFullYear());

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await agent.AdminDashboard.getLocationRevenueReports(pageNo, pageSize, sortBy, sortDir, month, year);
        setData(result.content);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [pageNo, pageSize, sortBy, sortDir]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle />
      </div>
    );
  }

  return (
    <>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          columns={columns}
          data={data}
          searchKey="Location revenue"
          placeholder="Search here..."
        />
      </div>
      <DataTablePagination
        currentPage={pageNo}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageNo={setPageNo}
        setPageSize={setPageSize}
      />
    </>
  );
};
