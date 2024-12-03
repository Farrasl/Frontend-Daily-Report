"use client";

import Link from "next/link";
import { useState } from "react";


export default function RootLayout({
  children,
  Name = "Sarinah, M.Pd",
}: Readonly<{
  children: React.ReactNode;
  Name: string;
}>) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const getInitials = (name: string) => {
    const nameParts = name.split(" "); // Memisahkan nama berdasarkan spasi
    const initials = nameParts
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase()) // Ambil huruf pertama dan ubah jadi kapital
      .join(""); // Gabungkan inisial
    return initials;
  };
  const menuItems = [
    {
      href: "/pembimbing-instansi",
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
      href: "/pembimbing-instansi/daftar-mahasiswa",
      label: "Mahasiswa",
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
    <main>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full min-h-screen overflow-hidden">
       {/* Mobile Burger Menu */}
      <div className="lg:hidden w-full bg-[#9FD8E4] p-3 relative">
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
            <span className="font-medium text-gray-800">Menu</span>
          </button>

          {/* Mobile Menu Items */}
          <div
            className={`absolute w-full left-0 bg-white shadow-lg rounded-b-2xl transform transition-all duration-300 ease-in-out z-50 ${
              isBurgerOpen
                ? "translate-y-0 opacity-100 visible"
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
                          {index === 0 && "Lihat statistik dan progress Mahasiswa"}
                          {index === 1 && "Lihat Mahasiswa Bimbingan"}
                          {index === 2 && "Keluar dari aplikasi"}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>  
        {/*Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-col gap-5 w-full lg:w-[80px] h-auto lg:h-[96vh] lg:ml-[22px] bg-[#9FD8E4] p-3 rounded-[20px] transition-all">
          <div className="nav mt-[250px] flex-1">
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
        <div className="w-full lg:w-[300px] h-auto lg:h-screen p-5 bg-[#F6F6F6] text-center mt-5 lg:mt-0">
          <div className="flex flex-col items-center relative">
            <h3 className="text-lg text-left w-full">
              <b>Profile</b>
            </h3>
            <br />
            <div className="relative w-[150px] h-[150px] mb-5">
              {/* Display Initials */}
              <div className="flex items-center justify-center w-[150px] h-[150px] bg-[#9FD8E4] rounded-full text-white text-4xl font-semibold">
                {getInitials(Name)}
              </div>
            </div>
            <h3 className="font-bold text-lg">{Name}</h3>
            <br />
            <p className="text-[#C5C5C5] text-sm">Pembimbing Instansi</p>
            <p className="text-[#C5C5C5] text-sm">
              PT. Pertamina Kota Pekanbaru
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
