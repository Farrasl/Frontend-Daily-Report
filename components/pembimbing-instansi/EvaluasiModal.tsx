// components/Evaluasimodal.tsx

import { FC, useState } from "react";

interface EvaluasiModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    task: string;
    date: string;
    status: string;
  }; // Ensure the task prop is defined here
}

const Evaluasimodal = ({ isOpen, onClose }: EvaluasiModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.37448 4.37406C-0.504558 9.25309 -0.504558 17.1727 4.37448 22.0517C9.25352 26.9308 17.1731 26.9308 22.0521 22.0517C26.9312 17.1727 26.9312 9.25309 22.0521 4.37406C17.1731 -0.504981 9.25352 -0.504981 4.37448 4.37406ZM18.5166 9.67736L14.9811 13.2129L18.5166 16.7484L16.7488 18.5162L13.2133 14.9807L9.67778 18.5162L7.91001 16.7484L11.4455 13.2129L7.91001 9.67736L9.67778 7.90959L13.2133 11.4451L16.7488 7.90959L18.5166 9.67736Z"
              fill="#C5C5C5"
              fillOpacity="0.5"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-center">
          Evaluasi Untuk Daily Report
          <br />
          <span className="font-bold">"Abmi Sukma"</span>
        </h2>
        <textarea
          className="w-full h-32 mt-4 p-3 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Deskripsikan sini deck..."
        />
        <div className="mt-4">
          <span>Validasi Laporan</span>
          <label className="flex items-center space-x-2 text-gray-700">
            <input type="radio" name="validation" className="form-radio h-4 w-4" />
            <span>Terima</span>
          </label>
        </div>
        <button
          className="mt-6 w-full py-2 text-white bg-green-500 rounded-[20px] hover:bg-green-600 focus:outline-none"
          onClick={() => alert("Simpan clicked")}
        >
          SIMPAN
        </button>
      </div>
    </div>
  );
};

export default Evaluasimodal;
