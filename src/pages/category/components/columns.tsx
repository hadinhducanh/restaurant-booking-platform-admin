/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Icons } from "@/components/ui/icons";
import { CellAction } from "./cell-action";

export type CategoryColumn = {
  categoryId: number;
  categoryName: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
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
    accessorKey: "categoryId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category ID
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "categoryName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category Name
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
