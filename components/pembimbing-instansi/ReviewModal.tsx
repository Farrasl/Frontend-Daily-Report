"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface IDokumentasi {
  dailyreportId?: string;
  filePath: string;
  fileType: string;
  data?: string; // Base64 encoded
}

interface IAgenda {
  waktuMulai: string;
  waktuSelesai: string;
  judulAgenda: string;
  deskripsiAgenda: string;
  dokumentasi?: IDokumentasi[];
}

interface IDailyReport {
  _id: string;
  tanggal: string;
  status: string;
  agenda: IAgenda[];
}

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
  const [showAddAgendaModal, setShowAddAgendaModal] = useState(false);

  // Fungsi untuk mengambil dokumentasi
  const fetchDokumentasi = async () => {
    if (!dailyReport?._id) return;

    try {
      const response = await fetch(`/api/dokumentasi/${dailyReport._id}`);

      if (!response.ok) {
        throw new Error("Gagal mengambil dokumentasi");
      }

      const data = await response.json();
      setDokumentasiList(data);
    } catch (error) {
      console.error("Error fetching dokumentasi:", error);
    }
  };

  // Efek untuk mengambil dokumentasi saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      fetchDokumentasi();
    }
  }, [isOpen, dailyReport?._id]);

  // Check if dailyReport exists before proceeding
  if (!isOpen || !dailyReport) return null;

  const { tanggal, status, agenda } = dailyReport;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl relative shadow-lg max-h-[90vh] overflow-auto">
        {/* Header Section - Fixed */}
        <div className="p-4 sm:p-6 border-b relative sticky top-0 bg-white z-10">
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
                        status === "Sudah" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <p className="font-medium text-sm">{status}</p>
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
                  <div key={index} className="mb-4">
                    {/* Tampilkan tanggal hanya pada agenda pertama */}
                    {index === 0 && (
                      <p className="font-semibold mb-2 text-sm">
                        {formatDate(tanggal)}
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
            <div className="bg-white border border-[#9FD8E4] p-4 rounded-lg">
              <h3 className="text-xs sm:text-sm text-gray-500">
                Evaluasi Agenda
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm mt-2">
                Saat design UI/UX kedepannya bisa pakai figma saja, untuk Abmi
                terus berlatih untuk lebih baik kedepannya ya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
