import Link from "next/link";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full min-h-screen">
        {/* Sidebar */}
        <div className="flex lg:flex-col gap-5 w-full lg:w-[92px] h-auto lg:h-[90vh] lg:ml-[50px] bg-[#9FD8E4] p-3 rounded-[20px] transition-all">
          <div className="nav lg:mt-[250px] flex-1">
            <div className="menu">
              <ul className="flex lg:flex-col gap-5">
                <li className="relative group">
                  <Link
                    href="/pembimbing-instansi/dashboard"
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
              <div className="absolute top-0 left-0 w-[150px] h-[150px] border-4 border-[#A2E2E8] rounded-full"></div>
            </div>
            <h3 className="font-bold text-lg">Sarinah, M.Pd</h3>
            <br />
            <p className="text-[#C5C5C5] text-sm">Pembimbing Instansi</p>
            <br />
            <p className="text-[#C5C5C5] text-sm">
              PT. Pertamina Kota Pekanbaru
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
