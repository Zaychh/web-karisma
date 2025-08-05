import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SidebarOnlyLayout from "../../../SidebarOnly";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface Badge {
  achievement_id: number;
  name: string;
  description: string;
  image: string;
}


export default function Edit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchBadge = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/achievements/${id}`);
        const badge = res.data as Badge;
        setName(badge.name);
        setDescription(badge.description);
        setIconPreview(`${API_BASE_URL}/uploads/achievements/${badge.image}`);
      } catch (err) {
        console.error("Gagal mengambil data badge", err);
      }
    };

    if (id) fetchBadge();
  }, [id]);

  const handleIconChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setIconPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (iconFile) {
      formData.append("image", iconFile);
    }

    try {
      await axios.put(`${API_BASE_URL}/api/achievements/${id}`, formData);
      navigate("/achievement");
    } catch (err) {
      console.error("Gagal update badge", err);
    }
  };

  return (
    <SidebarOnlyLayout>
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Edit Badge</h2>

        <form onSubmit={handleSubmit}>
          {/* Badge Name */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Badge Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-4 py-2 rounded shadow italic"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-4 py-2 rounded shadow italic"
              rows={4}
              required
            />
          </div>

          {/* Badge Image */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Badge Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleIconChange}
              className="w-full border px-4 py-2 rounded shadow"
            />
          </div>

          {/* Preview */}
          {iconPreview && (
            <div className="mb-6">
              <p className="mb-1 font-medium">Preview:</p>
              <img
                src={iconPreview}
                alt="Preview"
                className="w-20 h-20 object-contain border p-1 rounded"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-[#4066ff] hover:bg-[#3052cc] text-white font-semibold px-6 py-2 rounded shadow"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate("/achievement")}
              className="bg-gray-100 border border-gray-400 text-black font-semibold px-6 py-2 rounded shadow"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </SidebarOnlyLayout>
  );
}
