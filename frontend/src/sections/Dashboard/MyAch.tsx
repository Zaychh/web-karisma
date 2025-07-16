import React from 'react';
import emptyAchieve from '../../assets/pool.png';
import rightChar from '../../assets/skate.png';

export default function MyAchievement() {
  return (
    <section className="w-full bg-[#1c1c1c] text-white py-12 px-4 md:px-12">
      <h2 className="text-xl font-bold mb-8">My Achievement</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="border-2 border-white p-6 rounded-md text-center">
          <img src={emptyAchieve} alt="Empty Achievement" className="mx-auto w-24 mb-4" />
          <h3 className="font-bold text-lg uppercase mb-2">YAH ACHIEVEMENT MU KOSONG NIH!</h3>
          <p className="text-sm text-gray-300">
            Cobalah untuk menyelesaikan kursus agar kamu dapat achievement pertama kamu ya!
          </p>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="mb-6">
            <p className="text-sm text-gray-300">
              Sejauh Ini kamu sudah mendapatkan achievement sebanyak (angka total)
            </p>
            <h3 className="mt-2 text-xl font-bold leading-snug">
              Ayo Semangat Untuk <br /> Mengoleksinya!
            </h3>
          </div>
          <img src={rightChar} alt="Character Motivation" className="w-36 md:w-44 mx-auto md:ml-0" />
        </div>
      </div>

      <div className="mt-8 text-center md:text-left">
        <button className="bg-yellow-600 hover:bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md">
          All My Achievement
        </button>
      </div>
    </section>
  );
}
