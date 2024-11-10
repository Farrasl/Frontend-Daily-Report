"use client";
import React from 'react';

interface BimbinganKPModalProps {
  date: string;
  evaluation: string;
  setDate: (date: string) => void;
  setEvaluation: (evaluation: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleClose: () => void;
}

const BimbinganKPModal: React.FC<BimbinganKPModalProps> = ({
  date,
  evaluation,
  setDate,
  setEvaluation,
  handleSubmit,
  handleClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg sm:max-w-[500px] w-full p-6 space-y-6">
        <h2 className="text-xl font-semibold">Beri Evaluasi Bimbingan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm text-gray-600">
              Hari/Tanggal Bimbingan
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="evaluation" className="block text-sm text-gray-600">
              Apakah ada evaluasi bimbingan untuk "Abmi Sukma"
            </label>
            <textarea
              id="evaluation"
              value={evaluation}
              onChange={(e) => setEvaluation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md"
              onClick={handleClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#00796B] rounded-md"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BimbinganKPModal;
