import { useEffect, useState } from "react";
import agent from "@/api/agent";
import { LoaderCircle } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/DataTable/data-table";
import { DataTablePagination } from "@/components/DataTable/data-table-pagination";
import { AdvertisementResponse } from "@/models/Advertisement";
import { columns } from "./components/AdvertisementColumn";

export const Advertisement = () => {
    const [data, setData] = useState<AdvertisementResponse[]>([]);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortBy] = useState("id");
    const [sortDir] = useState<"asc" | "desc">("asc");
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const getData = async () => {
        try {
          const result = await agent.Advertisement.getAllAds(pageNo, pageSize, sortBy, sortDir);
          setData(result.content);
          setTotalPages(result.totalPages);
          console.log(result);
          
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
     <div className="flex items-center justify-between">
        <Heading
          title={`Quản lí gói quảng cáo`}
          description=""
        />
{/* 
        <Button onClick={() => navigate("/admin/newBrand", { state: null })}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button> */}
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          columns={columns}
          data={data}
          searchKey="Location"
          placeholder="Tìm kiếm gói quảng cáo tại đây..."
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
  )
}