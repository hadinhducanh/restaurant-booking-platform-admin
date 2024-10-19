/* eslint-disable @typescript-eslint/no-explicit-any */

import { StockTransaction } from "@/models/StockTransaction";
import ViewDialog from "./view-dialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CellActionProps {
  data: StockTransaction;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(
    null
  );
  const handleViewClick = () => {
    setDialogContent(<ViewDialog stockTransaction={data} />);
  };

  return (
    <>
      {/* <Button onClick={handleViewClick}>View Detail</Button> */}
      <Dialog>
        <DialogTrigger onClick={handleViewClick}>
          {" "}
          <Button variant={"outline"} className="p-2">
            View Details
          </Button>
        </DialogTrigger>
        {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      </Dialog>
    </>
  );
};
