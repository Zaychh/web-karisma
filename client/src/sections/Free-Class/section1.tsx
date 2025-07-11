import Robo from "../../assets/robotic.png";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Section1() {
  return (
    <div className="relative bg-ashh text-white overflow-hidden font-poppins">
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 pt-6 md:pt-10 pb-16 gap-10">
        
        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-6">
          {/* Heading */}
          <div className="text-3xl md:text-5xl font-bold leading-tight text-[#C8A86B] space-y-2">
            <h1>
              Merasa stuck dengan <br />
              skill yang itu-itu aja dan <br />
              bingung mulai dari mana?
            </h1>
          </div>

          {/* Paragraph */}
          <p className="text-base md:text-lg text-white font-bold">
            Waktunya #SkillSatSet! Ikuti 1 Day FREE CLASS Karisma Academy & Langsung Buka Pintu Peluang Baru!
          </p>
          <p className="text-base md:text-lg text-white font-medium">
            Stop cuma scroll impian! Raih #SkillSatSet di Karisma Academy lewat 1 Day FREE CLASS kami. Belajar langsung dari expert, dengan praktik nyata yang hasilkan proyek keren siap portofolio! Ini kesempatan emas menjajal pengalaman intensif dan temukan potensi awalmu sebelum melangkah lebih jauh.
          </p>

          {/* CTA Button */}
          <button className="bg-[#C8A86B] hover:bg-gray-300 text-black font-semibold px-10 py-4 rounded-xl transition-all flex items-center gap-3 cursor-pointer">
            Daftar Sekarang <FaArrowRightLong />
          </button>
        </div>

        {/* Robot Image Section (Only on md and above) */}
        <div className="hidden md:flex md:w-1/2 justify-center">
          <img
            src={Robo}
            alt="Robot"
            className="w-[300px] md:w-[450px] object-contain"
          />
        </div>
      </section>
    </div>
  );
}
