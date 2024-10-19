/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StockTransaction } from "@/models/StockTransaction";

type ViewProps = {
  stockTransaction: StockTransaction;
};

const ViewDialog = ({ stockTransaction }: ViewProps) => {
  // const entries = Object.entries(stockTransaction);
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

  return (
    <DialogHeader>
      <DialogTitle>View Stock Transaction Details</DialogTitle>
      <DialogDescription className="py-4">
        <Table className="border-2">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Stock Transaction ID</TableCell>
              <TableCell>{stockTransaction.stockTransactionId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Import Date</TableCell>
              <TableCell>
                {formatDate(stockTransaction.stockTransactionDate)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Quantity</TableCell>
              <TableCell>{stockTransaction.quantity}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Price</TableCell>
              <TableCell>{stockTransaction.totalPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Supplier</TableCell>
              <TableCell>{stockTransaction.supplier.supplierName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>{stockTransaction.product.productName}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogDescription>
    </DialogHeader>
  );
};

export default ViewDialog;
