const Dashboard = () => {
  return (
    <div className="flex-1 px-8 py-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Friday, 20 Oct 2024</p>
      </div>
      <div className="bg-blue-100 p-6 rounded-md mb-6">
        <h2 className="text-xl font-semibold">
          Hi, <strong>Abmi Sukma</strong>
        </h2>
        <p>Fill today with something productive, blablabla</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold">Hari Kerja Praktik</h3>
          <p>Ayo semangat !!</p>
          <p className="text-4xl font-bold">Ke-1</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold flex items-center">
            Feedback <span className="ml-2 text-gray-500">&#128276;</span>
          </h3>
          <p>Ada komentar nih buat kamu...</p>
          <div className="flex mt-2">
            {/* Pastikan Anda memiliki gambar user di public folder */}
            <img
              src="../../avatar.png"
              alt="User 1"
              width={24}
              height={24}
              className="rounded-full"
            />
            <img
              src="../../avatar.png"
              alt="User 2"
              width={24}
              height={24}
              className="rounded-full -ml-2"
            />
            <img
              src="../../avatar.png"
              alt="User 2"
              width={24}
              height={24}
              className="rounded-full -ml-2"
            />
            <span className="ml-2">+</span>
          </div>
        </div>
        <div className="bg-blue-100 p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold flex items-center">
            Lainnya <span className="ml-2 text-gray-500">&#128172;</span>
          </h3>
          <p>Apakah Kamu butuh bantuan?</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
