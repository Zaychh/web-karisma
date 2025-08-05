import { useLocation } from "react-router-dom";
import emptyAchieve from '../../assets/pool.png';
import rightChar from '../../assets/skate.png';

export default function MyAchievement() {
  const location = useLocation();
  const isInventoryPage = location.pathname === "/inventory";

  return (
      <section className={`w-full ${isInventoryPage ? "bg-abyssal" : "bg-ashh"} text-white py-12 px-4 md:px-12`}>
      <h2 className="text-xl font-bold mb-8">My Achievement</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Card + Button dibungkus */}
        <div className="flex flex-col items-start w-full">
          {/* Card */}
          <div className="border-2 border-white p-6 rounded-md w-full text-center">
            <img src={emptyAchieve} alt="Empty Achievement" className="mx-auto w-24 mb-4" />
            <h3 className="font-bold text-lg uppercase mb-2">YAH ACHIEVEMENT MU KOSONG NIH!</h3>
            <p className="text-sm text-gray-300">
              Cobalah untuk menyelesaikan kursus agar kamu dapat achievement pertama kamu ya!
            </p>
          </div>

          {/* Button */}
          <div className="mt-6 w-full flex justify-center">
            <button className="bg-rosegold hover:bg-pink-300 text-white px-6 py-2 rounded-lg font-semibold shadow-md">
              All My Achievement
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <p className="text-sm text-gray-300 mb-2">
              Sejauh Ini kamu sudah mendapatkan achievement sebanyak (angka total)
            </p>
            <h3 className="text-xl font-bold leading-snug">
              Ayo Semangat Untuk <br /> Mengoleksinya!
            </h3>
          </div>
          <img
            src={rightChar}
            alt="Character Motivation"
            className="w-36 md:w-32 mt-6 md:mt-auto mx-auto md:ml-0"
          />
        </div>
      </div>
    </section>
  );
};
