"use client";

import Link from "next/link";
import { useState } from "react";

interface ProfilDosenPembimbing {
  name: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const profilDosenPembimbing: ProfilDosenPembimbing = {
    name: "Muhammad Irsyad, M.T.",
  };

  const getInitials = (name: string) => {
    const words = name.split(" "); // Memisahkan nama berdasarkan spasi
    return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
  };


  return (
    <main>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full min-h-screen">
        {/* Sidebar */}
        <div className="flex lg:flex-col gap-5 w-full lg:w-[80px] h-auto lg:h-[96vh] lg:ml-[22px] bg-[#9FD8E4] p-3 rounded-[20px] transition-all">
          <div className="nav lg:mt-[250px] flex-1">
            <div className="menu">
              <ul className="flex lg:flex-col gap-5">
                <li className="relative group">
                  <Link
                    href="/dosen-pembimbing"
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
                    <span className="absolute left-[70px] top-1/2 transform -translate-y-1/2 p-2 text-white bg-[#2C707B] opacity-0 invisible transition-all group-hover:left-[75px] group-hover:opacity-100 group-hover:visible rounded-[10px] z-50">
                      Dashboard
                    </span>
                  </Link>
                </li>
                <li className="relative group">
                  <Link
                    href="/dosen-pembimbing/daftar-mahasiswa"
                    className="flex items-center justify-center lg:justify-start gap-2 text-sm font-medium text-gray-500 p-3 rounded-md transition-all hover:bg-[#FFBF5F]"
                  >
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
                    <span className="absolute left-[70px] top-1/2 transform -translate-y-1/2 p-2 text-white bg-[#2C707B] opacity-0 invisible transition-all group-hover:left-[75px] group-hover:opacity-100 group-hover:visible rounded-[10px] z-50">
                      Mahasiswa
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
                  <span className="absolute left-[70px] top-1/2 transform -translate-y-1/2 p-2 text-white bg-[#2C707B] opacity-0 invisible transition-all group-hover:left-[75px] group-hover:opacity-100 group-hover:visible rounded-[10px] z-50">
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
              {/* Display Initials */}
              <div className="flex items-center justify-center w-[150px] h-[150px] bg-[#9FD8E4] rounded-full text-white text-4xl font-semibold">
                {getInitials(profilDosenPembimbing.name)}
              </div>
            </div>
            <h3 className="font-bold text-lg">{profilDosenPembimbing.name}</h3>
            <br />
            <p className="text-[#C5C5C5] text-sm">Dosen Pembimbing</p>
            <p className="text-[#C5C5C5] text-sm">Dosen Teknik Informatika </p>
          </div>
        </div>
      </div>
    </main>
  );
}
