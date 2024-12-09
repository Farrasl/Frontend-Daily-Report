"use client";

import { motion } from "framer-motion";
import { useKeycloak } from "@react-keycloak/web";
import { ArrowRight, FileText, Star, Clock, Shield } from "lucide-react";

const Landing = () => {
  const { keycloak } = useKeycloak();

  const handleLogin = () => {
    if (keycloak.authenticated) {
      keycloak.logout();
    } else {
      keycloak.login();
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-bl from-[#2C5F8D] to-[#1A4B5F] flex flex-col text-white"
    >
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-4 md:px-8 py-4 flex justify-between items-center"
      >
        <div className="flex items-center space-x-3">
          <FileText color="white" size={32} className="md:w-[40px]" />
          <h1 className="text-2xl md:text-3xl font-bold">Reportify KP</h1>
        </div>
        <div className="space-x-2 md:space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex px-4 md:px-6 py-2 md:py-3 rounded-full bg-white text-[#2C5F8D] hover:bg-opacity-90 transition-all text-sm md:text-base gap-2 items-center"
          >
            <span>Mulai Sekarang</span>
            <ArrowRight size={16} className="md:w-5 md:h-5" />
          </motion.button>
        </div>
      </motion.nav>
      <main className="flex-grow flex items-center justify-center px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl text-center"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6">
            Simplifikasi Laporan Kerja Praktik Anda
          </h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto opacity-90">
            Reportify KP hadir untuk memudahkan mahasiswa membuat, mengelola,
            dan melaporkan kegiatan Kerja Praktik secara efisien dan
            profesional.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex justify-center items-center space-x-4 mb-8 md:mb-10"
          >
            <button
              onClick={handleLogin}
              className="justify-center w-full md:w-1/2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white text-[#2C5F8D] flex items-center space-x-2 hover:bg-opacity-90 transition-all"
            >
              <span className="text-sm md:text-base">Mulai Sekarang</span>
              <ArrowRight size={16} className="md:w-5 md:h-5" />
            </button>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 opacity-90">
            {[
              { icon: Star, text: "Mudah Digunakan" },
              { icon: Clock, text: "Cepat & Efisien" },
              { icon: Shield, text: "Aman & Terpercaya" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="flex items-center justify-center space-x-2"
              >
                <item.icon color="white" size={20} />
                <span className="text-sm md:text-base">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Landing;
