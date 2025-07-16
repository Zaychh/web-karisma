import Ultramen from "../../assets/ultramen.png";
import Icon1 from "../../assets/icon1.png";
import Icon2 from "../../assets/icon2.png";
import Icon3 from "../../assets/icon3.png";
import Icon4 from "../../assets/icon4.png";
import Icon5 from "../../assets/icon5.png";

export default function Hero() {
  return (
    <div className="bg-[#262626] text-white px-6 md:px-20 py-16 space-y-12">
      {/* Top Title & Description */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          Karisma Academy: 20+ Years of Empowering Careers
        </h1>
        <p className="text-sm md:text-base text-gray-200 max-w-4xl mx-auto">
          Dengan lebih dari 20 tahun pengalaman, 20,000+ profesional sukses, kemitraan dengan perusahaan top, serta penghargaan bergengsi di bidang Entrepreneurship & Edutech, Karisma Academy siap mewujudkan karier impianmu. #KarismaImpact
        </p>
      </div>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row gap-10 items-start justify-between">
        {/* Left Section */}
        <div className="md:w-1/3 space-y-4">
          <h2 className="text-sm text-[#C8A86B] font-semibold uppercase tracking-wider">
            Apa yang membuat berbeda
          </h2>
          <h3 className="text-2xl font-bold leading-tight">
            Belajar Asyik + Skill Real + Portfolio Nyata <br /> + Koneksi Karier
          </h3>
          <p className="text-sm text-gray-300">
            Kami bukan sekadar mengajar. Program bootcamp intensif selama 3–4 bulan ini dirancang untuk mempersiapkan kariermu dengan pendekatan yang aktif dan berbasis praktik.
          </p>
          <img
            src={Ultramen}
            alt="Illustration"
            className="hidden md:block w-full md:w-auto max-w-xs mt-4"
          />
        </div>

        {/* Right Section */}
        <div className="md:w-2/3 flex flex-col space-y-6">
          {features.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <img src={item.icon} alt="icon" className="w-10 h-10 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-base font-semibold text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "LMS Mission-Based Learning: You’re the Hero",
    desc: "Rasakan pengalaman belajar imersif lewat LMS berbasis misi dari Karisma. Setiap tantangan dirancang menyerupai misi dunia kerja yang nyata.",
    icon: Icon1,
  },
  {
    title: "Live-Interactive Classes with Industry Experts",
    desc: "Belajar langsung dari mentor ahli di kelas live interaktif. Sesi dirancang agar kamu bisa memahami konsep digital secara langsung dan menyenangkan.",
    icon: Icon2,
  },
  {
    title: "Unlimited Access to Learning Materials & Recordings",
    desc: "Belajar tak lagi dibatasi waktu. Dengan akses seumur hidup ke seluruh materi dan rekaman kelas, kamu bisa mengatur ritme belajar sesuai kenyamananmu.",
    icon: Icon3,
  },
  {
    title: "Certified Skills. Verified Progress.",
    desc: "Setiap langkah dalam bootcamp ini menghasilkan pencapaian nyata. Dapatkan beragam sertifikat keahlian dan skill badge.",
    icon: Icon4,
  },
  {
    title: "Exclusive Job Connector: Steps to Your Dream Career",
    desc: "Terhubung langsung dengan peluang kerja eksklusif dan jaringan profesional yang membawamu ke karier digital impian.",
    icon: Icon5,
  },
];
