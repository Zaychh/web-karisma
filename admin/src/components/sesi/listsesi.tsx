import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { ArrowLeft, Eye, Pencil, Trash2, Loader2, Plus, FileQuestion } from "lucide-react";

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
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSesi = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get<Sesi[]>(`/api/program/${id}/sesi`);
        setSesiList(response.data);
      } catch (error) {
        console.error("Gagal mengambil data sesi:", error);
        setError("Gagal memuat data sesi. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSesi();
    }
  }, [id]);

  const handleDelete = async (sesi_id: number, sesiTitle: string) => {
    // Konfirmasi dengan menampilkan nama sesi
    const confirm = window.confirm(
      `Yakin ingin menghapus sesi "${sesiTitle}"?\n\nTindakan ini tidak dapat dibatalkan.`
    );
    
    if (!confirm) return;

    try {
      setDeletingId(sesi_id);
      setError("");
      
      // Gunakan URL yang benar sesuai dengan route backend
      await api.delete(`/api/program/${id}/sesi/${sesi_id}`);
      
      // Update state untuk menghapus sesi dari list
      setSesiList((prev) => prev.filter((sesi) => sesi.id !== sesi_id));
      
      // Optional: Tampilkan notifikasi sukses
      // Anda bisa menambahkan toast notification di sini
      
    } catch (error: any) {
      console.error("Gagal menghapus sesi:", error);
      
      // Tampilkan error message yang lebih informatif
      const errorMessage = error.response?.data?.error || "Gagal menghapus sesi. Silakan coba lagi.";
      setError(errorMessage);
      
      // Optional: Tampilkan alert untuk error
      alert(`Error: ${errorMessage}`);
      
    } finally {
      setDeletingId(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-onyx min-h-screen text-white px-6 py-10 md:px-16">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin" size={24} />
            <span>Memuat data sesi...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-onyx min-h-screen text-white px-6 py-10 md:px-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">List Sesi</h1>
        
        {/* Button Tambah Quiz - tampil jika ada sesi */}
        {sesiList.length > 0 && (
          <button
            onClick={() => navigate(`/program/${id}/quiz/create`)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            title="Tambah Quiz untuk Program ini"
          >
            <Plus size={18} />
            Tambah Quiz
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-600/20 border border-red-600 text-red-300 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {sesiList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">Belum ada sesi untuk program ini.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sesiList.map((sesi, index) => (
            <div
              key={sesi.id}
              className="flex items-center justify-between p-4 border border-white rounded-lg shadow-sm hover:border-rosegold/50 transition-colors"
            >
              <div className="flex-1">
                <p className="font-semibold text-lg">
                  Sesi {index + 1}: {sesi.judul_sesi}
                </p>
                <p className="text-sm text-gray-300">Topik: {sesi.topik}</p>
                {sesi.video && (
                  <p className="text-xs text-blue-400 mt-1">
                    📹 Video tersedia
                  </p>
                )}
              </div>
              
              <div className="flex gap-2">
                {/* View button */}
                <button
                  onClick={() => navigate(`/program/${id}/sesi/${sesi.id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 text-sm rounded transition-colors flex items-center gap-1"
                  title="Lihat detail sesi"
                >
                  <Eye size={16} />
                </button>
                
                {/* Quiz button - untuk sesi individual */}
                <button
                  onClick={() => navigate(`/quiz/manage/${id}`)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 text-sm rounded transition-colors flex items-center gap-1"
                  title="Lihat/Kelola Quiz untuk sesi ini"
                >
                  <FileQuestion size={16} />
                </button>
                
                {/* Edit button */}
                <button
                  onClick={() => navigate(`/program/${id}/sesi/${sesi.id}/edit`)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 text-sm rounded transition-colors flex items-center gap-1"
                  title="Edit sesi"
                >
                  <Pencil size={16} />
                </button>
                
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(sesi.id, sesi.judul_sesi)}
                  disabled={deletingId === sesi.id}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 disabled:cursor-not-allowed text-white px-3 py-2 text-sm rounded transition-colors flex items-center gap-1"
                  title="Hapus sesi"
                >
                  {deletingId === sesi.id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back button */}
      <button
        onClick={() => navigate(`/program`)}
        className="mt-10 border border-rosegold text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-rosegold/20 transition"
      >
        <ArrowLeft size={18} /> Kembali
      </button>
    </div>
  );
};

export default ListSesi;