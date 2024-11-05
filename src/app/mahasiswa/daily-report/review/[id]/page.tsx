const DailyReportPage = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto bg-white">
      <div className="pt-10 mb-8 -mt-[40px]">
        <h1 className="text-2xl font-bold mb-4">Review Daily Report</h1>
        <h3 className="text-2xl font-bold mb-4 text-center">
          Design UI "Daily Report"
        </h3>
        {/* Alert Message */}
        <div className="bg-[#BED67E] text-black p-3 rounded-lg flex items-center justify-between mb-6">
          <span>
            Deskripsi agenda dapat diganti sebelum di acc Pembimbing Instansi
          </span>
          <span className="ml-2">!</span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Right Column - Documentation */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              DOCUMENTATION
            </label>
            <div className="rounded-lg overflow-hidden">
              <img
                src="/api/placeholder/400/300"
                alt="Documentation"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Agenda Description */}
      <div className="bg-[#B7D7E8] p-6 rounded-lg">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-sm text-gray-500">DESKRIPSI AGENDA</h2>
          <button className="p-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_195_915)">
                <path
                  d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z"
                  fill="#323232"
                />
              </g>
              <defs>
                <clipPath id="clip0_195_915">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>

        {/* Increased height and scrollable content */}
        <div className="mb-4 h-[300px] overflow-y-auto">
          {" "}
          {/* Adjusted to h-80 for more height */}
          <p className="text-gray-600 mb-2">Jumat, 20/10/2024 - 09:00/16.00</p>
          <h3 className="font-bold mb-4">Design UI/UX "Daily Report"</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              Perjelas struktur navigasi dan tambahkan panduan pengguna untuk
              memudahkan user baru.
            </li>
            <li>
              Sederhanakan tata letak form input agar pengguna dapat dengan
              cepat mengisi dan memvalidasi laporan.
            </li>
            <li>
              Tingkatkan elemen visual agar aplikasi memiliki daya tarik visual
              yang lebih profesional dan modern.
            </li>
            <li>
              Perbaiki alur kerja validasi dan pengiriman laporan agar lebih
              efisien dan meminimalkan risiko kesalahan.
            </li>
          </ul>
          <p className="text-sm">
            Secara keseluruhan, mahasiswa telah menunjukkan pemahaman yang baik
            dalam desain UI/UX dan memperhatikan kebutuhan fungsional aplikasi.
            Dengan beberapa perbaikan dan optimalisasi lebih lanjut, desain ini
            memiliki potensi untuk dikembangkan menjadi aplikasi yang efektif
            dan ramah pengguna. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Maxime quia dicta unde eveniet quisquam
            perspiciatis illum similique, eum consequuntur ad veniam
            necessitatibus earum nobis repellat dolor mollitia voluptas odio
            ipsa. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Possimus rem saepe eos enim voluptatem? Eveniet incidunt, excepturi
            harum velit fugiat corrupti, hic adipisci doloribus, culpa neque
            facilis deleniti sint eius. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Corporis, voluptates? Ullam ipsa sit debitis,
            suscipit voluptatem iusto! Earum, voluptatibus. Beatae reiciendis
            provident magni recusandae consequatur libero consectetur
            consequuntur nulla velit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyReportPage;
