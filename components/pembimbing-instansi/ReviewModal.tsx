"use client";

import { useState, useEffect } from "react";
import { IDailyReport, IDokumentasi } from "@/models/DailyReport";
import { IEvaluasiDailyReport } from "@/models/Evaluasi";
import Image from "next/image";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyReport: IDailyReport | null;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const ReviewModal = ({ isOpen, onClose, dailyReport }: ReviewModalProps) => {
  const [dokumentasiList, setDokumentasiList] = useState<IDokumentasi[]>([]);
  const [evaluasi, setEvaluasi] = useState<IEvaluasiDailyReport | null>(null);
  const [evaluasiStatus, setEvaluasiStatus] = useState<string>("Belum");

  // Fungsi untuk mengambil evaluasi berdasarkan dailyReportId
  const fetchEvaluasi = async () => {
    if (!dailyReport?._id) return;

    try {
      const response = await fetch(`/api/evaluasi?dailyreportId=${dailyReport._id}`);

      if (!response.ok) {
        throw new Error("Gagal mengambil evaluasi");
      }

      const data = await response.json();
      
      // Filter evaluasi berdasarkan dailyreportId yang sesuai
      const matchingEvaluasi = data.find(
        (evaluasi: IEvaluasiDailyReport) => 
          evaluasi.dailyreportId?.toString() === dailyReport._id.toString()
      );

      setEvaluasi(matchingEvaluasi || null);
      
      // Logika penentuan status
      const status = matchingEvaluasi?.status?.trim().toLowerCase();
      if (!status || status === '' || status === 'belum') {
        setEvaluasiStatus("Belum");
      } else {
        setEvaluasiStatus(matchingEvaluasi.status);
      }
    } catch (error) {
      console.error("Error fetching evaluasi:", error);
      // Set status default ke Belum jika terjadi error
      setEvaluasiStatus("Belum");
    }
  };

  // Efek untuk mengambil dokumentasi dan evaluasi saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      fetchEvaluasi();
    }
  }, [isOpen, dailyReport?._id]);

  // Check if dailyReport exists before proceeding
  if (!isOpen || !dailyReport) return null;

  const { tanggal, agenda } = dailyReport;
  const { komentar } = evaluasi || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl relative shadow-lg max-h-[90vh] overflow-auto">
        {/* Header Section - Fixed */}
        <div className="p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-0">
              Review Daily Report
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="grid gap-4 sm:gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Left Column */}
              <div>
                {[
                  { label: "NIM", value: "12250120341" },
                  { label: "NAMA MAHASISWA", value: "Abmi Sukma" },
                  {
                    label: "DOSEN PEMBIMBING",
                    value: "Yelfi Vitriani, S.Kom., M.M.S.I.",
                  },
                  { label: "PEMBIMBING INSTANSI", value: "Sarinah, M.Pd" },
                ].map((item, index) => (
                  <div key={index} className="mb-4 sm:mb-6">
                    <h3 className="text-xs sm:text-sm text-gray-500 mb-1">
                      {item.label}
                    </h3>
                    <p className="font-medium text-sm">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div>
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-xs sm:text-sm text-gray-500 mb-1">
                    STATUS
                  </h3>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        evaluasiStatus === "Diterima" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <p className="font-medium text-sm">{evaluasiStatus}</p>
                  </div>
                </div>

                {/* Dokumentasi Section */}
                <div className="mt-4">
                  <h3 className="text-sm text-gray-500 mb-2">DOKUMENTASI</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {dokumentasiList.map((dok, index) => {
                      // Periksa apakah file adalah gambar
                      const isImage = dok.fileType.startsWith("image/");

                      return isImage ? (
                        <div
                          key={index}
                          className="relative w-full aspect-square"
                        >
                          <Image
                            src={`data:${dok.fileType};base64,${dok.data}`}
                            alt={`Dokumentasi ${index + 1}`}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <a
                          key={index}
                          href={`data:${dok.fileType};base64,${dok.data}`}
                          download={dok.filePath}
                          className="bg-blue-100 p-2 rounded-lg text-blue-600 hover:bg-blue-200"
                        >
                          Download {dok.filePath}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start -mb-4">
                <h2 className="text-xs sm:text-sm text-gray-500">
                  DESKRIPSI AGENDA
                </h2>
              </div>
            </div>

            {/* Agenda Description */}
            <div className="bg-[#9FD8E4] p-4 sm:p-6 rounded-lg h-auto max-h-[225px] overflow-y-auto">
              {agenda && agenda.length > 0 ? (
                agenda.map((ag, index) => (
                  <div key={index} className="mb-4 font-serif">
                    {/* Tampilkan tanggal hanya pada agenda pertama */}
                    {index === 0 && (
                      <p className="font-semibold mb-2 text-sm">
                        {formatDate(tanggal.toString())}
                      </p>
                    )}
                    <p className="font-semibold mb-2 text-sm">
                      {ag.waktuMulai} - {ag.waktuSelesai}
                    </p>
                    <p className="font-semibold mb-2 text-sm">
                      {ag.judulAgenda}
                    </p>
                    <p className="text-xs sm:text-sm mb-2">
                      {ag.deskripsiAgenda}
                    </p>
                  </div>
                ))
              ) : (
                <p>Belum ada agenda</p>
              )}
            </div>

            {/* Evaluasi Agenda Section */}
            <div className="flex justify-between items-start -mb-4">
            <h3 className="text-xs sm:text-sm text-gray-500">
                Evaluasi Agenda
              </h3>
            </div>  
            <div className="bg-white border-4 border-[#9FD8E4] p-4 rounded-lg">
              <p className="text-gray-700 text-xs sm:text-sm mt-2 font-serif">
              {komentar ? komentar : <span className="text-gray-500">Belum ada Evaluasi</span>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReviewModal;
