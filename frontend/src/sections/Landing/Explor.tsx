import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBootcamp } from "../Bootcamp/useBootcamp";
import HeroSec from "../Free-Class/section3";

const CourseCard = ({ course }: { course: any }) => (
  <motion.div
    key={course.id}
    className="bg-onyx rounded-2xl w-[320px] flex-shrink-0 overflow-hidden border border-kertas hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
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
        <span className="bg-green-500 text-sm px-3 py-1 rounded-full font-semibold text-onyx">
          Bootcamp Program
        </span>
        <span className="text-sm text-gray-400">{course.duration}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-3">
        Bootcamp {course.title}
      </h3>
      <ul className="space-y-2 text-sm text-gray-300 mb-4 overflow-auto">
        {course.skills.length > 0 ? (
          course.skills.map((s: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <div className="mt-1 w-2 h-2 bg-green-400 rounded-full" />
              <span>{s}</span>
            </li>
          ))
        ) : (
          <li className="text-gray-400 italic">Skills belum diisi!</li>
        )}
      </ul>
      <Link to={`/bootcamp/${course.slug}`} className="mt-auto">
        <button className="py-2 w-full rounded-lg border border-gray-500 hover:border-bluberi hover:bg-bluberi hover:text-putih transition-all font-semibold cursor-pointer">
          Lebih Lanjut
        </button>
      </Link>
    </div>
  </motion.div>
);

const BootcampLanding = () => {
  const { courses, loading } = useBootcamp();
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState<"bootcamp" | "freeclass">("bootcamp"); // <=== Tambahan: State kontrol tampilan

  const pageSize = 3;
  const totalPages = Math.ceil(courses.length / pageSize);
  const currentCourses = courses.slice(page * pageSize, (page + 1) * pageSize);

  const handleNext = () => setPage((prev) => (prev + 1) % totalPages);
  const handlePrev = () =>
    setPage((prev) => (prev - 1 + totalPages) % totalPages);

  if (loading) {
    return <div className="text-white text-center py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-onyx text-white px-6 py-16">
      <div className="max-w-6xl w-full mx-auto px-6 mb-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
          Jelajahi Program Kami Sesuai dengan{" "}
          <span className="relative text-rosegold hover:text-transparent hover:bg-gradient-to-l hover:from-[#fff8dc] hover:via-[#FFD700] hover:to-[#b8860b] hover:bg-[length:200%_100%] hover:bg-clip-text hover:animate-shiny transition-all duration-300 ease-linear">
            Kebutuhan Kamu
          </span>
        </h1>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Level up hardskill, softskill, dan portfolio kamu disini. Dapatkan
          juga bimbingan karir terlengkap untuk mendukungmu menjadi talenta siap
          kerja di dunia digital
        </p>

        {/* === TOMBOL SWITCH === */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab("bootcamp")}
            className={`px-12 py-2 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
              activeTab === "bootcamp"
                ? "bg-bluberi text-kertas"
                : "border-2 border-kertas text-kertas hover:bg-kertas hover:text-onyx"
            }`}
          >
            Bootcamp Course
          </button>
          <button
            onClick={() => setActiveTab("freeclass")}
            className={`px-12 py-2 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
              activeTab === "freeclass"
                ? "bg-bluberi text-kertas"
                : "border-2 border-kertas text-kertas hover:bg-kertas hover:text-onyx"
            }`}
          >
            Free Class
          </button>
        </div>
      </div>

      {/* === SWITCH TAMPILAN BERDASARKAN STATE === */}
      {activeTab === "bootcamp" ? (
        <>
          <div className="text-left max-w-screen-xl mx-auto px-4 mb-8">
            <h2 className="text-2xl font-bold font-mont mb-2 leading-tight">
              Bootcamp Course
            </h2>
            <p className="text-lg font-poppins text-gray-400 max-w-3xl leading-relaxed">
              Belajar intensif buat persiapan karir dan pelajari skill baru
            </p>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                className="p-2 text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft size={28} />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  className="flex gap-6"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, ease: "easeIn" }}
                >
                  {currentCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </motion.div>
              </AnimatePresence>

              <button
                onClick={handleNext}
                className="p-2 text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-3 h-3 rounded-full ${
                    page === i ? "bg-bluberi" : "bg-kertas"
                  } transition-all`}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <HeroSec isLanding /> // Komponen Free Class ditampilkan saat activeTab = "freeclass"
      )}
    </div>
  );
};

export default BootcampLanding;
