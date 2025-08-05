import { useEffect, useState, type ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarOnlyLayout from "../../../SidebarOnly";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface ToolData {
  judul: string;
  deskripsi: string;
  image: string;
}

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [toolName, setToolName] = useState("");
  const [description, setDescription] = useState("");
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [currentImageName, setCurrentImageName] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch data awal tool
  useEffect(() => {
    const fetchTool = async () => {
      try {
        setLoading(true);
        const res = await axios.get<ToolData>(`${API_BASE_URL}/api/tools/${id}`);
        
        setToolName(res.data.judul);
        setDescription(res.data.deskripsi);
        setCurrentImageName(res.data.image);
        
        // Set preview jika ada image
        if (res.data.image) {
          setIconPreview(`${API_BASE_URL}/uploads/tools/${res.data.image}`);
        }
        
        console.log("✅ Tool data loaded:", res.data);
      } catch (error) {
        console.error("❌ Error loading tool:", error);
        alert("Gagal memuat data tool");
        navigate("/tools");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTool();
    }
  }, [id, navigate]);

  // Handle perubahan icon
  const handleIconChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi file
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar!');
        return;
      }
      
      // Validasi ukuran (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB!');
        return;
      }

      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setIconPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Submit perubahan
  const handleUpdateSubmit = async () => {
    try {
      // Validasi input
      if (!toolName.trim()) {
        alert("Nama tool tidak boleh kosong!");
        return;
      }
      
      if (!description.trim()) {
        alert("Deskripsi tidak boleh kosong!");
        return;
      }

      setLoading(true);
      
      const formData = new FormData();
      formData.append("judul", toolName.trim());
      formData.append("deskripsi", description.trim());
      
      // Hanya kirim file jika ada file baru
      if (iconFile) {
        formData.append("image", iconFile);
        formData.append("oldImage", ""); // Kosongkan oldImage jika ada file baru
      } else {
        formData.append("oldImage", currentImageName); // Pertahankan image lama
      }

      console.log("🔧 Updating tool with data:", {
        judul: toolName.trim(),
        deskripsi: description.trim(),
        hasNewImage: !!iconFile,
        oldImage: iconFile ? "" : currentImageName
      });

      const response = await axios.put(`${API_BASE_URL}/api/tools/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Update response:", response.data);
      alert("Tool berhasil diperbarui!");
      navigate("/tools");
      
    } catch (error: any) {
      console.error("❌ Error updating tool:", error);
      
      // Cek jika error dari axios
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || error.response.data?.error || "Server error";
        alert(`Gagal memperbarui tool: ${errorMessage}`);
      } else if (error.request) {
        // Request was made but no response received
        alert("Gagal memperbarui tool: Tidak ada respon dari server");
      } else {
        // Something else happened
        alert(`Gagal memperbarui tool: ${error.message || "Unknown error"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading && !toolName) {
    return (
      <SidebarOnlyLayout>
        <div className="flex-1 p-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </SidebarOnlyLayout>
    );
  }

  return (
    <SidebarOnlyLayout>
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Edit Tools</h2>

        {/* Tool Name */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Tool Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            className="w-full border px-4 py-2 rounded shadow italic focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            placeholder="Masukkan nama tool..."
            disabled={loading}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-4 py-2 rounded shadow italic focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            rows={4}
            placeholder="Masukkan deskripsi tool..."
            disabled={loading}
          />
        </div>

        {/* Tool Icon */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Tool Icon</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleIconChange}
            className="w-full border px-3 py-2 rounded shadow focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            disabled={loading}
          />
          <p className="text-sm text-gray-500 mt-1">
            Format: JPG, PNG, GIF. Maksimal 5MB.
          </p>
        </div>

        {/* Preview */}
        {iconPreview && (
          <div className="mb-6">
            <p className="mb-1 font-medium">Preview:</p>
            <img
              src={iconPreview}
              alt="Preview"
              className="w-16 h-16 border p-1 rounded object-contain bg-white shadow"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleUpdateSubmit}
            disabled={loading || !toolName.trim() || !description.trim()}
            className="bg-[#4066ff] hover:bg-[#3052cc] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 rounded shadow transition-colors"
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <button
            onClick={() => navigate("/tools")}
            disabled={loading}
            className="bg-gray-100 border border-gray-400 hover:bg-gray-200 disabled:cursor-not-allowed text-black font-semibold px-6 py-2 rounded shadow transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </SidebarOnlyLayout>
  );
}