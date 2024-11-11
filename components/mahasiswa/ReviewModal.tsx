"use client";

import { useState } from "react";
import Image from "next/image";
import AddAgendaModal from "../../components/mahasiswa/AddAgendaModal";

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
  const [showAddAgendaModal, setShowAddAgendaModal] = useState(false);

  if (!isOpen || taskIndex === null) return null;

  const task = tasks[taskIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl relative shadow-lg max-h-[90vh] flex flex-col">
        {/* Header Section - Fixed */}
        <div className="p-6 border-b">
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

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Review Daily Report</h2>
            <div className="bg-[#99CC33] text-gray-700 mr-6 px-4 py-2 rounded-lg flex justify-between items-center">
              <p className="text-sm">
                Deskripsi agenda dapat diganti sebelum di acc Pembimbing
                Instansi.
              </p>
              <div className="w-6 h-6 bg-[#323232] rounded-full flex items-center justify-center text-white ml-2">
                <span className="text-lg font-bold">!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 p-6">
          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="mb-6">
                  <h3 className="text-sm text-gray-500 mb-1">NIM</h3>
                  <p className="font-medium">12250120341</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm text-gray-500 mb-1">NAMA MAHASISWA</h3>
                  <p className="font-medium">Abmi Sukma</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm text-gray-500 mb-1">
                    DOSEN PEMBIMBING
                  </h3>
                  <p className="font-medium">
                    Yelfi Vitriani, S.Kom., M.M.S.I.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm text-gray-500 mb-1">
                    PEMBIMBING INSTANSI
                  </h3>
                  <p className="font-medium">Sarinah, M.Pd</p>
                </div>
              </div>

              <div>
                <div className="mb-6">
                  <h3 className="text-sm text-gray-500 mb-1">STATUS</h3>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        task.status === "Done" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <p className="font-medium">{task.status}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-gray-500 mb-2">DOCUMENTATION</h3>
                  <Image
                    src="/kerja.jpg"
                    alt="Documentation screenshot"
                    width={200}
                    height={200}
                    className="rounded-lg border"
                  />
                </div>
              </div>
            </div>

            {/* Agenda Description */}
            <div className="bg-[#9FD8E4] p-6 rounded-lg h-[225px] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-sm text-gray-500">DESKRIPSI AGENDA</h2>
                <button 
                className="p-1"
                onClick={() => setShowAddAgendaModal(true)}
>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_195_915)">
                      <path
                        d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z"
                        fill="#323232"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_195_915">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>

              <div>
                <p className="font-semibold mb-2">
                  {task.date} - 09.00 / 16.00
                </p>
                <p className="font-semibold mb-2">{task.task}</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>
                    Perjelas struktur navigasi dan tambahkan panduan pengguna
                    untuk memudahkan user baru.
                  </li>
                  <li>
                    Sederhanakan tata letak form input agar pengguna dapat
                    dengan cepat mengisi dan memvalidasi laporan.
                  </li>
                  <li>
                    Tingkatkan elemen visual agar aplikasi memiliki daya tarik
                    visual yang lebih profesional dan modern.
                  </li>
                  <li>
                    Perbaiki alur kerja validasi dan pengiriman laporan agar
                    lebih efisien dan meminimalkan risiko kesalahan.
                  </li>
                </ul>
                <p className="text-sm">
                  Secara keseluruhan, mahasiswa telah menunjukkan pemahaman yang
                  baik dalam desain UI/UX dan memperhatikan kebutuhan fungsional
                  aplikasi. Dengan beberapa perbaikan dan optimalisasi lebih
                  lanjut, desain ini memiliki potensi untuk dikembangkan menjadi
                  aplikasi yang efektif dan ramah pengguna. Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Maxime quia dicta unde
                  eveniet quisquam perspiciatis illum similique, eum
                  consequuntur ad veniam necessitatibus earum nobis repellat
                  dolor mollitia voluptas odio ipsa. Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Possimus rem saepe eos enim
                  voluptatem? Eveniet incidunt, excepturi harum velit fugiat
                  corrupti, hic adipisci doloribus, culpa neque facilis deleniti
                  sint eius. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Corporis, voluptates? Ullam ipsa sit debitis, suscipit
                  voluptatem iusto! Earum, voluptatibus. Beatae reiciendis
                  provident magni recusandae consequatur libero consectetur
                  consequuntur nulla velit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
            {/* AddAgendaModal */}
            <AddAgendaModal
        isOpen={showAddAgendaModal}
        onClose={() => setShowAddAgendaModal(false)}
      />
    </div>
  );
};

export default ReviewModal;
