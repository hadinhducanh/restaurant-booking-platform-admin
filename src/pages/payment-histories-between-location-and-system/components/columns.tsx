/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaymentHistoriesBetweenLocationAndSystemResponse } from "@/models/LocationPaymentHistories";
import { PriceFormatter } from "@/utils/PriceFormatter";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<PaymentHistoriesBetweenLocationAndSystemResponse>[] = [
  {
    accessorKey: "id",
    header: "Mã giao dịch",
    cell: ({ row }) => <span>{row.original.id}</span>,
  },
  {
    accessorKey: "sender",
    header: "Người gửi",
    cell: ({ row }) => <span>{row.original.sender}</span>,
  },
  {
    accessorKey: "receiver",
    header: "Người nhận",
    cell: ({ row }) => <span>{row.original.receiver}</span>,
  },
  {
    accessorKey: "message",
    header: "Nội dung giao dịch",
    cell: ({ row }) => <span>{row.original.message}</span>,
  },
  {
    accessorKey: "paymentMethod",
    header: "Phương thức thanh toán",
    cell: ({ row }) => <span>{row.original.paymentMethod}</span>,
  },
  {
    accessorKey: "totalAmount",
    header: "Số tiền giao dịch (vnđ)",
    cell: ({ row }) => <span>{PriceFormatter.formatPrice(row.original.totalAmount)}</span>,
  },
  {
    accessorKey: "createdDate",
    header: "Ngày tạo giao dịch",
    cell: ({ row }) => <span>{row.original.createdDate}</span>,
  },
];
