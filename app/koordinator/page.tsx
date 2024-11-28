"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BatchSummaryProps {
  onBatchClick: (batch: number) => void;
  selectedBatch: number | null;
  batchData: any[];
}

const BatchSummary = ({ onBatchClick, selectedBatch, batchData }: BatchSummaryProps) => {
  const fixedBatchRange = Array.from({ length: 5 }, (_, i) => 21 - i);

  const batchMap = batchData.reduce((acc, item) => {
    acc[item.batch] = item.count;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="mt-4">
      <div className="grid grid-cols-5 gap-2 mt-4">
        {fixedBatchRange.map((batch) => (
          <div
            key={batch}
            className={`${
              selectedBatch === batch ? "bg-blue-600" : "bg-gray-800"
            } rounded p-2 text-center cursor-pointer hover:opacity-90 transition-all`}
            onClick={() => onBatchClick(batch)}
          >
            <div className="text-white text-lg font-bold">{batchMap[batch] || 0}</div>
            <div className="text-gray-200 text-xs">Angkatan {batch}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PembagianMahasiswaPerDosenPembimbing = () => {
  const data = [
    { name: 'Dr. Avilia Nasir, M.kom.', students: 9 },
    { name: 'Dr. Arida Nauli, M.kom.', students: 4 },
    { name: 'Dr. Lesari Handayani, S.T., M.kom.', students: 4 },
    { name: 'Dr. Fen Wilandari, M.Kom.', students: 2 },
    { name: 'Dr. Evi Septantiningtyas, M.Kom.', students: 2 },
    { name: 'Dr. Lina Gozali, S.ST, M.T.', students: 3 },
    { name: 'Muhammad Ridwan, M.T.', students: 3 },
    { name: 'Muhammad Faiqul, S.T., M.Cs.', students: 3 },
    { name: 'Hasanuddin Safwan, H., M.T.', students: 4 },
    { name: 'Rausyan Fikr, S.T., M.Kom.', students: 3 },
    { name: 'Irma Mayanti, S.T., M.Kom.', students: 3 },
    { name: 'Drs. Parno Gitom, S.T., M.Kom.', students: 5 },
    { name: 'Fahmiati Siddiq, S.T., M.Kom.', students: 2 },
    { name: 'Rila Ratnasari, S.T., M.Kom.', students: 2 },
    { name: 'Pius Yanto, M.Kom.', students: 2 },
    { name: 'Novia Sari, S.T., M.Kom.', students: 2 },
    { name: 'Yulian Mirza, S.T., M.Kom.', students: 3 },
    { name: 'Vera, MT', students: 3 },
    { name: 'Samsul Bahri, S.T., M.Kom.', students: 3 },
    { name: 'Suparno Saputro, S.T., M.Kom.', students: 3 },
    { name: 'Totok, D.MT.', students: 1 },
    { name: 'Yohanis Nainggolan, S.T., M.Kom.', students: 3 },
    { name: 'Meri Sri Hartati, S.T., M.Kom.', students: 3 },
  ].sort((a, b) => b.students - a.students);

  return (
    <div className="rounded-lg shadow-md mt-4" style={{ backgroundColor: "#D9F9FF" }}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Pembagian Mahasiswa per Dosen Pembimbing
          </h3>
          <div className="text-gray-600 text-sm">
            Total Mahasiswa: {data.reduce((sum, item) => sum + item.students, 0)}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              angle={-50}
              textAnchor="end"
              interval={0}
              height={100}
              style={{ fontSize: "12px" }}
            />
            <YAxis type="number" domain={[0, "dataMax"]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#0284C7" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBatch, setSelectedBatch] = useState<number | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const today = new Date();
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" } as const;
    setCurrentDate(today.toLocaleDateString("id-ID", options));
  }, []);

  const data = [
    { name: "Adinda Ardiana A.", nim: "11750112491", startDate: "26 Feb 2024", endDate: "5 Apr 2024", duration: 30 },
    { name: "Aji Prasetia", nim: "11850114990", startDate: "6 Jan 2024", endDate: "7 Mar 2024", duration: 66 },
    { name: "Andre Johan Jonner", nim: "11850111402", startDate: "16 Feb 2024", endDate: "28 Mar 2024", duration: 42 },
    { name: "Bima Sakti", nim: "11950112345", startDate: "10 Mar 2024", endDate: "15 Apr 2024", duration: 36 },
    { name: "Cahya Adi Putra", nim: "12050111456", startDate: "1 Apr 2024", endDate: "20 May 2024", duration: 50 },
    { name: "Dina Septiani", nim: "12050116789", startDate: "15 Jan 2024", endDate: "28 Feb 2024", duration: 45 },
    { name: "Eka Surya", nim: "11950113246", startDate: "22 Feb 2024", endDate: "5 Apr 2024", duration: 43 },
    { name: "Farhan Rizky", nim: "11950117890", startDate: "10 Mar 2024", endDate: "20 Apr 2024", duration: 41 },
    { name: "Gilang Permana", nim: "12150113579", startDate: "5 Feb 2024", endDate: "19 Mar 2024", duration: 42 },
    { name: "Hana Pratiwi", nim: "12150114568", startDate: "20 Jan 2024", endDate: "3 Mar 2024", duration: 43 },
    { name: "Irfan Maulana", nim: "12150114590", startDate: "12 Feb 2024", endDate: "24 Mar 2024", duration: 40 },
    { name: "Joko Sutrisno", nim: "12150116734", startDate: "25 Mar 2024", endDate: "30 Apr 2024", duration: 37 },
    { name: "Kiki Ramadhan", nim: "12150115842", startDate: "8 Jan 2024", endDate: "15 Feb 2024", duration: 38 },
    { name: "Lina Putri", nim: "12150113728", startDate: "20 Feb 2024", endDate: "3 Apr 2024", duration: 43 },
    { name: "Mira Andini", nim: "12050114789", startDate: "7 Mar 2024", endDate: "18 Apr 2024", duration: 43 },
  ];

  const getBatchFromNIM = (nim: string) => parseInt(nim.substring(1, 3));

  const calculateBatchData = () => {
    const batchCounts = data.reduce((acc, student) => {
      const batch = getBatchFromNIM(student.nim);
      acc[batch] = (acc[batch] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return Object.entries(batchCounts)
      .map(([batch, count]) => ({ batch: parseInt(batch), count }))
      .sort((a, b) => b.batch - a.batch);
  };

  const batchData = calculateBatchData();

  const filteredData = selectedBatch
    ? data.filter((student) => getBatchFromNIM(student.nim) === selectedBatch)
    : data;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleBatchClick = (batch: number) => {
    setSelectedBatch(batch === selectedBatch ? null : batch);
    setCurrentPage(1);
  };

  return (
    <div className="flex-1 overflow-y-auto justify-center h-screen">
      <div className="px-8">
        <div className="my-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-[#C5C5C5]">{currentDate}</p>
        </div>

        <div className="rounded-lg shadow-md" style={{ backgroundColor: "#D9F9FF" }}>
          <div className="p-3">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Durasi Kerja Praktek
              {selectedBatch && (
                <span className="ml-2 text-gray-600">(Angkatan {selectedBatch})</span>
              )}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-m text-left text-gray-700">
                <thead
                  className="text-[11px] text-gray-700 uppercase"
                  style={{ backgroundColor: "#C4F4FF" }}
                >
                  <tr>
                    <th className="px-2 py-1.5">No.</th>
                    <th className="px-2 py-1.5">Nama Mahasiswa</th>
                    <th className="px-2 py-1.5">NIM</th>
                    <th className="px-2 py-1.5">Tanggal Mulai</th>
                    <th className="px-2 py-1.5">Tanggal Selesai</th>
                    <th className="px-2 py-1.5">Durasi KP</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((student, index) => (
                    <tr
                      key={index}
                      className="border-b border-white hover:bg-gray-300 hover:bg-gray-100"
                    >
                      <td className="px-2 py-1.5">{startIndex + index + 1}</td>
                      <td className="px-2 py-1.5">{student.name}</td>
                      <td className="px-2 py-1.5">{student.nim}</td>
                      <td className="px-2 py-1.5">{student.startDate}</td>
                      <td className="px-2 py-1.5">{student.endDate}</td>
                      <td className="px-2 py-1.5">{student.duration} Hari</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-center justify-end text-gray-700 mt-2 space-x-2 px-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1 text-gray-700 hover:text-gray-900 disabled:text-gray-400"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-xs">
                  {startIndex + 1}-{Math.min(endIndex, filteredData.length)}/{filteredData.length}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1 text-gray-700 hover:text-gray-900 disabled:text-gray-400"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <BatchSummary
                batchData={batchData}
                selectedBatch={selectedBatch}
                onBatchClick={handleBatchClick}
              />
            </div>
          </div>
        </div>

        <PembagianMahasiswaPerDosenPembimbing />
      </div>
    </div>
  );
};

export default Dashboard;
