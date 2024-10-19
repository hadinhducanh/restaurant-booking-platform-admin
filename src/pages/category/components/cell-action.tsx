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
import EditDialog from "../category-detail/edit-category-dialog";
import { CategoryColumn } from "./columns";
import { categorySchema } from "@/schema/categorySchema";
import agent from "@/api/agent";
import { useToast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/modal/alert-modal";

interface CellActionProps {
  data: CategoryColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null
  );
  const { toast } = useToast();
  const category = categorySchema.parse(data);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await agent.Category.delete(data.categoryId);
      toast({
        title: "Delete Category successfully!",
      });
      // window.location.reload();
    } catch (error: any) {
      const errorMessage = error.data?.message || "An error occurred";
      toast({
        variant: "destructive",
        title: errorMessage,
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const handleEditClick = () => {
    setDialogContent(<EditDialog category={category} />);
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
                navigator.clipboard.writeText(data.categoryId.toString())
              }
            >
              <Icons.copy className="mr-2 h-4 w-4" />
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DialogTrigger asChild onClick={handleViewClick}>
      <DropdownMenuItem>
        {" "}
        <Icons.view className="mr-2 h-4 w-4" />
        View Details
      </DropdownMenuItem>
    </DialogTrigger> */}
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
              Delete Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      </Dialog>
    </>
  );
};
