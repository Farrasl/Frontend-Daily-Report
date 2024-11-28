import Link from "next/link";
import { use } from "react";
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

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Title */}
      <h1 className="text-center text-xl font-bold mb-8 px-4">
        "PERANCANGAN SISTEM INFORMASI PEMANTAUAN PERKEMBANGAN STATUS PERBAIKAN
        KOMPUTER BERBASIS WEB DI PT. PERTAMINA"
      </h1>

      {/* Profile Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-2 align-center">Profile</h2>
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Profile Image */}
          <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-[#A2E2E8]">
            <img
              src="/avatar.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <p className="text-gray-500">NAMA MAHASISWA</p>
                <p className="font-medium">{profileData.nama}</p>
              </div>
              <div>
                <p className="text-gray-500">DOSEN PEMBIMBING</p>
                <p className="font-medium">{profileData.dosenPembimbing}</p>
              </div>
            </div>

            {/* Supervisors Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <p className="text-gray-500">NIM</p>
                <p className="font-medium">{profileData.nim}</p>
              </div>
              <div>
                <p className="text-gray-500">PEMBIMBING INSTANSI</p>
                <p className="font-medium">{profileData.pembimbingInstansi}</p>
              </div>
            </div>

            {/* Email Info */}
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{profileData.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href={`/dosen-pembimbing/mahasiswa/${name}/daily-report`}
          className="block"
        >
          <div className="bg-gradient-to-b from-[#9FD8E4] via-[#9FD8E4] to-[#F8F8F8] p-6 rounded-lg text-center hover:bg-sky-200 transition-colors hover:scale-105">
            <div className="w-24 h-24 mx-auto mb-4">
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
            <h3 className="text-xl font-semibold">Daily Report</h3>
          </div>
        </Link>

        <Link
          href={`/dosen-pembimbing/mahasiswa/${name}/bimbingan-kp`}
          className="block"
        >
          <div className="bg-gradient-to-b from-[#9FD8E4] via-[#9FD8E4] to-[#F8F8F8] p-6 rounded-lg text-center hover:bg-sky-200 transition-colors hover:scale-105">
            <div className="w-24 h-24 mx-auto mb-4">
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
            <h3 className="text-xl font-semibold">Bimbingan KP</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MahasiswaPage;
