/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import agent from "@/api/agent";
import { useToast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/modal/alert-modal";
import { LocationResponseLazy } from "@/models/Location";

interface CellActionProps {
  data: LocationResponseLazy;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogContent] = useState<React.ReactNode | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const onConfirm = async () => {
    try {
      setLoading(true);
      await agent.Location.delete(data.id);
      toast({
        title: "Delete location successfully!",
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast({
        title: `${errorMessage}`,
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleEditClick = () => {
    navigate("/admin/newlocation", { state: data });
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
              onClick={() => navigator.clipboard.writeText(data.id.toString())}
            >
              <Icons.copy className="mr-2 h-4 w-4" />
              Copy Location ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DialogTrigger asChild onClick={handleEditClick}>
              <DropdownMenuItem>
                <Icons.edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem
              onClick={() => setOpen(true)}
              className="text-red-600"
            >
              <Icons.delete className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      </Dialog>
    </>
  );
};
