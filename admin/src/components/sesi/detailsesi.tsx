import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface SesiDetail {
  id: number;
  judul: string;
  topik: string;
  linkVideo: string;
  programId: number;
}

const DetailSesi: React.FC = () => {
  const { programId, sesiId } = useParams<{ programId: string; sesiId: string }>();
  const navigate = useNavigate();
  const [sesi, setSesi] = useState<SesiDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  // Extract YouTube video ID from embed URL
  const getYouTubeVideoId = (embedUrl: string): string => {
    const match = embedUrl.match(/embed\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
  };

  useEffect(() => {
    const fetchSesiDetail = async () => {
      try {
        const response = await axios.get<SesiDetail>(`${API_BASE_URL}/api/program/${programId}/sesi/${sesiId}`);
        setSesi(response.data);
      } catch (err) {
        setError('Gagal memuat detail sesi');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (programId && sesiId) {
      fetchSesiDetail();
    }
  }, [programId, sesiId]);

  const handleBack = () => {
    navigate(`/program/${programId}/list-sesi`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !sesi) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error || 'Sesi tidak ditemukan'}</div>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const videoId = getYouTubeVideoId(sesi.linkVideo);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Kembali ke List Sesi</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{sesi.judul}</h1>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-blue-600 text-blue-100 rounded-full text-sm font-medium">
                  {sesi.topik}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-white">Video Pembelajaran</h2>
              
              {videoId ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
                    title={sesi.judul}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              ) : (
                <div className="aspect-video rounded-xl bg-gray-700 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p>Video tidak tersedia</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Session Info */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-6 text-white">Informasi Sesi</h2>
              
              <div className="space-y-6">
                {/* Session Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Judul Sesi
                  </label>
                  <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                    <p className="text-white font-medium">{sesi.judul}</p>
                  </div>
                </div>

                {/* Topic */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Topik
                  </label>
                  <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-blue-100">
                      {sesi.topik}
                    </span>
                  </div>
                </div>

                {/* Video Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Link Video
                  </label>
                  <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                    <a
                      href={sesi.linkVideo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm break-all transition-colors"
                    >
                      {sesi.linkVideo}
                    </a>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Program ID:</span>
                    <span className="font-mono">{sesi.programId}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400 mt-2">
                    <span>Sesi ID:</span>
                    <span className="font-mono">{sesi.id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => window.open(sesi.linkVideo, '_blank')}
                className="w-full px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>Buka di YouTube</span>
              </button>
              
              <button
                onClick={handleBack}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium border border-gray-600"
              >
                Kembali ke Daftar Sesi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSesi;