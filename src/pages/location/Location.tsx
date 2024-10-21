import { LocationResponseLazy } from "@/models/Location";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import agent from "@/api/agent";
import { LoaderCircle, Plus } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/DataTable/data-table";
import { DataTablePagination } from "@/components/DataTable/data-table-pagination";
import { columns } from "./components/LocationColumns";

export const Location = () => {
    const [data, setData] = useState<LocationResponseLazy[]>([]);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortBy] = useState("id");
    const [sortDir] = useState<"asc" | "desc">("asc");
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const getData = async () => {
        try {
          const result = await agent.Location.list(pageNo, pageSize);
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
     <div className="flex items-center justify-between">
        <Heading
          title={`Location (${Object.keys(data).length})`}
          description="Manage locations in system"
        />

        <Button onClick={() => navigate("/admin/newBrand", { state: null })}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          columns={columns}
          data={data}
          searchKey="Location"
          placeholder="Search here.."
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