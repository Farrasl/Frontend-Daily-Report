"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const students = [
    {
      name: "Abmi Sukma",
      university: "Teknik Informatika - UIN Suska Riau",
      imgSrc: "/avatar.png",
      notifications: 1,
    },
    {
      name: "Muh. Zaki Erbai Syas",
      university: "Teknik Informatika - UIN Suska Riau",
      imgSrc: "/avatar.png",
    },
    {
      name: "Ahmad Kurniawan",
      university: "Teknik Informatika - UIN Suska Riau",
      imgSrc: "/avatar.png",
    },  
    {
      name: "Nurika Dwi Wahyuni",
      university: "Teknik Informatika - UIN Suska Riau",
      imgSrc: "/avatar.png",
      notifications: 7,
    },
    {
      name: "Farras Lathief",
      university: "Teknik Informatika - UIN Suska Riau",
      imgSrc: "/avatar.png",
    },
    { 
      name: "Kurniawan Ahmad", 
      university: "Teknik Informatika - UIN Suska Riau", 
      imgSrc: "/avatar.png" 
    },
  ];

  // Filter students based on search query
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        student.name.toLowerCase().includes(searchTerm) ||
        student.university.toLowerCase().includes(searchTerm)
      );
    });
  }, [searchQuery]);

  const handleCardClick = (name: string) => {
    const formattedName = name.toLowerCase().replace(/ /g, "-");
    router.push(`/pembimbing-instansi/mahasiswa/${formattedName}`);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8">
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            Daftar Nama Bimbingan Kerja Praktik
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari disini"
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-2 pl-10 text-gray-700 bg-[#D9D9D9] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_154_145)">
                <path
                  d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                  fill="#323232"
                />
              </g>
              <defs>
                <clipPath id="clip0_154_145">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        <div className="h-[calc(122vh-300px)] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div
                  key={student.name}
                  onClick={() => handleCardClick(student.name)}
                  className="flex items-center bg-[#D9F9FF] p-6 rounded-[20px] shadow relative cursor-pointer hover:bg-[#C5F2FF] transition-colors"
                >
                  <img
                    src={student.imgSrc}
                    alt={student.name}
                    className="w-20 h-20 rounded-full mr-6"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{student.name}</h3>
                    <p className="text-gray-600 mb-1">Mahasiswa</p>
                    <p className="text-gray-600">{student.university}</p>
                  </div>
                  {student.notifications && (
                    <div className="absolute right-6 flex items-center justify-center w-8 h-8 text-white bg-red-600 rounded-full font-bold">
                      {student.notifications}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-500">
                Tidak ada mahasiswa yang ditemukan
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;