import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { X, AlertTriangle } from "lucide-react";

interface Program {
  program_id: number;
  title: string;
  deskripsi: string;
  harga: number;
  categories: string;
  image_cover: string;
}

interface DeleteModalProps {
  isOpen: boolean;
  program: Program | null;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

// Modal Konfirmasi Delete
const DeleteConfirmModal: React.FC<DeleteModalProps> = ({
  isOpen,
  program,
  onClose,
  onConfirm,
  isDeleting
}) => {
  if (!isOpen || !program) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Konfirmasi Hapus</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-3">
            Apakah Anda yakin ingin menghapus program ini?
          </p>
          <div className="bg-gray-100 p-3 rounded-md">
            <p className="font-semibold text-gray-800">{program.title}</p>
            <p className="text-sm text-gray-600">{program.categories}</p>
            <p className="text-sm text-gray-600">
              Rp {Number(program.harga).toLocaleString('id-ID')}
            </p>
          </div>
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm font-medium">⚠️ Peringatan:</p>
            <ul className="text-red-600 text-xs mt-1 list-disc list-inside">
              <li>Semua data program akan terhapus permanent</li>
              <li>Relasi dengan tools akan terhapus</li>
              <li>Data sesi terkait juga akan terhapus</li>
              <li>Tindakan ini tidak dapat dibatalkan</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition disabled:opacity-50 flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Menghapus...
              </>
            ) : (
              <>
                <FaTrash size={14} />
                Ya, Hapus Program
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProgramManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"bootcamp" | "free">("bootcamp");
  const [programs, setPrograms] = useState<Program[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<Program | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const fetchPrograms = async () => {
    try {
      const res = await api.get("/api/program");
      const data = res.data as Program[];

      console.log("🔍 Raw API Response:", data);

      // Log setiap program
      data.forEach((program) => {
        console.log(`Program: ${program.title}`);
        console.log(`Image Cover: "${program.image_cover}"`);
        console.log(`Full Image URL: /uploads/cover/${program.image_cover}`);
        console.log("---");
      });

      const filtered = data.filter(
        (program) =>
          program.categories ===
          (activeTab === "bootcamp" ? "Bootcamp" : "Free Class")
      );

      console.log("🔍 Filtered Programs:", filtered);
      setPrograms(filtered);
    } catch (error) {
      console.error("Gagal fetch program:", error);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [activeTab]);

  const truncate = (str: string, max: number) =>
    str.length > max ? str.slice(0, max) + "..." : str;

  // Open delete modal
  const openDeleteModal = (program: Program) => {
    setProgramToDelete(program);
    setShowDeleteModal(true);
  };

  // Close delete modal
  const closeDeleteModal = () => {
    if (isDeleting) return; // Prevent closing while deleting
    setShowDeleteModal(false);
    setProgramToDelete(null);
  };

  // Improved handleDelete function
  const handleDelete = async () => {
    if (!programToDelete) return;

    setIsDeleting(true);

    try {
      console.log("=== DELETING PROGRAM ===");
      console.log("Program ID:", programToDelete.program_id);
      console.log("Program Title:", programToDelete.title);

      // PERBAIKAN: Gunakan endpoint yang benar dari backend
      const response = await api.delete(`/api/program/${programToDelete.program_id}`);
      
      console.log("✅ Delete response:", response.data);

      // Success notification dengan detail
      const successMessage = `Program "${programToDelete.title}" berhasil dihapus beserta semua data terkait!`;
      
      // Bisa gunakan toast notification library atau alert
      alert(successMessage);
      
      // Close modal
      closeDeleteModal();
      
      // Refresh program list
      await fetchPrograms();

    } catch (error: any) {
      console.error("❌ Error deleting program:", error);
      
      let errorMessage = "Gagal menghapus program";
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white text-black w-full">
      {/* Top Action & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search any program in here..."
          className="rounded-full px-5 py-2 border shadow text-sm w-full md:w-[300px] max-w-md"
        />
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/program/add")}
            className="bg-[#4e5ee4] hover:bg-[#3e4dd4] text-white text-sm px-4 py-2 rounded shadow cursor-pointer"
          >
            + Add Free Class
          </button>
          <button
            onClick={() => navigate("/program/add")}
            className="bg-[#2b2f80] hover:bg-[#1f2260] text-white text-sm px-4 py-2 rounded shadow cursor-pointer"
          >
            + Add Program
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">Program & Classes</h1>

      {/* Tabs */}
      <div className="flex gap-6 text-sm font-semibold border-b border-gray-300 mb-4">
        <button
          className={`cursor-pointer pb-2 ${
            activeTab === "bootcamp"
              ? "border-b-2 border-blue-500 text-blue-600"
              : ""
          }`}
          onClick={() => setActiveTab("bootcamp")}
        >
          Bootcamp Program
        </button>
        <button
          className={`cursor-pointer pb-2 ${
            activeTab === "free"
              ? "border-b-2 border-blue-500 text-blue-600"
              : ""
          }`}
          onClick={() => setActiveTab("free")}
        >
          Free Classes
        </button>
      </div>

      {/* Program Cards */}
      {programs.length === 0 ? (
        <p className="text-gray-500 text-sm">
          Belum ada program untuk kategori ini.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {programs.map((program) => (
            <div
              key={program.program_id}
              className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-md max-w-xs w-full mx-auto"
            >
              {/* Image Container */}
              <div className="w-full h-[130px] bg-gray-800 flex items-center justify-center overflow-hidden">
                {program.image_cover && program.image_cover !== "null" ? (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/uploads/cover/${
                      program.image_cover
                    }`}
                    alt={program.title}
                    className="w-full h-full object-cover"
                    onLoad={() =>
                      console.log(`✅ Image loaded: ${program.image_cover}`)
                    }
                    onError={(e) => {
                      console.error(
                        `❌ Image failed to load: ${program.image_cover}`
                      );
                      const target = e.currentTarget;
                      const parent = target.parentElement;
                      if (parent) {
                        target.style.display = "none";
                        parent.innerHTML =
                          '<span class="text-gray-400 text-sm">Image Error</span>';
                      }
                    }}
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4 text-white space-y-2">
                <h3 className="font-semibold text-base">{program.title}</h3>
                <p className="text-sm text-gray-300">
                  {truncate(program.deskripsi, 60)}
                </p>
                <p className="text-sm font-medium mt-2">
                  Harga: Rp {Number(program.harga).toLocaleString('id-ID')}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() =>
                      navigate(`/program/detail/${program.program_id}`)
                    }
                    className="bg-[#4e5ee4] hover:bg-[#3e4dd4] text-white px-3 py-1 text-sm rounded cursor-pointer"
                  >
                    Detail
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/program/${program.program_id}/tambah-sesi`)
                      }
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm rounded cursor-pointer"
                    >
                      + Sesi
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/program/edit/${program.program_id}`)
                      }
                      className="w-7 h-7 flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 rounded-sm text-black cursor-pointer"
                      title="Edit"
                    >
                      <FaEdit size={12} />
                    </button>

                    <button
                      onClick={() => openDeleteModal(program)}
                      className="w-7 h-7 flex items-center justify-center bg-red-600 hover:bg-red-700 rounded-sm text-white transition-colors cursor-pointer"
                      title="Delete Program"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        program={programToDelete}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ProgramManagementPage;