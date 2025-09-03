import { useEffect, useState } from "react";
import workerCat from "../../assets/workercat.png";
import chillCat from "../../assets/Chillcat.png";

interface Program {
  id: number | string;
  title: string;
  image?: string;
  percentage: number;
}

export default function MyProgress() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem("token");

    async function load() {
      try {
        if (!token) {
          console.warn("No token found — user might not be logged in");
          if (mounted) {
            setPrograms([]);
            setLoading(false);
          }
          return;
        }

        const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

        // Ambil user_id dari endpoint /api/users/me (lebih aman)
        const meRes = await fetch("/api/users/me", { headers });
        if (!meRes.ok) throw new Error("Gagal ambil data user (401/403?)");
        const meJson = await meRes.json();
        const userId = meJson.user_id;

        // Ambil program yang dibeli user
        const resPrograms = await fetch("/api/users/my-programs", { headers });
        const programsData = await resPrograms.json();

        if (!programsData.success || !Array.isArray(programsData.data) || programsData.data.length === 0) {
          if (mounted) {
            setPrograms([]);
            setLoading(false);
          }
          return;
        }

        // Ambil progress untuk semua program secara paralel
        const results: Program[] = await Promise.all(
          programsData.data.map(async (p: any) => {
            try {
              const progRes = await fetch(`/api/users/progress/${userId}/${p.program_id}`, { headers });
              const progJson = await progRes.json();
              const percentage = progJson?.data?.percentage ?? 0;
              return {
                id: p.program_id,
                title: p.title,
                image: p.image_cover ?? "",
                percentage,
              } as Program;
            } catch (err) {
              console.warn("Gagal ambil progress untuk program", p.program_id, err);
              return {
                id: p.program_id,
                title: p.title,
                image: p.image_cover ?? "",
                percentage: 0,
              } as Program;
            }
          })
        );

        if (mounted) setPrograms(results);
      } catch (err) {
        console.error("Gagal fetch progress:", err);
        if (mounted) setPrograms([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-abyssal text-white py-12 px-4 md:px-12">
        <p>Loading...</p>
      </section>
    );
  }

  const displayedPrograms = expanded ? programs : programs.slice(0, 4);

  return (
    <section className="w-full bg-abyssal text-white py-12 px-4 md:px-12 font-poppins">
      <div className="mb-8">
        <h2 className="text-xl font-bold">My Progress</h2>
        <p className="text-sm mt-1">Pantau Progress Kamu di bulan ini!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="flex justify-center">
          <img
            src={workerCat}
            alt="Progress Worker"
            className="max-w-[300px] w-full h-auto"
          />
        </div>

        <div className="border-2 border-rosegold rounded-md p-6 text-center">
          {programs.length > 0 ? (
            <>
              <h3 className="font-bold text-lg uppercase mb-4">
                Progress Program Kamu
              </h3>

              <div className="space-y-6 mb-6 text-left">
                {displayedPrograms.map((prog) => (
                  <div key={prog.id}>
                    <p className="font-semibold mb-1">{prog.title}</p>

                    <div
                      className="relative w-full bg-gray-700 rounded-full h-6 overflow-hidden"
                      role="progressbar"
                      aria-valuenow={Math.round(prog.percentage)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="absolute left-0 top-0 h-6 rounded-full transition-all duration-700 bg-sky-400"
                        style={{ width: `${prog.percentage}%` }}
                      />
                    </div>

                    <p className="text-xs mt-1">
                      {Math.round(prog.percentage)}% selesai
                    </p>
                  </div>
                ))}
              </div>

              {programs.length > 4 && (
                <button
                  onClick={() => setExpanded((s) => !s)}
                  className="bg-rosegold hover:bg-[#B8956B] text-black font-semibold px-6 py-2 rounded-full transition cursor-pointer"
                >
                  {expanded ? "See Less" : "See More"}
                </button>
              )}
            </>
          ) : (
            <>
              <img
                src={chillCat}
                alt="Chill Cat"
                className="mx-auto w-24 mb-4"
              />
              <h3 className="font-bold text-lg uppercase mb-2">
                TIDAK ADA PROGRES YANG DITEMUKAN!
              </h3>
              <p className="text-sm text-gray-200 mb-6">
                Cobalah untuk mengerjakan kursus yang sudah kamu beli ya! Agar
                Progres kamu Tertampil!
              </p>
              <button className="bg-rosegold hover:bg-pink-300 text-black font-semibold px-6 py-2 rounded-full transition">
                Lihat Program
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
