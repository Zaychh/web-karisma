import { useState } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Tambahkan ini
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const AddToolsForm: React.FC = () => {
  const navigate = useNavigate(); // ✅ Inisialisasi navigate
  const [toolName, setToolName] = useState("");
  const [description, setDescription] = useState("");
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);

  const handleIconChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setIconPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setIconPreview(null);
      setIconFile(null);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("judul", toolName);
      formData.append("deskripsi", description);
      if (iconFile) {
        formData.append("image", iconFile);
      }

      const res = await axios.post(`${API_BASE_URL}/api/tools`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Berhasil menyimpan:", res.data);

      // Redirect ke halaman list tools setelah berhasil
      navigate("/tools"); // ✅ Tambahkan ini

    } catch (error) {
      console.error("Gagal menyimpan tools:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Add New Tools</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Tools Name</label>
          <Input
            type="text"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            className="italic"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="italic"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Tools Icon</label>
          <Input type="file" accept="image/*" onChange={handleIconChange} />
        </div>

        {iconPreview && (
          <div className="mb-4">
            <span className="block font-medium mb-1">Preview:</span>
            <img src={iconPreview} alt="Icon Preview" className="w-16 h-16 border p-1" />
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow" onClick={handleSubmit}>
            Save New
          </Button>
          <Button variant="outline" onClick={() => navigate("/tools")}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddToolsForm;
