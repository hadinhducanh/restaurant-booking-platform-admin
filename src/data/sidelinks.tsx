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
    title: "Người dùng",
    label: "",
    href: "/admin/users",
    icon: <IconUsers size={18} />,
  },
  {
    title: "Nhà hàng liên kết",
    href: "/admin/location",
    icon: <IconHome size={18} />,
  },
  {
    title: "Bài viết",
    label: "",
    href: "/admin/blog",
    icon: <IconBrandBlogger size={18} />,
  },
  {
    title: "Báo cáo",
    label: "",
    href: "/admin/reports",
    icon: <IconReport size={18} />,
  },
];
