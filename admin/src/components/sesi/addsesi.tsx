import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/api";
import { ArrowLeft } from "lucide-react";

const TambahSesi = () => {
  const navigate = useNavigate();
  const { id: programId } = useParams();

  const [sessions, setAddSessions] = useState([
    {
      title: "",
      topic: "",
      video: "",
    },
  ]);

  const handleSessionChange = (index: number, field: string, value: string) => {
    const updated = [...sessions];
    (updated[index] as any)[field] = value;
    setAddSessions(updated);
  };

  const handleAddSession = () => {
    setAddSessions([
      ...sessions,
      {
        title: "",
        topic: "",
        video: "",
      },
    ]);
  };

  const handleRemoveSession = (index: number) => {
    const updated = sessions.filter((_, i) => i !== index);
    setAddSessions(updated);
  };

  const handleSubmit = async () => {
    try {
      await api.post(`/api/program/${programId}/sesi`, { sessions });
      alert("Semua sesi berhasil disimpan!");
      navigate(`/program/detail/${programId}`);
    } catch (err) {
      console.error("❌ Gagal menyimpan sesi:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10 md:px-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Tambah Sesi ke Program</h1>

        {sessions.map((sesi, index) => (
          <div key={index} className="border border-gray-300 p-4 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold">Sesi {index + 1}</h3>

            <input
              type="text"
              placeholder="Judul Sesi"
              value={sesi.title}
              onChange={(e) => handleSessionChange(index, "title", e.target.value)}
              className="w-full border px-4 py-2 rounded"
            />

            <input
              type="text"
              placeholder="Topik"
              value={sesi.topic}
              onChange={(e) => handleSessionChange(index, "topic", e.target.value)}
              className="w-full border px-4 py-2 rounded"
            />

            <input
              type="text"
              placeholder="Link Video YouTube"
              value={sesi.video}
              onChange={(e) => handleSessionChange(index, "video", e.target.value)}
              className="w-full border px-4 py-2 rounded"
            />

            {sessions.length > 1 && (
              <button
                onClick={() => handleRemoveSession(index)}
                className="text-red-600 text-sm underline"
              >
                Hapus Sesi Ini
              </button>
            )}
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(-1)}
            className="border px-4 py-2 rounded text-black hover:bg-gray-100"
          >
            <ArrowLeft className="inline w-4 h-4 mr-1" /> Kembali
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleAddSession}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
            >
              + Tambah Sesi
            </button>
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-5 py-2 rounded"
            >
              Simpan Semua
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahSesi;
