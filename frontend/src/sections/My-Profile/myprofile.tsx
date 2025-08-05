import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultPng from "../../assets/default-avatar.png";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

interface User {
  user_id: number;
  name: string;
  email: string;
  bio?: string;
  phone?: string;
  location?: string;
  image?: string;
}

const MyProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Cek struktur response dengan lebih aman
      console.log("📥 Full API response:", res.data);
      
      // Coba beberapa kemungkinan struktur response
      const userData = res.data.user || res.data.data || res.data;
      
      if (!userData) {
        console.error("❌ No user data found in response");
        throw new Error("No user data in response");
      }

      console.log("✅ Fetched user data:", userData);
      console.log("🖼️ Image:", userData.image);

      setUser(userData);
    } catch (err) {
      console.error("❌ Failed to fetch user", err);
      
      // Log lebih detail untuk debugging
      if (axios.isAxiosError(err)) {
        console.error("Response status:", err.response?.status);
        console.error("Response data:", err.response?.data);
        
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      console.log("🔁 Window focused, refreshing user data...");
      fetchUser();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const getImageUrl = (imagePath?: string): string => {
    if (!imagePath || imagePath.trim() === "" || imagePath === "null" || imagePath === "undefined") {
      return DefaultPng;
    }

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `${API_BASE_URL.replace("/api", "")}/uploads/${imagePath}`;
  };

  const handleEditProfile = () => {
    navigate("/profile/edit-profile");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-ashh text-white font-poppins">
        <div className="w-20" />
        <div className="flex-1 py-10 px-8">
          <div className="text-white">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen bg-ashh text-white font-poppins">
        <div className="w-20" />
        <div className="flex-1 py-10 px-8">
          <div className="text-white">Failed to load profile data.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-ashh text-white font-poppins">
      <div className="w-20" />
      <div className="flex-1 py-10 px-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">My Profile</h1>
          <button
            onClick={handleEditProfile}
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-6 py-2 rounded transition-colors"
          >
            Edit Profile
          </button>
        </div>

        <div className="bg-black border border-white rounded-2xl p-8 flex items-start space-x-10 max-w-4xl">
          <div className="flex flex-col items-center">
            <img
              src={getImageUrl(user.image)}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover mb-4 border-2 border-white"
              onError={(e) => {
                console.warn("🚨 Image failed to load, using default");
                e.currentTarget.src = DefaultPng;
              }}
              onLoad={() => {
                console.log("✅ Image loaded successfully:", getImageUrl(user.image));
              }}
            />
            <div className="w-60 max-w-full text-sm border border-white px-4 py-2 rounded whitespace-pre-wrap break-words text-center">
              {user.bio || "Belum ada bio!"}
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <p className="text-sm font-semibold mb-1">Fullname</p>
              <input
                value={user.name || ""}
                disabled
                className="w-full bg-transparent border border-white p-3 rounded text-white"
              />
            </div>

            <div>
              <p className="text-sm font-semibold mb-1">Email</p>
              <input
                value={user.email || ""}
                disabled
                className="w-full bg-transparent border border-white p-3 rounded text-white"
              />
            </div>

            <div>
              <p className="text-sm font-semibold mb-1">Phone</p>
              <input
                value={user.phone || ""}
                disabled
                className="w-full bg-transparent border border-white p-3 rounded text-white"
                placeholder="No phone number"
              />
            </div>

            <div>
              <p className="text-sm font-semibold mb-1">Location</p>
              <input
                value={user.location || ""}
                disabled
                className="w-full bg-transparent border border-white p-3 rounded text-white"
                placeholder="No location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;