"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReviewModal from "../../../../components/pembimbing-instansi/ReviewModal";
import EvaluasiModal from "../../../../components/pembimbing-instansi/EvaluasiModal";

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

  const profileData = {
    nim: "12250120341",
    nama: name,
    dosenPembimbing: "Muhammad Irsyad, S.T., M.T.",
    pembimbingInstansi: "Sarinah, M.Pd.",
    email: "abmisukma.e@gmail.com",
  };

  const convertToTasks = (dailyReports: IDailyReport[]): Task[] => {
    return dailyReports.map((report, index) => {
      const firstAgenda =
        report.agenda && report.agenda.length > 0 ? report.agenda[0] : null;
      return {
        task: firstAgenda ? firstAgenda.judulAgenda : "No Agenda",
        date: formatDate(report.tanggal),
        status: report.status,
        uniqueKey: `${report._id}-${index}`, // Create a unique key by combining ID and index
      };
    });
  };

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

  const handleCommentClick = (taskIndex: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the row click from triggering
    setSelectedTaskIndex(taskIndex);
    setIsEvaluasiModalOpen(true);
  };

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

  // Convert API data to Task format for the table and modal
  const tasks = convertToTasks(apiData);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-center text-xl font-bold mb-8 px-4">
        "PERANCANGAN SISTEM INFORMASI PEMANTAUAN PERKEMBANGAN STATUS PERBAIKAN
        KOMPUTER BERBASIS WEB DI PT. PERTAMINA"
      </h1>

      {/* Profile Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-2 align-center">Profile</h2>
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Profile Image */}
          <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-[#A2E2E8]">
            <img
              src="/avatar.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <p className="text-gray-500">NAMA MAHASISWA</p>
                <p className="font-medium">{profileData.nama}</p>
              </div>
              <div>
                <p className="text-gray-500">DOSEN PEMBIMBING</p>
                <p className="font-medium">{profileData.dosenPembimbing}</p>
              </div>
            </div>

            {/* Supervisors Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <p className="text-gray-500">NIM</p>
                <p className="font-medium">{profileData.nim}</p>
              </div>
              <div>
                <p className="text-gray-500">PEMBIMBING INSTANSI</p>
                <p className="font-medium">{profileData.pembimbingInstansi}</p>
              </div>
            </div>

            {/* Email Info */}
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{profileData.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Laporan Harian Section */}
      <div className="mt-6">
        <h1 className="text-2xl font-bold mb-4">Laporan Harian</h1>
        <div className="bg-[#D9F9FF] rounded-[20px] overflow-hidden max-h-60 overflow-y-auto">
          <table className="w-full text-left table-fixed">
            <thead>
              <tr className="bg-[#D9F9FF]">
                <th className="w-1/2 py-4 px-6 border-b-2 font-semibold text-sm tracking-wider">
                  Agenda
                </th>
                <th className="w-1/4 py-4 px-6 border-b-2 font-semibold text-sm tracking-wider">
                  Tanggal
                </th>
                <th className="w-1/4 py-4 px-6 border-b-2 font-semibold text-sm tracking-wider">
                  Aksi
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
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {task.task}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {task.date}
                  </td>
                  <td className="col-span-3">
                    {task.status === "Sudah" ? (
                      <span className="text-[#2FFF00]">Sudah</span>
                    ) : (
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

      {/* Review Modal */}
      {selectedTaskIndex !== null && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={handleCloseModal}
          dailyReport={apiData[selectedTaskIndex]} // Pass the selected daily report
        />
      )}

      {/* Evaluasi Modal */}
      <EvaluasiModal
        isOpen={isEvaluasiModalOpen}
        onClose={handleCloseEvaluasiModal}
        task={tasks[selectedTaskIndex || 0]} // Pass the selected task if any
      />
    </div>
  );
};

export default DailyReportPage;
