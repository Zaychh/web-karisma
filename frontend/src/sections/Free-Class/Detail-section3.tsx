import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import PricingCard from "./PricingCard";
import { freeClasses } from "./section3";
import type { FreeClass } from "./section3";

import t1 from "../../assets/chico.png";
import t2 from "../../assets/Kim.png";
import t3 from "../../assets/Dianaa.png";
import t4 from "../../assets/t3.png";
import t5 from "../../assets/t2.png";
import t6 from "../../assets/t1.png";

const testimonials = [
  {
    img: t1,
    name: "Chico Lachowski",
    role: "Full-Stack Developer",
    company: "Karisma Academy",
    text: `Program ini menawarkan pembelajaran mendalam...`,
  },
  {
    img: t2,
    name: "Kim Jaegyun",
    role: "Graphic Designer",
    company: "POT Branding House",
    text: `Potensi karier dan pasar yang menjanjikan...`,
  },
  {
    img: t3,
    name: "Diana Cesare",
    role: "Human Resource Manager",
    company: "EY",
    text: `Bootcamp ini melampaui ekspektasi...`,
  },
  {
    img: t4,
    name: "Siegfried Koigner",
    role: "UI/UX Designer",
    company: "Tokopedia",
    text: `Saya belajar langsung dari praktisi industri...`,
  },
  {
    img: t5,
    name: "Saki Yoshida",
    role: "Front-End Developer",
    company: "Traveloka",
    text: `Kurikulum dan project-nya keren banget!...`,
  },
  {
    img: t6,
    name: "Sofia Pavlovna Irinovskaya",
    role: "Social Media Strategist",
    company: "IDN Media",
    text: `Belajar digital marketing dari dasar banget...`,
  },
];

export default function DetailSection3({ data }: { data: FreeClass }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(freeClasses.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const goToPage = (p: number) => {
    setCurrentIndex(p);
  };

  const visibleItems = freeClasses.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <section className="bg-ashh text-white py-20 px-6 md:px-16 min-h-screen font-poppins">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl text-rosegold font-bold">
          Bagaimana Pendapat Mereka?
        </h2>
      </div>

      {/* Testimonials */}
      <div className="overflow-x-auto no-scrollbar pb-4">
        <div className="flex gap-8 w-max px-2 md:px-4">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="w-[280px] md:w-[480px] flex-shrink-0 bg-bluberi rounded-3xl overflow-hidden shadow-md"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-[420px] object-cover"
              />
              <div className="p-5 text-sm md:text-2xl">
                <p className="font-bold">{item.name}</p>
                <p className="text-lg">{item.role}</p>
                <p className="text-lg mb-3 italic">
                  at <span className="font-semibold">{item.company}</span>
                </p>
                <p className="text-white text-xl leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rekomendasi */}
      <div className="text-center mb-6 mt-16">
        <h2 className="text-3xl md:text-4xl text-rosegold font-bold">
          Rekomendasi Lainnya
        </h2>
      </div>

      {/* Slider Controls */}
      <div className="relative w-full mx-auto flex items-center justify-center">
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-300 hover:text-white cursor-pointer"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Carousel */}
        <div className="overflow-hidden px-8 py-4 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              className="flex gap-6 justify-center"
            >
              {visibleItems.map((freeClass) => (
                <div
                  key={freeClass.id}
                  className="bg-ashh rounded-2xl w-[90vw] sm:w-[320px] flex-shrink-0 overflow-hidden border border-gray-600 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
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
                    <h3 className="text-lg font-bold text-white mb-3">
                      {freeClass.title}
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-300 mb-4 overflow-auto">
                      {freeClass.skills.map((s, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="mt-1 w-2 h-2 bg-green-400 rounded-full" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/free-class/${freeClass.slug}`}
                      className="mt-auto"
                    >
                      <button className="py-2 w-full rounded-lg border border-gray-500 hover:border-bluberi hover:bg-bluberi hover:text-putih transition-all font-semibold cursor-pointer">
                        Lebih Lanjut
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-300 hover:text-white cursor-pointer"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {isMobile ? (
          <>
            <button
              onClick={handlePrev}
              className="text-lg px-2 py-1 text-gray-300 hover:text-white cursor-pointer"
            >
              &lt;
            </button>
            <span className="text-lg font-semibold text-white">
              {currentIndex + 1}
            </span>
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
                currentIndex === i ? "bg-bluberi" : "bg-kertas"
              }`}
            />
          ))
        )}
      </div>

      {/* Pricing Section */}
      <div className="mt-12">
        <h2 className="text-center text-rosegold text-2xl md:text-4xl font-bold mb-10 leading-relaxed">
          Siap Lompat Lebih Tinggi? <br /> Belajar Tanpa Batas, Tanpa Biaya!
        </h2>

        {/* Mobile Scrollable Cards (kalau ada beberapa price gunakan loop map) */}
        {/* <div className="block md:hidden overflow-x-auto no-scrollbar pb-6 pl-4 pr-4">
          <div className="flex gap-6 w-max">
            {data.pricing.map((plan, idx) => (
              <div key={idx} className="flex-shrink-0 w-[380px]">
                <PricingCard plan={plan} />
              </div>
            ))}
          </div>
        </div> */}

        {/* Mobile Centered Card */}
        <div className="block md:hidden pb-6 px-4">
          <div className="flex justify-center">
            {data.pricing.length > 0 && (
              <div className="w-full max-w-[380px]">
                <PricingCard plan={data.pricing[0]} />
              </div>
            )}
          </div>
        </div>

        {/* Desktop View (kalau ada beberapa price gunakan loop map) */}
        {/* <div className="hidden md:flex flex-col md:flex-row justify-center items-stretch gap-8">
          {data.pricing.map((plan, idx) => (
            <PricingCard key={idx} plan={plan} />
          ))}
        </div> */}

        {/* Desktop View */}
        <div className="hidden md:flex justify-center">
          <div className="w-full max-w-[380px]">
            <PricingCard plan={data.pricing[0]} />
          </div>
        </div>
      </div>
    </section>
  );
}
