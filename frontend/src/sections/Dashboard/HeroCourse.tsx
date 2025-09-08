import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import mascot from "../../assets/mascot.png";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const BASE_API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

interface Program {
  program_id: number;
  title: string;
  image_cover: string;
  categories?: string;
}

const HeroCourse: React.FC = () => {
  const [showAllBootcamp, setShowAllBootcamp] = useState(false);
  const [showAllFreeclass, setShowAllFreeclass] = useState(false);
  const { user, isLoading, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [bootcampPrograms, setBootcampPrograms] = useState<Program[]>([]);
  const [freeClassPrograms, setFreeClassPrograms] = useState<Program[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);

  // Modal Nota
  const [transactionDetail, setTransactionDetail] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/user/my-programs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const programs: Program[] = Array.isArray(response.data.data)
          ? response.data.data
          : [];

        console.log("📦 Data dari API:", programs); // <--- DEBUG

        // Lebih fleksibel: cari kata 'bootcamp' atau 'free' di kategori
        const bootcamps = programs.filter((p) =>
          p.categories?.toLowerCase().includes("bootcamp")
        );
        const freeclasses = programs.filter((p) =>
          p.categories?.toLowerCase().includes("free")
        );

        setBootcampPrograms(bootcamps);
        setFreeClassPrograms(freeclasses);
      } catch (error) {
        console.error("❌ Gagal ambil program", error);
      } finally {
        setLoadingPrograms(false);
      }
    };

    if (token) fetchPrograms();
  }, [token]);

  const fetchTransactionDetail = async (programId: number) => {
    try {
      const res = await axios.get(
        `${BASE_API_URL}/payment/detail/${programId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTransactionDetail(res.data.data);
      setShowModal(true);
    } catch (err) {
      console.error("❌ Gagal ambil detail transaksi", err);
    }
  };

  // Komponen Reusable untuk grid program
  const ProgramGrid = ({
    programs,
    title,
    showAll,
    setShowAll,
  }: {
    programs: Program[];
    title: string;
    showAll: boolean;
    setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
  }) => (
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>

      {loadingPrograms ? (
        <p>Loading...</p>
      ) : programs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <img src={mascot} alt="Mascot" className="w-20 h-20 mb-4" />
          <p className="text-gray-400">
            {title === "Bootcamp"
              ? "Belum membeli program Bootcamp"
              : "Belum mendaftar FreeClass"}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(showAll ? programs : programs.slice(0, 3)).map((program) => (
              <motion.div
                key={program.program_id}
                className="border-2 border-white rounded-lg overflow-hidden bg-[#1d1d1d] shadow-lg hover:scale-[1.02] transition-transform"
                whileHover={{ y: -4 }}
              >
                <img
                  src={`${BASE_API_URL.replace("/api", "")}/uploads/cover/${
                    program.image_cover
                  }`}
                  alt={program.title}
                  className="w-full h-[240px] object-cover"
                />

                <div className="p-4 flex flex-col items-center justify-center text-center">
                  <h3 className="font-bold text-lg mb-3">{program.title}</h3>
                  <button
                    onClick={() => {
                      if (location.pathname === "/inventory") {
                        // ✅ Cek apakah bootcamp
                        if (
                          program.categories?.toLowerCase().includes("bootcamp")
                        ) {
                          fetchTransactionDetail(program.program_id); // Bootcamp -> modal nota
                        } else {
                          navigate(`/my-program/${program.program_id}`); // Freeclass -> langsung masuk detail
                        }
                      } else {
                        navigate(`/my-program/${program.program_id}`);
                      }
                    }}
                    className="bg-[#c8a86b] hover:bg-[#B8956B] text-white px-4 py-2 rounded cursor-pointer"
                  >
                    Detail
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {programs.length > 3 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-[#c8a86b] hover:bg-[#B8956B] text-white px-6 py-2 rounded cursor-pointer"
              >
                {showAll ? "See Less" : "See More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1d1d1d] text-white px-4 py-8 font-poppins relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-600 rounded w-48 mb-2"></div>
              <div className="h-6 bg-gray-600 rounded w-96"></div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-2">
                Hai, {user?.name || "User"}
              </h1>
              <p className="text-gray-300">
                Jangan Lupa Untuk Mengikuti Kursus Yang Sudah Dibeli, Ya!
              </p>
            </>
          )}
        </div>

        {/* Judul Utama */}
        <h2 className="text-2xl font-bold mb-6">My Program</h2>

        {/* Bootcamp Section */}
        <ProgramGrid
          programs={bootcampPrograms}
          title="Bootcamp"
          showAll={showAllBootcamp}
          setShowAll={setShowAllBootcamp}
        />

        {/* FreeClass Section */}
        <ProgramGrid
          programs={freeClassPrograms}
          title="FreeClass"
          showAll={showAllFreeclass}
          setShowAll={setShowAllFreeclass}
        />
      </div>

      {/* Modal Nota */}
      <AnimatePresence>
        {showModal && transactionDetail && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Background blur transparan */}
            <div
              className="absolute inset-0 backdrop-blur-md bg-white/30"
              onClick={() => setShowModal(false)}
            ></div>

            {/* Modal Box dengan animasi */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white text-black rounded-xl shadow-lg p-8 w-full max-w-md z-10"
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-6 text-center">
                Detail Pembelian Program
              </h2>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold">Id Pembelian</p>
                  <p className="text-gray-700">{transactionDetail.order_id}</p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Nama Pembeli</p>
                  <p className="text-gray-700">
                    {transactionDetail.buyer_name}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Nama Program</p>
                  <p className="text-gray-700">
                    {transactionDetail.program_name}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Kategori</p>
                  <p className="text-gray-700">
                    {transactionDetail.categories}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Tanggal Pembelian</p>
                  <p className="text-gray-700">
                    {transactionDetail.transaction_time}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Metode Pembayaran</p>
                  <p className="text-gray-700">
                    {transactionDetail.payment_method}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Total Harga</p>
                  <p className="text-gray-700">
                    Rp{" "}
                    {Number(transactionDetail.gross_amount).toLocaleString(
                      "id-ID"
                    )}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Status</p>
                  <p className="text-gray-700">
                    {transactionDetail.transaction_status}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() =>
                    navigate(`/my-program/${transactionDetail.program_id}`)
                  }
                  className="bg-[#c8a86b] hover:bg-[#B8956B] text-white px-6 py-2 rounded-lg transition cursor-pointer"
                >
                  Lihat Kursus
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroCourse;
