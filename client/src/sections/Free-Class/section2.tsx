import Robo from "../../assets/ultramen.png";
import Amplop from "../../assets/icon1.png";
import Check from "../../assets/icon2.png";
import Port from "../../assets/icon3.png";
import Bag from "../../assets/icon4.png";
export default function Section1() {
  return (
    <div className="bg-irreng text-white font-poppins px-6 md:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Title & Description */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Karisma Academy: 20+ Years of Empowering Careers
          </h2>
          <p className="text-base md:text-lg text-gray-300">
            Dengan lebih dari 20 tahun pengalaman, 20,000+ profesional sukses, kemitraan dengan perusahaan top, 
            serta penghargaan bergengsi di bidang Entrepreneurship & Edutech, Karisma Academy siap mewujudkan 
            karier impianmu. <span className="text-white font-semibold">#KarismaImpact</span>
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
{/* Left Section */}
<div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
  <p className="text-sm text-gray-400 mb-2">
    Mengapa Harus Ikut <span className="text-blue-400">#SkillSatSet </span> Karisma Academy?
  </p>
  <h3 className="text-xl md:text-2xl font-bold mb-6 leading-snug">
    Belajar Rasa Bootcamp +<br />
    Mentor Expert Langsung<br />
    + Praktik Proyek Nyata<br />
    + Siap Lanjut Karir
  </h3>
  <div className="w-full flex justify-center lg:justify-start">
    <img
      src={Robo}
      alt="Robot"
      className="w-[260px] md:w-[380px] object-contain"
    />
  </div>
</div>



          {/* Right Section */}
          <div className="lg:w-1/2 grid grid-cols-1 gap-8 pt-4 lg:pt-0">
            {/* Item 1 */}
            <div className="flex items-start gap-4">
              <img src={Amplop} alt="Webinar Icon" className="w-16 h-16 mt-1" />
              <div>
                <h4 className="font-semibold text-white text-lg">Webinar Rasa Bootcamp</h4>
                <p className="text-gray-300 text-sm">
                  Ikuti sesi belajar interaktif seperti mini-bootcamp. Kamu berpartisipasi aktif,
                  bukan hanya mendengarkan. Ini adalah preview kualitas Karisma Academy.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-4">
              <img src={Check} alt="Teori Icon" className="w-16 h-16 mt-1" />
              <div>
                <h4 className="font-semibold text-white text-lg">Teori & Praktik Langsung</h4>
                <p className="text-gray-300 text-sm">
                  Setiap konsep langsung diaplikasikan melalui studi kasus & simulasi nyata.
                  Dapatkan #SkillSatSet yang real-time, siap kamu gunakan.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-4">
              <img src={Port} alt="Mentor Icon" className="w-16 h-16 mt-1" />
              <div>
                <h4 className="font-semibold text-white text-lg">Mentor Langsung dari Expert</h4>
                <p className="text-gray-300 text-sm">
                  Dapatkan panduan dan insight langsung dari praktisi ahli industri.
                  Mereka berbagi pengalaman hands-on dan tips strategis untuk karirmu.
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-start gap-4">
              <img src={Bag} alt="Portfolio Icon" className="w-16 h-16 mt-1" />
              <div>
                <h4 className="font-semibold text-white text-lg">Misi & Portofolio Awal</h4>
                <p className="text-gray-300 text-sm">
                  Kerjakan proyek singkat untuk aplikasikan skill barumu. Hasilnya?
                  Portofolio awal yang konkret, jadi batu loncatan pertama ke program bootcamp Karisma Academy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}