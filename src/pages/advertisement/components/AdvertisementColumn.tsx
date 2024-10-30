/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { PriceFormatter } from "@/utils/PriceFormatter";
import { AdvertisementResponse } from "@/models/Advertisement";

export const columns: ColumnDef<AdvertisementResponse>[] = [
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
    accessorKey: "name",
    header: "Tên gói quảng cáo",
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => <span>{row.original.description}</span>,
  },
  {
    accessorKey: "type",
    header: "Loại quảng cáo",
    cell: ({ row }) => <span>{row.original.type}</span>,
  },
  {
    accessorKey: "level",
    header: "Cấp độ quảng cáo",
    cell: ({ row }) => <span>{row.original.level}</span>,
  },
  {
    accessorKey: "duration",
    header: "Thời lượng (phút)",
    cell: ({ row }) => <span>{row.original.duration}</span>,
  },
  {
    accessorKey: "price",
    header: "Giá gói (vnđ)",
    cell: ({ row }) => <span>{PriceFormatter.formatPrice(row.original.price)}</span>,
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status.toLowerCase();
      const color = status === "active" ? "green" : "red";
      return (
        <span style={{ color: color, fontWeight: "bold" }}>
          {row.original.status}
        </span>
      );
    },
  },
];
