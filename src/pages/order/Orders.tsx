import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import agent from "@/api/agent";
import { OrderResponse } from "@/models/Order";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [data, setData] = useState<OrderResponse[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("orderId");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [totalOrders, setTotalOrders] = useState(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [pageNo, pageSize, sortBy, sortDir, startDate, endDate, status]);

  const fetchData = async () => {
    try {
      let result;
      if (startDate && endDate && status) {
        result = await agent.Orders.searchOrderByStatusAndDate(
          pageNo,
          pageSize,
          sortBy,
          sortDir,
          status,
          `${startDate}T00:00:00`,
          `${endDate}T23:59:59`
        );
      } else if (startDate && endDate) {
        result = await agent.Orders.searchOrders(
          pageNo,
          pageSize,
          sortBy,
          sortDir,
          `${startDate}T00:00:00`,
          `${endDate}T23:59:59`
        );
      } else if (status) {
        result = await agent.Orders.searchOrdersByStatus(
          pageNo,
          pageSize,
          sortBy,
          status,
          sortDir
        );
      } else {
        result = await agent.Orders.getOrders(pageNo, pageSize, sortBy, sortDir);
      }
      setData(result.content);
      setTotalOrders(result.totalElements);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNextPage = () => {
    if ((pageNo + 1) * pageSize < totalOrders) {
      setPageNo(pageNo + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNo > 0) {
      setPageNo(pageNo - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setPageNo(pageNumber);
  };

  const handleViewOrder = (orderId: number) => {
    navigate(`/admin/orders/${orderId}`);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
    setPageNo(0); 
  };

  const renderDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return { formattedDate, formattedTime };
  };

  const totalPages = Math.ceil(totalOrders / pageSize);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPage = Math.min(pageNo + 3, totalPages); 
    const startPage = Math.max(0, maxPage - 3); 
    if (startPage > 0) {
      pageNumbers.push(
        <button
          key={0}
          onClick={() => handlePageClick(0)}
          className={`px-4 py-2 border bg-gray-300 text-gray-700 rounded`}
        >
          1
        </button>
      );
      if (startPage > 1) {
        pageNumbers.push(<span key="startEllipsis" className="px-4 py-2">...</span>);
      }
    }

    for (let i = startPage; i < maxPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-4 py-2 border ${pageNo === i ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-700'} rounded`}
        >
          {i + 1}
        </button>
      );
    }

    if (maxPage < totalPages) {
      if (maxPage < totalPages - 1) {
        pageNumbers.push(<span key="endEllipsis" className="px-4 py-2">...</span>);
      }
      pageNumbers.push(
        <button
          key={totalPages - 1}
          onClick={() => handlePageClick(totalPages - 1)}
          className={`px-4 py-2 border bg-gray-300 text-gray-700 rounded`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  const handleSortChange = (field: string) => {
    if (field === sortBy) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
    setPageNo(0);
  };

  const handleCompleteOrder = async (orderId: number) => {
    try {
      await agent.Orders.updateOrder(orderId);
      fetchData(); 
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between pt-4">
        <Heading title={`Orders (${totalOrders})`} description="Manage Orders" />
      </div>
      <Separator />
      <div className="px-4 py-1">
        <div className="flex justify-between mb-4 items-center">
          <div className="flex space-x-4 mb-4 items-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-500">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-gray-300 text-gray-700 rounded"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-500">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border-gray-300 text-gray-700 rounded"
              />
            </div>
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
                fetchData();
              }}
              className="px-4 py-2 border bg-gray-300 text-gray-700 rounded"
            >
              Reset
            </button>
          </div>
          <div className="flex space-x-2 items-center">
            <span className="text-sm text-gray-500">Filter by Status:</span>
            <select
              value={status}
              onChange={handleStatusChange}
              className="border-gray-300 text-gray-700 rounded"
            >
              <option value="">All</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="PRE_ORDER">Pre-Order</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
            </select>
            <span className="text-sm text-gray-500">Sort by:</span>
            <button
              onClick={() => handleSortChange("orderId")}
              className={`px-2 py-1 border ${sortBy === "orderId" ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-700'} rounded`}
            >
              Order ID {sortBy === "orderId" && (sortDir === "asc" ? "▲" : "▼")}
            </button>
            <button
              onClick={() => handleSortChange("orderDate")}
              className={`px-2 py-1 border ${sortBy === "orderDate" ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-700'} rounded`}
            >
              Date {sortBy === "orderDate" && (sortDir === "asc" ? "▲" : "▼")}
            </button>
            <div>
              <select
                value={pageSize}
                onChange={handlePageSizeChange}
                className="border-gray-300 text-gray-700 rounded"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">After Total Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((order) => (
              <tr key={order.orderDto.orderId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderDto.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderDate(order.orderDto.orderDate).formattedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{renderDate(order.orderDto.orderDate).formattedTime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderDto.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderDto.afterTotalAmount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderDto.feedBack ? "Yes" : "No"}</td>
                <td>
                  {order.orderDto.status === "CONFIRMED" && (
                    <button
                      className="px-4 py-2 border bg-gray-300 text-gray-700 rounded mr-2"
                      onClick={() => handleCompleteOrder(order.orderDto.orderId)}
                    >
                      Complete
                    </button>
                  )}
                  <button
                    className="px-4 py-2 border bg-gray-300 text-gray-700 rounded"
                    onClick={() => handleViewOrder(order.orderDto.orderId)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4 items-center">
          <div className="flex space-x-2">
            <button
              onClick={handlePreviousPage}
              disabled={pageNo === 0}
              className={`px-4 py-2 border ${pageNo === 0 ? 'bg-gray-300 text-gray-700 rounded disabled:opacity-50' : 'bg-gray-300 text-gray-700 rounded'}`}
            >
              Previous
            </button>
            {renderPageNumbers()}
            <button
              onClick={handleNextPage}
              disabled={(pageNo + 1) * pageSize >= totalOrders}
              className={`px-4 py-2 border ${((pageNo + 1) * pageSize >= totalOrders) ? 'bg-gray-300 text-gray-700 rounded disabled:opacity-50' : 'bg-gray-300 text-gray-700 rounded'}`}
            >
              Next
            </button>
          </div>
          <div className="flex items-center">
            <div className="ml-4">
              Page {pageNo + 1} of {totalPages}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
