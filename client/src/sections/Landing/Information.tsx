import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import kuning from "../../assets/kuningg.png";
import biru from "../../assets/biru.png";
import hijau from "../../assets/hijau.png";
import merah from "../../assets/merahh.png";

import berang from "../../assets/berang.png";
import elang from "../../assets/elang.png";
import ijo from "../../assets/ijo.png";
import robo from "../../assets/robo.png";

const items = [
  {
    title: "Kurikulum Terupdate & Praktis",
    description:
      "Kami selalu mengupdate kurikulum sesuai kebutuhan industri dan teknologi terbaru.",
    color: "bg-gradient-to-tr from-yellow-400 to-orange-400",
    image: kuning,
  },
  {
    title: "Bangun Portfolio Kerja",
    description:
      "Kerjakan proyek nyata dan studi kasus dengan evaluasi berkala untuk membangun portfolio kerja.",
    color: "bg-gradient-to-tr from-blue-500 to-blue-700",
    image: biru,
  },
  {
    title: "Sertifikasi & Dukungan Karir",
    description:
      "Dapatkan sertifikasi & bantuan karir setelah lulus untuk bantu kamu siap kerja.",
    color: "bg-gradient-to-tr from-green-500 to-emerald-700",
    image: hijau,
  },
  {
    title: "Metode Pembelajaran Interaktif",
    description:
      "Belajar secara aktif lewat metode live class, forum diskusi, dan interactive content.",
    color: "bg-gradient-to-tr from-rose-500 to-pink-600",
    image: merah,
  },
];

const stats = [
  {
    label: "5000+",
    desc: "Alumni akselerasi karir",
    icon: robo,
  },
  {
    label: "69+",
    desc: "Instruktur ahli",
    icon: ijo,
  },
  {
    label: "320+",
    desc: "Hiring partner",
    icon: berang,
  },
  {
    label: "97%",
    desc: "Penyaluran magang",
    icon: elang,
  },
];

const Information: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-onyx text-kertas py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-start">

        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-4 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <img src={stat.icon} alt="" className="w-10 h-10 mb-1" />
                <p className="text-xl font-bold font-poppins">{stat.label}</p>
                <p className="text-sm font-medium font-poppins">{stat.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold font-mont leading-snug mb-4">
            Transformasi Karier Digital Dimulai di Sini
          </h2>
          <p className="text-base md:text-lg font-poppins mb-6 max-w-lg">
            Transformasikan tantanganmu menjadi peluang dan buktikan bahwa kamu
            #SiapKerja! meskipun:
          </p>
          <ul className="list-none space-y-2 text-sm md:text-base">
            {[
              "Masih Kuliah",
              "Masih Pemula",
              "Baru lulus tanpa pengalaman",
              "Sudah Berkeluarga, Sudah Berumur",
              "Beda Jurusan",
              "Beda Jalur Karir, ingin switch jalur karir",
            ].map((point, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-green-500">✔</span> {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`${item.color} relative rounded-xl p-4 min-h-[180px] flex flex-col justify-between overflow-hidden`}
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
               
                <div
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? "bg-black/60 backdrop-blur-sm" : "bg-black/0"
                  }`}
                />

              
                <button
                  onClick={() => toggleItem(index)}
                  className="absolute top-4 right-4 w-7 h-7 z-10 rounded-full bg-white/20 text-white text-lg font-bold flex items-center justify-center hover:scale-110 transition"
                >
                  {isOpen ? "−" : "+"}
                </button>

                
                <h3 className="text-base md:text-lg font-bold text-white max-w-[70%] relative z-10">
                  {item.title}
                </h3>

                
                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-white mt-2 max-w-[90%] z-10 relative"
                    >
                      {item.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Information;
