"use client";

import Image from "next/image";

interface Task {
  task: string;
  date: string;
  status: string;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskIndex: number | null;
  tasks: Task[];
}

const ReviewModal = ({
  isOpen,
  onClose,
  taskIndex,
  tasks,
}: ReviewModalProps) => {
  if (!isOpen || taskIndex === null) return null;

  const task = tasks[taskIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl relative shadow-lg max-h-[90vh] overflow-auto">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <svg
              className="w-6 h-6"
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
          <h2 className="text-2xl font-bold text-center">Review Daily Report</h2>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Basic Information Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="mb-4">
                <h3 className="text-sm text-gray-500">NIM</h3>
                <p className="font-medium">12250120341</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm text-gray-500">Nama Mahasiswa</h3>
                <p className="font-medium">Abmi Sukma</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm text-gray-500">Dosen Pembimbing</h3>
                <p className="font-medium">Yelfi Vitriani, S.Kom., M.M.S.I.</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm text-gray-500">Pembimbing Instansi</h3>
                <p className="font-medium">Sarinah, M.Pd</p>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <h3 className="text-sm text-gray-500">Status</h3>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      task.status === "Sudah" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <p className="font-medium">{task.status}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-2">Documentation</h3>
                <Image
                  src="/avatar.png"
                  alt="Documentation screenshot"
                  width={200}
                  height={200}
                  className="rounded-lg border"
                />
              </div>
            </div>
          </div>

          {/* Agenda Description Section */}
          <div className="bg-[#9FD8E4] p-6 rounded-lg h-[225px] overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm text-gray-500">Deskripsi Agenda</h3>
            </div>
            <p className="font-semibold mb-2">
              {task.date} - 09.00 / 16.00
            </p>
            <p className="font-semibold mb-2">{task.task}</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Perjelas struktur navigasi dan tambahkan panduan pengguna.</li>
              <li>Sederhanakan tata letak form input.</li>
              <li>Tingkatkan elemen visual agar aplikasi memiliki daya tarik visual.</li>
              <li>Perbaiki alur kerja validasi dan pengiriman laporan.</li>
            </ul>
            <p className="text-sm mt-4">
              Secara keseluruhan, mahasiswa telah menunjukkan pemahaman yang baik dalam desain UI/UX.
            </p>
          </div>

          {/* Evaluasi Agenda Section */}
          <div className="bg-white border border-[#9FD8E4] p-4 rounded-lg">
            <h3 className="text-sm text-gray-500">Evaluasi Agenda</h3>
            <p className="text-gray-700 mt-2">
              Saat design UI/UX kedepannya bisa pakai figma saja, untuk Abmi
              terus berlatih untuk lebih baik kedepannya ya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
