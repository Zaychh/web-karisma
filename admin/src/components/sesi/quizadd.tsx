import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { ArrowLeft, Save, Loader2, AlertCircle } from "lucide-react";

interface Sesi {
  id: number;
  judul_sesi: string;
  topik: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface ProgramDetailResponse {
  id: number;
  nama_program: string;
  sesi?: Sesi[];
}

interface QuizFormData {
  id_sesi: string;
  pertanyaan: string;
  jawaban_1: string;
  jawaban_2: string;
  jawaban_3: string;
  jawaban_4: string;
  jawaban_benar: string;
}

const CreateQuiz = () => {
  const { programId } = useParams(); // ✅ Gunakan 'programId' sesuai route definition
  const navigate = useNavigate();
  
  const [sesiList, setSesiList] = useState<Sesi[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [formData, setFormData] = useState<QuizFormData>({
    id_sesi: "",
    pertanyaan: "",
    jawaban_1: "",
    jawaban_2: "",
    jawaban_3: "",
    jawaban_4: "",
    jawaban_benar: "1"
  });

  const [errors, setErrors] = useState<Partial<QuizFormData>>({});

  useEffect(() => {
    const fetchSesi = async () => {
      try {
        setLoading(true);
        setError("");
        
        console.log("🔄 Fetching sesi for program ID:", programId);
        
        // DEBUGGING: Coba berbagai endpoint
        const endpoints = [
          `/api/program/${programId}/sesi`,
          `/api/quiz/program/${programId}/quiz`,
          `/api/program/${programId}` // endpoint program detail
        ];

        let response: any = null;
        let usedEndpoint = "";

        for (const endpoint of endpoints) {
          try {
            console.log("🔍 Trying endpoint:", endpoint);
            response = await api.get(endpoint);
            usedEndpoint = endpoint;
            console.log("✅ Success with endpoint:", endpoint, response.data);
            break;
          } catch (err: any) {
            console.log("❌ Failed endpoint:", endpoint, err.response?.status, err.message);
          }
        }

        if (response && response.data) {
          // Handle different response structures
          if (usedEndpoint.includes('/program/') && !usedEndpoint.includes('/sesi')) {
            // Response from program detail - check if it has sesi property
            const programData = response.data.data || response.data;
            if (programData && typeof programData === 'object' && 'sesi' in programData) {
              setSesiList(programData.sesi || []);
            } else {
              // Program doesn't have sesi property, try to fetch from different endpoint
              console.log("⚠️ Program data doesn't have sesi property");
              setSesiList([]);
            }
          } else {
            // Response from sesi or quiz endpoint
            const dataArray = response.data.data || response.data;
            setSesiList(Array.isArray(dataArray) ? dataArray : []);
          }
        } else {
          // FALLBACK: Hardcode data untuk testing
          console.log("🔧 Using fallback hardcoded data");
          setSesiList([
            { id: 1, judul_sesi: "Pengenalan Dasar", topik: "Introduction" },
            { id: 2, judul_sesi: "Konsep Lanjutan", topik: "Advanced" },
            { id: 3, judul_sesi: "Praktik", topik: "Practice" }
          ]);
        }

      } catch (error: any) {
        console.error("❌ Final error:", error);
        
        // FALLBACK: Tetap gunakan hardcoded data jika semua gagal
        console.log("🔧 Using emergency fallback data");
        setSesiList([
          { id: 1, judul_sesi: "Sesi 1 - Test", topik: "Test Topic 1" },
          { id: 2, judul_sesi: "Sesi 2 - Test", topik: "Test Topic 2" }
        ]);
        
        setError(`Gagal memuat data sesi: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (programId) {
      // Add delay to see the loading state
      setTimeout(fetchSesi, 1000);
    } else {
      setError("Program ID tidak ditemukan");
      setLoading(false);
    }
  }, [programId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof QuizFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<QuizFormData> = {};

    if (!formData.id_sesi) {
      newErrors.id_sesi = "Pilih sesi terlebih dahulu";
    }

    if (!formData.pertanyaan.trim()) {
      newErrors.pertanyaan = "Pertanyaan harus diisi";
    }

    if (!formData.jawaban_1.trim()) {
      newErrors.jawaban_1 = "Jawaban A harus diisi";
    }

    if (!formData.jawaban_2.trim()) {
      newErrors.jawaban_2 = "Jawaban B harus diisi";
    }

    if (!formData.jawaban_3.trim()) {
      newErrors.jawaban_3 = "Jawaban C harus diisi";
    }

    if (!formData.jawaban_4.trim()) {
      newErrors.jawaban_4 = "Jawaban D harus diisi";
    }

    if (!formData.jawaban_benar) {
      newErrors.jawaban_benar = "Pilih jawaban yang benar";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  try {
    setSubmitting(true);
    setError("");
    setSuccess("");

    console.log("📤 Submitting quiz data:", formData);

    // Gunakan endpoint yang benar sesuai routes
    const response = await api.post('/api/quiz/admin/quiz', {
      ...formData,
      jawaban_benar: parseInt(formData.jawaban_benar)
    });

    console.log("✅ Quiz created successfully:", response.data);
    setSuccess("Quiz berhasil dibuat!");
    
    // Reset form
    setFormData({
      id_sesi: "",
      pertanyaan: "",
      jawaban_1: "",
      jawaban_2: "",
      jawaban_3: "",
      jawaban_4: "",
      jawaban_benar: "1"
    });

    // Redirect after 2 seconds
    setTimeout(() => {
      navigate(`/program/${programId}/list-sesi`);
    }, 2000);

  } catch (error: any) {
    console.error("❌ Submit error:", error);
    const errorMessage = error.response?.data?.message || error.message || "Gagal membuat quiz. Silakan coba lagi.";
    setError(errorMessage);
  } finally {
    setSubmitting(false);
  }
};

  // Debug info
  console.log("🐛 Debug Info:", {
    programId,
    loading,
    sesiList,
    error,
    formData
  });

  // Loading state
  if (loading) {
    return (
      <div className="bg-onyx min-h-screen text-white px-6 py-10 md:px-16">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={24} />
              <span>Memuat data sesi...</span>
            </div>
            <div className="text-sm text-gray-400">
              Program ID: {programId}
            </div>
            <div className="text-xs text-gray-500">
              Check Console for debug info
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-onyx min-h-screen text-white px-6 py-10 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Buat Quiz Baru</h1>

        {/* Debug Info */}
        <div className="bg-gray-800 p-4 rounded mb-6 text-sm">
          <h3 className="font-bold mb-2">Debug Info:</h3>
          <p>Program ID: {programId}</p>
          <p>Sesi Count: {sesiList.length}</p>
          <p>Loading: {loading.toString()}</p>
        </div>

        {/* Success message */}
        {success && (
          <div className="bg-green-600/20 border border-green-600 text-green-300 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle size={20} />
            {success}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-600/20 border border-red-600 text-red-300 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pilih Sesi */}
          <div>
            <label htmlFor="id_sesi" className="block text-sm font-medium mb-2">
              Pilih Sesi <span className="text-red-400">*</span>
            </label>
            <select
              id="id_sesi"
              name="id_sesi"
              value={formData.id_sesi}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-rosegold focus:border-transparent ${
                errors.id_sesi ? 'border-red-500' : 'border-gray-600'
              }`}
            >
              <option value="">-- Pilih Sesi --</option>
              {sesiList.map((sesi, index) => (
                <option key={sesi.id} value={sesi.id}>
                  Sesi {index + 1}: {sesi.judul_sesi}
                </option>
              ))}
            </select>
            {errors.id_sesi && (
              <p className="text-red-400 text-sm mt-1">{errors.id_sesi}</p>
            )}
          </div>

          {/* Pertanyaan */}
          <div>
            <label htmlFor="pertanyaan" className="block text-sm font-medium mb-2">
              Pertanyaan <span className="text-red-400">*</span>
            </label>
            <textarea
              id="pertanyaan"
              name="pertanyaan"
              value={formData.pertanyaan}
              onChange={handleInputChange}
              rows={4}
              placeholder="Masukkan pertanyaan quiz..."
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-rosegold focus:border-transparent resize-none ${
                errors.pertanyaan ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {errors.pertanyaan && (
              <p className="text-red-400 text-sm mt-1">{errors.pertanyaan}</p>
            )}
          </div>

          {/* Pilihan Jawaban */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Jawaban A */}
            <div>
              <label htmlFor="jawaban_1" className="block text-sm font-medium mb-2">
                Jawaban A <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="jawaban_1"
                name="jawaban_1"
                value={formData.jawaban_1}
                onChange={handleInputChange}
                placeholder="Masukkan jawaban A"
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-rosegold focus:border-transparent ${
                  errors.jawaban_1 ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {errors.jawaban_1 && (
                <p className="text-red-400 text-sm mt-1">{errors.jawaban_1}</p>
              )}
            </div>

            {/* Jawaban B */}
            <div>
              <label htmlFor="jawaban_2" className="block text-sm font-medium mb-2">
                Jawaban B <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="jawaban_2"
                name="jawaban_2"
                value={formData.jawaban_2}
                onChange={handleInputChange}
                placeholder="Masukkan jawaban B"
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-rosegold focus:border-transparent ${
                  errors.jawaban_2 ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {errors.jawaban_2 && (
                <p className="text-red-400 text-sm mt-1">{errors.jawaban_2}</p>
              )}
            </div>

            {/* Jawaban C */}
            <div>
              <label htmlFor="jawaban_3" className="block text-sm font-medium mb-2">
                Jawaban C <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="jawaban_3"
                name="jawaban_3"
                value={formData.jawaban_3}
                onChange={handleInputChange}
                placeholder="Masukkan jawaban C"
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-rosegold focus:border-transparent ${
                  errors.jawaban_3 ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {errors.jawaban_3 && (
                <p className="text-red-400 text-sm mt-1">{errors.jawaban_3}</p>
              )}
            </div>

            {/* Jawaban D */}
            <div>
              <label htmlFor="jawaban_4" className="block text-sm font-medium mb-2">
                Jawaban D <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="jawaban_4"
                name="jawaban_4"
                value={formData.jawaban_4}
                onChange={handleInputChange}
                placeholder="Masukkan jawaban D"
                className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-rosegold focus:border-transparent ${
                  errors.jawaban_4 ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {errors.jawaban_4 && (
                <p className="text-red-400 text-sm mt-1">{errors.jawaban_4}</p>
              )}
            </div>
          </div>

          {/* Jawaban Benar */}
          <div>
            <label htmlFor="jawaban_benar" className="block text-sm font-medium mb-2">
              Jawaban yang Benar <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { value: "1", label: "A" },
                { value: "2", label: "B" },
                { value: "3", label: "C" },
                { value: "4", label: "D" }
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="jawaban_benar"
                    value={option.value}
                    checked={formData.jawaban_benar === option.value}
                    onChange={handleInputChange}
                    className="text-rosegold focus:ring-rosegold"
                  />
                  <span className="text-sm">Jawaban {option.label}</span>
                </label>
              ))}
            </div>
            {errors.jawaban_benar && (
              <p className="text-red-400 text-sm mt-1">{errors.jawaban_benar}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="bg-rosegold hover:bg-rosegold/90 disabled:bg-rosegold/50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Simpan Quiz
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate(`/program/${programId}/list-sesi`)}
              className="border border-gray-600 hover:border-gray-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <ArrowLeft size={18} />
              Kembali
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;