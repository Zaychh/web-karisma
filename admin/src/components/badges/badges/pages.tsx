import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface Badge {
  achievement_id: number;
  name: string;
  image: string;
}

export default function BadgesManagementPage() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const res = await axios.get<Badge[]>(`${API_URL}/api/achievements`);
        setBadges(res.data);
      } catch (err) {
        console.error("Error fetching badges:", err);
      }
    };

    fetchBadges();
  }, []);

const filteredBadges = badges.filter((badge) =>
  (badge.name || "").toLowerCase().includes(search.toLowerCase())
);

const handleDelete = async (id: number) => {
  if (!confirm("Are you sure you want to delete this badge?")) return;

  try {
    await axios.delete(`${API_URL}/api/achievements/${id}`);
    setBadges((prev) => prev.filter((badge) => badge.achievement_id !== id));
  } catch (err) {
    console.error("Error deleting badge:", err);
    alert("Failed to delete badge.");
  }
};


  return (
    <div className="p-6">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-6">
        <Input
          type="text"
          placeholder="Search any badges in here..."
          className="w-[350px] shadow rounded-full px-4 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to={"/achievement/add"}>
          <Button className="bg-[#1D3A70] hover:bg-[#162e5a] shadow flex items-center gap-2">
            <Plus size={18} />
            Add Badge
          </Button>
        </Link>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">Achievement List</h2>
      <hr className="mb-6 border-gray-300" />

      {/* Badge Cards */}
      <div className="flex flex-wrap gap-6">
        {filteredBadges.length > 0 ? (
          filteredBadges.map((badge) => (
            <div
              key={badge.achievement_id}
              className="bg-neutral-900 text-white p-4 rounded-lg w-48 flex flex-col items-center shadow"
            >
              <img
                src={`${API_URL}/uploads/achievements/${badge.image}`}
                alt={badge.name}
                className="w-20 h-20 object-contain bg-white rounded mb-4"
              />
              <p className="text-lg font-medium mb-4 text-center">{badge.name}</p>
              <div className="flex gap-2">
                <Link to={`/achievement/detail/${badge.achievement_id}`}>
                  <Button className="bg-[#2B3990] hover:bg-[#24366F] text-white px-3 py-1 text-sm">
                    Detail
                  </Button>
                </Link>
                <Link to={`/achievement/edit/${badge.achievement_id}`}>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 text-sm">
                    <Pencil size={16} />
                  </Button>
                </Link>
                <Button 
                onClick={() => handleDelete(badge.achievement_id)}
                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-sm">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No badges found.</p>
        )}
      </div>
    </div>
  );
}
