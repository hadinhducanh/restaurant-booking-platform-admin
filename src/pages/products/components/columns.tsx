/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Icons } from "@/components/ui/icons";
import { Milkstatuses } from "@/components/DataTable/filters";
import { CellAction } from "./cell-action";

export type ProductColumn = {
  productId: number;
  productName: string;
  description: string;
  price: number;
  status: string;
  image: string[];
  quantityProduct: number;
  category: {
    categoryId: number;
    categoryName: string;
  };
  brand: {
    brandId: number;
    brandName: string;
    image: string;
  };
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "image",
    header: "Images",
    cell: ({ row }) => {
      const images = Array.isArray(row.original.image)
        ? row.original.image
        : [];

      return (
        <div className="flex flex-wrap gap-2">
          {images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Product Image ${index}`}
              className="w-10 h-10 object-cover"
            />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "productId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product ID
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = Milkstatuses.find(
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
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "quantityProduct",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <span>{row.original.price.toLocaleString()}VND</span>,
  },
  {
    accessorKey: "category.categoryName",
    header: "Category",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "brand.brandName",
    header: "Brand",
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
