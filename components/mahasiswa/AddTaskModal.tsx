"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DayInfo {
  date: Date;
  dayShort: string;
  dayNum: number;
  isToday: boolean;
  isSelected: boolean;
}

interface TaskData {
  timeIn: string;
  timeOut: string;
  title: string;
  description: string;
  files: File[];
  date: Date;
}

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const AddTaskModal = ({ isOpen, onClose }: AddTaskModalProps) => {
  const [taskData, setTaskData] = useState<TaskData>({
    timeIn: "",
    timeOut: "",
    title: "",
    description: "",
    files: [],
    date: new Date(),
  });

  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generate array of years (10 years before and after current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const formatDayName = (date: Date): string => DAYS[date.getDay()];

  const formatMonthName = (date: Date): string => MONTHS[date.getMonth()];

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMonthChange = (monthIndex: number) => {
    const newDate = new Date(taskData.date);
    newDate.setMonth(monthIndex);
    setTaskData((prev) => ({ ...prev, date: newDate }));
    setIsMonthDropdownOpen(false);
  };

  const handleYearChange = (year: number) => {
    const newDate = new Date(taskData.date);
    newDate.setFullYear(year);
    setTaskData((prev) => ({ ...prev, date: newDate }));
    setIsYearDropdownOpen(false);
  };

  const generateDates = (): DayInfo[] => {
    const dates: DayInfo[] = [];
    const startDate = new Date(taskData.date);
    startDate.setDate(startDate.getDate() - 14);

    for (let i = 0; i < 29; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push({
        date: date,
        dayShort: formatDayName(date),
        dayNum: date.getDate(),
        isToday: isSameDay(date, new Date()),
        isSelected: isSameDay(date, taskData.date),
      });
    }
    return dates;
  };

  const handleDateClick = (date: Date) => {
    setTaskData((prev) => ({ ...prev, date }));
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : [];
    setTaskData((prev) => ({ ...prev, files: [...prev.files, ...newFiles] }));
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const droppedFiles = event.dataTransfer.files
      ? Array.from(event.dataTransfer.files)
      : [];
    setTaskData((prev) => ({
      ...prev,
      files: [...prev.files, ...droppedFiles],
    }));
  };

  const handleSubmit = async () => {
    const [hoursIn, minutesIn] = taskData.timeIn.split(":").map(Number);
    const [hoursOut, minutesOut] = taskData.timeOut.split(":").map(Number);

    const timeInMinutes = hoursIn * 60 + minutesIn;
    const timeOutMinutes = hoursOut * 60 + minutesOut;

    if (timeInMinutes >= timeOutMinutes) {
      alert("Jam Masuk harus lebih awal dari Jam Keluar.");
      return;
    }

    if (
      !taskData.timeIn ||
      !taskData.timeOut ||
      !taskData.files ||
      !taskData.title ||
      !taskData.description ||
      !taskData.date
    ) {
      alert("Semua field harus diisi");
      return;
    }

    const formattedDate = taskData.date.toISOString();

    // Pastikan dokumentasi berisi file yang benar dengan fileType dan filePath
    const dokumentasi = taskData.files.map((file) => ({
      namaDokumentasi: file.name,
      tipeDokumentasi: file.type, // Menyertakan tipe file
      fileType: file.type, // Menambahkan fileType
      filePath: file.name, // Menambahkan filePath (nama file sebagai path)
    }));

    const requestBody = {
      tanggal: formattedDate,
      waktuMulai: taskData.timeIn,
      waktuSelesai: taskData.timeOut,
      judulAgenda: taskData.title,
      deskripsiAgenda: taskData.description,
      status: "Belum",
      dokumentasi: dokumentasi, // Mengirim dokumentasi dengan fileType dan filePath
    };

    try {
      const response = await fetch("/api/daily-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Task created successfully:", data);
      alert("Task berhasil disimpan.");
      onClose();
    } catch (error) {
      console.error("Failed to save task:", error);
      alert(
        `Gagal menyimpan task: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-[1000px] relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-2 text-gray-500 hover:text-gray-700 text-lg"
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-4 text-center">
          Tambah Laporan Baru
        </h2>

        <div className="space-y-3">
          {/* Calendar Section */}
          <div className="bg-white p-3 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {/* Month Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsMonthDropdownOpen(!isMonthDropdownOpen);
                      setIsYearDropdownOpen(false);
                    }}
                    className="flex items-center gap-1 py-1 px-2 hover:bg-gray-100 rounded-md text-sm font-medium"
                  >
                    {formatMonthName(taskData.date)}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        isMonthDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isMonthDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-40 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {MONTHS.map((month, index) => (
                        <button
                          key={month}
                          onClick={() => handleMonthChange(index)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100
                            ${
                              taskData.date.getMonth() === index
                                ? "bg-gray-50 font-medium"
                                : ""
                            }`}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Year Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsYearDropdownOpen(!isYearDropdownOpen);
                      setIsMonthDropdownOpen(false);
                    }}
                    className="flex items-center gap-1 py-1 px-2 hover:bg-gray-100 rounded-md text-sm font-medium"
                  >
                    {taskData.date.getFullYear()}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        isYearDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isYearDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-24 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {years.map((year) => (
                        <button
                          key={year}
                          onClick={() => handleYearChange(year)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100
                            ${
                              taskData.date.getFullYear() === year
                                ? "bg-gray-50 font-medium"
                                : ""
                            }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleScroll("left")}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Scroll left"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => handleScroll("right")}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Scroll right"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex overflow-x-auto hide-scrollbar gap-3"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {generateDates().map((day, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center flex-shrink-0 cursor-pointer"
                  onClick={() => handleDateClick(day.date)}
                >
                  <span className="text-gray-500 text-sm mb-2">
                    {day.dayShort}
                  </span>
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full text-lg
                      ${
                        day.isSelected
                          ? "bg-sky-300 text-white"
                          : day.isToday
                          ? "bg-gray-100"
                          : "hover:bg-gray-50"
                      }
                      transition-colors`}
                  >
                    {day.dayNum}
                  </div>
                </div>
              ))}
            </div>
          </div>

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
              multiple
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={(e) => e.preventDefault()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed rounded-md p-4 text-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              style={{ position: "relative", height: "125px", width: "100%" }} // Ensure the box has a fixed height
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
                {taskData.files.length > 0
                  ? `${taskData.files.length} file(s) selected`
                  : "Select Files or Drag and Drop"}
              </p>
              {taskData.files.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {taskData.files.map(
                    (file, index) =>
                      file.type.startsWith("image/") && (
                        <div
                          key={index}
                          className="relative w-full h-full flex items-center justify-center"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview of ${file.name}`}
                            className="object-contain max-w-full max-h-full rounded"
                            style={{
                              objectFit: "contain", // Ensures the image fits within the box without distortion
                            }}
                          />
                          {/* Delete Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevents triggering the file input click
                              setTaskData((prev) => ({
                                ...prev,
                                files: prev.files.filter((_, i) => i !== index),
                              }));
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      )
                  )}
                </div>
              )}
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

export default AddTaskModal;
