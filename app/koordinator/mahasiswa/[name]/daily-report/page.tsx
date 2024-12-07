"use client";

import React, {use, useState } from 'react';
import { useRouter } from "next/navigation";
import ReviewModal from "../../../../../components/pembimbing-instansi/ReviewModal";

const DailyReportPage = ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = use(params);

  const profileData = {
    nim: "12250120341",
    nama: name,
    dosenPembimbing: "Muhammad Irsyad, S.T., M.T.",
    pembimbingInstansi: "Sarinah, M.Pd.",
    email: "abmisukma.e@gmail.com",
  };

  const router = useRouter();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
  
  const tasks = [
    { task: 'Design UI "Daily Report"', date: 'Jumat, 20 Oktober', status: 'Belum' },
    { task: 'Pemasangan router baru di ruangan Boss', date: 'Kamis, 19 Oktober', status: 'Sudah' },
    { task: '#3 Perancangan server baru di ruang karyawan', date: 'Rabu, 18 Oktober', status: 'Sudah' },
    { task: 'Design UI "Daily Report"', date: 'Jumat, 20 Oktober', status: 'Belum' },
    { task: 'Pemasangan router baru di ruangan Boss', date: 'Kamis, 19 Oktober', status: 'Sudah' },
    { task: '#3 Perancangan server baru di ruang karyawan', date: 'Rabu, 18 Oktober', status: 'Sudah' },
    { task: 'Design UI "Daily Report"', date: 'Jumat, 20 Oktober', status: 'Belum' },
    { task: 'Pemasangan router baru di ruangan Boss', date: 'Kamis, 19 Oktober', status: 'Sudah' },
    { task: '#3 Perancangan server baru di ruang karyawan', date: 'Rabu, 18 Oktober', status: 'Sudah' },
    { task: 'Design UI "Daily Report"', date: 'Jumat, 20 Oktober', status: 'Belum' },
    { task: 'Pemasangan router baru di ruangan Boss', date: 'Kamis, 19 Oktober', status: 'Sudah' },
    { task: '#3 Perancangan server baru di ruang karyawan', date: 'Rabu, 18 Oktober', status: 'Sudah' },
    { task: 'Design UI "Daily Report"', date: 'Jumat, 20 Oktober', status: 'Belum' },
    { task: 'Pemasangan router baru di ruangan Boss', date: 'Kamis, 19 Oktober', status: 'Sudah' },
    { task: '#3 Perancangan server baru di ruang karyawan', date: 'Rabu, 18 Oktober', status: 'Sudah' },
    { task: 'Design UI "Daily Report"', date: 'Jumat, 20 Oktober', status: 'Belum' },
    { task: 'Pemasangan router baru di ruangan Boss', date: 'Kamis, 19 Oktober', status: 'Sudah' },
    { task: '#3 Perancangan server baru di ruang karyawan', date: 'Rabu, 18 Oktober', status: 'Sudah' },
    { task: 'Design UI "Daily Report"', date: 'Jumat, 20 Oktober', status: 'Belum' },
    { task: 'Pemasangan router baru di ruangan Boss', date: 'Kamis, 19 Oktober', status: 'Sudah' },
    { task: '#3 Perancangan server baru di ruang karyawan', date: 'Rabu, 18 Oktober', status: 'Sudah' },
    { task: 'Design UI "Daily Report"', date: 'Jumat, 20 Oktober', status: 'Belum' },
    { task: 'Pemasangan router baru di ruangan Boss', date: 'Kamis, 19 Oktober', status: 'Sudah' },
    { task: '#3 Perancangan server baru di ruang karyawan', date: 'Rabu, 18 Oktober', status: 'Sudah' },
  ];

  
  const handleRowClick = (taskIndex: number) => {
    setSelectedTaskIndex(taskIndex);
    setIsReviewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsReviewModalOpen(false);
    setSelectedTaskIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-center text-xl font-bold mb-8 px-4">
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

      <div className="mt-6">
        <h1 className="text-2xl font-bold mb-4">Laporan Harian</h1>
        <div className="bg-[#D9F9FF] rounded-[20px] overflow-hidden max-h-60 overflow-y-auto">
          <table className="w-full text-left table-fixed">
            <thead>
              <tr className="bg-[#D9F9FF]">
                <th className="w-1/2 py-4 px-6 border-b-2 font-semibold text-sm tracking-wider">
                  Agenda
                </th>
                <th className="w-1/4 py-4 px-6 border-b-2 font-semibold text-sm tracking-wider">
                  Tanggal
                </th>
                <th className="w-1/4 py-4 px-6 border-b-2 font-semibold text-sm tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map((task, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(index)}
                  className="hover:bg-[#A1D1DD] transition-colors duration-150 cursor-pointer"
                >
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {task.task}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {task.date}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                        task.status === "Sudah"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>    
          {/* Review Modal */}
          <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={handleCloseModal}
          taskIndex={selectedTaskIndex}
          tasks={tasks}
        />    </div>
  );
};

export default DailyReportPage;
