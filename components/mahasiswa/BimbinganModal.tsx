"use client";

import  { useEffect } from "react";
import { IBimbingan } from "@/models/Bimbingan";

interface BimbinganModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: IBimbingan | null;
}

const BimbinganModal = ({
  isOpen,
  onClose,
  data,
}: BimbinganModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg w-full max-w-3xl mx-4 p-8 z-50 shadow-lg">
        {/* Header */}
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">Review Bimbingan</h3>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-md font-medium leading-6 text-gray-600">
              PERANCANGAN SISTEM INFORMASI PEMANTAUAN PERKEMBANGAN STATUS
              PERBAIKAN KOMPUTER BERBASIS WEB DI PT. PERTAMINA
            </h2>
          </div>

          <div className="space-y-4">
            {/* NIM and Status */}
            <div className="flex flex-col gap-2">
              <div className="text-sm text-gray-500">NIM</div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">{data.nim}</span>
                <div className="flex items-center">
                   <div
                    className={`w-3 h-3 rounded-full ${
                      data.status === "Diterima"
                        ? "bg-green-500"
                        : "bg-red-500"
                    } mr-2`}
                  ></div>
                  <span className="text-sm text-gray-500">{data.status}</span>
                </div> 
              </div>
            </div>

            {/* Nama Mahasiswa */}
            <div className="space-y-2">
              <div className="text-sm text-gray-500">NAMA MAHASISWA</div>
              <div className="font-medium text-gray-700"></div>
            </div>

            {/* Dosen Pembimbing */}
            <div className="space-y-2">
              <div className="text-sm text-gray-500">DOSEN PEMBIMBING</div>
              <div className="font-medium text-gray-700"></div>
            </div>

            {/* Pembimbing Instansi */}
            <div className="space-y-2">
              <div className="text-sm text-gray-500">PEMBIMBING INSTANSI</div>
              <div className="font-medium text-gray-700"></div>
            </div>

            <div className="border-t mt-6 pt-6">
              {/* Evaluasi Bimbingan */}
              <div className="text-sm text-gray-500 mb-2">EVALUASI Bimbingan</div>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="font-medium text-gray-700 mb-2">{formatDate(data.tanggal.toString())}</div>
                <div className="text-sm text-gray-600">{data.komentar}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
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
      </div>
    </div>
  );
};

export default BimbinganModal;
