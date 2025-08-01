import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { ArrowLeft, Eye, Pencil, Trash2 } from "lucide-react";

interface Sesi {
  id: number;
  judul_sesi: string;
  topik: string;
  video: string;
  tugas: string;

}

const ListSesi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sesiList, setSesiList] = useState<Sesi[]>([]);

  useEffect(() => {
    const fetchSesi = async () => {
      try {
        const response = await api.get<Sesi[]>(`/api/programs/${id}/sesi`);
        setSesiList(response.data);
      } catch (error) {
        console.error("Gagal mengambil data sesi:", error);
      }
    };

    fetchSesi();
  }, [id]);

  const handleDelete = async (sesi_id: number) => {
  const confirm = window.confirm("Yakin ingin menghapus sesi ini?");
  if (!confirm) return;
  try {
    await api.delete(`/api/sesi/${sesi_id}`);
    // Fix: gunakan sesi_id, bukan id
    setSesiList((prev) => prev.filter((sesi) => sesi.id !== sesi_id));
  } catch (error) {
    console.error("Gagal menghapus sesi:", error);
  }
};

  return (
    <div className="bg-onyx min-h-screen text-white px-6 py-10 md:px-16">
      <h1 className="text-2xl font-bold mb-6">List Sesi</h1>

      {sesiList.length === 0 ? (
        <p className="text-gray-400">Belum ada sesi untuk program ini.</p>
      ) : (
        <div className="space-y-4">
          {sesiList.map((sesi, index) => (
            <div
              key={sesi.id}
              className="flex items-center justify-between p-4 border border-white rounded-lg shadow-sm"
            >
              <div>
                <p className="font-semibold text-lg">
                  Sesi {index + 1}: {sesi.judul_sesi}
                </p>
                <p className="text-sm text-gray-300">Topik: {sesi.topik}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/program/${id}/sesi/${sesi.id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => navigate(`/program/${id}/edit-sesi/${sesi.id}`)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 text-sm rounded"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(sesi.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-10 border border-rosegold text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-rosegold/20 transition"
      >
        <ArrowLeft size={18} /> Kembali
      </button>
    </div>
  );
};

export default ListSesi;
