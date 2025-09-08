import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Swal from "sweetalert2";

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
    text: `Program ini menawarkan pembelajaran mendalam dengan mentor berpengalaman, didukung praktik intensif dan materi yang terstruktur. Yang menarik, peserta berkesempatan mengaplikasikan ilmu langsung melalui kolaborasi dengan UMKM dalam Final Project. Semoga program ini terus berkembang!`,
  },
  {
    img: t2,
    name: "Kim Jaegyun",
    role: "Graphic Designer",
    company: "POT Branding House",
    text: `Potensi karier dan pasar yang menjanjikan mendorong saya mendalami Graphic Design. Di sini, saya mendapat bimbingan yang luar biasa – mentor yang sangat dedikasi, tim yang supportif dan materi pembelajaran yang komprehensif. Hasilnya? Saya sudah mendapat tawaran kerja bahkan sebelum menyelesaikan program!`,
  },
  {
    img: t3,
    name: "Diana Cesare",
    role: "Human Resource Manager",
    company: "EY",
    text: `Bootcamp ini melampaui ekspektasi. Para instruktur tidak hanya informatif, tapi juga proaktif memantau progres dan tugas. Setiap pertanyaan dijawab dengan tuntas. Yang paling penting, mentor membawakan materi yang nyata, membuat pembelajaran jadi sangat aplikatif.`,
  },
  {
    img: t4,
    name: "Siegfried Koigner",
    role: "UI/UX Designer",
    company: "Tokopedia",
    text: `Saya belajar langsung dari praktisi industri dan diberi kebebasan eksplorasi desain produk nyata. Saya makin pede buat terjun ke dunia kerja!`,
  },
  {
    img: t5,
    name: "Saki Yoshida",
    role: "Front-End Developer",
    company: "Traveloka",
    text: `Kurikulum dan project-nya keren banget! Saya bisa punya portofolio nyata yang langsung dilirik recruiter. Mentornya juga sabar banget.`,
  },
  {
    img: t6,
    name: "Sofia Pavlovna Irinovskaya",
    role: "Social Media Strategist",
    company: "IDN Media",
    text: `Belajar digital marketing dari dasar banget sampai advance. Kelasnya seru, studinya relevan sama tren industri. Saya jadi ngerti cara ngiklan yang efektif!`,
  },
];

export default function DetailSection3({ data }: { data: FreeClass }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [freeClasses, setFreeClasses] = useState<FreeClass[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // fetch rekomendasi lainnya
  useEffect(() => {
    fetch("/api/program/freeclass")
      .then((res) => res.json())
      .then((list) => {
        const formatted = list.map((p: any) => ({
          ...p,
          image: `http://localhost:3000/${p.image}`,
          skills: p.skills || [],
        }));
        setFreeClasses(formatted);
      })
      .catch((err) => console.error("Gagal ambil freeclass:", err));
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

  // pricing
const originalPrice = data.pricing?.[0]?.originalPrice || 0;

const formattedOriginal =
  originalPrice > 0
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(originalPrice)
    : null;

const discountPercent =
  originalPrice > 0
    ? Math.round(((originalPrice - 0) / originalPrice) * 100)
    : 0;
    
  return (
    <section className="bg-ashh text-white py-20 px-6 md:px-16 min-h-screen font-poppins">
      {/* Testimonials */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl text-rosegold font-bold">
          Bagaimana Pendapat Mereka?
        </h2>
      </div>
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
      <div className="relative w-full mx-auto flex items-center justify-center">
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-300 hover:text-white cursor-pointer"
        >
          <ChevronLeft size={28} />
        </button>

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
                      {freeClass.skills.map((s: string, i: number) => (
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

      {/* Pricing Free Pack */}
      <div className="mt-12">
        <h2 className="text-center text-rosegold text-2xl md:text-4xl font-bold mb-10 leading-relaxed">
          Siap Lompat Lebih Tinggi? <br /> Belajar Tanpa Batas, Tanpa Biaya!
        </h2>

        <div className="flex justify-center">
          <div className="bg-irreng text-white px-8 py-6 rounded-2xl border border-white w-full max-w-[380px]">
            <div className="mb-6">
              <h4 className="text-3xl font-bold text-rosegold mb-3">
                Free Pack
              </h4>

              {formattedOriginal && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="line-through text-sm text-gray-400">
                    {formattedOriginal}
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-red-500 text-xs bg-white px-2 py-0.5 rounded-md font-bold">
                      {discountPercent}%
                    </span>
                  )}
                </div>
              )}

              <p className="text-3xl font-bold">Gratis!</p>
            </div>

            <div className="mb-6">
              <button
                className="bg-white text-black text-xl w-full py-3 rounded-xl font-semibold hover:bg-gray-200 transition cursor-pointer"
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                      Swal.fire({
                        icon: "warning",
                        title: "Login Dulu!",
                        text: "Anda perlu login sebelum mendaftar program.",
                        confirmButtonText: "Login",
                        confirmButtonColor: "#c8a86b",
                      }).then(() => navigate("/login"));
                      return;
                    }

                    // 🔎 1. Cek apakah user sudah daftar program ini
                    const checkRes = await fetch(
                      `http://localhost:3000/api/user/check-program/${data.id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );

                    if (!checkRes.ok)
                      throw new Error("Gagal cek status program");

                    const checkData = await checkRes.json();

                    if (checkData?.isEnrolled) {
                      // ✅ Jika sudah terdaftar
                      await Swal.fire({
                        icon: "info",
                        title: "Anda sudah mendaftar",
                        text: "Anda sudah terdaftar di program ini!",
                        confirmButtonText: "Lihat di Dashboard",
                        confirmButtonColor: "#c8a86b",
                      });

                      return navigate("/dashboard");
                    }

                    // 🚀 2. Jika belum, baru daftar
                    const res = await fetch(
                      "http://localhost:3000/api/user/add-program",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                          program_id: data.id,
                        }),
                      }
                    );

                    if (!res.ok) throw new Error("Gagal menambahkan program");

                    // ✅ SweetAlert sukses
                    await Swal.fire({
                      icon: "success",
                      title: "Berhasil!",
                      text: "Program berhasil ditambahkan ke inventory kamu 🎉",
                      confirmButtonText: "Lihat di Dashboard",
                      confirmButtonColor: "#c8a86b",
                    });

                    navigate("/dashboard");
                  } catch (error) {
                    console.error("❌ Error add program:", error);
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Terjadi kesalahan saat menambahkan program!",
                    });
                  }
                }}
              >
                Daftar Sekarang!
              </button>
            </div>

            <div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full text-sm text-gray-300 cursor-pointer"
              >
                Benefit
                <span className="cursor-pointer">
                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>

              {isOpen && (
                <ul className="mt-3 pl-4 text-lg space-y-2 min-h-[24px]">
                  {[
                    "Ikut 2 Sesi Live Class",
                    "Akses Community Event Unlimited",
                    "Live Practice for Update Your Portfolio",
                    "Materi All Class",
                    "Bonus 3 Recording Class",
                  ].map((item, idx) => (
                    <li key={idx} className="text-white relative pl-4">
                      <span className="absolute left-0 top-1.5 w-2 h-2 bg-green-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
