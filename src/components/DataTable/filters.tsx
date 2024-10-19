import { Icons } from "../ui/icons";

export const Milkstatuses = [
  { value: "ACTIVE", label: "Active", icon: Icons.check },
  { value: "INACTIVE", label: "Inactive", icon: Icons.cancel },
  { value: "PRE_ORDER", label: "PreOrder", icon: Icons.pending },
  {
    value: "NEAR_OUT_OF_STOCKS",
    label: "Near Out Of Stock",
    icon: Icons.outStock,
  },
];

export const VoucherStatuses = [
  { value: "ACTIVE", label: "Active", icon: Icons.checked },
  { value: "INACTIVE", label: "Inactive", icon: Icons.cancel },
  { value: "EXPIRE", label: "Expire", icon: Icons.x },
];
