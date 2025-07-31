import workerCat from '../../assets/workercat.png';
import chillCat from '../../assets/Chillcat.png';

export default function MyProgress() {
  return (
    <section className="w-full bg-[#1c1c1c] text-white py-12 px-4 md:px-12">
      <div className="mb-8">
        <h2 className="text-xl font-bold">My Progress</h2>
        <p className="text-sm mt-1">Pantau Progress Kamu di bulan ini!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <img
            src={workerCat}
            alt="Progress Worker"
            className="max-w-[300px] w-full h-auto"
          />
        </div>

        <div className="border border-yellow-500 rounded-md p-6 text-center">
          <img
            src={chillCat}
            alt="Chill Cat"
            className="mx-auto w-24 mb-4"
          />
          <h3 className="font-bold text-lg uppercase mb-2">
            TIDAK ADA PROGRES YANG DITEMUKAN!
          </h3>
          <p className="text-sm text-gray-200 mb-6">
            Cobalah untuk mengerjakan kursus yang sudah kamu beli ya! Agar Progres kamu Tertampil!
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded-full transition">
            See More
          </button>
        </div>
      </div>
    </section>
  );
}
