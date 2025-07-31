import { useEffect, useState } from "react";
import axios from "axios";
import DefaultPng from "../../assets/default-avatar.png";

const BASE_URL = "http://localhost:3000";

const MyProfile = () => {
  const [user, setUser] = useState<any>(null);

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div className="text-white px-8 py-10">Loading profile...</div>;
  }

  return (
    <div className="flex min-h-screen bg-ashh text-white font-poppins">
      {/* Spacer untuk sidebar (karena pakai fixed) */}
      <div className="w-20" />

      <div className="flex-1 py-10 px-8">
        <h1 className="text-4xl font-bold mb-10">My Profile</h1>

        <div className="bg-black border border-white rounded-2xl p-8 flex items-start space-x-10 max-w-4xl">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <img
              src={
                user?.image
                  ? `${BASE_URL}/uploads/${user.image}`
                  : (DefaultPng as string)
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover mb-4"
            />
            <div className="w-60 max-w-full text-sm border border-white px-4 py-2 rounded whitespace-pre-wrap break-words text-center">
              {user?.bio || "Belum ada bio!"}
            </div>
          </div>

          {/* Data */}
          <div className="flex-1 space-y-6">
            <div>
              <p className="text-sm font-semibold mb-1">Fullname</p>
              <input
                value={user?.name || ""}
                disabled
                className="w-full bg-transparent border border-white p-3 rounded"
              />
            </div>

            <div>
              <p className="text-sm font-semibold mb-1">Email</p>
              <input
                value={user?.email || ""}
                disabled
                className="w-full bg-transparent border border-white p-3 rounded"
              />
            </div>

            <div>
              <p className="text-sm font-semibold mb-1">Phone</p>
              <input
                value={user?.phone || ""}
                disabled
                className="w-full bg-transparent border border-white p-3 rounded"
              />
            </div>

            <div>
              <p className="text-sm font-semibold mb-1">Location</p>
              <input
                value={user?.location || ""}
                disabled
                className="w-full bg-transparent border border-white p-3 rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
