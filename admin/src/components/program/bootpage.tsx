import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProgramManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("bootcamp");
  const [programs, setPrograms] = useState<any[]>([]); // ganti tipe sesuai struktur API nanti
  const navigate = useNavigate();

  const handleDetail = (id: number) => {
    navigate(`/program/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/program/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus program ini?");
    if (confirmDelete) {
      // TODO: Panggil DELETE API
      console.log(`Hapus program ID: ${id}`);
    }
  };

  useEffect(() => {
    // TODO: Fetch data dari backend berdasarkan activeTab (bootcamp / free)
    // fetch(`/api/program?type=${activeTab}`).then(...)
    setPrograms([]); // sementara kosong, nanti diganti dari API
  }, [activeTab]);

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

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">Program & Classes</h1>

      {/* Tabs */}
      <div className="flex gap-6 text-sm font-semibold border-b border-gray-300 mb-4">
        <button
          className={`pb-2 ${activeTab === "bootcamp" ? "border-b-2 border-blue-500 text-blue-600" : ""}`}
          onClick={() => setActiveTab("bootcamp")}
        >
          Bootcamp Program
        </button>
        <button
          className={`pb-2 ${activeTab === "free" ? "border-b-2 border-blue-500 text-blue-600" : ""}`}
          onClick={() => setActiveTab("free")}
        >
          Free Classes
        </button>
      </div>

      {/* Program Cards */}
      {programs.length === 0 ? (
        <p className="text-gray-500 text-sm">Belum ada program untuk kategori ini.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-md max-w-xs w-full mx-auto"
            >
              <img
                src={program.imageUrl}
                alt={program.title}
                className="w-full h-[130px] object-cover"
              />
              <div className="p-4 text-white space-y-2">
                <h3 className="font-semibold text-base">{program.title}</h3>
                <p className="text-sm text-gray-300">{program.description}</p>
                <p className="text-sm font-medium mt-2">Harga: {program.price}</p>
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() => handleDetail(program.id)}
                    className="bg-[#4e5ee4] hover:bg-[#3e4dd4] text-white px-3 py-1 text-sm rounded"
                  >
                    Detail
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(program.id)}
                      className="w-5 h-5 bg-yellow-400 rounded-sm"
                      title="Edit"
                    ></button>
                    <button
                      onClick={() => handleDelete(program.id)}
                      className="w-5 h-5 bg-red-600 rounded-sm"
                      title="Delete"
                    ></button>
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
