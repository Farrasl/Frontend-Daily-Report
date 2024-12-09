"use client";

import Link from "next/link";
import { useState } from "react";
import AddTaskModal from "@/components/mahasiswa/AddTaskModal";

interface ProfilMahasiswa {
  name: string;
  progress: number;
}

interface ProfilPembimbingInstansi {
  name: string;
}

interface ProfilDosenPembimbing {
  name: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const profilMahasiswa: ProfilMahasiswa = {
    name: "Abmi Sukma",
    progress: 75,
  };

  const profilPembimbingInstansi: ProfilPembimbingInstansi = {
    name: "Sarinah, M. Pd.",
  };

  const profilDosenPembimbing: ProfilDosenPembimbing = {
    name: "Muhammad Irsyad, M.T.",
  };

  const getInitials = (name: string) => {
    const words = name.split(" "); // Memisahkan nama berdasarkan spasi
    return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
  };

  const menuItems = [
    {
      href: "/mahasiswa",
      label: "Dashboard",
      icon: (
        <svg
          width="55"
          height="55"
          viewBox="0 0 55 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_514_801)">
            <path
              d="M27.4999 13.0396L38.9583 23.3521V41.25H34.3749V27.5H20.6249V41.25H16.0416V23.3521L27.4999 13.0396ZM27.4999 6.875L4.58325 27.5H11.4583V45.8333H25.2083V32.0833H29.7916V45.8333H43.5416V27.5H50.4166L27.4999 6.875Z"
              fill="#323232"
            />
          </g>
          <defs>
            <clipPath id="clip0_514_801">
              <rect width="55" height="55" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      href: "/mahasiswa/daily-report",
      label: "Laporan",
      icon: (
        <svg
          width="55"
          height="55"
          viewBox="0 0 55 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_514_796)">
            <path
              d="M43.5417 6.87508H41.25V2.29175H36.6667V6.87508H18.3333V2.29175H13.75V6.87508H11.4583C8.91458 6.87508 6.89792 8.93758 6.89792 11.4584L6.875 43.5417C6.875 46.0626 8.91458 48.1251 11.4583 48.1251H43.5417C46.0625 48.1251 48.125 46.0626 48.125 43.5417V11.4584C48.125 8.93758 46.0625 6.87508 43.5417 6.87508ZM43.5417 43.5417H11.4583V20.6251H43.5417V43.5417ZM43.5417 16.0417H11.4583V11.4584H43.5417V16.0417ZM38.9583 27.5001H27.5V38.9584H38.9583V27.5001Z"
              fill="#323232"
            />
          </g>
          <defs>
            <clipPath id="clip0_514_796">
              <rect width="55" height="55" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      href: "/mahasiswa/bimbingan",
      label: "Bimbingan",
      icon: (
        <svg
          width="55"
          height="55"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1_122)">
            <path
              d="M7 15H14V17H7V15ZM7 11H17V13H7V11ZM7 7H17V9H7V7ZM19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C4.86 3 4.73 3.01 4.6 3.04C4.21 3.12 3.86 3.32 3.59 3.59C3.41 3.77 3.26 3.99 3.16 4.23C3.06 4.46 3 4.72 3 5V19C3 19.27 3.06 19.54 3.16 19.78C3.26 20.02 3.41 20.23 3.59 20.42C3.86 20.69 4.21 20.89 4.6 20.97C4.73 20.99 4.86 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 2.75C12.41 2.75 12.75 3.09 12.75 3.5C12.75 3.91 12.41 4.25 12 4.25C11.59 4.25 11.25 3.91 11.25 3.5C11.25 3.09 11.59 2.75 12 2.75ZM19 19H5V5H19V19Z"
              fill="#323232"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_122">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      href: "/",
      label: "Keluar",
      icon: (
        <svg
          width="55"
          height="55"
          viewBox="0 0 39 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_82_80)">
            <path
              d="M21.125 12.8333L23.4 15.4L19.175 20.1667H35.75V23.8333H19.175L23.4 28.6L21.125 31.1667L13 22L21.125 12.8333ZM6.5 34.8333H19.5V38.5H6.5C4.7125 38.5 3.25 36.85 3.25 34.8333V9.16667C3.25 7.15 4.7125 5.5 6.5 5.5H19.5V9.16667H6.5V34.8333Z"
              fill="#323232"
            />
          </g>
          <defs>
            <clipPath id="clip0_82_80">
              <rect
                width="39"
                height="44"
                fill="white"
                transform="matrix(-1 0 0 1 39 0)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full min-h-screen overflow-hidden">
      {/* Overlay for dark background when mobile menu is open */}
      {isBurgerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setIsBurgerOpen(false)}
        />
      )}

      {/* Mobile Burger Menu */}
      <div className="lg:hidden w-full bg-[#9FD8E4] p-3 fixed z-20">
        <button
          onClick={() => setIsBurgerOpen(!isBurgerOpen)}
          className="p-2 hover:bg-[#FFBF5F] rounded-md transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transform transition-transform duration-300 ${
              isBurgerOpen ? "rotate-90" : ""
            }`}
          >
            <path
              d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
              fill="#323232"
            />
          </svg>
          <span className="font-medium text-gray-800">Reportify KP</span>
        </button>

        {/* Mobile Menu Items */}
        <div
          className={`absolute w-[96%] top-16 bg-white shadow-lg rounded-lg transform transition-all duration-300 ease-in-out ${
            isBurgerOpen
              ? "translate-y-4 opacity-100 visible"
              : "-translate-y-4 opacity-0 invisible"
          }`}
        >
          <div className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="transform transition-all duration-300 hover:translate-x-2"
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#9FD8E4] group transition-all duration-300"
                    onClick={() => setIsBurgerOpen(false)}
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full  transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-gray-800 group-hover:text-[#2C707B]">
                        {item.label}
                      </span>
                      <span className="text-sm text-gray-500">
                        {index === 0 && "Lihat statistik dan progress"}
                        {index === 1 && "Kelola laporan harian"}
                        {index === 2 && "Jadwal bimbingan"}
                        {index === 3 && "Keluar dari aplikasi"}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col gap-5 w-full lg:w-[80px] h-auto lg:h-[96vh] lg:ml-[22px] bg-[#9FD8E4] p-3 rounded-[20px] transition-all">
        <div className="nav mt-[200px] flex-1">
          <div className="menu">
            <ul className="flex flex-col gap-5">
              {menuItems.slice(0, -1).map((item, index) => (
                <li key={index} className="relative group">
                  <Link
                    href={item.href}
                    className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 p-3 rounded-md transition-all hover:bg-[#FFBF5F]"
                  >
                    {item.icon}
                    <span className="absolute left-[70px] top-1/2 transform -translate-y-1/2 p-2 text-white bg-[#2C707B] opacity-0 invisible transition-all group-hover:left-[75px] group-hover:opacity-100 group-hover:visible rounded-[10px] z-50">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Logout Button */}
        <div className="menu">
          <ul>
            <li className="relative group">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 p-3 rounded-md transition-all hover:bg-[#FFBF5F]"
              >
                {menuItems[menuItems.length - 1].icon}
                <span className="absolute left-[70px] top-1/2 transform -translate-y-1/2 p-2 text-white bg-[#2C707B] opacity-0 invisible transition-all group-hover:left-[75px] group-hover:opacity-100 group-hover:visible rounded-[10px] z-50">
                  Keluar
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {children}

      {/* Profile Section */}
      <div className="w-full lg:w-[300px] h-auto lg:h-screen p-5 bg-[#F6F6F6] text-center mt-2 lg:mt-0 overflow-hidden">
        <div className="flex flex-col items-center relative">
          <h3 className="text-lg text-left w-full">
            <b>Profile</b>
          </h3>
          <div className="mt-3 mb-3">
            <div className="flex items-center justify-center w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] rounded-full bg-[#9FD8E4] text-white font-bold text-4xl">
              {getInitials(profilMahasiswa.name)}
            </div>
          </div>
          <h3 className="font-bold text-lg">{profilMahasiswa.name}</h3>
          <p className="text-[#C5C5C5] text-sm mt-2">12250111512</p>
          <p className="text-[#C5C5C5] text-sm">PT Pertamina</p>
        </div>

        {/* Supervisor Section */}
        <div className="text-left">
          <h3 className="text-lg mt-5 mb-1">
            <b>Supervisor</b>
          </h3>
          <div className="flex items-center bg-[#FFBF5F] rounded-[10px] p-3 mb-2">
            <div className="flex items-center justify-center w-[45px] h-[45px] lg:w-[55px] lg:h-[55px] rounded-full bg-[#9FD8E4] text-white mr-3 font-bold text-md">
              {getInitials(profilDosenPembimbing.name)}
            </div>
            <div className="supervisor-info">
              <h4 className="font-bold text-sm">
                {profilDosenPembimbing.name}
              </h4>
              <p className="text-xs">Dosen Pembimbing</p>
            </div>
          </div>
          <div className="flex items-center bg-[#FFBF5F] rounded-[10px] p-3 mb-2">
            <div className="flex items-center justify-center w-[45px] h-[45px] lg:w-[55px] lg:h-[55px] rounded-full bg-[#9FD8E4] text-white mr-3 font-bold text-md">
              {getInitials(profilPembimbingInstansi.name)}
            </div>
            <div className="supervisor-info">
              <h4 className="font-bold text-sm">
                {profilPembimbingInstansi.name}
              </h4>
              <p className="text-xs">Pembimbing Instansi</p>
            </div>
          </div>
        </div>

        {/* Report Button with Modal */}
        <div className="report-section mt-20 mb-5 text-left">
          <h3 className="text-lg mb-1">
            <b>Buat Laporan</b>
          </h3>
          <div
            className="bg-[#2C707B] text-white flex rounded-md p-6 cursor-pointer"
            onClick={() => setIsAddTaskModalOpen(true)}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="25" height="25" rx="5" fill="#FFBF5F" />
              <path
                d="M17 13.7143H12.7143V18H11.2857V13.7143H7V12.2857H11.2857V8H12.7143V12.2857H17V13.7143Z"
                fill="#323232"
              />
            </svg>
            <span className="ml-2">Tambah Laporan</span>
          </div>
          <AddTaskModal
            isOpen={isAddTaskModalOpen}
            onClose={() => setIsAddTaskModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}
