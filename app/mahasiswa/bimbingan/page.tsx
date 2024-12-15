"use client";

import { useState, useEffect } from "react";
import BimbinganModal from "@/components/mahasiswa/BimbinganModal";
import { IBimbingan } from "@/models/Bimbingan";

const RiwayatBimbingan = () => {
  const [isBimbinganModalOpen, setIsBimbinganModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedData, setSelectedData] = useState<IBimbingan | null>(null);

  // Fetch tasks from API
  useEffect(() => {
    const fetchBimbinganData = async () => {
      try {
        const response = await fetch("/api/bimbingan");
        if (!response.ok) {
          throw new Error("Failed to fetch bimbingan data");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching bimbingan data:", error);
      }
    };
    fetchBimbinganData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

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

  const handleOpenBimbinganModal = (data: IBimbingan) => {
    setSelectedData(data);
    setIsBimbinganModalOpen(true);
  };

  const handleCloseBimbinganModal = () => {
    setIsBimbinganModalOpen(false);
  };

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-white">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl pt-16 lg:pt-0 mx-auto">
        <div className="my-4 sm:my-8">
          <h1 className="text-xl sm:text-2xl font-bold">Riwayat Bimbingan</h1>
          <p className="text-[#C5C5C5]">{currentDate}</p>
        </div>

        {/* Unified layout for all screen sizes */}
        <div className="bg-[#D9F9FF] rounded-[20px] p-4 overflow-x-auto">
          <table className="w-full min-w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="py-2 px-4 text-[#323232] whitespace-nowrap">
                  Tanggal
                </th>
                <th className="py-2 px-4 text-[#323232] text-right whitespace-nowrap">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: { tanggal: Date }, index) => (
                <tr
                  key={index}
                  className="border-t border-sky-100 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-700">
                    {formatDate(item.tanggal.toString())}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      className="inline-flex items-center text-[#2C707B] hover:text-[#9FD8E4] font-medium focus:outline-none transition-colors"
                      onClick={() => handleOpenBimbinganModal(data[index])}
                    >
                      <span>Lihat</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {isBimbinganModalOpen && selectedData && (
        <BimbinganModal
          isOpen={isBimbinganModalOpen}
          onClose={handleCloseBimbinganModal}
          data={selectedData}
        />
      )}
    </div>
  );
};

export default RiwayatBimbingan;
