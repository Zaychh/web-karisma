import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const AddBadgeForm: React.FC = () => {
  const navigate = useNavigate();
  const [badgeName, setBadgeName] = useState("");
  const [description, setDescription] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleIconChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setIconPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setIconFile(null);
      setIconPreview(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!badgeName || !description || !iconFile) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", badgeName);
      formData.append("description", description);
      formData.append("image", iconFile); // backend expects "image"

      const response = await axios.post(`${API_BASE_URL}/api/achievements`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Badge saved:", response.data);
      navigate("/achievement");
    } catch (error) {
      console.error("Failed to save badge:", error);
      alert("Failed to save badge. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="max-w-xl w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Add New Badge</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Badge Name</label>
          <Input 
            type="text"
            value={badgeName}
            onChange={(e) => setBadgeName(e.target.value)}
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
          <label className="block mb-1 font-medium">Badge Image</label>
          <Input type="file" accept="image/*" onChange={handleIconChange} />
        </div>

        {iconPreview && (
          <div className="mb-4">
            <span className="block mb-1 font-medium">Preview:</span> 
            <img src={iconPreview} alt="Preview" className="w-16 h-16 border p-1" />
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white hover:bg-blue-700 shadow"
          >
            {loading ? "Saving..." : "Save New"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/achievement")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBadgeForm;
