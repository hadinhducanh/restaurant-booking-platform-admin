/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/ui/icons";
import { CellAction } from "./CellAction";
import { LocationResponseLazy } from "@/models/Location";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export const columns: ColumnDef<LocationResponseLazy>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    header: "Tên nhà hàng",
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "categoryName",
    header: "Loại nhà hàng",
    cell: ({ row }) => <span>{row.original.categoryName.join(", ")}</span>,
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
    cell: ({ row }) => <span>{row.original.address}</span>,
  },
  {
    accessorKey: "phone",
    header: "Số điện thoại",
    cell: ({ row }) => <span>{row.original.phone}</span>,
  },
  // {
  //   accessorKey: "onSuggest",
  //   header: "On Suggest",
  //   cell: ({ row }) => (
  //     <span>{row.original.onSuggest === 1 ? "true" : "false"}</span>
  //   ),
  // },
  // {
  //   accessorKey: "onSale",
  //   header: "On Sale",
  //   cell: ({ row }) => (
  //     <span>{row.original.onSale === 1 ? "true" : "false"}</span>
  //   ),
  // },
  // {
  //   accessorKey: "onBanner",
  //   header: "On Banner",
  //   cell: ({ row }) => (
  //     <span>{row.original.onBanner === 1 ? "true" : "false"}</span>
  //   ),
  // },
  {
    accessorKey: "view",
    header: "Số lượt xem",
    cell: ({ row }) => <span>{row.original.view}</span>,
  },
  {
    accessorKey: "rating",
    header: "Đánh giá",
    cell: ({ row }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {[...Array(Math.floor(row.original.rating))].map((_, index) => (
          <FaStar key={index} color="yellow" />
        ))}
        {row.original.rating % 1 !== 0 && <FaStarHalfAlt color="yellow" />}
      </div>
    ),
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
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];