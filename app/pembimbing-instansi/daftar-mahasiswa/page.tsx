"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

const DaftarMahasiswa = () => {
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
    // Sample student data
    {
      name: "Abmi Sukma",
      semester: "5",
      instansi: "PT Telkom",
      imgSrc: "/avatar.png",
      notifications: 1,
    },
    {
      name: "Muh. Zaki Erbai Syas",
      semester: "5",
      instansi: "PT PLN",
      imgSrc: "/avatar.png",
    },
    {
      name: "Ahmad Kurniawan",
      semester: "9",

      imgSrc: "/avatar.png",
    },
    {
      name: "Nurika Dwi Wahyuni",
      semester: "5",

      imgSrc: "/avatar.png",
      notifications: 7,
    },
    {
      name: "Farras Lathief",
      semester: "5",
      instansi: "PT Pertamina",
      imgSrc: "/avatar.png",
    },
    {
      name: "Kurniawan Ahmad",
      semester: "7",
      instansi: "PT Pertamina",
      imgSrc: "/avatar.png",
    },
  ];

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        student.name.toLowerCase().includes(searchTerm) ||
        student.semester.includes(searchTerm)
      );
    });
  }, [searchQuery]);

  const handleCardClick = (name: string) => {
    const formattedName = name.toLowerCase().replace(/ /g, "-");
    router.push(`/pembimbing-instansi/mahasiswa/${formattedName}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-center sm:text-left mb-4 sm:mb-0 lg:mr-[300px] md:mr-[100px]">
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
          {/* Search icon */} 
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
              fill="#323232"
            />
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
                className="flex items-center bg-[#D9F9FF] p-6 rounded-[20px] shadow relative cursor-pointer hover:bg-[#C5F2FF] transition-colors lg:min-w-[450px] flex-grow"
              >
                <img
                  src={student.imgSrc}
                  alt={student.name}
                  className="w-20 h-20 rounded-full mr-6"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{student.name}</h3>
                  <p className="text-gray-600 mb-1">
                    Semester {student.semester}
                  </p>
                </div>
                {student.notifications && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {student.notifications}+
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-gray-500">
              Tidak ada bimbingan yang ditemukan
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DaftarMahasiswa;
