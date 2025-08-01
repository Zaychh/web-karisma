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
  tools: { image: string }[];
}

const DetailProgram = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState<ProgramDetail | null>(null);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await api.get<ProgramDetail>(`/api/programs/${id}`);
        setProgram(response.data);
      } catch (error) {
        console.error("Gagal mengambil detail program:", error);
      }
    };

    fetchProgram();
  }, [id]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Image failed to load:", e.currentTarget.src);
    e.currentTarget.src = "/default-placeholder.jpg"; // Optional fallback
  };

  if (!program) return <p className="text-white">Loading...</p>;

  return (
    <div className="bg-onyx min-h-screen text-white px-6 py-10 md:px-16">
      {/* Gambar Header */}
      <div className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden mb-10">
        <img
          src={`${API_BASE_URL}/uploads/cover/${program.image_cover}`}
          alt={program.title}
          className="w-full h-auto object-cover"
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
          > List Total Sesi 
          </button>
        </div>
      </div>

      {/* Tools */}
      <div className="mb-10">
        <h3 className="text-lg font-bold mb-4">Tools</h3>
        {program.tools.length > 0 ? (
          <div className="flex flex-wrap items-center gap-4">
            {program.tools.map((tool, index) => (
              <div
                key={index}
                className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-md flex items-center justify-center p-2"
              >
                <img
                  src={`${API_BASE_URL}/uploads/${tool.image}`}
                  alt={`Tool ${index}`}
                  className="max-h-full max-w-full object-contain"
                  onError={handleImageError}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Belum ada tools</p>
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
