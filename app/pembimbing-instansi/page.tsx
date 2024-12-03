"use client"

import { useEffect, useState} from "react";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState("");

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

  return (
    <div className="flex-1 overflow-y-auto justify-center min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="my-4 sm:my-8">
          <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
          <p className="text-[#C5C5C5]">{currentDate}</p>
        </div>

        {/* Welcome Box */}
        <div className="bg-[#D9F9FF] w-full p-4 sm:p-6 rounded-[20px] mb-4 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold">
            Hi, <strong>Sarinah!</strong>
          </h2>
          <p className="text-[#C5C5C5] mt-2 text-sm sm:text-base">
            Awali hari ini dengan semangat dan dedikasi! Setiap langkah kecil
            yang Anda ambil dalam mengisi <i>Daily Report</i> membawa Anda lebih
            dekat ke kesuksesan. Terus belajar dan berkembang!
          </p>
        </div>
    </div>
    </div>
  );
};

export default Dashboard;