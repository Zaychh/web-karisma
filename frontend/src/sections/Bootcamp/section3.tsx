import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBootcamp } from "./useBootcamp";

// === COMPONENT CARD INDIVIDU ===
const CourseCard = ({ course }: { course: any }) => (
  <motion.div
    key={course.program_id}
    className="bg-[#1D1D1D] rounded-2xl w-[90vw] sm:w-[320px] flex-shrink-0 overflow-hidden border border-kertas hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
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

// === SECTION UTAMA ===
const HeroSec = () => {
  const { courses, loading } = useBootcamp();
  const [page, setPage] = useState(0);
  const [isMobile] = useState(window.innerWidth <= 768);

  const pageSize = isMobile ? 1 : 3;
  const totalPages = Math.ceil(courses.length / pageSize);

  const currentCourses = courses.slice(page * pageSize, (page + 1) * pageSize);

  const handleNext = () => setPage((prev) => (prev + 1) % totalPages);
  const handlePrev = () =>
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  const goToPage = (p: number) => setPage(p);

  if (loading) {
    return <div className="text-white text-center py-20">Loading...</div>;
  }

  return (
    <section className="bg-ashh text-white py-20 px-6 md:px-16">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Choose Your Path, Build Your Career
        </h2>
        <p className="text-gray-300 text-base md:text-lg">
          Mulai perjalanan karirmu dengan minat dan tujuan karirmu, belajar
          keterampilan digital yang relevan, dan dapatkan bimbingan dari mentor
          berpengalaman untuk sukses di industri.
        </p>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Cards + Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="p-2 text-gray-300 hover:text-white cursor-pointer"
          >
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
                <CourseCard key={course.program_id} course={course} />
              ))}
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handleNext}
            className="p-2 text-gray-300 hover:text-white cursor-pointer"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {isMobile ? (
            <>
              <button
                onClick={handlePrev}
                className="text-lg px-2 py-1 text-gray-300 hover:text-white"
              >
                &lt;
              </button>
              <span className="text-lg font-semibold text-white">
                {page + 1}
              </span>
              <button
                onClick={handleNext}
                className="text-lg px-2 py-1 text-gray-300 hover:text-white"
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
