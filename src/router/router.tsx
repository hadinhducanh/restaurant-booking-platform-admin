/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter/*, Navigate */} from "react-router-dom";
import AppShell from "./../components/app-shell";
import Dashboard from "./../pages/dashboard";
import Login from "@/pages/auth/Login";
import { Products } from "@/pages/products/Products";
import { Category } from "@/pages/category/Category";
import { AddCategory } from "@/pages/category/category-detail/add-category-form";
import { Brand } from "@/pages/brand/Brand";
import Vouchers from "@/pages/vouchers/Vouchers";
import AddVoucher from "@/pages/vouchers/voucher-detail/add-voucher-form";
import Orders from "@/pages/order/Orders";
import OrderDetail from "@/pages/order/OrderDetail";
import ChangePassword from "@/pages/auth/ChangePassword";
import Users from "@/pages/User/Users";
import SignupStaff from "@/pages/auth/Sign-up-staff";
import { ProductForm } from "@/pages/products/product-detail/add-product-form";
import { BrandForm } from "@/pages/brand/brand-detail/add-brand-form";
import Reports from "@/pages/reports/Reports";
import { StocksTransaction } from "@/pages/stock-transaction/StockTransaction";
import { StockForm } from "@/pages/stock-transaction/stock-detail/add-stock-form";
import { Location } from "@/pages/location/Location";
import { LocationPaymentHistories } from "@/pages/location-payment-histories/LocationPaymentHistories";
import LocationDetail from "@/pages/location/location-detail/LocationDetail";
import { Advertisement } from "@/pages/advertisement/Advertisement";
import { PaymentHistoriesBetweenLocationAndSystem } from "@/pages/payment-histories-between-location-and-system/PaymentHistoriesBetweenLocationAndSystem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/admin",
    element: <AppShell />, // Bọc toàn bộ admin trong AppShell
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/admin/location",
        element: <Location />,
      },
      {
        path: "/admin/location/:locationId",
        element: <LocationDetail />,
      },
      {
        path: "/admin/milk",
        element: <Products />,
      },
      {
        path: "/admin/create-staff",
        element: <SignupStaff />,
      },
      {
        path: "/admin/newMilk",
        element: <ProductForm />,
      },
      {
        path: "/admin/category",
        element: <Category />,
      },
      {
        path: "/admin/newCategory",
        element: <AddCategory />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/vouchers",
        element: <Vouchers />,
      },
      {
        path: "/admin/orders",
        element: <Orders />,
      },
      {
        path: "/admin/reports",
        element: <Reports />,
      },
      {
        path: "/admin/orders/:orderId",
        element: <OrderDetail />,
      },
      {
        path: "/admin/vouchers/new",
        element: <AddVoucher />,
      },
      {
        path: "/admin/brand",
        element: <Brand />,
      },
      {
        path: "/admin/newBrand",
        element: <BrandForm />,
      },
      {
        path: "/admin/advertisement",
        element: <Advertisement />,
      },
      {
        path: "/admin/newStock",
        element: <StockForm />,
      },
      {
        path: "/admin/stocks",
        element: <StocksTransaction />,
      },
      {
        path: "/admin/location-payment-histories/:locationId",
        element: <LocationPaymentHistories />,
      },
      {
        path: "/admin/payment-histories-between-location-and-system",
        element: <PaymentHistoriesBetweenLocationAndSystem />,
      },
    ],
  },
]);

export default router;
