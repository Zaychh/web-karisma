import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import emptyAchieve from "../../assets/pool.png";
import rightChar from "../../assets/skate.png";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

type Achievement = {
  achievement_id: number;
  name: string;
  description?: string;
  image?: string;
};

export default function MyAchievement() {
  const location = useLocation();
  const isInventoryPage = location.pathname === "/inventory";
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/achievements/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAchievements(res.data);
      } catch (err) {
        console.error("❌ Gagal ambil achievement:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;

  const hasAchievements = achievements.length > 0;
  const displayAchievements = showAll ? achievements : achievements.slice(0, 8);

  return (
    <section
      className={`w-full ${
        isInventoryPage ? "bg-abyssal" : "bg-ashh"
      } text-white font-poppins py-12 px-4 md:px-12`}
    >
      <h2 className="text-xl font-bold mb-8">My Achievement</h2>

      {!hasAchievements ? (
        // Kondisi kosong
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col items-start w-full">
            <div className="border-2 border-white p-6 rounded-md w-full text-center">
              <img
                src={emptyAchieve}
                alt="Empty Achievement"
                className="mx-auto w-24 mb-4"
              />
              <h3 className="font-bold text-lg uppercase mb-2">
                YAH ACHIEVEMENT MU KOSONG NIH!
              </h3>
              <p className="text-sm text-gray-300">
                Cobalah untuk menyelesaikan kursus agar kamu dapat achievement
                pertama kamu ya!
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="text-sm text-gray-300 mb-2">
                Sejauh Ini kamu sudah mendapatkan achievement sebanyak 0
              </p>
              <h3 className="text-xl font-bold leading-snug">
                Ayo Semangat Untuk <br /> Mengoleksinya!
              </h3>
            </div>
            <img
              src={rightChar}
              alt="Character Motivation"
              className="w-36 md:w-32 mt-6 md:mt-auto mx-auto md:ml-0"
            />
          </div>
        </div>
      ) : (
        // Kondisi ada achievement
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col items-start w-full">
            <div className="grid grid-cols-4 gap-4 border-2 border-white p-6 rounded-md w-full">
              {displayAchievements.map((ach) => (
                <div
                  key={ach.achievement_id}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setSelectedAchievement(ach)}
                >
                  <img
                    src={ach.image || emptyAchieve}
                    alt={ach.name}
                    className="w-16 h-16 object-contain mb-2"
                  />
                  <p className="text-xs text-center">{ach.name}</p>
                </div>
              ))}
            </div>

            {achievements.length > 8 && (
              <div className="mt-6 w-full flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="bg-rosegold hover:bg-[#B8956B] text-white px-6 py-2 rounded-lg font-semibold shadow-md cursor-pointer"
                >
                  {showAll
                    ? "See Less, Show Highlights Only"
                    : "All My Achievement"}
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="text-lg text-gray-300 mb-2">
                Sejauh Ini kamu sudah mendapatkan achievement sebanyak{" "}
                ({achievements.length})
              </p>
              <h3 className="text-xl font-bold leading-snug">
                Ayo Semangat Untuk <br /> Mengoleksinya!
              </h3>
            </div>
            <img
              src={rightChar}
              alt="Character Motivation"
              className="w-36 md:w-32 mt-6 md:mt-auto mx-auto md:ml-0"
            />
          </div>
        </div>
      )}

      {/* Modal Detail Achievement */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-gray-900 p-6 rounded-xl max-w-sm w-full text-center relative shadow-lg"
            >
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white cursor-pointer text-lg"
              >
                ✕
              </button>
              <img
                src={selectedAchievement.image || emptyAchieve}
                alt={selectedAchievement.name}
                className="mx-auto w-24 h-24 object-contain mb-4"
              />
              <h3 className="text-lg font-bold mb-2">
                {selectedAchievement.name}
              </h3>
              <p className="text-sm text-gray-300">
                {selectedAchievement.description || "Tidak ada deskripsi"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
