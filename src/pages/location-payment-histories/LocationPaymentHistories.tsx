/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { LoaderCircle } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { useParams } from "react-router-dom";
import { DataTable } from "@/components/DataTable/data-table";
import agent from "@/api/agent";
import { LocationPaymentHistoriesObj } from "@/models/LocationPaymentHistories";
import { DataTablePagination } from "@/components/DataTable/data-table-pagination";
import { columns } from "./components/columns";

export const LocationPaymentHistories = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const [data, setData] = useState<LocationPaymentHistoriesObj[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy] = useState("id");
  const [sortDir] = useState<"asc" | "desc">("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  // const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await agent.LocationPaymentHistories.list(Number(locationId), pageNo, pageSize, sortBy, sortDir);
        setData(result.content); // Assuming the data is in the `data` field of the response
        setTotalPages(result.totalPages);
      } catch (error) {
        // console.error("Error fetching data:", error);
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
      <div className="flex items-center justify-between pt-4">
        <Heading
          title={`Lịch sử giao dịch với khách hàng (${Object.keys(data).length})`}
          description=""
        />

        {/* <Button onClick={() => navigate("/admin/newBrand", { state: null })}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button> */}
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
        currentPage={pageNo}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageNo={setPageNo}
        setPageSize={setPageSize}
      />
    </>
  );
};
