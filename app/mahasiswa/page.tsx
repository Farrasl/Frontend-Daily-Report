"use client";

import { useEffect, useState } from "react";
import FAQModal from "../../components/mahasiswa/FAQsModal";

const DashboardMahasiswa = () => {
  const totalDays = 30;
  const currentDay = 1;
  const progressPercentage = (currentDay / totalDays) * 100;
  const [currentDate, setCurrentDate] = useState("");
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  // Sample FAQ data
  const faqData = [
    {
      question: "Cara mengisi Daily Report",
      answer: "Halaman dashboard, pilih Tambah Laporan. Isi detail agenda seperti waktu, dokumentasi, deskripsi singkat, dan hasil yang dicapai. Pastikan deskripsi informatif tetapi singkat. Setelah selesai, klik Simpan untuk menyimpan."
    },
    {
      question: "Kapan harus mengumpulkan Daily Report?",
      answer: "Daily Report harus dikumpulkan setiap hari kerja sebelum pukul 17:00 WIB."
    },
    {
      question: "Bagaimana jika saya lupa mengisi Daily Report?",
      answer: "Jika Anda lupa mengisi Daily Report, segera hubungi pembimbing Anda dan isi laporan yang terlewat dengan mencantumkan alasan keterlambatan."
    },
    {
      question: "Apa yang harus dilaporkan dalam Daily Report?",
      answer: "Daily Report harus mencakup:\n- Aktivitas yang dilakukan\n- Progress pekerjaan\n- Kendala yang dihadapi\n- Solusi yang diterapkan\n- Rencana untuk hari berikutnya"
    },
  ];

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

  const timelinePoints = Array.from({ length: 6 }, (_, index) => {
    const day = index * 6;
    return {
      day: day === 0 ? 1 : day,
      isActive: currentDay >= day,
    };
  });

  return (
    <div className="flex-1 overflow-y-auto justify-center min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="my-4 sm:my-8">
          <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
          <p className="text-[#C5C5C5]">{currentDate}</p>
        </div>
        
        {/* Welcome Box */}
        <div className="bg-[#D9F9FF] w-full p-4 sm:p-6 rounded-[20px] mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold">
            Hi, <strong>Abmi Sukma!</strong>
          </h2>
          <p className="text-[#C5C5C5] mt-2 text-sm sm:text-base">
            Awali hari ini dengan semangat dan dedikasi! Setiap langkah kecil
            yang Anda ambil dalam mengisi <i>Daily Report</i> membawa Anda lebih
            dekat ke kesuksesan. Terus belajar dan berkembang!
          </p>
        </div>

        {/* Info Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-8">
          {/* Work Day Box */}
          <div className="bg-[#D9F9FF] p-4 sm:p-6 rounded-[20px] shadow">
            <h3 className="text-base sm:text-lg font-semibold">Hari Kerja Praktik</h3>
            <p className="text-[#C5C5C5] mt-1 text-sm sm:text-base">Ayo, Semangat!</p>
            <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-b from-[#7CE9FF] via-[#397480] to-[#0B191C] bg-clip-text text-transparent mt-1">
              Ke-1
            </p>
          </div>

          {/* FAQ Box */}
          <div 
            className="bg-[#D9F9FF] p-4 sm:p-6 rounded-[20px] shadow cursor-pointer hover:bg-[#C5EEFF] transition-colors"
            onClick={() => setIsFAQModalOpen(true)}
          >
            <h3 className="text-base sm:text-lg font-semibold flex justify-between items-center">
              FAQs
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H3.17L2.58 14.59L2 15.17V2H18V14ZM9 10H11V12H9V10ZM9 4H11V8H9V4Z"
                  fill="#323232"
                />
              </svg>
            </h3>
            <p className="text-[#C5C5C5] mt-1 text-sm sm:text-base">Apakah Anda butuh bantuan?</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-[#D9F9FF] p-4 sm:p-6 rounded-[20px] shadow mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-0">
              Progress Kerja Praktik
            </h3>
            <div className="text-xs sm:text-sm text-gray-500">
              {currentDay} dari {totalDays} hari
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4 sm:mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
              <div
                className="bg-[#FFBF5F] h-2 sm:h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="relative overflow-x-auto pb-4">
            <div className="absolute h-1 bg-gray-200 left-0 right-0 top-3 sm:top-4" />
            <div className="relative flex justify-between min-w-[300px] sm:min-w-[500px] px-2 sm:px-4">
              {timelinePoints.map(({ day, isActive }, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-5 h-5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center z-10 text-xs sm:text-base ${
                      isActive
                        ? "bg-[#FFBF5F] text-white shadow-md"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {day}
                  </div>
                  <div
                    className={`mt-2 text-xs sm:text-sm ${
                      isActive ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    Hari ke-{day}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Modal */}
      <FAQModal
        isOpen={isFAQModalOpen}
        onClose={() => setIsFAQModalOpen(false)}
        faqs={faqData}
      />
    </div>
  );
};

export default DashboardMahasiswa;