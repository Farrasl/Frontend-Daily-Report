"use client";

import { useEffect, useState } from "react";

// Types for Company and Student data
interface Student {
  namamahasiswa: string;
  progress: number;
  semester: number;
}

interface Company {
  namainstansi: string;
  students: Student[];
}

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [animatedProgress, setAnimatedProgress] = useState<{
    [key: string]: number;
  }>({});

  // Sample data for companies and students, including semester information
  const companies: Company[] = [
    {
      namainstansi: "PT Teknologi Indonesia",
      students: [
        { namamahasiswa: "Ahmad Kurniawan", progress: 80, semester: 5 },
        { namamahasiswa: "Nurika Dwi Wahyuni", progress: 80, semester: 5 },
        { namamahasiswa: "Haritsah Naufaldy", progress: 70, semester: 4 },
      ],
    },
    {
      namainstansi: "PT Sukses Makmur",
      students: [
        { namamahasiswa: "Muh. Zaki Erbai", progress: 90, semester: 6 },
        { namamahasiswa: "Fajri", progress: 60, semester: 4 },
        { namamahasiswa: "Muhammad Faruq", progress: 80, semester: 5 },
      ],
    },
    {
      namainstansi: "PT Pertamina",
      students: [
        { namamahasiswa: "Farras Lathief", progress: 100, semester: 7 },
        { namamahasiswa: "Abmi Sukma", progress: 75, semester: 5 },
      ],
    },
  ];

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    setCurrentDate(today.toLocaleDateString("id-ID", options));

    // Animate progress bars on initial load
    const timeouts = companies.flatMap((company, companyIdx) =>
      company.students.map((student, studentIdx) => {
        const studentKey = `${companyIdx}-${studentIdx}`; // Correct template literal
        return setTimeout(() => {
          setAnimatedProgress((prev) => ({
            ...prev,
            [studentKey]: student.progress,
          }));
        }, studentIdx * 200); // Delay each student's animation
      })
    );

    // Cleanup timeouts
    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Function to get initials from the student's name
  const getInitials = (name: string) => {
    const words = name.split(" "); // Memisahkan nama berdasarkan spasi
    return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
  };

  return (
    <div className="flex-1 overflow-y-auto justify-center h-screen bg-white">
      <div className="px-8">
        <div className="my-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">{currentDate}</p>
        </div>

        <div className="bg-[#D9F9FF] p-8 rounded-[20px] h-[164px] mb-10">
          <h2 className="text-xl font-semibold">
            Hi, <strong>Muhammad Irsyad!</strong>
          </h2>
          <p className="text-[#C5C5C5] mt-1">
            Selamat datang di dashboard monitoring perusahaan dan mahasiswa KP.
          </p>
        </div>

        {/* Company and Student Internship Statistics */}
        <div className="bg-[#D9F9FF] p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Statistik Perusahaan & Mahasiswa KP
          </h2>
          <div className="space-y-6">
            {companies.map((company, companyIdx) => (
              <div
                key={companyIdx}
                className="p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-bold mb-4">
                  {company.namainstansi}
                </h3>
                <ul className="space-y-3">
                  {company.students.map((student, studentIdx) => {
                    const studentKey = `${companyIdx}-${studentIdx}`; // Correct template literal
                    const progress = animatedProgress[studentKey] || 0;

                    return (
                      <li
                        key={studentIdx}
                        className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-[#9FD8E4] text-white flex items-center justify-center font-semibold">
                            {getInitials(student.namamahasiswa)}{" "}
                            {/* Display student's initials */}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {student.namamahasiswa}
                            </p>
                            <p className="text-sm text-gray-500">
                              Semester: {student.semester}
                            </p>
                          </div>
                        </div>
                        <div className="w-1/2">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-[#9FD8E4] h-3 rounded-full transition-width duration-500 ease-out"
                              style={{ width: `${progress}%` }} // Correct template literal
                            ></div>
                          </div>
                          <p className="text-right text-xs text-gray-500 mt-1">
                            {progress}% Completed
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
