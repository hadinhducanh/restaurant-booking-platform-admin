import React, { useEffect, useState } from "react";
import agent from "@/api/agent";
import { User } from "@/models/User";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/custom/button";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "@/api/auth";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRole, setSelectedRole] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<{ roleName: string } | null>(null);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        setUserInfo(response);
      } catch (error) {
        toast.error("Failed to fetch user info");
      }
    };

    fetchUserInfo();
    fetchUsers(currentPage, pageSize);
  }, [currentPage, selectedRole]);

  const fetchUsers = async (page: number, size: number) => {
    setLoading(true);
    try {
      const response = await agent.Users.list(page, size);
      setUsers(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
    setCurrentPage(0); // Reset to the first page when changing the filter
  };

  const filteredUsers =
    selectedRole === "ALL"
      ? users
      : users.filter((user) => user.roleName === selectedRole);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">User List</h1>
        <div className="flex items-center">
          {userInfo?.roleName === "ROLE_ADMIN" && (
            <>
              <select
                className="mr-4 p-2 border border-gray-300 rounded text-black"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                <option value="ALL" className="text-black">
                  All
                </option>
                <option value="ROLE_STAFF" className="text-black">
                  Staff
                </option>
                <option value="ROLE_MEMBER" className="text-black">
                  Member
                </option>
              </select>
              <Button onClick={() => navigate("/admin/create-staff")}>
                Add New
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Full Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Points
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                First Login
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.userId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.userId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.point}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.image}
                    alt={user.fullName}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.roleName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.firstLogin ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4">
        {currentPage > 0 && (
          <button
            className="px-4 py-2 bg-gray-300 rounded mr-2"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {currentPage}
          </button>
        )}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mx-2"
          disabled
        >
          {currentPage + 1}
        </button>
        {currentPage < totalPages - 1 && (
          <button
            className="px-4 py-2 bg-gray-300 rounded ml-2"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {currentPage + 2}
          </button>
        )}
      </div>
    </div>
  );
};

export default Users;
