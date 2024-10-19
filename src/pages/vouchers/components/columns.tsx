// src/vouchers/components/columns.tsx

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { Icons } from "@/components/ui/icons";

import { VoucherObj } from "@/models/Voucher";
import CellAction from "./cell-action";
import { VoucherStatuses } from "@/components/DataTable/filters";

export const columns: ColumnDef<VoucherObj>[] = [
  {
    accessorKey: "voucherCode",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Voucher Code
        <Icons.sort className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "voucherName",
    header: "Voucher Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
  {
    accessorKey: "minOrderAmount",
    header: "Min Order Amount",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  // },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = VoucherStatuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => (
      <CellAction
        data={row.original}
        onEditSuccess={() => {
          // console.log("Edit success for voucher:", row.original);
        }}
      />
    ),
  },
];
