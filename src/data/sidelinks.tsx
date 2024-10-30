import {
  IconBrandBlogger,
  // IconCategory,
  IconLayoutDashboard,
  // IconMilk,
  IconUsers,
  // IconTicket,
  // IconMenuOrder,
  IconReport,
  IconHome
} from "@tabler/icons-react";
// import { Milk, StoreIcon } from "lucide-react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Thống kê",
    label: "",
    href: "/admin",
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: "Nhà hàng liên kết",
    href: "/admin/location",
    icon: <IconHome size={18} />,
  },
  {
    title: "Gói quảng cáo",
    label: "",
    href: "/admin/blog",
    icon: <IconBrandBlogger size={18} />,
  },
];
