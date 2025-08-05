import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import mascot from '../../assets/mascot.png';
import { useNavigate } from 'react-router-dom';

const HeroCourse: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1c1c1c] text-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header dengan greeting */}
        <div className="mb-8">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-600 rounded w-48 mb-2"></div>
              <div className="h-6 bg-gray-600 rounded w-96"></div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-2">
                Hy, {user?.name || 'User'}
              </h1>
              <p className="text-gray-300">
                Jangan Lupa Untuk Mengikuti Kursus Yang Sudah Dibeli, Ya!
              </p>
            </>
          )}
        </div>

        {/* My Program Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">My Program</h2>
          
          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-16">
            <img src={mascot} alt="Mascot" className="w-32 h-32 mb-6" />
            
            <h3 className="text-xl font-bold mb-2 text-center">
              TIDAK ADA PROGRAM YANG DITEMUKAN!
            </h3>
            
            <p className="text-gray-400 text-center mb-4 max-w-md">
              Cobalah untuk membeli kursus di kami untuk mendapatkan programmu sendiri!
            </p>
            
            <p className="text-green-400 text-sm">
              ERROR 404 - Program Not Found, Please Buy Course First
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button 
          onClick={() => navigate('/bootcamp')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Lihat Kursus Tersedia
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCourse;