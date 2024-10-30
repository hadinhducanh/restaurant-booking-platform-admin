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
import { Dialog, DialogContent } from "@/components/ui/dialog";
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

  const handleViewDetailsClick = () => {
    navigate(`/admin/location/${data.id}`);
  };

  const handleViewPaymentHistoriesClick = () => {
    navigate(`/admin/location-payment-histories/${data.id}`);
  };

  const handleViewPaymentBetweenLocationAndSystem = () => {
    navigate(`/admin/payment-histories-between-location-and-system`);
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
            <DropdownMenuItem onClick={handleViewDetailsClick}>
              <Icons.info className="mr-2 h-4 w-4" />
              Xem thông tin chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewPaymentHistoriesClick}>
              <Icons.speedNext className="mr-2 h-4 w-4" />
              Lịch sử giao dịch với khách hàng
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewPaymentBetweenLocationAndSystem}>
              <Icons.check className="mr-2 h-4 w-4" />
              Lịch sử giao dịch giữa nhà hàng và hệ thống
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem
              onClick={() => setOpen(true)}
              className="text-red-600"
            >
              <Icons.delete className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      </Dialog>
    </>
  );
};
