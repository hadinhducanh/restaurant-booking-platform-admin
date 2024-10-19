/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/ui/icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProductType } from "@/schema/productSchema";
import { useToast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/modal/alert-modal";
import agent from "@/api/agent";
import { useNavigate } from "react-router-dom";

interface CellActionProps {
  data: ProductType;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogContent] = useState<React.ReactNode | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  // const dataToValidate = {
  //   ...data,
  //   status:
  //     typeof data.status === "string" ? parseInt(data.status) : data.status,
  // };
  // const product = productSchema.parse(dataToValidate);

  const onConfirm = async () => {
    setLoading(true);
    try {
      await agent.Products.delete(data.productId);
      toast({
        title: "Product deleted successfully!",
      });
    } catch (error: any) {
      const errorMessage = error.data?.message || "An error occurred";
      toast({
        title: errorMessage,
        variant: "destructive",
      });
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleEditClick = () => {
    navigate("/admin/newMilk", { state: data });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(data.productId.toString())
              }
            >
              <Icons.copy className="mr-2 h-4 w-4" />
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DialogTrigger asChild onClick={handleEditClick}>
              <DropdownMenuItem>
                <Icons.edit className="mr-2 h-4 w-4" />
                Edit Details
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem
              onClick={() => setOpen(true)}
              className="text-red-600"
            >
              <Icons.delete className="mr-2 h-4 w-4" />
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      </Dialog>
    </>
  );
};
