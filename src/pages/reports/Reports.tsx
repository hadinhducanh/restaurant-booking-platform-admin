import React, { useEffect, useState } from "react";
import agent from "@/api/agent"; // Ensure the path is correct
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Report } from "@/models/Report"; // Import the Report interface

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]); // State to hold reports
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage] = useState<number>(0);
  const pageSize = 10;

  useEffect(() => {
    fetchReports(currentPage, pageSize); // Fetch reports when component mounts
  }, [currentPage]);

  const fetchReports = async (page: number, size: number) => {
    setLoading(true);
    try {
      const response = await agent.Reports.getReports(page, size);
      setReports(response.content);
    } catch (error) {
      toast.error("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
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
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reports List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Report ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Content
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Report Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Questioner
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.reportId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.reportId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.content}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.reportType === 1 ? "About staff" : "About website"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.questioner.fullName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
