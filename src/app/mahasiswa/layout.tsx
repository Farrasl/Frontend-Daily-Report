"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddTaskModal from "@/src/app/mahasiswa/components/addtaskmodal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  return (
    <main>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full min-h-screen">
        {/* Sidebar */}
        <div className="flex lg:flex-col gap-5 w-full lg:w-[92px] h-auto lg:h-[90vh] lg:ml-[50px] bg-[#9FD8E4] p-3 rounded-[20px] transition-all">
          <div className="nav lg:mt-[175px] flex-1">
            <div className="menu">
              <ul className="flex lg:flex-col gap-5">
                <li className="relative group">
                  <Link
                    href="/mahasiswa/dashboard"
                    className="flex items-center justify-center lg:justify-start gap-2 text-sm font-medium text-gray-500 p-3 rounded-md transition-all hover:bg-[#FFBF5F]"
                  >
                    <svg
                      width="55"
                      height="55"
                      viewBox="0 0 55 55"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_82_109)">
                        <path
                          d="M27.5 13.0396L38.9584 23.3521V41.25H34.375V27.5H20.625V41.25H16.0417V23.3521L27.5 13.0396ZM27.5 6.875L4.58337 27.5H11.4584V45.8333H25.2084V32.0833H29.7917V45.8333H43.5417V27.5H50.4167L27.5 6.875Z"
                          fill="#323232"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_82_109">
                          <rect width="55" height="55" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <span className="absolute left-[70px] top-1/2 transform -translate-y-1/2 p-2 text-white bg-[#2C707B] opacity-0 invisible transition-all group-hover:left-[75px] group-hover:opacity-100 group-hover:visible rounded-[10px]">
                      Dashboard
                    </span>
                  </Link>
                </li>
                <li className="relative group">
                  <Link
                    href="/mahasiswa/daily-report"
                    className="flex items-center justify-center lg:justify-start gap-2 text-sm font-medium text-gray-500 p-3 rounded-md transition-all hover:bg-[#FFBF5F]"
                  >
                    <svg
                      width="55"
                      height="55"
                      viewBox="0 0 55 55"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_82_110)">
                        <path
                          d="M43.5417 6.87508H41.25V2.29175H36.6667V6.87508H18.3333V2.29175H13.75V6.87508H11.4583C8.91458 6.87508 6.89792 8.93758 6.89792 11.4584L6.875 43.5417C6.875 46.0626 8.91458 48.1251 11.4583 48.1251H43.5417C46.0625 48.1251 48.125 46.0626 48.125 43.5417V11.4584C48.125 8.93758 46.0625 6.87508 43.5417 6.87508ZM43.5417 43.5417H11.4583V20.6251H43.5417V43.5417ZM43.5417 16.0417H11.4583V11.4584H43.5417V16.0417ZM38.9583 27.5001H27.5V38.9584H38.9583V27.5001Z"
                          fill="#323232"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_82_110">
                          <rect width="55" height="55" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="absolute left-[70px] top-1/2 transform -translate-y-1/2 p-2 text-white bg-[#2C707B] opacity-0 invisible transition-all group-hover:left-[75px] group-hover:opacity-100 group-hover:visible rounded-[10px]">
                      Daily Report
                    </span>
                  </Link>
                </li>
                <li className="relative group">
                  <Link
                    href="/mahasiswa/bimbingan"
                    className="flex items-center justify-center lg:justify-start gap-2 text-sm font-medium text-gray-500 p-3 rounded-md transition-all hover:bg-[#FFBF5F]"
                  >
                    <svg
                      width="52"
                      height="53"
                      viewBox="0 0 52 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26 52.5C28.8134 52.5 31.1153 50.1 31.1153 47.1667H20.8847C20.8847 50.1 23.1866 52.5 26 52.5ZM41.346 36.5V23.1667C41.346 14.98 37.177 8.12667 29.8365 6.31333V4.5C29.8365 2.28667 28.1229 0.5 26 0.5C23.8771 0.5 22.1635 2.28667 22.1635 4.5V6.31333C14.8485 8.12667 10.654 14.9533 10.654 23.1667V36.5L5.53862 41.8333V44.5H46.4614V41.8333L41.346 36.5ZM36.2307 39.1667H15.7693V23.1667C15.7693 16.5533 19.6314 11.1667 26 11.1667C32.3686 11.1667 36.2307 16.5533 36.2307 23.1667V39.1667ZM14.6951 4.71333L11.0376 0.9C4.8992 5.78 0.858074 13.3 0.5 21.8333H5.61535C5.999 14.7667 9.47743 8.58 14.6951 4.71333ZM46.3847 21.8333H51.5C51.1163 13.3 47.0752 5.78 40.9624 0.9L37.3305 4.71333C42.497 8.58 46.001 14.7667 46.3847 21.8333Z"
                        fill="#323232"
                      />
                    </svg>

                    <span className="absolute left-[70px] top-1/2 transform -translate-y-1/2 p-2 text-white bg-[#2C707B] opacity-0 invisible transition-all group-hover:left-[75px] group-hover:opacity-100 group-hover:visible rounded-[10px]">
                      Bimbingan
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="menu">
            <ul>
              <li className="relative group">
                <Link
                  href="/"
                  className="flex items-center justify-center lg:justify-start gap-2 text-sm font-medium text-gray-500 p-3 rounded-md transition-all hover:bg-[#FFBF5F]"
                >
                  <svg
                    width="55"
                    height="55"
                    viewBox="0 0 30 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_82_111)">
                      <path
                        d="M21.125 12.8333L23.4 15.4L19.175 20.1667H35.75V23.8333H19.175L23.4 28.6L21.125 31.1667L13 22L21.125 12.8333ZM6.5 34.8333H19.5V38.5H6.5C4.7125 38.5 3.25 36.85 3.25 34.8333V9.16667C3.25 7.15 4.7125 5.5 6.5 5.5H19.5V9.16667H6.5V34.8333Z"
                        fill="#323232"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_82_111">
                        <rect
                          width="39"
                          height="44"
                          fill="white"
                          transform="matrix(-1 0 0 1 39 0)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <span className="absolute left-[70px] top-1/2 transform -translate-y-1/2 p-2 text-white bg-[#2C707B] opacity-0 invisible transition-all group-hover:left-[75px] group-hover:opacity-100 group-hover:visible rounded-[10px]">
                    Logout
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {children}
        {/* Profile Section */}
        <div className="w-full lg:w-[300px] h-auto lg:h-screen p-5 bg-[#F6F6F6] text-center mt-5 lg:mt-0">
          <div className="flex flex-col items-center relative">
            <h3 className="text-lg text-left w-full">
              <b>Profile</b>
            </h3>
            <br />
            <div className="relative w-[150px] h-[150px] mb-5">
              <Image
                src="/avatar.png"
                alt="Profile Picture"
                className="absolute top-0 left-0 w-[150px] h-[150px] rounded-full object-cover"
                width={150}
                height={150}
              />
              <div className="absolute top-0 left-0 w-[150px] h-[150px] border-4 border-[#A2E2E8] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)] animate-spin"></div>
            </div>
            <h3 className="font-bold text-lg">Abmi Sukma</h3>
            <p className="text-[#C5C5C5] text-sm">12250111</p>
            <p className="text-[#C5C5C5] text-sm">
              PT. Pertamina Kota Pekanbaru
            </p>
          </div>

          {/* Supervisor Section */}
          <div className="text-left">
            <h3 className="text-lg mt-5">
              <b>Supervisor</b>
            </h3>
            <div className="flex items-center bg-[#FFBF5F] rounded-[10px] p-3 mb-2">
              <Image
                src="/avatar.png"
                alt="Supervisor 1"
                className="w-[50px] h-[50px] rounded-full mr-2"
                width={50}
                height={50}
              />
              <div className="supervisor-info">
                <h4 className="font-bold text-sm">Pizaini</h4>
                <p className="text-xs text-[#C5C5C5]">Dosen Pembimbing</p>
              </div>
            </div>
            <div className="flex items-center bg-[#FFBF5F] rounded-[10px] p-3 mb-2">
              <Image
                src="/avatar.png"
                alt="Supervisor 2"
                className="w-[50px] h-[50px] rounded-full mr-2"
                width={50}
                height={50}
              />
              <div className="supervisor-info">
                <h4 className="font-bold text-sm">Yelfi Fitriani</h4>
                <p className="text-xs text-[#C5C5C5]">Pembimbing Instansi</p>
              </div>
            </div>
          </div>

          {/* Report Button with Modal */}
          <div className="report-section mt-10 mb-5 text-left">
            <h3 className="text-lg">
              <b>Buat Laporan</b>
            </h3>
            <div
              className="bg-[#2C707B] text-white flex flex-col rounded-md p-6 cursor-pointer"
              onClick={() => setIsAddTaskModalOpen(true)}
            >
              <p>Tambah laporan harian mu sekarang</p>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-3"
              >
                <rect width="25" height="25" rx="5" fill="#FFBF5F" />
                <path
                  d="M17 13.7143H12.7143V18H11.2857V13.7143H7V12.2857H11.2857V8H12.7143V12.2857H17V13.7143Z"
                  fill="#323232"
                />
              </svg>
            </div>
            <AddTaskModal
              isOpen={isAddTaskModalOpen}
              onClose={() => setIsAddTaskModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
