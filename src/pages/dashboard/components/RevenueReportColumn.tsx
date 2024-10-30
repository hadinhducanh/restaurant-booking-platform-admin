/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { LocationRevenueReportResponse } from "@/models/Revenue";
import { PriceFormatter } from "@/utils/PriceFormatter";

export const columns: ColumnDef<LocationRevenueReportResponse>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "locationName",
    header: "Tên nhà hàng",
    cell: ({ row }) => <span>{row.original.locationName}</span>,
  },
  {
    accessorKey: "locationPhoneNumber",
    header: "Số điện thoại",
    cell: ({ row }) => <span>{row.original.locationPhoneNumber}</span>,
  },
  {
    accessorKey: "numberOfBookingsInMonth",
    header: "Số lượng đơn",
    cell: ({ row }) => <span>{row.original.numberOfBookingsInMonth}</span>,
  },
  {
    accessorKey: "locationRevenueInMonth",
    header: "Doanh thu nhà hàng (vnđ)",
    cell: ({ row }) => <span>{PriceFormatter.formatPrice(row.original.locationRevenueInMonth)}</span>,
  },
  {
    accessorKey: "revenueBroughtForSystemInMonth",
    header: "Doanh thu đem lại cho hệ thống (vnđ)",
    cell: ({ row }) => <span>{PriceFormatter.formatPrice(row.original.revenueBroughtForSystemInMonth)}</span>,
  },
];
