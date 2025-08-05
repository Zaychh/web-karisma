// src/components/QuizManagement.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

// Types
interface Quiz {
  id: number;
  id_sesi: number;
  id_soal: number;
  judul_sesi: string;
  created_at?: string;
  updated_at?: string;
}

interface QuizDetail {
  quiz: Quiz;
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

interface Sesi {
  id: number;
  judul_sesi: string;
  topik: string;
  id_program: number;
}

interface SesiWithQuizStatus extends Sesi {
  hasQuiz: boolean;
  quiz?: Quiz;
}

const QuizManagement: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // States
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [sesiList, setSesiList] = useState<Sesi[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedQuiz, setSelectedQuiz] = useState<QuizDetail | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);

  // Get base API URL from environment or default
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  // Fetch quizzes by program
  const fetchQuizzes = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/quiz/program/${programId}/quiz`);
      const result = await response.json();

      if (result.success) {
        setQuizzes(result.data || []);
      } else {
        setError(result.message || 'Failed to fetch quizzes');
      }
    } catch (err) {
      setError('Error fetching quizzes: ' + (err as Error).message);
      console.error('Error fetching quizzes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch sesi list for the program
  const fetchSesiList = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/quiz/program/${programId}/sesi`);
      const result = await response.json();

      if (result.success) {
        setSesiList(result.data || []);
      } else {
        console.warn('Failed to fetch sesi list:', result.message);
      }
    } catch (err) {
      console.error('Error fetching sesi list:', err);
    }
  };

  // Fetch quiz detail for viewing
  const fetchQuizDetail = async (quizId: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/quiz/admin/quiz/${quizId}`);
      const result = await response.json();

      if (result.success) {
        setSelectedQuiz(result.data);
        setShowModal(true);
      } else {
        setError(result.message || 'Failed to fetch quiz detail');
      }
    } catch (err) {
      setError('Error fetching quiz detail: ' + (err as Error).message);
      console.error('Error fetching quiz detail:', err);
    }
  };

  // Delete quiz
  const deleteQuiz = async (quizId: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/quiz/admin/quiz/${quizId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();

      if (result.success) {
        // Refresh quiz list
        await fetchQuizzes();
        setShowDeleteModal(false);
        setQuizToDelete(null);
        alert('Quiz berhasil dihapus!');
      } else {
        setError(result.message || 'Failed to delete quiz');
      }
    } catch (err) {
      setError('Error deleting quiz: ' + (err as Error).message);
      console.error('Error deleting quiz:', err);
    }
  };

  // Check which sesi already have quiz
  const getSesiWithQuizStatus = (): SesiWithQuizStatus[] => {
    return sesiList.map(sesi => ({
      ...sesi,
      hasQuiz: quizzes.some(quiz => quiz.id_sesi === sesi.id),
      quiz: quizzes.find(quiz => quiz.id_sesi === sesi.id)
    }));
  };

  // Handle navigation
  const handleGoBack = (): void => {
    navigate(-1); // Go back to previous page
  };

  const handleCreateQuiz = (sesiId: number): void => {
    navigate(`/program/${sesiId}/quiz/create`);
  };

  const handleEditQuiz = (quizId: number): void => {
    navigate(`/quiz/edit/${quizId}`);
  };

  // Handle close modal
  const handleCloseModal = (): void => {
    setShowModal(false);
    setSelectedQuiz(null);
  };

  const handleCloseDeleteModal = (): void => {
    setShowDeleteModal(false);
    setQuizToDelete(null);
  };

  // Effect to fetch data when component mounts
  useEffect(() => {
    if (programId) {
      Promise.all([fetchQuizzes(), fetchSesiList()]);
    }
  }, [programId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <span className="text-xl">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sesiWithQuizStatus = getSesiWithQuizStatus();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Kelola Quiz</h1>
            <p className="text-gray-400">Program ID: {programId}</p>
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Sesi</h3>
            <p className="text-3xl font-bold text-blue-400">{sesiList.length}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Quiz Dibuat</h3>
            <p className="text-3xl font-bold text-green-400">{quizzes.length}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Sesi Tanpa Quiz</h3>
            <p className="text-3xl font-bold text-yellow-400">
              {Math.max(0, sesiList.length - quizzes.length)}
            </p>
          </div>
        </div>

        {/* Quiz List by Sesi */}
        <div className="space-y-4">
          {sesiWithQuizStatus.map((sesi) => (
            <div
              key={sesi.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">
                      Sesi {sesi.id}: {sesi.judul_sesi}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        sesi.hasQuiz
                          ? 'bg-green-900/50 text-green-300 border border-green-500'
                          : 'bg-yellow-900/50 text-yellow-300 border border-yellow-500'
                      }`}
                    >
                      {sesi.hasQuiz ? 'Ada Quiz' : 'Belum Ada Quiz'}
                    </span>
                  </div>
                  <p className="text-gray-400">Topik: {sesi.topik}</p>
                </div>

                <div className="flex gap-2">
                  {sesi.hasQuiz && sesi.quiz ? (
                    <>
                      {/* View Quiz Button */}
                      <button
                        onClick={() => fetchQuizDetail(sesi.quiz!.id)}
                        className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors duration-200"
                        title="Lihat Quiz"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>

                      {/* Edit Quiz Button */}
                      <button
                        onClick={() => handleEditQuiz(sesi.quiz!.id)}
                        className="p-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg transition-colors duration-200"
                        title="Edit Quiz"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>

                      {/* Delete Quiz Button */}
                      <button
                        onClick={() => {
                          setQuizToDelete(sesi.quiz!);
                          setShowDeleteModal(true);
                        }}
                        className="p-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors duration-200"
                        title="Hapus Quiz"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    /* Create Quiz Button */
                    <button
                      onClick={() => handleCreateQuiz(sesi.id)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Buat Quiz
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sesiList.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">
              Tidak ada sesi ditemukan untuk program ini
            </div>
            <button
              onClick={handleGoBack}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors duration-200"
            >
              Kembali ke Program
            </button>
          </div>
        )}
      </div>

      {/* Quiz Detail Modal */}
      {showModal && selectedQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Detail Quiz</h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Quiz Info */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Informasi Quiz</h3>
                <p className="text-gray-300">Sesi: {selectedQuiz.quiz.judul_sesi}</p>
                <p className="text-gray-300">Quiz ID: {selectedQuiz.quiz.id}</p>
              </div>

              {/* Question */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-3">Pertanyaan</h3>
                <p className="text-gray-200 text-lg">{selectedQuiz.soal.soal}</p>
              </div>

              {/* Answers */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-3">Pilihan Jawaban</h3>
                <div className="space-y-3">
                  {selectedQuiz.jawaban.map((jawaban, index) => (
                    <div
                      key={jawaban.id}
                      className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                        jawaban.benar === 1
                          ? 'border-green-500 bg-green-900/30'
                          : 'border-gray-600 bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-white">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <span className="text-gray-200 flex-1">{jawaban.jawaban}</span>
                        {jawaban.benar === 1 && (
                          <span className="px-2 py-1 bg-green-600 text-green-100 rounded text-sm font-medium">
                            Jawaban Benar
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && quizToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <div className="mb-4">
                <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Hapus Quiz</h3>
              <p className="text-gray-300 mb-6">
                Apakah Anda yakin ingin menghapus quiz untuk sesi "{quizToDelete.judul_sesi}"?
                <br />
                <span className="text-red-400 text-sm">Tindakan ini tidak dapat dibatalkan.</span>
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleCloseDeleteModal}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors duration-200"
                >
                  Batal
                </button>
                <button
                  onClick={() => deleteQuiz(quizToDelete.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors duration-200"
                >
                  Hapus Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizManagement;