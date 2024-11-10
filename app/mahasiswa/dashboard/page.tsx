"use client";

import { useEffect, useState } from "react";
import FAQModal from "../../../components/mahasiswa/FAQsModal"; 

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
    <div className="flex-1 overflow-y-auto justify-center h-screen">
      <div className="px-8">
        <div className="my-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-[#C5C5C5]">{currentDate}</p>
        </div>
        <div className="bg-[#D9F9FF] w-full p-6 rounded-[20px] mb-8 h-[140px]">
          <h2 className="text-xl font-semibold">
            Hi, <strong>Abmi Sukma!</strong>
          </h2>
          <p className="text-[#C5C5C5] mt-2">
            Awali hari ini dengan semangat dan dedikasi! Setiap langkah kecil
            yang Anda ambil dalam mengisi <i>Daily Report</i> membawa Anda lebih
            dekat ke kesuksesan. Terus belajar dan berkembang!
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#D9F9FF] p-6 rounded-[20px] shadow h-[148px]">
            <h3 className="text-lg font-semibold">Hari Kerja Praktik</h3>
            <p className="text-[#C5C5C5] mt-1">Ayo, Semangat!</p>
            <p className="text-4xl font-bold bg-gradient-to-b from-[#7CE9FF] via-[#397480] to-[#0B191C] bg-clip-text text-transparent mt-1">
              Ke-1
            </p>
          </div>
          <div 
            className="bg-[#D9F9FF] p-6 rounded-[20px] shadow cursor-pointer hover:bg-[#C5EEFF] transition-colors"
            onClick={() => setIsFAQModalOpen(true)}
          >
            <h3 className="text-lg font-semibold flex justify-between items-center">
              FAQs
              <svg
                width="20"
                height="20"
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
            <p className="text-[#C5C5C5] mt-1">Apakah Anda butuh bantuan?</p>
          </div>
        </div>
        <div className="bg-[#D9F9FF] p-6 rounded-[20px] shadow mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h3 className="text-lg font-semibold mb-2 md:mb-0">
              Progress Kerja Praktik
            </h3>
            <div className="text-sm text-gray-500">
              {currentDay} dari {totalDays} hari
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mb-6 md:mb-8">
            <div className="w-full bg-gray-200 rounded-full h-3 md:h-4">
              <div
                className="bg-[#FFBF5F] h-3 md:h-4 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
                />
            </div>
          </div>
          {/* Timeline */}
          <div className="relative overflow-x-auto pb-4">
            <div className="absolute h-1 bg-gray-200 left-0 right-0 top-4" />
            <div className="relative flex justify-between min-w-[500px] px-4">
              {timelinePoints.map(({ day, isActive }, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center z-10 text-sm md:text-base ${
                      isActive
                        ? "bg-[#FFBF5F] text-white shadow-md"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {day}
                  </div>
                  <div
                    className={`mt-2 text-xs md:text-sm ${
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