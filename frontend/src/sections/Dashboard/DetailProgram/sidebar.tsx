// sections/Dashboard/Sidebar.tsx

import Logo from "../../../assets/logo.png";
import { LogOut } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  const { id: programId } = useParams(); // dari URL misalnya: /materi/31
  const [progress, setProgress] = useState<number>(0);
  const [programTitle, setProgramTitle] = useState<string>("Loading...");
  const [userId, setUserId] = useState<number | null>(null);

  // ➕ Utility untuk highlight menu aktif
  const isActive = (path: string) =>
    location.pathname.includes(path)
      ? "bg-white text-black font-bold"
      : "text-white hover:bg-gray-800";

  // ✅ Fetch user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((user) => setUserId(user.user_id))
      .catch((err) => {
        console.error("❌ Gagal ambil user:", err);
        setUserId(null);
      });
  }, []);

  // ✅ Fetch progress bootcamp user
useEffect(() => {
  const fetchProgress = () => {
    if (!userId || !programId) return;

    fetch(`${import.meta.env.VITE_API_URL}/users/progress/${userId}/${programId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal ambil progress");
        return res.json();
      })
      .then((data) => {
        if (typeof data.percentage === "number") {
          setProgress(data.percentage);
        } else if (data?.data?.percentage !== undefined) {
          setProgress(data.data.percentage);
        } else {
          setProgress(0);
        }
      })
      .catch((err) => {
        console.error("❌ Gagal ambil progress:", err);
        setProgress(0);
      });
  };

  fetchProgress(); // load awal

  // 🔥 Listen event dari Materi.tsx
  window.addEventListener("progress-updated", fetchProgress);

  return () => window.removeEventListener("progress-updated", fetchProgress);
}, [userId, programId]);

  // ✅ Fetch judul program
  useEffect(() => {
    if (!programId) return;

    fetch(`/api/program/${programId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.judul_program || data?.title) {
          setProgramTitle(data.judul_program || data.title);
        } else {
          setProgramTitle("Program Tidak Ditemukan");
        }
      })
      .catch((err) => {
        console.error("❌ Gagal ambil judul program:", err);
        setProgramTitle("Error memuat program");
      });
  }, [programId]);

  return (
    <aside className="bg-[#262626] w-72 h-screen px-0 py-10 flex flex-col justify-between fixed z-10">
      <div>
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Karisma Logo" className="w-40 h-auto" />
        </div>

        {/* Info Program */}
        <div className="px-6 mb-6">
          <h2 className="text-xl font-bold text-white leading-snug">
            Bootcamp {programTitle}
          </h2>

          <div className="mt-3">
            <div className="w-full h-3 border-2 border-white bg-gray-600 rounded-full relative">
              <div
                className="bg-sky-400 h-[8px] rounded-full absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-sm text-white mt-1">
              {progress.toFixed(0)}% Lengkap
            </p>
          </div>
        </div>

        {/* Navigasi */}
        <nav className="space-y-2">
          <Link
            to={`/materi/${programId}`}
            className={`block w-full text-left py-3 px-6 transition duration-200 cursor-pointer ${isActive(
              "/materi"
            )}`}
          >
            Materi
          </Link>
        </nav>
      </div>

      {/* Footer */}
      <div className="px-6 pt-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-white hover:text-sky-300"
        >
          <LogOut size={16} />
          <span className="font-semibold">Kembali</span>
        </Link>
      </div>
    </aside>
  );
}
