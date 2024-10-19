/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { columns } from "./components/columns";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Plus } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/DataTable/data-table";
import agent from "@/api/agent";
import { DataTablePagination } from "@/components/DataTable/data-table-pagination";
import { StockTransaction } from "@/models/StockTransaction";

export const StocksTransaction = () => {
  const [data, setData] = useState<StockTransaction[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy] = useState("productId");
  const [sortDir] = useState<"asc" | "desc">("asc");
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await agent.StockTransaction.list(pageNo, pageSize);

        setTotalPages(result.totalPages);
        setData(result.content);
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
          title={`Stock Transaction (${data.length})`}
          description="Manage Stock Transaction in the shop"
        />

        <Button onClick={() => navigate("/admin/newStock", { state: null })}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          columns={columns}
          data={data}
          searchKey="product_productName"
          placeholder="Search Product Name..."
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
