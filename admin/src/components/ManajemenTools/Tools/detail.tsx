import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface ToolData {
  judul: string;
  deskripsi: string;
  image: string;
}

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tool, setTool] = useState<ToolData | null>(null);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const res = await axios.get<ToolData>(`${API_BASE_URL}/api/tools/${id}`);
        setTool(res.data);
      } catch (error) {
        console.error("Gagal mengambil data tool:", error);
      }
    };

    if (id) fetchTool();
  }, [id]);

  if (!tool) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen text-black px-6 py-10 md:px-16 font-poppins">
      {/* Gambar Header */}
      <div className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden mb-10">
        <img
          src={`${API_BASE_URL}/uploads/tools/${tool.image}`}
          alt={tool.judul}
          className="w-full max-w-md mx-auto object-contain"
        />
      </div>

      {/* Judul */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Tools Name</h3>
        <div className="border-2 border-black px-4 py-3 rounded-md">{tool.judul}</div>
      </div>

      {/* Deskripsi */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Description</h3>
        <div className="border-2 border-black px-4 py-3 rounded-md text-sm leading-relaxed">
          {tool.deskripsi}
        </div>
      </div>

      {/* Tombol Kembali */}
      <button
        onClick={() => navigate(-1)}
        className="bg-white border border-black text-black px-6 py-2 rounded-full flex items-center gap-2 hover:bg-black hover:text-white transition duration"
      >
        <ArrowLeft size={18} />
        Back
      </button>
    </div>
  );
}
