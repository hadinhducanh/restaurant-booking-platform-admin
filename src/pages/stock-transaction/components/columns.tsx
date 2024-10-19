/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Icons } from "@/components/ui/icons";
import { StockTransaction } from "@/models/StockTransaction";
import { CellAction } from "./cell-action";
const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
};

export const columns: ColumnDef<StockTransaction>[] = [
  {
    accessorKey: "stockTransactionId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock Transaction ID
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "stockTransactionDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Import Date
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return formatDate(row.original.stockTransactionDate);
    },
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => (
      <span>{row.original.totalPrice.toLocaleString()}VND</span>
    ),
  },
  {
    accessorKey: "supplier.supplierName",
    header: "Supplier",
  },
  {
    accessorKey: "product.productName",
    header: "Product",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
