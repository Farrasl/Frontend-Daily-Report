const Dashboard = () => {
  return (
    <div className="flex-1 overflow-y-auto justify-center h-screen">
      <div className="px-8">
      <div className="pt-10 mb-8">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <p className="text-gray-500">Friday, 20 Oct 2024</p>
        </div>
        <div className="bg-[#D9F9FF] w-full p-6 rounded-[20px] mb-10 h-[150px]">
        <h2 className="text-xl font-semibold">
            Hi, <strong>Abmi Sukma</strong>
          </h2>
          <p className="text-[#C5C5C5]">
            Fill today with something productive, blablabla
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#D9F9FF] p-4 rounded-[20px] shadow h-[150px]">
            <h3 className="text-lg font-semibold flex justify-between items-center">
              Hari Kerja Praktik
            </h3>
            <p className="text-[#C5C5C5]">Ayo semangat !!</p>
            <p className="text-4xl font-bold bg-gradient-to-b from-[#7CE9FF] via-[#397480] to-[#0B191C] bg-clip-text text-transparent">
              Ke-1
            </p>
          </div>
          <div className="bg-[#D9F9FF] p-4 rounded-[20px] shadow">
            <h3 className="text-lg font-semibold flex justify-between items-center">
              Feedback
              <svg
                className="ml-auto"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.97 19.5C11.07 19.5 11.97 18.6 11.97 17.5H7.97C7.97 18.6 8.87 19.5 9.97 19.5ZM15.97 13.5V8.5C15.97 5.43 14.34 2.86 11.47 2.18V1.5C11.47 0.67 10.8 0 9.97 0C9.14 0 8.47 0.67 8.47 1.5V2.18C5.61 2.86 3.97 5.42 3.97 8.5V13.5L1.97 15.5V16.5H17.97V15.5L15.97 13.5ZM13.97 14.5H5.97V8.5C5.97 6.02 7.48 4 9.97 4C12.46 4 13.97 6.02 13.97 8.5V14.5ZM5.55 1.58L4.12 0.15C1.72 1.98 0.14 4.8 0 8H2C2.15 5.35 3.51 3.03 5.55 1.58ZM17.94 8H19.94C19.79 4.8 18.21 1.98 15.82 0.15L14.4 1.58C16.42 3.03 17.79 5.35 17.94 8Z"
                  fill="#323232"
                />
              </svg>
            </h3>
            <p className="text-[#C5C5C5]">Ada komentar nih buat kamu...</p>
            <div className="flex mt-2">
              <img
                src="../../avatar.png"
                alt="User 1"
                width={40}
                height={40}
                className="rounded-full"
              />
              <img
                src="../../avatar.png"
                alt="User 2"
                width={40}
                height={40}
                className="rounded-full -ml-2"
              />
              <img
                src="../../avatar.png"
                alt="User 2"
                width={40}
                height={40}
                className="rounded-full -ml-2"
              />
              <svg
                className="mt-4 -ml-2"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_33_275)">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"
                    fill="#323232"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_33_275">
                    <rect width="30" height="30" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="bg-[#D9F9FF] p-4 rounded-[20px] shadow">
            <h3 className="text-lg font-semibold flex justify-between items-center">
              Lainnya
              <svg
                className="ml-auto"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H3.17L2.58 14.59L2 15.17V2H18V14ZM9 10H11V12H9V10ZM9 4H11V8H9V4Z"
                  fill="#323232"
                />
              </svg>
            </h3>
            <p className="text-[#C5C5C5]">Apakah Kamu butuh bantuan?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
