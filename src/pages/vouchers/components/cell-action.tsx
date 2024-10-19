// cell-action.tsx

import React, { useState } from "react";
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/modal/alert-modal";
import agent from "@/api/agent";
import { VoucherObj } from "@/models/Voucher";
import EditVoucherDialog from "../voucher-detail/edit-voucher";

interface CellActionProps {
  data: VoucherObj;
  onEditSuccess: () => void; // Define onEditSuccess prop
}

const CellAction: React.FC<CellActionProps> = ({ data, onEditSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { toast } = useToast();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const onConfirmDelete = async () => {
    setLoading(true);
    try {
      await agent.Voucher.deleteVoucher(data.voucherId);
      toast({
        title: "Voucher deleted successfully!",
      });
    } catch (error: any) {
      const errorMessage = error.data?.message || "An error occurred";
      toast({
        title: errorMessage,
        variant: "destructive",
      });
      console.error("Error deleting voucher:", error);
    } finally {
      setLoading(false);
      setOpenDeleteModal(false);
    }
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    <>
      {/* Delete voucher modal */}
      <AlertModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={onConfirmDelete}
        loading={loading}
      />

      {/* Edit voucher dialog */}
      <Dialog open={editDialogOpen}>
        <DialogContent>
          <EditVoucherDialog
            voucher={data}
            onClose={handleCloseEditDialog}
            onEditSuccess={onEditSuccess} // Pass onEditSuccess to EditVoucherDialog
          />
        </DialogContent>
      </Dialog>

      {/* Dropdown menu */}
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
              navigator.clipboard.writeText(data.voucherId.toString())
            }
          >
            <Icons.copy className="mr-2 h-4 w-4" />
            Copy Voucher ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleEditClick}>
            <Icons.edit className="mr-2 h-4 w-4" />
            Edit Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpenDeleteModal(true)}
            className="text-red-600"
          >
            <Icons.delete className="mr-2 h-4 w-4" />
            Delete Voucher
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
