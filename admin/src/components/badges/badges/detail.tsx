import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface Badge {
  achievement_id: number;
  name: string;
  description: string;
  image: string;
}

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const [badge, setBadge] = useState<Badge | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadge = async () => {
      try {
        const res = await axios.get<Badge>(`${API_URL}/api/achievements/${id}`);
        setBadge(res.data);
      } catch (error) {
        console.error("Gagal mengambil detail badge:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBadge();
    }
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!badge) return <div className="p-10 text-center text-red-500">Badge tidak ditemukan.</div>;

  return (
    <div className="bg-white min-h-screen text-black px-6 py-10 md:px-16 font-poppins">
      {/* Gambar Header */}
      <div className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden mb-10">
        <img
          src={`${API_URL}/uploads/achievements/${badge.image}`}
          alt={badge.name}
          className="w-full max-w-md mx-auto object-contain border-2 border-black rounded-lg"
        />
      </div>

      {/* Judul */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Badge Name</h3>
        <div className="border-2 border-black px-4 py-3 rounded-md">{badge.name}</div>
      </div>

      {/* Deskripsi */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Description</h3>
        <div className="border-2 border-black px-4 py-3 rounded-md text-sm leading-relaxed">
          {badge.description}
        </div>
      </div>

      {/* Tombol Kembali */}
      <button
        onClick={() => window.history.back()}
        className="bg-white border border-black text-black px-6 py-2 rounded-full flex items-center gap-2 hover:bg-black hover:text-white transition duration"
      >
        <ArrowLeft size={18} />
        Back
      </button>
    </div>
  );
}
