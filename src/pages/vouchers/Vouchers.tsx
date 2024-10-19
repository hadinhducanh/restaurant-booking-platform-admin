// vouchers.tsx

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Plus } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/DataTable/data-table";
import agent from "@/api/agent";
import { VoucherObj } from "@/models/Voucher";
import { columns } from "./components/columns";
import { DataTablePagination } from "@/components/DataTable/data-table-pagination";

const Vouchers = () => {
  const [data, setData] = useState<VoucherObj[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy] = useState("voucherId");
  const [sortDir] = useState<"asc" | "desc">("asc");
  const [shouldRefresh] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [pageNo, pageSize, sortBy, sortDir, shouldRefresh]);

  const fetchData = async () => {
    try {
      const result = await agent.Voucher.manageVouchers(pageNo, pageSize);
      setData(result.content);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
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
          title={`Vouchers (${data.length})`}
          description="Manage Vouchers"
        />
        <Button onClick={() => navigate("/admin/vouchers/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          dataType="vouchers"
          columns={columns}
          data={data}
          searchKey="voucherName"
          placeholder="Search by Voucher Name..."
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

export default Vouchers;
