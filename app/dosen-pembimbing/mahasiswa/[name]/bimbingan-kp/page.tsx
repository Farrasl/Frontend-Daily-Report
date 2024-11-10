"use client";

import { useState } from "react";
import BimbinganKPModal from "../../../../../components/dosen-pembimbing/BimbinganKPModal";

interface ProfileData {
  nama: string;
  dosenPembimbing: string;
  nim: string;
  pembimbingInstansi: string;
  email: string;
}

const BimbinganKP = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("");
  const [evaluation, setEvaluation] = useState("");

  const [profileData] = useState<ProfileData>({
    nama: "Abmi Sukma",
    dosenPembimbing: "Dr. Ahmad",
    nim: "123456789",
    pembimbingInstansi: "Ir. Budi",
    email: "abmi.sukma@email.com",
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ date, evaluation });
    handleCloseModal();
  };

  const BimbinganHistory = [
    { tanggal: 'Sabtu, 2 Nov 2024', status: 'done', aksi: 'Lihat' },
    { tanggal: 'Senin, 16 Okt 2024', status: 'pending', aksi: 'Lihat' },
    { tanggal: 'Selasa, 6 Dec 2024', status: 'done', aksi: 'Lihat' },
    { tanggal: 'Rabu, 7 Jan 2024', status: 'done', aksi: 'Lihat' },
    { tanggal: 'Kamis, 8 Feb 2024', status: 'done', aksi: 'Lihat' },
    
  ];

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
                        onClick={() => console.log('View clicked')}
                      >
                        {item.aksi}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-2">
            <button
              className="flex items-center bg-[#00796B] text-white px-6 py-3 rounded-full shadow-lg"
              onClick={handleOpenModal}
            >
              <span className="mr-2">+</span>
              Buat laporan bimbingan mahasiswa
            </button>
          </div>
        </div>

      {/* BimbinganKPModal Component */}
      {isModalOpen && (
        <BimbinganKPModal
          date={date}
          evaluation={evaluation}
          setDate={setDate}
          setEvaluation={setEvaluation}
          handleSubmit={handleSubmit}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default BimbinganKP;
