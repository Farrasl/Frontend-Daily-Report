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
    <div className="flex flex-col justify-start min-h-screen max-w-4xl py-8">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-[#C5C5C5]">{currentDate}</p>
      </div>

      <div className="bg-[#D9F9FF] p-8 rounded-[20px] h-[164px] mb-10">
        <h2 className="text-xl font-semibold">
          Hi, <strong>Sarinah!</strong>
        </h2>
        <p className="text-[#C5C5C5] mt-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quis voluptate dolorum, natus corporis quibusdam, unde magni, eos nesciunt id provident amet dignissimos quos delectus. Doloribus quidem laborum beatae corporis.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;