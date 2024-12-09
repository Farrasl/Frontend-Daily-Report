import Link from "next/link";
import { use } from "react";
import { Mail, User, FileText } from "lucide-react";

const MahasiswaPage = ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = use(params);

  // This would typically come from an API/database
  const profileData = {
    nim: "12250120341",
    nama: name,
    dosenPembimbing: "Muhammad Irsyad, S.T., M.T.",
    pembimbingInstansi: "Sarinah, M.Pd.",
    email: "abmisukma.e@gmail.com",
  };

  const getInitials = (name: string) => {
    const words = name.split(" "); // Memisahkan nama berdasarkan spasi
    return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Title Section */}
        <div className="bg-gradient-to-r from-cyan-100 to-blue-100 p-4">
          <h1 className="text-center text-sm sm:text-base lg:text-lg font-bold text-gray-800">
            PERANCANGAN SISTEM INFORMASI PEMANTAUAN PERKEMBANGAN STATUS
            PERBAIKAN KOMPUTER BERBASIS WEB DI PT. PERTAMINA
          </h1>
        </div>

        {/* Profile Card */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
            <div className="w-40 h-40 sm:w-50 sm:h-50 rounded-full border-4 border-[#A2E2E8] bg-[#9FD8E4] flex items-center justify-center">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                  {getInitials(profileData.nama)}
                </span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-500">Nama Mahasiswa</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.nama}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-500">NIM</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.nim}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-500">Dosen Pembimbing</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.dosenPembimbing}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-500">Pembimbing Instansi</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.pembimbingInstansi}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 md:col-span-2">
                  <Mail className="text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="p-6 bg-white rounded-t-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Daily Report Card */}
            <Link
              href={`/dosen-pembimbing/mahasiswa/${name}/daily-report`}
              className="block"
            >
              <div className="bg-gradient-to-b from-[#9FD8E4] via-[#9FD8E4] to-[#F8F8F8] p-6 rounded-xl shadow-sm hover:shadow-md hover:scale-102 transform transition-all duration-200 ease-in-out">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg text-center sm:text-xl font-semibold">
                  Daily Report
                </h3>
              </div>
            </Link>

            {/* Bimbingan KP Card */}
            <Link
              href={`/dosen-pembimbing/mahasiswa/${name}/bimbingan-kp`}
              className="block"
            >
              <div className="bg-gradient-to-b from-[#9FD8E4] via-[#9FD8E4] to-[#F8F8F8] p-6 rounded-xl shadow-sm hover:shadow-md hover:scale-102 transform transition-all duration-200 ease-in-out">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="M9 9h6M9 13h6M9 17h6" />
                  </svg>
                </div>
                <h3 className="text-lg text-center sm:text-xl font-semibold">
                  Bimbingan KP
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MahasiswaPage;
