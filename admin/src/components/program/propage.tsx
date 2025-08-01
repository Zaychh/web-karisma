import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProgramManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"bootcamp" | "free">("bootcamp");
  const [programs, setPrograms] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchPrograms = async () => {
    try {
      const res = await api.get("/api/programs");
      const data = res.data as any[];

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

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus program ini?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/programs/${id}`);
      fetchPrograms(); // Refresh list setelah delete
    } catch (error) {
      console.error("Gagal menghapus program:", error);
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
            className="bg-[#4e5ee4] hover:bg-[#3e4dd4] text-white text-sm px-4 py-2 rounded shadow"
          >
            + Add Free Class
          </button>
          <button
            onClick={() => navigate("/program/add")}
            className="bg-[#2b2f80] hover:bg-[#1f2260] text-white text-sm px-4 py-2 rounded shadow"
          >
            + Add Program
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">Program & Classes</h1>

      {/* Tabs */}
      <div className="flex gap-6 text-sm font-semibold border-b border-gray-300 mb-4">
        <button
          className={`pb-2 ${
            activeTab === "bootcamp"
              ? "border-b-2 border-blue-500 text-blue-600"
              : ""
          }`}
          onClick={() => setActiveTab("bootcamp")}
        >
          Bootcamp Program
        </button>
        <button
          className={`pb-2 ${
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
              key={program.id}
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
                  Harga: {program.harga}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() =>
                      navigate(`/program/detail/${program.program_id}`)
                    }
                    className="bg-[#4e5ee4] hover:bg-[#3e4dd4] text-white px-3 py-1 text-sm rounded"
                  >
                    Detail
                  </button>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/program/${program.program_id}/tambah-sesi`)
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm rounded"
                      >
                        + Sesi
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/program/edit/${program.program_id}`)
                        }
                        className="w-7 h-7 flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 rounded-sm text-black"
                        title="Edit"
                      >
                        <FaEdit size={12} />
                      </button>

                      <button
                        onClick={() => handleDelete(program.program_id)}
                        className="w-7 h-7 flex items-center justify-center bg-red-600 hover:bg-red-700 rounded-sm text-white"
                        title="Delete"
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
    </div>
  );
};

export default ProgramManagementPage;
