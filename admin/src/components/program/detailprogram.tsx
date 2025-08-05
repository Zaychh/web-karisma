import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import api from "../../lib/api";

interface ProgramDetail {
  title: string;
  deskripsi: string;
  harga: number;
  categories: string;
  image_cover: string;
  instructor: {
    name: string;
    majority: string;
    image: string;
  };
  tools: { image: string; name?: string }[]; // Diaktifkan kembali dengan optional name
  achievements: {
    // Tambahkan achievements
    achievement_id: number;
    name: string;
    description: string;
    image: string;
  }[]; // Tambahkan achievements
}

const DetailProgram = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState<ProgramDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<ProgramDetail>(`/api/program/${id}`);
        console.log("=== FRONTEND DEBUG ===");
console.log("Full response:", response.data);
console.log("Achievements:", response.data.achievements);
console.log("Achievements length:", response.data.achievements?.length);
        setProgram(response.data);
      } catch (error) {
        console.error("Gagal mengambil detail program:", error);
        setError("Gagal mengambil detail program");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProgram();
    }
  }, [id]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Image failed to load:", e.currentTarget.src);
    e.currentTarget.src = "/default-placeholder.jpg"; // Optional fallback
  };

  if (loading)
    return (
      <div className="bg-onyx min-h-screen text-white flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-onyx min-h-screen text-white flex items-center justify-center">
        <p className="text-lg text-red-400">{error}</p>
      </div>
    );

  if (!program)
    return (
      <div className="bg-onyx min-h-screen text-white flex items-center justify-center">
        <p className="text-lg">Program tidak ditemukan</p>
      </div>
    );

  return (
    <div className="bg-onyx min-h-screen text-white px-6 py-10 md:px-16">
      {/* Gambar Header */}
      <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden mb-10">
        <img
          src={`${API_BASE_URL}/uploads/cover/${program.image_cover}`}
          alt={program.title}
          className="w-full h-64 md:h-80 object-cover"
          onError={handleImageError}
        />
      </div>

      {/* Judul */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Judul</h3>
        <div className="border border-white px-4 py-3 rounded-md">
          {program.title}
        </div>
      </div>

      {/* Deskripsi */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Deskripsi</h3>
        <div className="border border-white px-4 py-3 rounded-md text-sm leading-relaxed text-gray-200">
          {program.deskripsi}
        </div>
      </div>

      {/* Harga, Kategori, Sesi */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div>
          <p className="text-lg font-bold mb-1">Harga</p>
          <div className="border border-white px-4 py-3 rounded-md">
            Rp {Number(program.harga).toLocaleString("id-ID")}
          </div>
        </div>

        <div>
          <p className="text-lg font-bold mb-1">Kategori</p>
          <div className="border border-white px-4 py-3 rounded-md">
            {program.categories}
          </div>
        </div>

        <div>
          <p className="text-lg font-bold mb-1">Total Sesi</p>
          <button
            onClick={() => navigate(`/program/${id}/list-sesi`)}
            className="border border-white px-4 py-3 rounded-md text-sm hover:bg-white hover:text-black transition"
          >
            List Total Sesi
          </button>
        </div>
      </div>

      {/* Tools Section - DIAKTIFKAN */}
      <div className="mb-10">
        <h3 className="text-lg font-bold mb-4">Tools</h3>

        {program.tools && program.tools.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {program.tools.map((tool, index) => (
              <div
                key={index}
                className="border border-white rounded-lg p-4 flex flex-col items-center"
              >
                <img
                  src={`${API_BASE_URL}/uploads/tools/${tool.image}`}
                  alt={tool.name || `Tool ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-md mb-2"
                  onError={handleImageError}
                />
                {tool.name && (
                  <p className="text-sm text-center text-gray-300">
                    {tool.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-white rounded-lg p-6 text-center">
            <p className="text-gray-400">Tidak ada tools untuk program ini</p>
            <p className="text-xs text-gray-500 mt-2">
              Expected tools but got: {JSON.stringify(program.tools)}
            </p>
          </div>
        )}
      </div>

      {/* Achievements Section */}
      <div className="mb-10">
        <h3 className="text-lg font-bold mb-4">Achievements</h3>

        {program.achievements && program.achievements.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {program.achievements.map((achievement) => (
              <div
                key={achievement.achievement_id}
                className="border border-white rounded-lg p-4 flex flex-col items-center"
              >
                <img
                  src={`${API_BASE_URL}/uploads/achievements/${achievement.image}`}
                  alt={achievement.name}
                  className="w-16 h-16 object-contain rounded-md mb-2"
                  onError={handleImageError}
                />
                <p className="text-sm text-center text-gray-300">
                  {achievement.name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-white rounded-lg p-6 text-center">
            <p className="text-gray-400">
              Tidak ada achievements untuk program ini
            </p>
          </div>
        )}
      </div>

      {/* Instruktur */}
      <div className="mb-10">
        <h3 className="text-lg font-bold mb-4">Instruktur</h3>
        <div className="flex items-center gap-6 border border-white rounded-xl p-6 w-full max-w-sm">
          <img
            src={`${API_BASE_URL}/uploads/${program.instructor.image}`}
            alt="Instruktur"
            className="w-32 h-32 object-cover rounded-lg"
            onError={handleImageError}
          />
          <div>
            <p className="font-semibold text-2xl">{program.instructor.name}</p>
            <p className="text-lg text-gray-300">
              {program.instructor.majority}
            </p>
          </div>
        </div>
      </div>

      {/* Tombol kembali */}
      <button
        onClick={() => navigate("/program")}
        className="border border-rosegold text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-rosegold/20 transition"
      >
        <ArrowLeft size={18} /> Kembali
      </button>
    </div>
  );
};

export default DetailProgram;
