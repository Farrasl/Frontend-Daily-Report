"use client";

import { use, useEffect, useState } from "react";
import { Mail, User, FileText } from "lucide-react";
import { IDailyReport } from "@/models/DailyReport";
import { IEvaluasiDailyReport } from "@/models/Evaluasi";
import ReviewModal from "@/components/pembimbing-instansi/ReviewModal";
import EvaluasiModal from "@/components/pembimbing-instansi/AddEvaluasiModal";

export interface ITask {
  task: string;
  date: string;
  status: string;
}
const DailyReportPage = ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = use(params);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isEvaluasiModalOpen, setIsEvaluasiModalOpen] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );
  const [apiData, setApiData] = useState<IDailyReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [evaluasiData, setEvaluasiData] = useState<IEvaluasiDailyReport[]>([]);

  const profileData = {
    nim: "12250120341",
    nama: name,
    dosenPembimbing: "Muhammad Irsyad, S.T., M.T.",
    pembimbingInstansi: "Sarinah, M.Pd.",
    email: "abmisukma.e@gmail.com",
  };

  const getInitials = (name: string) => {
    const words = name.split(" "); // Memisahkan nama berdasarkan spasi
    return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
  };

  const convertToTasks = (
    dailyReports: IDailyReport[],
    evaluasiData: IEvaluasiDailyReport[]
  ): ITask[] => {
    return dailyReports.map((report) => {
      const matchingEvaluasi = evaluasiData.find(
        (evaluasi) =>
          evaluasi.dailyreportId?.toString() === report._id?.toString()
      );
  
      const firstAgenda =
        report.agenda && report.agenda.length > 0 ? report.agenda[0] : null;
  
      const status = matchingEvaluasi?.status?.trim() || "Belum dievaluasi";
  
      return {
        task: firstAgenda ? firstAgenda.judulAgenda : "No Agenda",
        date: formatDate(report.tanggal.toString()),
        status,
      };
    });
  };
  

  // Fetch tasks from API
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

  const handleCommentClick = (taskIndex: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the row click from triggering
    setSelectedTaskIndex(taskIndex);
    setIsEvaluasiModalOpen(true);
  };

  /**
   * Closes the Evaluasi Modal and resets the selected task index.
   */
  const handleCloseEvaluasiModal = () => {
    setIsEvaluasiModalOpen(false);
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

  // Convert API data to Task format for the table
  const tasks = convertToTasks(apiData, evaluasiData);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Title */}
        <div className="bg-gradient-to-r from-cyan-100 to-blue-100 p-4">
          <h1 className="text-center text-sm sm:text-base lg:text-lg font-bold text-gray-800">
            PERANCANGAN SISTEM INFORMASI PEMANTAUAN PERKEMBANGAN STATUS
            PERBAIKAN KOMPUTER BERBASIS WEB DI PT. PERTAMINA
          </h1>
        </div>

        {/* Profile Card */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-40 h-40 sm:w-50 sm:h-50 rounded-full border-4 border-[#A2E2E8] bg-[#9FD8E4] flex items-center justify-center">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                  {getInitials(profileData.nama)}
                </span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-500">Nama Mahasiswa</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.nama}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-500">NIM</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.nim}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-500">Dosen Pembimbing</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.dosenPembimbing}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-500">Pembimbing Instansi</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.pembimbingInstansi}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 md:col-span-2">
                  <Mail className="text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Report Section */}
        <div className="mt-6 px-6 pb-8">
          <h2 className="text-xl font-bold mb-4">Laporan Harian</h2>
          <div
            className={`${
              tasks.length > 5 ? "h-[250px] overflow-y-auto" : "h-auto"
            } bg-[#D9F9FF] p-4 rounded-[20px] mb-2`}
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
                      className="hover:bg-[#A1D1DD] transition-colors duration-150 cursor-pointer"
                      onClick={() => handleRowClick(index)}
                    >
                    <td className="py-4 px-4 sm:px-6 text-xs sm:text-sm text-gray-900">
                      {task.task}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-xs sm:text-sm text-gray-600">
                      {task.date}
                    </td>
                      <td className="col-span-2 py-4 px-4 sm:px-6 text-xs sm:text-sm text-gray-600">
                        {task.status === "Diterima" ? (
                          <span
                          className={`inline-block px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium ${
                            task.status === "Diterima"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {task.status}
                        </span>                        ) : (
                          <button
                            onClick={(e) => handleCommentClick(index, e)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#397480] text-white rounded-full transition-colors hover:scale-105"
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_195_2079)">
                                <path
                                  d="M14.25 9.75H9.75V14.25H8.25V9.75H3.75V8.25H8.25V3.75H9.75V8.25H14.25V9.75Z"
                                  fill="white"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_195_2079">
                                  <rect width="18" height="18" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            <span>Beri Komentar</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedTaskIndex !== null && apiData[selectedTaskIndex] && (
        <>
          <ReviewModal
            isOpen={isReviewModalOpen}
            onClose={handleCloseModal}
            dailyReport={apiData[selectedTaskIndex]}
          />
          <EvaluasiModal
            isOpen={isEvaluasiModalOpen}
            onClose={handleCloseEvaluasiModal}
            dailyReport={apiData[selectedTaskIndex]}
          />
        </>
      )}
    </div>
  );
};

export default DailyReportPage;
