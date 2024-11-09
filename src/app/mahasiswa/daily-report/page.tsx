"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReviewModal from "@/src/app/mahasiswa/components/reviewmodal";

const DailyReport = () => {
  const router = useRouter();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);

  const tasks = [
    { task: 'Design UI "Daily Report"', date: 'Jumat, 20 Oktober', status: 'Not yet' },
    { task: 'Pemasangan router baru di ruangan Boss', date: 'Kamis, 19 Oktober', status: 'Done' },
    { task: '#3 Perancangan server baru di ruang karyawan', date: 'Rabu, 18 Oktober', status: 'Done' },
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
    <div className="flex-1 h-screen overflow-y-auto bg-white">
      {/* Daily Report content */}
      <div className="px-8">
        <div className="pt-10 mb-8">
          <h2 className="text-xl font-bold">Daily Report</h2>
          <p className="text-gray-500">Friday, 20 Oct 2024</p>
        </div>
        <div className="flex justify-end">
          <button className="bg-[#FFBF5F] text-black py-2 px-4 rounded-md flex items-center gap-2 mb-2">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_393_103)">
                <path
                  d="M19.5 9H15.5V3H9.5V9H5.5L12.5 16L19.5 9ZM11.5 11V5H13.5V11H14.67L12.5 13.17L10.33 11H11.5ZM5.5 18H19.5V20H5.5V18Z"
                  fill="#323232"
                />
              </g>
              <defs>
                <clipPath id="clip0_393_103">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            Cetak Daily Report
          </button>
        </div>
        <div className="bg-[#D9F9FF] p-4 rounded-[20px] mb-8">
          <h2 className="text-lg font-semibold mb-4">My Daily Report</h2>
          <div className="bg-[#D9F9FF] rounded-lg overflow-hidden">
            <table className="w-full text-left table-fixed">
              <thead>
                <tr className="bg-[#D9F9FF]">
                  <th className="w-1/2 py-4 px-6 border-b-2 font-semibold text-sm tracking-wider">
                    All Task
                  </th>
                  <th className="w-1/4 py-4 px-6 border-b-2 font-semibold text-sm tracking-wider">
                    Date
                  </th>
                  <th className="w-1/4 py-4 px-6 border-b-2 font-semibold text-sm tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-2">
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
                          task.status === 'Done'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
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

export default DailyReport;