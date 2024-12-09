"use client";

import React, { useState } from "react";
import { User, Mail, FileText, Plus } from "lucide-react";
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

const BimbinganKP = ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = React.use(params);

  const [isBimbinganKPModalOpen, setIsBimbinganKPModalOpen] = useState(false);
  const [isBimbinganModalOpen, setIsBimbinganModalOpen] = useState(false);
  const [date, setDate] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [selectedData, setSelectedData] = useState<BimbinganHistoryItem | null>(
    null
  );

  const profileData = {
    nim: "12250120341",
    nama: name,
    dosenPembimbing: "Muhammad Irsyad, S.T., M.T.",
    pembimbingInstansi: "Sarinah, M.Pd.",
    email: "abmisukma.e@gmail.com",
  };

  const dosenPembimbing = {
    nama: "Pizaini",
  };

  const getInitials = (name: string) => {
    const words = name.split(" "); // Memisahkan nama berdasarkan spasi
    return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
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

  const handleOpenBimbinganKPModal = () => {
    setIsBimbinganKPModalOpen(true);
  };

  const handleCloseBimbinganKPModal = () => {
    setIsBimbinganKPModalOpen(false);
  };

  const handleOpenBimbinganModal = (data: BimbinganHistoryItem) => {
    setSelectedData(data);
    setIsBimbinganModalOpen(true);
  };

  const handleCloseBimbinganModal = () => {
    setIsBimbinganModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ date, evaluation });
    handleCloseBimbinganKPModal();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Project Title */}
        <div className="bg-gradient-to-r from-cyan-100 to-blue-100 p-4">
          <h1 className="text-center text-sm sm:text-base lg:text-lg font-bold text-gray-800">
            PERANCANGAN SISTEM INFORMASI PEMANTAUAN PERKEMBANGAN STATUS
            PERBAIKAN KOMPUTER BERBASIS WEB DI PT. PERTAMINA
          </h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl  p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-40 h-40 sm:w-50 sm:h-50 rounded-full border-4 border-[#A2E2E8] bg-[#9FD8E4] flex items-center justify-center">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                  {getInitials(profileData.nama)}
                </span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-500">Nama Mahasiswa</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.nama}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-500">NIM</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.nim}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-500">Dosen Pembimbing</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.dosenPembimbing}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-500">Pembimbing Instansi</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.pembimbingInstansi}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 md:col-span-2">
                  <Mail className="text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Riwayat Bimbingan Section */}
        <div className="p-6 bg-white-50">
          <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
            Riwayat Bimbingan
          </h2>
          <div className="flex items-center bg-[#FFBF5F] rounded-[20px] p-3 mb-2">
            <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#9FD8E4] rounded-full text-white text-xl font-semibold mr-3">
              {getInitials(dosenPembimbing.nama)}
            </div>
            <div className="supervisor-info">
              <h4 className="font-bold text-sm">{dosenPembimbing.nama}</h4>
              <p className="text-xs text-[#C5C5C5]">Dosen Pembimbing</p>
            </div>
          </div>
          <div className="bg-[#D9F9FF] rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#F0F9FF]">
                <tr>
                  <th className="py-3 px-4 text-left  font-semibold">
                    Tanggal
                  </th>
                  <th className="py-3 px-4 text-right font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {BimbinganHistory.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100  transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-700">{item.tanggal}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        className="text-teal-600 hover:text-teal-800 font-medium 
                        px-3 py-1 rounded-full hover:bg-teal-50 transition-colors"
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
