import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ====== TIPE DATA (disederhanakan) ======
export interface FreeClass {
  id: number;              
  slug: string;           
  title: string;           
  title2?: string;         
  image: string;            
  skills: string[];        
  harga: number; 

  instructor?: {
    name?: string;
    role?: string;
    image?: string;
    linkedin?: string;
  };
  pricing?: {
    name: string;
    price: number | string;
    originalPrice?: number;
    benefits?: string[];
  }[];
}


// ====== CARD ======
const FreeClassCard = ({
  freeClass,
  isLanding = false,
}: {
  freeClass: FreeClass;
  isLanding?: boolean;
}) => (
  <motion.div
    key={freeClass.id}
    className={`${isLanding ? "bg-onyx border-kertas" : "bg-ashh border-gray-600"} rounded-2xl w-[90vw] sm:w-[320px] flex-shrink-0 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.5, ease: "easeIn" }}
  >
    <img src={freeClass.image} alt={freeClass.title} className="w-full h-[180px] object-cover" />
    <div className="p-5 flex flex-col h-[460px]">
      <div className="flex justify-between items-center mb-2">
        <span className="bg-green-500 text-sm px-3 py-1 rounded-full font-semibold text-black">
          InspiraKarisma
        </span>
      </div>
      <h3 className="text-lg font-bold text-white mb-3">{freeClass.title}</h3>
      <ul className="space-y-2 text-sm text-gray-300 mb-4 overflow-auto">
        {freeClass.skills && freeClass.skills.length > 0 ? (
          freeClass.skills.map((s, i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="mt-1 w-2 h-2 bg-green-400 rounded-full" />
              <span>{s}</span>
            </li>
          ))
        ) : (
          <li className="text-gray-400 italic">Skills belum diisi!</li>
        )}
      </ul>
      <Link to={`/free-class/${freeClass.slug}`} className="mt-auto">
        <button className="py-2 w-full rounded-lg border border-gray-500 hover:border-bluberi hover:bg-bluberi hover:text-putih transition-all font-semibold cursor-pointer">
          Lebih Lanjut
        </button>
      </Link>
    </div>
  </motion.div>
);

// ====== SECTION ======
interface HeroSecProps {
  isLanding?: boolean;
}

const HeroSec = ({ isLanding = false }: HeroSecProps) => {
  const [classes, setClasses] = useState<FreeClass[]>([]);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // === AMBIL DATA DARI API ===
  useEffect(() => {
  (async () => {
    try {
      const res = await fetch("/api/program/freeclass");
      const data = await res.json();
      const mapped: FreeClass[] = (data || []).map((p: any) => ({
        id: p.id,
        slug: p.slug || String(p.title || "")
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, ""),
        title: p.title,
        title2: p.title2,
        image: `http://localhost:3000/${p.image}`,
        skills: p.skills || [],
        instructor: p.instructor,   // ← sudah dikirim dari backend
        pricing: p.pricing || [],   // ← tetap ada biar konsisten
      }));
      setClasses(mapped);
    } catch (e) {
      console.error("Gagal ambil free class:", e);
    } finally {
      setLoading(false);
    }
  })();
}, []);

  const pageSize = isMobile ? 1 : 3;
  const totalPages = Math.max(1, Math.ceil(classes.length / pageSize));
  const current = classes.slice(page * pageSize, (page + 1) * pageSize);

  const handleNext = () => setPage((prev) => (prev + 1) % totalPages);
  const handlePrev = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);
  const goToPage = (p: number) => setPage(p);

  if (loading) return <section className={`${isLanding ? "bg-onyx" : "bg-ashh"} text-white py-20 px-6 md:px-16`}>Loading...</section>;

  return (
    <section className={`${isLanding ? "bg-onyx" : "bg-ashh"} text-white py-20 px-6 md:px-16`}>
      <div className={`${isLanding ? "text-left max-w-screen-xl px-4 mb-8 mx-auto" : "text-center mb-12 max-w-3xl mx-auto"}`}>
        <h2 className={`font-bold mb-2 leading-tight ${isLanding ? "text-2xl" : "text-3xl md:text-4xl"}`}>
          {isLanding ? "Free Class" : "Berbagai Kelas Gratis yang Hadir buat Kamu"}
        </h2>
        <p className={`text-gray-400 leading-relaxed ${isLanding ? "text-lg max-w-3xl font-poppins" : "text-base md:text-2xl"}`}>
          {isLanding ? "Coba gratis berbagai bidang dan temukan minat karirmu!" : "Biar kamu tau mana bidang yang cocok buat kamu"}
        </p>
      </div>

      <div className="relative flex flex-col items-center">
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
              {current.map((fc) => (
                <FreeClassCard key={fc.id} freeClass={fc} isLanding={isLanding} />
              ))}
            </motion.div>
          </AnimatePresence>

          <button onClick={handleNext} className="p-2 text-gray-300 hover:text-white cursor-pointer">
            <ChevronRight size={28} />
          </button>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {isMobile ? (
            <>
              <button onClick={handlePrev} className="text-lg px-2 py-1 text-gray-300 hover:text-white cursor-pointer">&lt;</button>
              <span className="text-lg font-semibold text-white">{page + 1}</span>
              <button onClick={handleNext} className="text-lg px-2 py-1 text-gray-300 hover:text-white cursor-pointer">&gt;</button>
            </>
          ) : (
            [...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-3 h-3 rounded-full ${page === i ? "bg-bluberi" : "bg-kertas"}`}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSec;
