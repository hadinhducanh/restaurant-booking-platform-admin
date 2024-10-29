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
    header: "Location name",
    cell: ({ row }) => <span>{row.original.locationName}</span>,
  },
  {
    accessorKey: "locationPhoneNumber",
    header: "Phone number",
    cell: ({ row }) => <span>{row.original.locationPhoneNumber}</span>,
  },
  {
    accessorKey: "numberOfBookingsInMonth",
    header: "Number of bookings",
    cell: ({ row }) => <span>{row.original.numberOfBookingsInMonth}</span>,
  },
  {
    accessorKey: "locationRevenueInMonth",
    header: "Location revenue (vnđ)",
    cell: ({ row }) => <span>{PriceFormatter.formatPrice(row.original.locationRevenueInMonth)}</span>,
  },
  {
    accessorKey: "revenueBroughtForSystemInMonth",
    header: "Revenue brought for system (vnđ)",
    cell: ({ row }) => <span>{PriceFormatter.formatPrice(row.original.revenueBroughtForSystemInMonth)}</span>,
  },
];
