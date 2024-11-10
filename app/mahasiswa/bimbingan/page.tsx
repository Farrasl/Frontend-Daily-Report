"use client";

const RiwayatBimbingan = () => {
  const BimbinganHistory = [
    { tanggal: "Sabtu, 29 Oktober 2024", status: "done", aksi: "Lihat" },
    { tanggal: "Senin, 1 November 2024", status: "pending", aksi: "Lihat" },
    { tanggal: "Kamis, 4 November 2024", status: "done", aksi: "Lihat" },
    { tanggal: "Sabtu, 6 November 2024", status: "done", aksi: "Lihat" },
    { tanggal: "Senin, 8 November 2024", status: "done", aksi: "Lihat" },
    { tanggal: "Kamis, 11 November 2024", status: "done", aksi: "Lihat" },
  ];

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-white">
      <div className="px-8">
        <div className="my-8">
          <h1 className="text-2xl font-bold">Riwayat Bimbingan</h1>
        </div>

        <div className="bg-[#D9F9FF] rounded-[20px] p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="py-2 px-4 text-[#323232]">Tanggal</th>
                <th className="py-2 px-4 text-[#323232] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {BimbinganHistory.map((item, index) => (
                <tr key={index} className="border-t border-sky-100">
                  <td className="py-3 px-4 text-[#323232]">{item.tanggal}</td>
                  <td className="py-3 px-4 text-right">
                    {item.aksi === "Lihat" ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="text-[#2C707B] hover:text-[#9FD8E4] font-medium focus:outline-none"
                          onClick={() => console.log("View clicked")}
                        >
                          {item.aksi}
                        </button>
                      </div>
                    ) : (
                      <span className="text-[#C5C5C5]">{item.aksi}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiwayatBimbingan;
