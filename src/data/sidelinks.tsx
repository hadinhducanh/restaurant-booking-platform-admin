import {
  IconBrandBlogger,
  IconLayoutDashboard,
  IconHome
} from "@tabler/icons-react";

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
    href: "/admin/advertisement",
    icon: <IconBrandBlogger size={18} />,
  },
];
