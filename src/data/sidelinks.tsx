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
    // label: "3",
    href: "/admin/milk",
    icon: <IconHome size={18} />,
  },
  // {
  //   title: "Category",
  //   href: "/admin/category",
  //   icon: <IconCategory size={18} />,
  // },
  // {
  //   title: "Brand",
  //   label: "",
  //   href: "/admin/brand",
  //   icon: <IconMilk size={18} />,
  // },
  // {
  //   title: "Vouchers",
  //   label: "",
  //   href: "/admin/vouchers",
  //   icon: <IconTicket size={18} />,
  // },
  // {
  //   title: "Orders",
  //   label: "",
  //   href: "/admin/orders",
  //   icon: <IconMenuOrder size={18} />,
  // },
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
  // {
  //   title: "Stock Transactions",
  //   label: "",
  //   href: "/admin/stocks",
  //   icon: <StoreIcon size={18} />,
  // },
  // {
  //   title: "Authentication",
  //   label: "",
  //   href: "",
  //   icon: <IconUserShield size={18} />,
  //   sub: [
  //     {
  //       title: "Sign In (Box)",
  //       label: "",
  //       href: "/login",
  //       icon: <IconHexagonNumber2 size={18} />,
  //     },
  //     {
  //       title: "Sign Up",
  //       label: "",
  //       href: "/sign-up",
  //       icon: <IconHexagonNumber3 size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: "Users",
  //   label: "",
  //   href: "/users",
  //   icon: <IconUsers size={18} />,
  // },
  // {
  //   title: "Requests",
  //   label: "10",
  //   href: "/requests",
  //   icon: <IconRouteAltLeft size={18} />,
  //   sub: [
  //     {
  //       title: "Trucks",
  //       label: "9",
  //       href: "/trucks",
  //       icon: <IconTruck size={18} />,
  //     },
  //     {
  //       title: "Cargos",
  //       label: "",
  //       href: "/cargos",
  //       icon: <IconBoxSeam size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: "Analysis",
  //   label: "",
  //   href: "/analysis",
  //   icon: <IconChartHistogram size={18} />,
  // },
  // {
  //   title: "Extra Components",
  //   label: "",
  //   href: "/extra-components",
  //   icon: <IconComponents size={18} />,
  // },
  // {
  //   title: "Error Pages",
  //   label: "",
  //   href: "",
  //   icon: <IconExclamationCircle size={18} />,
  //   sub: [
  //     {
  //       title: "Not Found",
  //       label: "",
  //       href: "/404",
  //       icon: <IconError404 size={18} />,
  //     },
  //     {
  //       title: "Internal Server Error",
  //       label: "",
  //       href: "/500",
  //       icon: <IconServerOff size={18} />,
  //     },
  //     {
  //       title: "Maintenance Error",
  //       label: "",
  //       href: "/503",
  //       icon: <IconBarrierBlock size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: "Settings",
  //   label: "",
  //   href: "/settings",
  //   icon: <IconSettings size={18} />,
  // },
];
