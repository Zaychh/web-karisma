import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


type Tool = {
  id: number;
  judul: string;
  image: string;
  deskripsi: string;
  id_program: number;
};

export default function ToolsManagementPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get<Tool[]>(`${API_BASE_URL}/api/tools`);
        setTools(response.data);
      } catch (error) {
        console.error("Gagal mengambil data tools:", error);
      }
    };

    fetchTools();
  }, []);

  const handleDelete = async (id: number) => {
  if (!confirm("Are you sure you want to delete this badge?")) return;

  try {
    await axios.delete(`${API_BASE_URL}/api/tools/${id}`);
    setTools((prev) => prev.filter((tool) => tool.id !== id));
  } catch (err) {
    console.error("Error deleting tool:", err);
    alert("Failed to delete tool.");
  }
};


  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Input
          type="text"
          placeholder="Search any tools in here..."
          className="w-[350px] shadow rounded-full px-4 py-2"
        />
         <Button
      onClick={() => navigate("/tools/add")} // Ganti path sesuai rute kamu
      className="bg-[#1D3A70] hover:bg-[#162e5a] shadow flex items-center gap-2"
    >
      <Plus size={18} />
      Add Tools
    </Button>
      </div>

      <h2 className="text-2xl font-bold mb-2">List Tools</h2>
      <hr className="mb-6 border-gray-300" />

      <div className="flex flex-wrap gap-6">
        {tools.length > 0 ? (
          tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-neutral-900 text-white p-4 rounded-lg w-48 flex flex-col items-center shadow"
            >
              <img
                src={`${API_BASE_URL}/uploads/tools/${tool.image}`}
                alt={tool.judul}
                className="w-20 h-20 object-contain bg-white rounded mb-4"
              />
              <p className="text-lg font-medium mb-4">{tool.judul}</p>
              <div className="flex gap-2">
                <Button 
                onClick={() => navigate(`/tools/detail/${tool.id}`)}
                className="bg-[#2B3990] hover:bg-[#24366F] text-white px-3 py-1 text-sm">
                  Detail
                </Button>
                <Button 
                onClick={() => navigate(`/tools/edit/${tool.id}`)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 text-sm">
                  <Pencil size={16} />
                </Button>
                <Button 
                onClick={() => handleDelete(tool.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-sm">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Belum ada tools tersedia.</p>
        )}
      </div>
    </div>
  );
}
