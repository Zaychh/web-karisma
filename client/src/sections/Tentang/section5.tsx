import { useState } from "react";

import t1 from "../../assets/chico.png";
import t2 from "../../assets/Kim.png";
import t3 from "../../assets/Dianaa.png";
import t4 from "../../assets/t3.png";
import t5 from "../../assets/t2.png";
import t6 from "../../assets/t1.png";

import p1 from "../../assets/got.png";
import p2 from "../../assets/tiketcom.png";
import p3 from "../../assets/logoflip.png";
import p4 from "../../assets/telkom.png";
import p5 from "../../assets/unileverr.png";
import p6 from "../../assets/telkomnew.png";
import p7 from "../../assets/cmlabss.png";
import p8 from "../../assets/shopee.png";

import Office from "../../assets/office.png";
import Alamat from "../../assets/alamat.png";

const testimonials = [
  {
    img: t1,
    name: "Chico Lachowski",
    role: "Full-Stack Developer",
    company: "Karisma Academy",
    text: `Program ini menawarkan pembelajaran mendalam dengan mentor berpengalaman, didukung praktik intensif dan materi yang terstruktur. Yang menarik, peserta berkesempatan mengaplikasikan ilmu langsung melalui kolaborasi dengan UMKM dalam Final Project. Semoga program ini terus berkembang!`,
  },
  {
    img: t2,
    name: "Kim Jaegyun",
    role: "Graphic Designer",
    company: "POT Branding House",
    text: `Potensi karier dan pasar yang menjanjikan mendorong saya mendalami Graphic Design. Di sini, saya mendapat bimbingan yang luar biasa – mentor yang sangat dedikasi, tim yang supportif dan materi pembelajaran yang komprehensif. Hasilnya? Saya sudah mendapat tawaran kerja bahkan sebelum menyelesaikan program!`,
  },
  {
    img: t3,
    name: "Diana Cesare",
    role: "Human Resource Manager",
    company: "EY",
    text: `Bootcamp ini melampaui ekspektasi. Para instruktur tidak hanya informatif, tapi juga proaktif memantau progres dan tugas. Setiap pertanyaan dijawab dengan tuntas. Yang paling penting, mentor membawakan materi yang nyata, membuat pembelajaran jadi sangat aplikatif.`,
  },
  {
    img: t4,
    name: "Siegfried koigner",
    role: "UI/UX Designer",
    company: "Tokopedia",
    text: `Saya belajar langsung dari praktisi industri dan diberi kebebasan eksplorasi desain produk nyata. Saya makin pede buat terjun ke dunia kerja!`,
  },
  {
    img: t5,
    name: "Saki Yoshida",
    role: "Front-End Developer",
    company: "Traveloka",
    text: `Kurikulum dan project-nya keren banget! Saya bisa punya portofolio nyata yang langsung dilirik recruiter. Mentornya juga sabar banget.`,
  },
  {
    img: t6,
    name: "Sofia Pavlovna Irinovskaya",
    role: "Social Media Strategist",
    company: "IDN Media",
    text: `Belajar digital marketing dari dasar banget sampai advance. Kelasnya seru, studinya relevan sama tren industri. Saya jadi ngerti cara ngiklan yang efektif!`,
  },
];

export default function Section5() {
  const [currentImage, setCurrentImage] = useState(1);
  return (
    <section className="text-white px-4 py-20 font-poppins bg-[#1D1D1D]">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Testimoni Alumni Karisma Academy
          </h2>
          <p className="text-lg md:text-xl mt-4 max-w-4xl font-medium mx-auto">
            Dengarkan langsung cerita para alumni yang telah sukses berkarier di industri digital.
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-x-auto no-scrollbar pb-4">
          <div className="flex gap-8 w-max px-2 md:px-4">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="w-[280px] md:w-[480px] flex-shrink-0 bg-bluberi rounded-3xl overflow-hidden shadow-md"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-[420px] object-cover"
                />
                <div className="p-5 text-sm md:text-2xl">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-lg">{item.role}</p>
                  <p className="text-lg mb-3 italic">at <span className="font-semibold">{item.company}</span></p>
                  <p className="text-white text-xl leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Empower Your Bright Future */}
        <div className="text-center mt-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to Empower Your Bright Future?
          </h2>
          <p className="max-w-5xl mx-auto text-base md:text-2xl font-medium mb-10">
            Bergabunglah dengan Karisma Academy sekarang juga dan mulailah
            perjalanan Anda menuju masa depan digital yang penuh karisma,
            percaya diri, dan inovasi.
          </p>
        </div>

        {/* Logo Carousel */}
        <div className="relative overflow-hidden py-4">
          <div className="flex w-max animate-slide gap-8 px-4">
            {[p8, p7, p3, p5, p4, p6, p2, p1].map((logo, idx) => (
              <img
                key={idx}
                src={logo}
                alt={`Partner ${idx + 1}`}
                className="h-16 md:h-20 object-contain"
              />
            ))}
            {/* Duplicate for seamless loop */}
            {[p8, p7, p3, p5, p4, p6, p2, p1].map((logo, idx) => (
              <img
                key={`dup-${idx}`}
                src={logo}
                alt={`Partner ${idx + 1} duplicate`}
                className="h-16 md:h-20 object-contain"
              />
            ))}
          </div>
        </div>

        {/* Kontak & Lokasi Kantor */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Form Kontak */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Ada pertanyaan <br /> tentang program kami?
            </h2>
            <p className="text-lg mb-6">Kami siap membantu Anda!</p>

            <form className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap kamu"
                  className="w-full px-4 py-2 rounded border border-white bg-transparent text-white"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Alamat Email</label>
                <input
                  type="email"
                  placeholder="Masukkan alamat email kamu"
                  className="w-full px-4 py-2 rounded border border-white bg-transparent text-white"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Isi Pesan</label>
                <textarea
                  placeholder="Tulis pesan kamu disini"
                  className="w-full px-4 py-2 rounded border border-white bg-transparent text-white h-32"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  className="bg-white text-black font-semibold px-18 py-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Kirim Email
                </button>
                <button
                  type="button"
                  className="border border-white text-white font-semibold px-14 py-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Kontak Whatsapp
                </button>
              </div>
            </form>
          </div>

          {/* Gambar Lokasi dan Alamat */}
          <div className="flex flex-col items-center">
            {/* Gambar Slider Manual */}
            <div className="relative w-full h-[300px] md:h-[340px] overflow-hidden rounded-2xl">
              <img
                src={currentImage === 0 ? Office : Alamat}
                alt="Lokasi Karisma"
                className="w-full h-full object-cover rounded-2xl transition-all duration-500"
              />
            </div>

            {/* Tombol Slide */}
            <div className="flex gap-4 mt-4">
              {[0, 1].map((i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-12 h-4 rounded-full transition-all duration-300 cursor-pointer ${currentImage === i ? "bg-white" : "bg-gray-500"
                    }`}
                />
              ))}

            </div>

            {/* Alamat */}
            <div className="text-left mt-6">
              <h3 className="text-xl font-bold">Kantor Karisma Academy</h3>
              <p className="text-gray-300">Kami siap membantu Anda!</p>
              <p className="text-gray-300 mt-2">
                Jl. Watu Gong No. 18, Kel. Ketawanggede, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
