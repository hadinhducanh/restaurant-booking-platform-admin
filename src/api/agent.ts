/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const sleep = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const responseBody = (response: AxiosResponse) => response.data;

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const handleError = (error: any) => {
  const { data, status } = error.response;
  switch (status) {
    case 400:
      if (data.errors) {
        const modelStateError: string[] = [];
        for (const key in data.errors) {
          if (data.errors[key]) {
            modelStateError.push(data.errors[key]);
          }
        }
        throw modelStateError.flat();
      }
      toast.error(data.title);
      break;
    case 401:
    case 404:
    case 500:
      toast.error(data.title);
      break;
    default:
      toast.error("Something unexpected went wrong");
      break;
  }
  return Promise.reject(error.response);
};

axiosInstance.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  handleError
);

const requests = {
  get: (url: string) => axiosInstance.get(url).then(responseBody),
  post: (url: string, body: {}) => axiosInstance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axiosInstance.put(url, body).then(responseBody),
  delete: (url: string) => axiosInstance.delete(url).then(responseBody),
};

const createListEndpoint = (
  endpoint: string,
  defaultSortBy: string,
  defaultSortDir: string = "asc",
  extraParams?: (params: Record<string, any>) => string
) => {
  return (pageNo: number, pageSize: number, searchNearBy?: boolean) => {
    let query = `?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${defaultSortBy}&sortDir=${defaultSortDir}`;

    if (extraParams) {
      query += extraParams({ searchNearBy });
    }

    return requests.get(`${endpoint}${query}`);
  };
};

const AdminDashboard = {
  getTotalRevenueOfSystem: (month: number, year: number) => requests.get(`payment-histories/get-total-revenue-of-system?month=${month}&year=${year}`),
  getNumberOfBookings: (bookingStatus: string, month: number, year: number) => requests.get(`location-bookings/count-all-bookings?bookingStatus=${bookingStatus}&month=${month}&year=${year}`),
  getActiveUsers: () => requests.get(`users/count-active-users`),
  getActiveLocations: () => requests.get(`locations/count-active-locations`),
  getTotalRevenueOfSystemForYear: (year: number) => requests.get(`payment-histories/get-revenue-of-each-month?year=${year}`),
  getRecentPaymentHistories: (status: string, top: number) => requests.get(`payment-histories/get-recent-payment-histories?status=${status}&top=${top}`),
};

const Location = {
  list: createListEndpoint("locations/search", "id", "asc", () => "&searchNearBy=false"),
  update: (location: any) => requests.put("locations", location),
  add: (location: any) => requests.post("locations", location),
  delete: (locationId: number) => requests.delete(`location/${locationId}`),
  getById: (locationId: number) => requests.get(`locations/${locationId}`),
};


const Products = {
  list: createListEndpoint("product", "productId"),
  addMilk: (product: any) => requests.post("product", product),
  updateMilk: (product: any) => requests.put("product/update", product),
  delete: (productId: number) => requests.delete(`product/delete/${productId}`),
};

const Brand = {
  list: createListEndpoint("brand", "brandId"),
  updateBrand: (brand: any) => requests.put("brand/update", brand),
  addBrand: (brand: any) => requests.post("brand", brand),
  delete: (brandId: number) => requests.delete(`brand/delete/${brandId}`),
};

const Category = {
  list: createListEndpoint("categories", "categoryId"),
  updateCategory: (category: any) => requests.put("categories", category),
  addCategory: (category: any) => requests.post("categories", category),
  delete: (categoryId: number) => requests.delete(`categories/${categoryId}`),
};

const Blog = {
  list: createListEndpoint("blogs", "blogId"),
  updateBlog: (blog: any) => requests.put("blogs", blog),
  addBlog: (blog: any) => requests.post("blogs", blog),
  delete: (blogId: number) => requests.delete(`blogs/${blogId}`),
};

const Voucher = {
  list: createListEndpoint("vouchers", "voucherId"),
  manageVouchers: (pageNo: number, pageSize: number, sortBy: string = "voucherId", sortDir: string = "asc") => {
    return requests.get(`vouchers/manage?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
  },
  getMemberVouchers: (userId: number) => requests.get(`vouchers/member?userId=${userId}`),
  addVoucherForMember: (userId: number, voucherId: number) => requests.post(`vouchers/member?userId=${userId}&voucherId=${voucherId}`, {}),
  addVoucher: (voucher: any) => requests.post("vouchers", voucher),
  updateVoucher: (voucher: any) => requests.put("vouchers", voucher),
  deleteVoucher: (voucherId: number) => requests.delete(`vouchers/${voucherId}`),
};

const Address = {
  listByUserId: (userId: number, pageNo: number, pageSize: number) => {
    return requests.get(`address/user?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=addressId&sortDir=asc&userId=${userId}`);
  },
  updateDefaultAddress: (userId: number, addressOldId: number, addressNewId: number) => {
    return requests.put(`address/default?userId=${userId}&addressOldId=${addressOldId}&addressNewId=${addressNewId}`, {});
  },
  updateAddress: (updatedAddress: any) => {
    return requests.put(`address`, updatedAddress);
  },
  addNewAddress: (newAddress: any) => requests.post(`address`, newAddress),
};

const Orders = {
  getOrders: (pageNo: number, pageSize: number, sortBy: string = "orderId", sortDir: string = "asc") => {
    return requests.get(`orders?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
  },
  getOrderById: async (orderId: number) => requests.get(`orders/order/${orderId}`),
  searchOrders: (pageNo: number, pageSize: number, sortBy: string = "orderId", sortDir: string = "asc", orderDateFrom: string, orderDateTo: string) => {
    return requests.get(`orders/search?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}&orderDateFrom=${orderDateFrom}&orderDateTo=${orderDateTo}`);
  },
  searchOrdersByStatus: (pageNo: number, pageSize: number, sortBy: string = "orderId", status: string, sortDir: string = "asc") => {
    return requests.get(`orders/search?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&status=${status}&sortDir=${sortDir}`);
  },
  searchOrderByStatusAndDate: (pageNo: number, pageSize: number, sortBy: string = "orderId", sortDir: string = "asc", status: string, orderDateFrom: string, orderDateTo: string) =>
    requests.get(`orders/search?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}&status=${status}&orderDateFrom=${orderDateFrom}&orderDateTo=${orderDateTo}`),
  updateOrder: (orderId: number) => requests.put(`orders?orderId=${orderId}`, {}),
};

const Users = {
  list: (pageNo: number, pageSize: number, sortBy: string = "userId", sortDir: string = "asc") => {
    return requests.get(`users?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
  },
};
const Reports = {
  list: createListEndpoint("reports", "reportId"),
  getReports: (pageNo: number, pageSize: number, sortBy: string = "reportId", sortDir: string = "asc") => {
    return requests.get(`reports?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
  },
};
const StockTransaction = {
  list: createListEndpoint("stock_transactions", "stockTransactionId"),
  importProduct: (newProduct: any) => requests.post(`stock_transactions`, newProduct)
}
const Supplier = {
  list: createListEndpoint("suppliers", "supplierId"),
}
const LocationPaymentHistories = {
  list: (locationId: number, pageNo: number, pageSize: number, sortBy: string = "id", sortDir: string = "asc") => {
    return requests.get(`payment-histories/locations/${locationId}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
  },
}

const agent = {
  Products,
  Brand,
  Category,
  Address,
  Voucher,
  Blog,
  Orders,
  Users,
  Reports,
  StockTransaction,
  Supplier,
  Location,
  LocationPaymentHistories,
  AdminDashboard
};

export default agent;
