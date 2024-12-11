"use client";

import { useEffect, useState } from "react";
import { IDailyReport } from "@/models/DailyReport";
import { IEvaluasiDailyReport } from "@/models/Evaluasi";
import ReviewModal from "@/components/mahasiswa/ReviewModal";

// Interface matching ReviewModal's expected format
interface ITask {
  task: string;
  date: string;
  status: string;
}

const DailyReportPage = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );
  const [apiData, setApiData] = useState<IDailyReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [evaluasiData, setEvaluasiData] = useState<IEvaluasiDailyReport[]>([]);

  // Convert API data to Task format with unique keys
  const convertToTasks = (
    dailyReports: IDailyReport[], 
    evaluasiData: IEvaluasiDailyReport[]
  ): ITask[] => {
    return dailyReports.map((report) => {
      // Find matching evaluasi for this daily report
      const matchingEvaluasi = evaluasiData.find(
        (evaluasi) => 
          evaluasi.dailyreportId?.toString() === report._id?.toString()
      );

      const firstAgenda =
        report.agenda && report.agenda.length > 0 ? report.agenda[0] : null;
      
      // Determine status, default to "Belum" if no evaluasi found
      const status = matchingEvaluasi?.status?.trim() || "Belum";
      const normalizedStatus = 
        !status || status === '' || status.toLowerCase() === 'belum' ? "Belum" : status;

      return {
        task: firstAgenda ? firstAgenda.judulAgenda : "No Agenda",
        date: formatDate(report.tanggal.toString()),
        status: normalizedStatus,
      };
    });
  };

  // Fetch tasks and evaluasi from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch daily reports
        const dailyReportResponse = await fetch("/api/daily-report");
        if (!dailyReportResponse.ok) {
          throw new Error("Failed to fetch daily reports");
        }
        const dailyReports = await dailyReportResponse.json();
        setApiData(dailyReports);

        // Fetch evaluasi
        const evaluasiResponse = await fetch("/api/evaluasi");
        if (!evaluasiResponse.ok) {
          throw new Error("Failed to fetch evaluasi");
        }
        const evaluasi = await evaluasiResponse.json();
        setEvaluasiData(evaluasi);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
  const tasks = convertToTasks(apiData, evaluasiData);

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
        <div
          className={`${
            tasks.length > 5 ? "h-[590px] overflow-y-auto" : "h-auto"
          } bg-[#D9F9FF] p-4 rounded-[20px] mb-8`}
        >
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
                    key={index}
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
                          task.status === "Diterima"
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

export default DailyReportPage;
