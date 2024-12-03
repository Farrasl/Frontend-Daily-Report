"use client";

import { useEffect, useState } from "react";
import ReviewModal from "@/components/mahasiswa/ReviewModal";

// Interface for the API data
interface IDokumentasi {
  dailyreportId?: string;
  filePath: string;
  fileType: string;
}

interface IDailyReport {
  agenda: any;
  _id: string;
  tanggal: string;
  waktuMulai: string;
  waktuSelesai: string;
  judulAgenda: string;
  deskripsiAgenda: string;
  status: string;
  dokumentasi?: IDokumentasi[];
  createdAt: string;
  updatedAt: string;
}

// Interface matching ReviewModal's expected format
interface Task {
  task: string;
  date: string;
  status: string;
  uniqueKey: string; // Added unique key
}

const DailyReport = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );
  const [apiData, setApiData] = useState<IDailyReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convert API data to Task format with unique keys
  const convertToTasks = (dailyReports: IDailyReport[]): Task[] => {
    return dailyReports.map((report, index) => {
      const firstAgenda = report.agenda && report.agenda.length > 0 ? report.agenda[0] : null;
      return {
        task: firstAgenda ? firstAgenda.judulAgenda : "No Agenda",
        date: formatDate(report.tanggal),
        status: report.status,
        uniqueKey: `${report._id}-${index}` // Create a unique key by combining ID and index
      };
    });
  };

  useEffect(() => {
    const today = new Date();
    const options: any = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    setCurrentDate(today.toLocaleDateString("id-ID", options));
  }, []);

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/daily-report");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        console.log("Data fetched from API:", data); // Cek data yang diterima
        setApiData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchTasks();
  }, []);
  
  const handleRowClick = (taskIndex: number) => {
    setSelectedTaskIndex(taskIndex);
    setTimeout(() => {
      setIsReviewModalOpen(true);
    }, 0); // Use setTimeout to ensure this happens after the render cycle
  };

  const handleCloseModal = () => {
    setIsReviewModalOpen(false);
    setSelectedTaskIndex(null);
  };

  // Format date to Indonesian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex-1 h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 h-screen bg-white flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  // Convert API data to Task format for the table and modal
  const tasks = convertToTasks(apiData);

  return (
    <div className="flex-1 h-screen bg-white">
      <div className="px-8">
        <div className="mt-8 mb-4">
          <h1 className="text-2xl font-bold">Daily Report</h1>
          <p className="text-[#C5C5C5]">{currentDate}</p>
        </div>
        <div className="flex justify-end">
          <button className="bg-[#FFBF5F] text-black py-2 px-4 rounded-md flex items-center gap-2 mb-4">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_393_103)">
                <path
                  d="M19.5 9H15.5V3H9.5V9H5.5L12.5 16L19.5 9ZM11.5 11V5H13.5V11H14.67L12.5 13.17L10.33 11H11.5ZM5.5 18H19.5V20H5.5V18Z"
                  fill="#323232"
                />
              </g>
              <defs>
                <clipPath id="clip0_393_103">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            Cetak Daily Report
          </button>
        </div>
        <div className="bg-[#D9F9FF] p-4 rounded-[20px] mb-8 h-[570px] overflow-y-auto">
          <div className="bg-[#D9F9FF] rounded-lg overflow-hidden">
            <table className="w-full text-left table-fixed">
              <thead>
                <tr className="bg-[#D9F9FF]">
                  <th className="w-1/2 py-4 px-4 sm:px-6 border-b-2 font-semibold text-xs sm:text-sm tracking-wider">
                    All Task
                  </th>
                  <th className="w-1/4 py-4 px-4 sm:px-6 border-b-2 font-semibold text-xs sm:text-sm tracking-wider">
                    Date
                  </th>
                  <th className="w-1/4 py-4 px-4 sm:px-12 border-b-2 font-semibold text-xs sm:text-sm tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.map((task, index) => (
                  <tr
                    key={task.uniqueKey} // Use the new unique key
                    onClick={() => handleRowClick(index)}
                    className="hover:bg-[#A1D1DD] transition-colors duration-150 cursor-pointer"
                  >
                    <td className="py-4 px-4 sm:px-6 text-xs sm:text-sm text-gray-900">
                      {task.task}
                    </td> 
                    <td className="py-4 px-4 sm:px-6 text-xs sm:text-sm text-gray-600">
                      {task.date}
                    </td>
                    <td className="py-4 px-4 sm:px-12">
                      <span
                        className={`inline-block px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium ${
                          task.status === "Sudah"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Review Modal */}
      {selectedTaskIndex !== null && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={handleCloseModal}
          dailyReport={apiData[selectedTaskIndex]} // Pass the selected daily report
        />
      )}
    </div>
  );
};

export default DailyReport;