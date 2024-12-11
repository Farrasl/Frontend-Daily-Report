"use client";

import { useState } from 'react';

interface AddBimbinganModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBimbinganModal = ({ isOpen, onClose }: AddBimbinganModalProps) => {
  const [komentar, setKomentar] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    setIsLoading(true);
  
    const payload = {
      nim: '1234567890', // Replace with actual NIM
      nip: '1234567890', // Replace with actual NIP
      tanggal: new Date(tanggal), 
      komentar,
      status: 'Diterima',
    };
  
    try {
      const response = await fetch('/api/bimbingan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      } else {
        alert('Bimbingan berhasil disimpan!');
        onClose();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan bimbingan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg sm:max-w-[500px] w-[90%] p-6 space-y-6">

        <h2 className="text-xl font-semibold">Beri Evaluasi Bimbingan</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm text-gray-600">
              Hari/Tanggal Bimbingan
            </label>
            <input
              id="date"
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
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
              value={komentar}
              onChange={(e) => setKomentar(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Masukkan evaluasi"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md"
              onClick={onClose}
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

export default AddBimbinganModal;
