import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultPng from "../../assets/default-avatar.png";
import { useAuth } from "../../contexts/AuthContext"; // Tambahkan ini

const BASE_URL = "http://localhost:3000";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const navigate = useNavigate();
  const auth = useAuth(); // Ambil context auth (supaya bisa refresh data user)

  // Ambil data user saat pertama buka halaman
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const u = res.data;
        setName(u.name || "");
        setEmail(u.email || "");
        setBio(u.bio || "");
        setPhone(u.phone || "");
        setLocation(u.location || "");
        setPreviewUrl(u.image ? `${BASE_URL}/uploads/${u.image}` : DefaultPng);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  // Ganti gambar & tampilkan preview-nya
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Submit form: update data ke backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("bio", bio);
      formData.append("phone", phone);
      formData.append("location", location);
      if (image) formData.append("image", image);

      await axios.put("/api/user/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Perubahan Penting: Refresh user context biar navbar dan profile update
      auth.refreshUser();

      alert("Profil berhasil diperbarui!");
      navigate("/profile/my-profile");
    } catch (err) {
      console.error("Gagal update", err);
      alert("Gagal update profil");
    }
  };

  return (
    <div className="min-h-screen bg-ashh text-white font-poppins flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-ashh border border-white rounded-xl p-8 max-w-2xl w-full"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Fullname</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-ashh border border-white text-white p-3 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-ashh border border-white text-white p-3 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-ashh border border-white text-white p-3 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-ashh border border-white text-white p-3 rounded"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full bg-ashh border border-white text-white p-3 rounded"
          />
        </div>

        {/* Upload & Preview Gambar */}
        <div className="mb-6">
          <div className="relative mb-2">
            <input
              type="file"
              accept="image/*"
              id="profile-image"
              onChange={handleImageChange}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
            <div className="flex items-center gap-2 bg-ashh border border-white text-white py-2 px-4 rounded">
              <label
                htmlFor="profile-image"
                className="font-semibold cursor-pointer"
              >
                Choose File
              </label>
              <span className="text-sm font-medium">
                {image ? image.name : "No file chosen"}
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm mb-1">Preview:</p>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border border-white"
            />
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-between items-center mt-8">
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-6 py-2 rounded cursor-pointer"
          >
            Update
          </button>

          <button
            type="button"
            className="bg-white text-black px-6 py-2 rounded font-semibold cursor-pointer"
            onClick={() => navigate("/profile/setting")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
