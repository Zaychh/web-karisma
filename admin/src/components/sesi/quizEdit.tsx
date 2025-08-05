// src/components/QuizEdit.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Types
interface QuizDetail {
  quiz: {
    id: number;
    id_sesi: number;
    id_soal: number;
    judul_sesi: string;
    created_at?: string;
    updated_at?: string;
  };
  soal: {
    id: number;
    soal: string;
  };
  jawaban: Array<{
    id: number;
    jawaban: string;
    benar: number;
    id_soal: number;
  }>;
}

interface QuizFormData {
  pertanyaan: string;
  jawaban_1: string;
  jawaban_2: string;
  jawaban_3: string;
  jawaban_4: string;
  jawaban_benar: number;
}

const QuizEdit: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();

  // States
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [quizDetail, setQuizDetail] = useState<QuizDetail | null>(null);
  
  const [formData, setFormData] = useState<QuizFormData>({
    pertanyaan: '',
    jawaban_1: '',
    jawaban_2: '',
    jawaban_3: '',
    jawaban_4: '',
    jawaban_benar: 1,
  });

  // Get base API URL from environment or default
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  // Fetch quiz detail for editing
  const fetchQuizDetail = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${API_BASE_URL}/api/quiz/admin/quiz/${quizId}`);
      const result = await response.json();

      if (result.success && result.data) {
        setQuizDetail(result.data);
        
        // Find correct answer index (1-4)
        const correctAnswerIndex = result.data.jawaban.findIndex((j: any) => j.benar === 1) + 1;
        
        // Populate form with existing data
        setFormData({
          pertanyaan: result.data.soal.soal || '',
          jawaban_1: result.data.jawaban[0]?.jawaban || '',
          jawaban_2: result.data.jawaban[1]?.jawaban || '',
          jawaban_3: result.data.jawaban[2]?.jawaban || '',
          jawaban_4: result.data.jawaban[3]?.jawaban || '',
          jawaban_benar: correctAnswerIndex || 1,
        });
      } else {
        setError(result.message || 'Quiz tidak ditemukan');
      }
    } catch (err) {
      setError('Error fetching quiz: ' + (err as Error).message);
      console.error('Error fetching quiz detail:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'jawaban_benar' ? parseInt(value) : value,
    }));

    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Validation
    if (!formData.pertanyaan.trim()) {
      setError('Pertanyaan tidak boleh kosong');
      return;
    }
    
    if (!formData.jawaban_1.trim() || !formData.jawaban_2.trim() || 
        !formData.jawaban_3.trim() || !formData.jawaban_4.trim()) {
      setError('Semua pilihan jawaban harus diisi');
      return;
    }

    if (![1, 2, 3, 4].includes(formData.jawaban_benar)) {
      setError('Pilih jawaban yang benar');
      return;
    }

    try {
      setSaving(true);
      setError('');
      
      const response = await fetch(`${API_BASE_URL}/api/quiz/admin/quiz/${quizId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Quiz berhasil diperbarui!');
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate(-1); // Go back to previous page
        }, 2000);
      } else {
        setError(result.message || 'Gagal memperbarui quiz');
      }
    } catch (err) {
      setError('Error updating quiz: ' + (err as Error).message);
      console.error('Error updating quiz:', err);
    } finally {
      setSaving(false);
    }
  };

  // Handle go back
  const handleGoBack = (): void => {
    navigate(-1);
  };

  // Effect to fetch quiz data when component mounts
  useEffect(() => {
    if (quizId) {
      fetchQuizDetail();
    }
  }, [quizId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <span className="text-xl">Loading quiz data...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Edit Quiz</h1>
            {quizDetail && (
              <p className="text-gray-400">
                Sesi: {quizDetail.quiz.judul_sesi} (ID: {quizDetail.quiz.id})
              </p>
            )}
          </div>
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Success Display */}
        {success && (
          <div className="bg-green-900/50 border border-green-500 text-green-200 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {success}
            </div>
          </div>
        )}

        {/* Edit Form */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question Field */}
            <div>
              <label htmlFor="pertanyaan" className="block text-sm font-medium text-gray-300 mb-2">
                Pertanyaan <span className="text-red-400">*</span>
              </label>
              <textarea
                id="pertanyaan"
                name="pertanyaan"
                value={formData.pertanyaan}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Masukkan pertanyaan quiz..."
                required
              />
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Answer 1 */}
              <div>
                <label htmlFor="jawaban_1" className="block text-sm font-medium text-gray-300 mb-2">
                  Jawaban A <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="jawaban_1"
                  name="jawaban_1"
                  value={formData.jawaban_1}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Pilihan jawaban A"
                  required
                />
              </div>

              {/* Answer 2 */}
              <div>
                <label htmlFor="jawaban_2" className="block text-sm font-medium text-gray-300 mb-2">
                  Jawaban B <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="jawaban_2"
                  name="jawaban_2"
                  value={formData.jawaban_2}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Pilihan jawaban B"
                  required
                />
              </div>

              {/* Answer 3 */}
              <div>
                <label htmlFor="jawaban_3" className="block text-sm font-medium text-gray-300 mb-2">
                  Jawaban C <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="jawaban_3"
                  name="jawaban_3"
                  value={formData.jawaban_3}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Pilihan jawaban C"
                  required
                />
              </div>

              {/* Answer 4 */}
              <div>
                <label htmlFor="jawaban_4" className="block text-sm font-medium text-gray-300 mb-2">
                  Jawaban D <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="jawaban_4"
                  name="jawaban_4"
                  value={formData.jawaban_4}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Pilihan jawaban D"
                  required
                />
              </div>
            </div>

            {/* Correct Answer Selection */}
            <div>
              <label htmlFor="jawaban_benar" className="block text-sm font-medium text-gray-300 mb-2">
                Jawaban yang Benar <span className="text-red-400">*</span>
              </label>
              <select
                id="jawaban_benar"
                name="jawaban_benar"
                value={formData.jawaban_benar}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value={1}>A - {formData.jawaban_1 || 'Jawaban A'}</option>
                <option value={2}>B - {formData.jawaban_2 || 'Jawaban B'}</option>
                <option value={3}>C - {formData.jawaban_3 || 'Jawaban C'}</option>
                <option value={4}>D - {formData.jawaban_4 || 'Jawaban D'}</option>
              </select>
            </div>

            {/* Preview Section */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-3">Preview Quiz</h3>
              <div className="space-y-3">
                <div className="text-gray-200">
                  <strong>Pertanyaan:</strong> {formData.pertanyaan || 'Belum ada pertanyaan'}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {[
                    { label: 'A', value: formData.jawaban_1, isCorrect: formData.jawaban_benar === 1 },
                    { label: 'B', value: formData.jawaban_2, isCorrect: formData.jawaban_benar === 2 },
                    { label: 'C', value: formData.jawaban_3, isCorrect: formData.jawaban_benar === 3 },
                    { label: 'D', value: formData.jawaban_4, isCorrect: formData.jawaban_benar === 4 },
                  ].map((option) => (
                    <div
                      key={option.label}
                      className={`p-2 rounded border ${
                        option.isCorrect
                          ? 'border-green-500 bg-green-900/30 text-green-200'
                          : 'border-gray-600 bg-gray-800 text-gray-300'
                      }`}
                    >
                      {option.label}. {option.value || `Jawaban ${option.label}`}
                      {option.isCorrect && (
                        <span className="ml-2 text-xs bg-green-600 px-1 py-0.5 rounded">BENAR</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleGoBack}
                className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors duration-200 font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Quiz
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizEdit;