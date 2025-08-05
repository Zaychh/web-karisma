import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Plus, X } from "lucide-react";
import api from "../../lib/api";

interface Tool {
  id: number;
  judul: string;
  image: string;
  deskripsi: string;
}

interface Instructor {
  instructor_id: number;
  name: string;
  image: string;
  mastery: string;
  status: string;
}

interface ProgramDetail {
  program_id: number;
  title: string;
  deskripsi: string;
  harga: number;
  categories: string;
  image_cover: string;
  instructor_id?: number;
  tools: Tool[];
  achievements?: Achievement[]; // Tambahkan ini
  instructor?: {
    name: string;
    majority: string;
    image: string;
  };
}

interface ProgramFormData {
  title: string;
  deskripsi: string;
  harga: string;
  categories: string;
  instructor_id: string;
  image_cover?: File;
}

interface Achievement {
  achievement_id: number;
  name: string;
  description: string;
  image: string;
}

const EditProgram = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState<ProgramDetail | null>(null);
  const [formData, setFormData] = useState<ProgramFormData>({
    title: "",
    deskripsi: "",
    harga: "",
    categories: "",
    instructor_id: "",
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [allInstructors, setAllInstructors] = useState<Instructor[]>([]);
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [isToolModalOpen, setIsToolModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [availableAchievements, setAvailableAchievements] = useState<Achievement[]>([]);
  const [selectedAchievements, setSelectedAchievements] = useState<
    Achievement[]
  >([]);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  // Fetch program data
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await api.get<ProgramDetail>(`/api/program/${id}`);
        const programData = response.data;

        setProgram(programData);
        setFormData({
          title: programData.title,
          deskripsi: programData.deskripsi,
          harga: programData.harga.toString(),
          categories: programData.categories,
          instructor_id: programData.instructor_id?.toString() || "",
        });
        setSelectedTools(programData.tools || []);
        // Di dalam useEffect fetchProgram, setelah setSelectedTools
        setSelectedAchievements(programData.achievements || []);

        if (programData.image_cover) {
          setImagePreview(
            `${API_BASE_URL}/uploads/cover/${programData.image_cover}`
          );
        }
      } catch (error) {
        console.error("Gagal mengambil detail program:", error);
        alert("Gagal memuat data program");
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id, API_BASE_URL]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get<string[]>("/api/program/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch all tools
  useEffect(() => {
    const fetchAllTools = async () => {
      try {
        const response = await api.get<Tool[]>("/api/tools");
        setAllTools(response.data);
      } catch (error) {
        console.error("Gagal mengambil tools:", error);
      }
    };

    fetchAllTools();
  }, []);

  // Fetch all instructors
  useEffect(() => {
    const fetchAllInstructors = async () => {
      try {
        const response = await api.get<Instructor[]>("/api/instructors");
        // Filter hanya instructor yang aktif
        const activeInstructors = response.data.filter(
          (instructor) => instructor.status === "Active"
        );
        setAllInstructors(activeInstructors);
      } catch (error) {
        console.error("Gagal mengambil instructors:", error);
      }
    };

    fetchAllInstructors();
  }, []);

  // Fetch all achievements
  useEffect(() => {
    const fetchAvailableAchievements = async () => {
      try {
        const response = await api.get<Achievement[]>("/api/achievements");
          setAvailableAchievements(response.data);
      } catch (error) {
        console.error("Gagal mengambil achievements:", error);
      }
    };

    fetchAvailableAchievements();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image_cover: file }));

      // Preview image
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTool = (tool: Tool) => {
    if (!selectedTools.find((t) => t.id === tool.id)) {
      setSelectedTools((prev) => [...prev, tool]);
    }
  };

  const handleRemoveTool = (toolId: number) => {
    setSelectedTools((prev) => prev.filter((t) => t.id !== toolId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("deskripsi", formData.deskripsi);
      submitData.append("harga", formData.harga);
      submitData.append("categories", formData.categories);
      submitData.append("instructor_id", formData.instructor_id);

      // Tambahkan tool IDs
      const toolIds = selectedTools.map((tool) => tool.id);
      submitData.append("tool_ids", JSON.stringify(toolIds));

      const achievementIds = selectedAchievements.map((a) => a.achievement_id);
      submitData.append("achievement_ids", JSON.stringify(achievementIds));


      if (formData.image_cover) {
        submitData.append("image_cover", formData.image_cover);
      }

      await api.put(`/api/program/${id}`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Program berhasil diperbarui!");
      navigate("/program");
    } catch (error) {
      console.error("Gagal memperbarui program:", error);
      alert("Gagal memperbarui program");
    } finally {
      setSaving(false);
    }
  };

  const handleAddAchievement = (achievement: Achievement) => {
    if (
      !selectedAchievements.find(
        (a) => a.achievement_id === achievement.achievement_id
      )
    ) {
      setSelectedAchievements((prev) => [...prev, achievement]);
    }
  };

  const handleRemoveAchievement = (achievementId: number) => {
    setSelectedAchievements((prev) =>
      prev.filter((a) => a.achievement_id !== achievementId)
    );
  };

  if (loading) return <p className="text-white">Loading...</p>;

  const availableTools = allTools.filter(
    (tool) => !selectedTools.find((selected) => selected.id === tool.id)
  );

  // Get current instructor info for display
  const currentInstructor = allInstructors.find(
    (instructor) =>
      instructor.instructor_id.toString() === formData.instructor_id
  );

  return (
    <div className="bg-onyx min-h-screen text-white px-6 py-10 md:px-16">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        {/* Header Image Preview */}
        {imagePreview && (
          <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden mb-8">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-lg font-bold mb-2" htmlFor="image_cover">
            Gambar Cover
          </label>
          <input
            type="file"
            id="image_cover"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-3 rounded-md bg-transparent border border-white text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-white file:text-black"
          />
        </div>

        {/* Judul */}
        <div className="mb-6">
          <label className="block text-lg font-bold mb-2" htmlFor="title">
            Judul
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-md bg-transparent border border-white text-white focus:outline-none focus:border-rosegold"
            required
          />
        </div>

        {/* Deskripsi */}
        <div className="mb-6">
          <label className="block text-lg font-bold mb-2" htmlFor="deskripsi">
            Deskripsi
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 rounded-md bg-transparent border border-white text-white focus:outline-none focus:border-rosegold resize-none"
            required
          />
        </div>

        {/* Grid: Harga, Kategori, Instructor, Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <div>
            <label className="block text-lg font-bold mb-2" htmlFor="harga">
              Harga
            </label>
            <input
              type="number"
              id="harga"
              name="harga"
              value={formData.harga}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-md bg-transparent border border-white text-white focus:outline-none focus:border-rosegold"
              required
            />
          </div>

          {/* Kategori */}
          <div>
            <label
              className="block text-lg font-bold mb-2"
              htmlFor="categories"
            >
              Kategori
            </label>
            <select
              id="categories"
              name="categories"
              value={formData.categories}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-md bg-transparent border border-white text-white focus:outline-none focus:border-rosegold"
              required
            >
              <option value="" className="bg-onyx">
                Pilih Kategori
              </option>
              {categories.map((category) => (
                <option key={category} value={category} className="bg-onyx">
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Instructor */}
          <div>
            <label
              className="block text-lg font-bold mb-2"
              htmlFor="instructor_id"
            >
              Instructor
            </label>
            <select
              id="instructor_id"
              name="instructor_id"
              value={formData.instructor_id}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-md bg-transparent border border-white text-white focus:outline-none focus:border-rosegold"
              required
            >
              <option value="" className="bg-onyx">
                Pilih Instructor
              </option>
              {allInstructors.map((instructor) => (
                <option
                  key={instructor.instructor_id}
                  value={instructor.instructor_id}
                  className="bg-onyx"
                >
                  {instructor.name} - {instructor.mastery}
                </option>
              ))}
            </select>
          </div>

          {/* Tools Management */}
          <div>
            <label className="block text-lg font-bold mb-2">Tools</label>
            <button
              type="button"
              onClick={() => setIsToolModalOpen(true)}
              className="w-full px-4 py-3 rounded-md border border-white text-white hover:bg-white hover:text-black transition flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Kelola Tools
            </button>
          </div>
        </div>

        {/* Achievement Management */}
        <div>
          <label className="block text-lg font-bold mb-2">Achievements</label>
          <button
            type="button"
            onClick={() => setIsAchievementModalOpen(true)}
            className="w-full px-4 py-3 rounded-md border border-white text-white hover:bg-white hover:text-black transition flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Kelola Achievements
          </button>
        </div>

        {/* Current Instructor Display */}
        {currentInstructor && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Instructor Terpilih</h3>
            <div className="bg-onyx border border-white rounded-lg p-4 flex items-center gap-4">
              {currentInstructor.image && (
                <img
                  src={`${API_BASE_URL}/uploads/${currentInstructor.image}`}
                  alt={currentInstructor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div className="text-putih">
                <h4 className="font-semibold text-lg">
                  {currentInstructor.name}
                </h4>
                <p className="text-gray-400">{currentInstructor.mastery}</p>
              </div>
            </div>
          </div>
        )}

        {/* Selected Tools Display */}
        {selectedTools.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-bold mb-4">Tools Terpilih</h3>
            <div className="flex flex-wrap gap-4">
              {selectedTools.map((tool) => (
                <div
                  key={tool.id}
                  className="relative group bg-white rounded-md p-3 flex flex-col items-center"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveTool(tool.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={14} />
                  </button>
                  <img
                    src={`${API_BASE_URL}/uploads/tools/${tool.image}`}
                    alt={tool.judul}
                    className="w-12 h-12 object-contain mb-2"
                  />
                  <span className="text-black text-xs text-center">
                    {tool.judul}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Achievements Display */}
        {selectedAchievements.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-bold mb-4">Achievements Terpilih</h3>
            <div className="flex flex-wrap gap-4">
              {selectedAchievements.map((achievement) => (
                <div
                  key={achievement.achievement_id}
                  className="relative group bg-white rounded-md p-3 flex flex-col items-center"
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveAchievement(achievement.achievement_id)
                    }
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={14} />
                  </button>
                  <img
                    src={`${API_BASE_URL}/uploads/achievements/${achievement.image}`}
                    alt={achievement.name}
                    className="w-12 h-12 object-contain mb-2"
                  />
                  <span className="text-black text-xs text-center">
                    {achievement.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/program")}
            className="border border-gray-400 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-400/20 transition"
          >
            <ArrowLeft size={18} /> Batal
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-rosegold text-white px-6 py-2 rounded-full hover:bg-rosegold/80 transition disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Perbarui Program"}
          </button>
        </div>
      </form>

      {/* Tools Selection Modal */}
      {/* Tools Selection Modal */}
      {isToolModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-onyx border border-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Pilih Tools</h2>
              <button
                type="button"
                onClick={() => setIsToolModalOpen(false)}
                className="text-white hover:text-red-400"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {availableTools.map((tool) => (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => handleAddTool(tool)}
                  className="bg-white rounded-md p-4 flex flex-col items-center hover:bg-gray-100 transition"
                >
                  <img
                    src={`${API_BASE_URL}/uploads/tools/${tool.image}`}
                    alt={tool.judul}
                    className="w-16 h-16 object-contain mb-2"
                  />
                  <span className="text-black text-sm text-center">
                    {tool.judul}
                  </span>
                </button>
              ))}
            </div>

            {availableTools.length === 0 && (
              <p className="text-gray-400 text-center py-8">
                Semua tools sudah dipilih atau belum ada tools tersedia
              </p>
            )}
          </div>
        </div>
      )}

      {/* Achievement Selection Modal - PINDAH KE SINI, SEJAJAR DENGAN TOOLS MODAL */}
      {isAchievementModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-onyx border border-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                Pilih Achievements
              </h2>
              <button
                type="button"
                onClick={() => setIsAchievementModalOpen(false)}
                className="text-white hover:text-red-400"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {availableAchievements
                .filter(
                  (achievement) =>
                    !selectedAchievements.find(
                      (selected) =>
                        selected.achievement_id === achievement.achievement_id
                    )
                )
                .map((achievement) => (
                  <button
                    key={achievement.achievement_id}
                    type="button"
                    onClick={() => handleAddAchievement(achievement)}
                    className="bg-white rounded-md p-4 flex flex-col items-center hover:bg-gray-100 transition"
                  >
                    <img
                      src={`${API_BASE_URL}/uploads/achievements/${achievement.image}`}
                      alt={achievement.name}
                      className="w-16 h-16 object-contain mb-2"
                    />
                    <span className="text-black text-sm text-center">
                      {achievement.name}
                    </span>
                  </button>
                ))}
            </div>

            {availableAchievements.filter(
              (achievement) =>
                !selectedAchievements.find(
                  (selected) =>
                    selected.achievement_id === achievement.achievement_id
                )
            ).length === 0 && (
              <p className="text-gray-400 text-center py-8">
                Semua achievements sudah dipilih atau belum ada achievements
                tersedia
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProgram;
