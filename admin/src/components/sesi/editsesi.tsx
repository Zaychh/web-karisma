import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface SesiData {
  id: number;
  judul: string;
  topik: string;
  linkVideo: string;
  programId: number;
}

interface EditSesiForm {
  judul: string;
  topik: string;
  linkVideo: string;
}

const EditSesi: React.FC = () => {
  const { programId, sesiId } = useParams<{ programId: string; sesiId: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<EditSesiForm>({
    judul: '',
    topik: '',
    linkVideo: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalData, setOriginalData] = useState<SesiData | null>(null);

  // Extract YouTube video ID from various YouTube URL formats
  const getYouTubeVideoId = (url: string): string => {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
      /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return '';
  };

  // Convert any YouTube URL to embed format
  const convertToEmbedUrl = (url: string): string => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  useEffect(() => {
    const fetchSesiData = async () => {
      try {
        const response = await axios.get<SesiData>(`http://localhost:3000/api/program/${programId}/sesi/${sesiId}`);
        const sesi = response.data;
        
        setOriginalData(sesi);
        setFormData({
          judul: sesi.judul,
          topik: sesi.topik,
          linkVideo: sesi.linkVideo
        });
      } catch (err) {
        setError('Gagal memuat data sesi');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (programId && sesiId) {
      fetchSesiData();
    }
  }, [programId, sesiId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      linkVideo: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.judul.trim() || !formData.topik.trim() || !formData.linkVideo.trim()) {
      setError('Semua field harus diisi');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const dataToSend = {
        ...formData,
        linkVideo: convertToEmbedUrl(formData.linkVideo)
      };

      await axios.put(`http://localhost:3000/api/program/${programId}/sesi/${sesiId}`, dataToSend);
      
      // Success notification
      alert('✅ Sesi berhasil diperbarui!');
      navigate(`/program/${programId}/list-sesi`);
    } catch (err: any) {
      console.error('❌ Gagal memperbarui sesi:', err);
      setError(err.response?.data?.error || 'Gagal memperbarui sesi');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/program/${programId}/list-sesi`);
  };

  const videoId = getYouTubeVideoId(formData.linkVideo);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Memuat data sesi...</p>
        </div>
      </div>
    );
  }

  if (error && !originalData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error}</div>
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <button
            onClick={handleCancel}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Kembali ke List Sesi</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-600 rounded-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Edit Sesi</h1>
              <p className="text-gray-400 mt-1">Perbarui informasi sesi pembelajaran</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center space-x-2">
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Informasi Sesi</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Judul Sesi */}
              <div>
                <label htmlFor="judul" className="block text-sm font-medium text-gray-300 mb-2">
                  Judul Sesi *
                </label>
                <input
                  type="text"
                  id="judul"
                  name="judul"
                  value={formData.judul}
                  onChange={handleInputChange}
                  placeholder="Masukkan judul sesi..."
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Topik/Deskripsi */}
              <div>
                <label htmlFor="topik" className="block text-sm font-medium text-gray-300 mb-2">
                  Topik/Deskripsi *
                </label>
                <textarea
                  id="topik"
                  name="topik"
                  value={formData.topik}
                  onChange={handleInputChange}
                  placeholder="Masukkan topik atau deskripsi sesi..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  required
                />
              </div>

              {/* Link Video */}
              <div>
                <label htmlFor="linkVideo" className="block text-sm font-medium text-gray-300 mb-2">
                  Link Video YouTube *
                </label>
                <input
                  type="url"
                  id="linkVideo"
                  name="linkVideo"
                  value={formData.linkVideo}
                  onChange={handleVideoUrlChange}
                  placeholder="https://www.youtube.com/watch?v=... atau https://youtu.be/..."
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
                <p className="text-xs text-gray-400 mt-2">
                  💡 Masukkan URL YouTube dalam format apapun, akan otomatis dikonversi ke embed URL
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-900/50 border border-red-700 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-400">{error}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Simpan Perubahan</span>
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all font-medium border border-gray-600 disabled:opacity-50"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-6 text-white flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Preview Video</span>
            </h2>

            {/* Video Preview */}
            <div className="mb-6">
              {videoId ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
                    title={formData.judul || 'Preview Video'}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              ) : (
                <div className="aspect-video rounded-xl bg-gray-700 flex items-center justify-center border-2 border-dashed border-gray-600">
                  <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p>Masukkan URL YouTube untuk preview</p>
                  </div>
                </div>
              )}
            </div>

            {/* Info Preview */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Judul Sesi</label>
                <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                  <p className="text-white font-medium">
                    {formData.judul || <span className="text-gray-500 italic">Belum diisi</span>}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Topik/Deskripsi</label>
                <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                  <p className="text-white">
                    {formData.topik || <span className="text-gray-500 italic">Belum diisi</span>}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Link Video</label>
                <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                  <p className="text-blue-400 text-sm break-all">
                    {convertToEmbedUrl(formData.linkVideo) || <span className="text-gray-500 italic">Belum diisi</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSesi;