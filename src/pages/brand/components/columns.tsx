/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Icons } from "@/components/ui/icons";
import { CellAction } from "./cell-action";
import { ProductsObj } from "@/models/Product";

export type BrandColumn = {
  brandId: number;
  brandName: string;
  image: string;
  products: ProductsObj;
};

export const columns: ColumnDef<BrandColumn>[] = [
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
    accessorKey: "brandId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Brand ID
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "brandName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Brand Name
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img
            src={row.original.image}
            alt={row.original.brandName}
            style={{ width: "50px", height: "auto" }}
          />
        </div>
      );
    },
  },
  // {
  //   accessorKey: "products.productName",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Product Name
  //         <Icons.sort className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },

  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
