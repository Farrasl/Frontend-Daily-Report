"use client";
import React, { useState } from "react";
import Image from "next/image";
import BimbinganKPModal from "../../../../../components/dosen-pembimbing/BimbinganKPModal";
import BimbinganModal from "../../../../../components/mahasiswa/BimbinganModal";


interface ProfileData {
  nama: string;
  dosenPembimbing: string;
  nim: string;
  pembimbingInstansi: string;
  email: string;
}

interface BimbinganHistoryItem {
  tanggal: string;
  status: string;
  aksi: string;
  evaluasi: string;
  nim: string;
  nama: string;
  dosenPembimbing: string;
  pembimbingInstansi: string;
  statusPenerimaan: string;
}


const BimbinganKP = ({ params }: { params: { name: string } }) => {
  const { name } = params;

  const [isBimbinganModalOpen, setIsBimbinganModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<BimbinganHistoryItem | null>(null);

  const profileData = {
    nim: "12250120341",
    nama: name,
    dosenPembimbing: "Muhammad Irsyad, S.T., M.T.",
    pembimbingInstansi: "Sarinah, M.Pd.",
    email: "abmisukma.e@gmail.com",
  };
  
  const BimbinganHistory: BimbinganHistoryItem[] = [
    {
      tanggal: "Sabtu, 29 Oktober 2024",
      status: "done",
      aksi: "Lihat",
      evaluasi: "Kerja sama tim baik.",
      nim: profileData.nim,
      nama: profileData.nama,
      dosenPembimbing: profileData.dosenPembimbing,
      pembimbingInstansi: profileData.pembimbingInstansi,
      statusPenerimaan: "Diterima",
    },
    {
      tanggal: "Senin, 1 November 2024",
      status: "pending",
      aksi: "Lihat",
      evaluasi: "Perlu peningkatan pada laporan.",
      nim: profileData.nim,
      nama: profileData.nama,
      dosenPembimbing: profileData.dosenPembimbing,
      pembimbingInstansi: profileData.pembimbingInstansi,
      statusPenerimaan: "Menunggu",
    },
  ];

  const handleOpenBimbinganModal = (data: BimbinganHistoryItem) => {
    setSelectedData(data);
    setIsBimbinganModalOpen(true);
  };

  const handleCloseBimbinganModal = () => {
    setIsBimbinganModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-center text-xl font-bold mb-4 px-4">
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
      
        {/* Riwayat Bimbingan Section */}
        <div className="mt-6">
          <h2 className="text-center text-xl font-bold mb-4">
            Riwayat Bimbingan
          </h2>
          <div className="flex items-center bg-[#FFBF5F] rounded-[10px] p-3 mb-2">
              <Image
                src="/avatar.png"
                alt="Supervisor 1"
                className="w-[50px] h-[50px] rounded-full mr-2"
                width={50}
                height={50}
              />
              <div className="supervisor-info">
                <h4 className="font-bold text-sm">Pizaini</h4>
                <p className="text-xs text-[#C5C5C5]">Dosen Pembimbing</p>
              </div>
            </div>
          <div className="bg-[#D9F9FF] rounded-[20px] p-4  h-[200px] overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="py-2 px-4 text-[#323232]">Tanggal</th>
                  <th className="py-2 px-4 text-[#323232] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {BimbinganHistory.map((item, index) => (
                  <tr key={index} className="border-t border-sky-100">
                    <td className="py-3 px-4 text-[#323232]">{item.tanggal}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        className="text-[#2C707B] hover:text-[#9FD8E4] font-medium focus:outline-none"
                        onClick={() => handleOpenBimbinganModal(item)}
                        >
                        {item.aksi}
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

export default BimbinganKP;
