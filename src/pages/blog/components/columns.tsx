/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Icons } from "@/components/ui/icons";
import { CellAction } from "./cell-action";
import { User } from "@/models/User";
import { ProductsObj } from "@/models/Product";

export type BlogColumn = {
  blogId: number;
  title: string;
  content: string;
  image: string;
  user: User;
  product: ProductsObj[];
  createdDate: string;
  lastModifiedDate: string;
};
interface Product {
  productName: string;
}

export const columns: ColumnDef<BlogColumn>[] = [
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
    accessorKey: "blogId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Blog ID
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      const stripHtmlTags = (html: any) => html.replace(/<[^>]*>?/gm, "");
      const truncateText = (text: any, length: any) =>
        text.length > length ? text.substring(0, length) + "..." : text;

      const plainText = stripHtmlTags(row.original.content);
      const truncatedText = truncateText(plainText, 100); // Adjust the length as needed

      return <span>{truncatedText}</span>;
    },
  },

  {
    accessorKey: "image",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Image
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <img
          src={row.original.image}
          alt={row.original.title}
          style={{ width: "50px", height: "auto" }}
        />
      );
    },
  },
  {
    accessorKey: "user.fullName",
    header: "Staff",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      const products = row.original.product;
      return products.map((p) => p.productName).join(", ");
    },
    filterFn: (row, _columnId, filterValue) => {
      const productArray = row.original.product as Product[];

      // Check if any product in the array matches the filter value
      const result = productArray.some((product) =>
        filterValue.includes(product.productName)
      );
      return result;
    },
    // Optionally, specify the accessorFn to extract product names
    accessorFn: (row) => row.product.map((product) => product.productName),
  },
  {
    accessorKey: "createdDate",
    header: "Created Date",
  },
  {
    accessorKey: "lastModifiedDate",
    header: "Last Modified Date",
  },

  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
