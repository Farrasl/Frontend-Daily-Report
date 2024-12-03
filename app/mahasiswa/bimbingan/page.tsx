"use client";

import React, { useState } from "react";
import BimbinganModal from "../../../components/mahasiswa/BimbinganModal";

// Define the type for each item in BimbinganHistory
type BimbinganHistoryItem = {
  tanggal: string;
  status: string;
  aksi: string;
  evaluasi: string;
  nim: string;
  nama: string;
  dosenPembimbing: string;
  pembimbingInstansi: string;
  statusPenerimaan: string;
};

const RiwayatBimbingan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<BimbinganHistoryItem | null>(
    null
  );

  const BimbinganHistory: BimbinganHistoryItem[] = [
    {
      tanggal: "Sabtu, 29 Oktober 2024",
      status: "done",
      aksi: "Lihat",
      evaluasi: "Kerja sama tim baik.",
      nim: "12250111",
      nama: "Abmi Sukma",
      dosenPembimbing: "Pizaini",
      pembimbingInstansi: "Yelvi Fitriani",
      statusPenerimaan: "Diterima",
    },
    {
      tanggal: "Senin, 1 November 2024",
      status: "pending",
      aksi: "Lihat",
      evaluasi: "Perlu peningkatan pada laporan.",
      nim: "12250111",
      nama: "Abmi Sukma",
      dosenPembimbing: "Pizaini",
      pembimbingInstansi: "Yelvi Fitriani",
      statusPenerimaan: "Menunggu",
    },
  ];

  const handleViewClick = (data: BimbinganHistoryItem) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="my-4 sm:my-6 lg:my-8">
          <h1 className="text-xl sm:text-2xl font-bold">Riwayat Bimbingan</h1>
        </div>

        {/* Mobile view - Card layout */}
        <div className="block sm:hidden">
          <div className="space-y-4">
            {BimbinganHistory.map((item, index) => (
              <div 
                key={index} 
                className="bg-[#D9F9FF] rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-[#323232]">{item.tanggal}</p>
                  <button
                    className="text-[#2C707B] hover:text-[#9FD8E4] text-sm font-medium focus:outline-none"
                    onClick={() => handleViewClick(item)}
                  >
                    {item.aksi}
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Status: {item.status}</p>
                  <p className="truncate">Evaluasi: {item.evaluasi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet and Desktop view - Table layout */}
        <div className="hidden sm:block">
          <div className="bg-[#D9F9FF] rounded-[20px] p-4 overflow-x-auto">
            <table className="w-full min-w-full table-auto">
              <thead>
                <tr className="text-left">
                  <th className="py-2 px-4 text-[#323232] whitespace-nowrap">Tanggal</th>
                  <th className="py-2 px-4 text-[#323232] text-right whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {BimbinganHistory.map((item, index) => (
                  <tr 
                    key={index} 
                    className="border-t border-sky-100 transition-colors"
                  >
                    <td className="py-3 px-4 text-[#323232]">{item.tanggal}</td>
                    <td className="py-3 px-4 text-right">
                      {item.aksi === "Lihat" ? (
                        <button
                          className="inline-flex items-center text-[#2C707B] hover:text-[#9FD8E4] font-medium focus:outline-none transition-colors"
                          onClick={() => handleViewClick(item)}
                        >
                          <span>{item.aksi}</span>
                        </button>
                      ) : (
                        <span className="text-[#C5C5C5]">{item.aksi}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <BimbinganModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedData}
      />
    </div>
  );
};

export default RiwayatBimbingan;