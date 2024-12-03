"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";

interface AddAgendaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TaskData {
  timeIn: string;
  timeOut: string;
  title: string;
  description: string;
  file: File | null;
  date: Date;
}

const AddAgendaModal = ({ isOpen, onClose }: AddAgendaModalProps) => {
  const [taskData, setTaskData] = useState<TaskData>({
    timeIn: "",
    timeOut: "",
    title: "",
    description: "",
    file: null,
    date: new Date(),
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTaskData((prev) => ({ ...prev, file }));
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];
    if (file) {
      setTaskData((prev) => ({ ...prev, file }));
    }
  };

  const handleSubmit = async () => {
    // Add your submit logic here
    console.log("Submitting task:", taskData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-[90%] md:max-w-[1000px] relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-2 text-gray-500 hover:text-gray-700 text-lg"
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-4 text-center">
          Tambah Agenda Baru
        </h2>

        <div className="space-y-3">
          {/* Time Input Section */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label
                className="text-xs font-medium text-gray-600"
                htmlFor="timeIn"
              >
                Jam Masuk
              </label>
              <input
                id="timeIn"
                name="timeIn"
                type="time"
                value={taskData.timeIn}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label
                className="text-xs font-medium text-gray-600"
                htmlFor="timeOut"
              >
                Jam Keluar
              </label>
              <input
                id="timeOut"
                name="timeOut"
                type="time"
                value={taskData.timeOut}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
              />
            </div>
          </div>

          {/* File Upload Section */}
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1.5">
              Upload File
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={(e) => e.preventDefault()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed rounded-md p-4 text-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-center mb-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-400"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p className="text-xs text-gray-500">
                {taskData.file
                  ? `File selected: ${taskData.file.name}`
                  : "Select File or Drag and Drop"}
              </p>
            </div>
          </div>

          {/* Title Input */}
          <div className="space-y-1">
            <label
              className="text-xs font-medium text-gray-600"
              htmlFor="title"
            >
              Judul Agenda
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={taskData.title}
              onChange={handleInputChange}
              placeholder="Masukkan judul agenda"
              className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-1">
            <label
              className="text-xs font-medium text-gray-600"
              htmlFor="description"
            >
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
              placeholder="Masukkan deskripsi"
              rows={3}
              className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              className="bg-[#52BD3A] text-white rounded-[20px] px-4 py-2 flex items-center gap-2"
            >
              <svg
                width="24"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.77 2.9301L21.17 4.3301L8.43 17.0701L2.83 11.4701L4.23 10.0701L8.43 14.2701L19.77 2.9301ZM19.77 0.100098L8.43 11.4401L4.23 7.2401L0 11.4701L8.43 19.9001L24 4.3301L19.77 0.100098Z"
                  fill="white"
                />
              </svg>
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAgendaModal;
