import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import mascot from "../../assets/mascot.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

interface Program {
  program_id: number;
  title: string;
  image_cover: string;
}

const HeroCourse: React.FC = () => {
  const [showAllPrograms, setShowAllPrograms] = useState(false);

  const { user, isLoading, token } = useAuth();
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/user/my-programs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("📦 Data program dari API:", response.data.data);
        setPrograms(
          Array.isArray(response.data.data) ? response.data.data : []
        );
      } catch (error) {
        console.error("❌ Gagal ambil program", error);
      } finally {
        setLoadingPrograms(false);
      }
    };

    if (token) fetchPrograms();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#1d1d1d] text-white px-4 py-8 font-poppins">
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

        {/* My Program */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">My Program</h2>

          {loadingPrograms ? (
            <p>Loading...</p>
          ) : programs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <img src={mascot} alt="Mascot" className="w-32 h-32 mb-6" />
              <h3 className="text-xl font-bold mb-2 text-center">
                TIDAK ADA PROGRAM YANG DITEMUKAN!
              </h3>
              <p className="text-gray-400 text-center mb-4 max-w-md">
                Cobalah untuk membeli kursus di kami untuk mendapatkan programmu
                sendiri!
              </p>
              <p className="text-green-400 text-sm">
                ERROR 404 - Program Not Found, Please Buy Course First
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {(showAllPrograms ? programs : programs.slice(0, 3)).map(
                  (program) => (
                    <div
                      key={program.program_id}
                      className="border-2 border-white rounded-lg overflow-hidden bg-[#1d1d1d] shadow-lg"
                    >
                      <img
                        src={`${BASE_API_URL.replace(
                          "/api",
                          ""
                        )}/uploads/cover/${program.image_cover}`}
                        alt={program.title}
                        className="w-full h-[240px] object-cover"
                      />

                      <div className="p-4 flex flex-col items-center justify-center text-center">
                        <h3 className="font-bold text-lg mb-3">
                          {program.title}
                        </h3>
                        <button
                          onClick={() =>
                            navigate(`/my-program/${program.program_id}`)
                          }
                          className="bg-[#c8a86b] hover:bg-[#B8956B] text-white px-4 py-2 rounded cursor-pointer"
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* See More */}
              {programs.length > 3 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowAllPrograms(!showAllPrograms)}
                    className="bg-[#c8a86b] hover:bg-[#B8956B] text-white px-6 py-2 rounded cursor-pointer"
                  >
                    {showAllPrograms ? "See Less" : "See More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* CTA */}
        {programs.length === 0 && (
          <div className="text-center">
            <button
              onClick={() => navigate("/bootcamp")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Lihat Kursus Tersedia
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroCourse;
