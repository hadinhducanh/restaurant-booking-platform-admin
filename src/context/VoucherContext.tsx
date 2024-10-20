import React, { createContext, useContext, useState } from "react";
import { VoucherObj } from "@/models/Voucher";

interface VoucherContextType {
  vouchers: VoucherObj[];
  setVouchers: React.Dispatch<React.SetStateAction<VoucherObj[]>>;
}

const VoucherContext = createContext<VoucherContextType | undefined>(undefined);

export const VoucherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vouchers, setVouchers] = useState<VoucherObj[]>([]);

  return (
    <VoucherContext.Provider value={{ vouchers, setVouchers }}>
      {children}
    </VoucherContext.Provider>
  );
};

export const useVoucherContext = () => {
  const context = useContext(VoucherContext);
  if (!context) {
    throw new Error("useVoucherContext must be used within a VoucherProvider");
  }
  return context;
};
