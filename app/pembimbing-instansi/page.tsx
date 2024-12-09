"use client";

import { Users, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import React, { useState, useEffect } from "react";

type ActivityCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: string | number;
  color: string;
};

interface Student {
  id: number;
  name: string;
  prodi: string;
  company: string;
  progress: number;
  status: string;
  startDate: string;
  endDate: string;
  avatar: string;
}

// Mock Data
const studentData: Student[] = [
  {
    id: 1,
    name: "Ahmad Kurniawan",
    prodi: "Teknik Informatika",
    company: "PT Inovasi Teknologi",
    progress: 65,
    status: "In Progress",
    startDate: "15 Mei 2024",
    endDate: "15 Agustus 2024",
    avatar: "/api/placeholder/100/100",
  },
  {
    id: 2,
    name: "Nurika Dwi Wahyuni",
    prodi: "Sistem Informasi",
    company: "PT Inovasi Teknologi",
    progress: 40,
    status: "Observation",
    startDate: "1 Juni 2024",
    endDate: "1 September 2024",
    avatar: "/api/placeholder/100/100",
  },
];

const ActivityCard: React.FC<ActivityCardProps> = ({
  icon: Icon,
  title,
  value,
  color,
}) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4 w-full">
    <div className={`p-3 rounded-full ${color}`}>
      <Icon className="text-white w-5 h-5 md:w-6 md:h-6" />
    </div>
    <div>
      <p className="text-gray-500 text-xs md:text-sm">{title}</p>
      <h3 className="text-lg md:text-xl font-bold">{value}</h3>
    </div>
  </div>
);

const getInitials = (name: string) => {
  const words = name.split(" "); // Memisahkan nama berdasarkan spasi
  return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
};

const StudentCard = ({ student }: { student: Student }) => (
  <div className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-base md:text-xl font-bold">
        {getInitials(student.name)}
      </div>
      <div>
        <h3 className="font-bold text-base md:text-lg">{student.name}</h3>
        <p className="text-gray-500 text-sm">{student.prodi}</p>
      </div>
    </div>

    <div className="space-y-2">
      <div className="flex justify-between text-xs md:text-sm">
        <span>Progress</span>
        <span>{student.progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${student.progress}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="text-xs md:text-sm">
          <p className="text-gray-500">Company</p>
          <p className="font-semibold">{student.company}</p>
        </div>
        <div className="text-xs md:text-sm">
          <p className="text-gray-500">Status</p>
          <p
            className={`font-semibold ${
              student.status === "In Progress"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {student.status}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function Page() {
  const totalDays = 30;
  const currentDay = 1;
  const progressPercentage = (currentDay / totalDays) * 100;
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    setCurrentDate(today.toLocaleDateString("id-ID", options));
  }, []);

  const timelinePoints = Array.from({ length: 6 }, (_, index) => {
    const day = index * 6;
    return {
      day: day === 0 ? 1 : day,
      isActive: currentDay >= day,
    };
  });

  return (
    <div className="flex-1 overflow-y-auto justify-center min-h-screen p-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-4 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
          <p className="text-[#C5C5C5] text-sm">{currentDate}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <ActivityCard
            icon={Users}
            title="Total Students"
            value={studentData.length}
            color="bg-blue-500"
          />
          <ActivityCard
            icon={Clock}
            title="Active Internships"
            value="2"
            color="bg-green-500"
          />
          <ActivityCard
            icon={CheckCircle}
            title="Completed"
            value="0"
            color="bg-purple-500"
          />
          <ActivityCard
            icon={AlertTriangle}
            title="Pending"
            value="0"
            color="bg-yellow-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {studentData.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      </div>
    </div>
  );
}
