import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

import graph from "../../assets/graphdes.png";
import back from "../../assets/backend.png";
import full from "../../assets/fullstack.png";
import mock from "../../assets/Mock.png";
import ml from "../../assets/Datascience.png";

// CourseCard Component
const CourseCard = ({ course }: { course: Course }) => (
  <motion.div
    key={course.id}
    className="bg-ashh rounded-2xl w-[90vw] sm:w-[320px] flex-shrink-0 overflow-hidden border border-gray-600 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.5, ease: "easeIn" }}
  >
    <img
      src={course.image}
      alt={course.title}
      className="w-full h-[180px] object-cover"
    />
    <div className="p-5 flex flex-col h-[460px]">
      <div className="flex justify-between items-center mb-2">
        <span className="bg-green-500 text-sm px-3 py-1 rounded-full font-semibold text-black">
          InspiraKarisma
        </span>
      </div>
      <h3 className="text-lg font-bold text-white mb-3">{course.title}</h3>
      <ul className="space-y-2 text-sm text-gray-300 mb-4 overflow-auto">
        {course.skills.map((s, i) => (
          <li key={i} className="flex items-start gap-2">
            <div className="mt-1 w-2 h-2 bg-green-400 rounded-full" />
            <span>{s}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <button className="py-2 w-full rounded-lg border border-gray-500 hover:border-white hover:bg-white hover:text-black transition-all font-semibold cursor-pointer">
          Lebih Lanjut
        </button>
      </div>
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
  const totalPages = Math.ceil(courses.length / pageSize);

  const handleNext = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (p: number) => {
    setPage(p);
  };

  const currentCourses = courses.slice(page * pageSize, (page + 1) * pageSize);

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
              {currentCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
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

// Course Interface & Data
interface Course {
  id: number;
  title: string;
  image: string;
  skills: string[];
}

const courses: Course[] = [
  {
    id: 1,
    title: "Basic Graphic Design untuk Sosial Media",
    image: graph,
    skills: [
      "Prinsip desain layout & warna",
      "Cara bikin feed IG yang konsisten pakai Canva/Figma",
      "Tips visual marketing ala brand besar",
    ],
  },
  {
    id: 2,
    title: "Ngoding Web dari Nol (HTML, CSS, JS)",
    image: full,
    skills: [
      "Cara bikin landing page sederhana",
      "Belajar pakai VSCode & live preview",
      "Dasar HTML + styling CSS",
    ],
  },
  {
    id: 3,
    title: "Ngulik DevOps & Docker dari Nol",
    image: back,
    skills: [
      "Apa itu Docker? Kenapa penting?",
      "Build & run container sederhana",
      "Simulasi deploy mini-app",
    ],
  },
  {
    id: 4,
    title: "Bikin Portfolio Web Pribadi",
    image: mock,
    skills: [
      "Tools gratis untuk hosting (Netlify/Vercel)",
      "Struktur web portfolio",
      "Tambahkan badge sertifikat & showcase proyek",
    ],
  },
  {
    id: 5,
    title: "Career Prep — Cara Bangun Personal Branding di LinkedIn",
    image: ml,
    skills: [
      "Optimasi profil LinkedIn",
      "Tulis postingan yang dilirik HRD",
      "Tips koneksi & cari mentor",
    ],
  },
  
];
