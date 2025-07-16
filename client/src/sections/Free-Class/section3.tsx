import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import graph from "../../assets/graphdes.png";
import back from "../../assets/backend.png";
import full from "../../assets/fullstack.png";
import mock from "../../assets/Mock.png";
import ml from "../../assets/Datascience.png";

// FreeClassCard Component
const FreeClassCard = ({ freeClass }: { freeClass: FreeClass }) => (
  <motion.div
    key={freeClass.id}
    className="bg-ashh rounded-2xl w-[90vw] sm:w-[320px] flex-shrink-0 overflow-hidden border border-gray-600 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.5, ease: "easeIn" }}
  >
    <img
      src={freeClass.image}
      alt={freeClass.title}
      className="w-full h-[180px] object-cover"
    />
    <div className="p-5 flex flex-col h-[460px]">
      <div className="flex justify-between items-center mb-2">
        <span className="bg-green-500 text-sm px-3 py-1 rounded-full font-semibold text-black">
          InspiraKarisma
        </span>
      </div>
      <h3 className="text-lg font-bold text-white mb-3">{freeClass.title}</h3>
      <ul className="space-y-2 text-sm text-gray-300 mb-4 overflow-auto">
        {freeClass.skills.map((s, i) => (
          <li key={i} className="flex items-start gap-2">
            <div className="mt-1 w-2 h-2 bg-green-400 rounded-full" />
            <span>{s}</span>
          </li>
        ))}
      </ul>
      <Link to={`/free-class/${freeClass.slug}`} className="mt-auto">
        <button className="py-2 w-full rounded-lg border border-gray-500 hover:border-bluberi hover:bg-bluberi hover:text-putih transition-all font-semibold cursor-pointer">
          Lebih Lanjut
        </button>
      </Link>
    </div>
  </motion.div>
);

// HeroSec Component
const HeroSec = () => {
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pageSize = isMobile ? 1 : 3;
  const totalPages = Math.ceil(freeClasses.length / pageSize);

  const handleNext = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (p: number) => {
    setPage(p);
  };

  const currentClasses = freeClasses.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <section className="bg-ashh text-white py-20 px-6 md:px-16">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Berbagai Kelas Gratis yang Hadir buat Kamu
        </h2>
        <p className="text-gray-300 text-base md:text-2xl">
          Biar kamu tau mana bidang yang cocok buat kamu
        </p>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Cards + Navigation */}
        <div className="flex items-center gap-4">
          <button onClick={handlePrev} className="p-2 text-gray-300 hover:text-white cursor-pointer">
            <ChevronLeft size={28} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className="flex gap-6 justify-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              {currentClasses.map((freeClass) => (
                <FreeClassCard key={freeClass.id} freeClass={freeClass} />
              ))}
            </motion.div>
          </AnimatePresence>

          <button onClick={handleNext} className="p-2 text-gray-300 hover:text-white cursor-pointer">
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {isMobile ? (
            <>
              <button
                onClick={handlePrev}
                className="text-lg px-2 py-1 text-gray-300 hover:text-white cursor-pointer"
              >
                &lt;
              </button>
              <span className="text-lg font-semibold text-white">{page + 1}</span>
              <button
                onClick={handleNext}
                className="text-lg px-2 py-1 text-gray-300 hover:text-white cursor-pointer"
              >
                &gt;
              </button>
            </>
          ) : (
            [...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-3 h-3 rounded-full ${
                  page === i ? "bg-bluberi" : "bg-kertas"
                }`}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSec;

// FreeClass Interface & Data
export interface FreeClass {
  id: number;
  slug: string;
  title: string;
  title2: string;
  image: string;
  skills: string[];
}

export const freeClasses: FreeClass[] = [
  {
    id: 1,
    slug: "basic-graphic-design-untuk-sosial-media",
    title: "Basic Graphic Design untuk Sosial Media",
    title2: "Graphic Design",
    image: graph,
    skills: [
      "Prinsip desain layout & warna",
      "Cara bikin feed IG yang konsisten pakai Canva/Figma",
      "Tips visual marketing ala brand besar",
    ],
  },
  {
    id: 2,
    slug: "ngoding-web-dari-nol-html-css-js",
    title: "Ngoding Web dari Nol (HTML, CSS, JS)",
    title2: "Web Development",
    image: full,
    skills: [
      "Cara bikin landing page sederhana",
      "Belajar pakai VSCode & live preview",
      "Dasar HTML + styling CSS",
    ],
  },
  {
    id: 3,
    slug: "ngulik-devops-dan-docker-dari-nol",
    title: "Ngulik DevOps & Docker dari Nol",
    title2: "Web Development",
    image: back,
    skills: [
      "Apa itu Docker? Kenapa penting?",
      "Build & run container sederhana",
      "Simulasi deploy mini-app",
    ],
  },
  {
    id: 4,
    slug: "bikin-portfolio-web-pribadi",
    title: "Bikin Portfolio Web Pribadi",
    title2: "Web Development",
    image: mock,
    skills: [
      "Tools gratis untuk hosting (Netlify/Vercel)",
      "Struktur web portfolio",
      "Tambahkan badge sertifikat & showcase proyek",
    ],
  },
  {
    id: 5,
    slug: "career-prep-cara-bangun-personal-branding-di-linkedin",
    title: "Career Prep — Cara Bangun Personal Branding di LinkedIn",
    title2: "Career Development",
    image: ml,
    skills: [
      "Optimasi profil LinkedIn",
      "Tulis postingan yang dilirik HRD",
      "Tips koneksi & cari mentor",
    ],
  },
];
