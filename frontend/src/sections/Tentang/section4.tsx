import React, { useState } from "react";

import CardK from "../../assets/cardKuning.png";
import CardH from "../../assets/cardHijau.png";
import CardM from "../../assets/cardMerah.png";
import CardA from "../../assets/cardAbu.png";

import Member1 from "../../assets/karisma11.png";
import Member2 from "../../assets/karisma22.png";
import Member3 from "../../assets/karisma33.png";
import Member4 from "../../assets/karisma44.png";

import Company from "../../assets/our-member.png";
import Robo from "../../assets/robo.png";
import Ijo from "../../assets/ijo.png";
import Berang from "../../assets/berang.png";
import Elang from "../../assets/elang.png";

import Arsitek from "../../assets/3d.png";
import Marketing from "../../assets/marketing.png";
import Video from "../../assets/edit.png";
import Grafis from "../../assets/grafis.png";
import Mobile from "../../assets/mob-dev.png";
import Motion from "../../assets/motion.png";
import Microsoft from "../../assets/microsoft.png";
import Web from "../../assets/web.png";

const cards = [
  {
    title: "Misi Gamifikasi",
    description: "Belajar bukan lagi beban, tapi petualangan.",
    image: CardH,
  },
  {
    title: "Kurikulum Adaptif",
    description: "Materi yang selalu relevan dengan dunia kerja.",
    image: CardM,
  },
  {
    title: "Mentor Profesional",
    description: "Mentor yang memandu tiap langkahmu.",
    image: CardK,
  },
  {
    title: "Portofolio Nyata",
    description: "Belajar langsung dari tantangan dunia nyata.",
    image: CardA,
  },
];

const Section4: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredMobileIndex, setHoveredMobileIndex] = useState<number | null>(null);
  const [showZoom, setShowZoom] = useState(false);
  const overlapOffset = 280;
  const leftOffset = 20;

  return (
    <section className="bg-[#262626] py-16 px-4 font-poppins">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Our Unique <br />
              Learning Experience
            </h2>
          </div>
          <p className="text-white text-lg max-w-xl mt-6 md:mt-0">
            Pengalaman belajar kami didesain agar kamu tidak hanya belajar, namun
            juga memastikan kamu siap berkarir dan menghadapi berbagai tantangan
            dengan enjoy!
          </p>
        </div>

        {/* Desktop view: overlapping cards */}
        <div className="relative h-[600px] hidden md:flex justify-center items-center">
          {cards.map((card, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="absolute top-0 h-[580px] w-[400px] transition-all duration-500 rounded-[20px] bg-cover bg-center cursor-pointer shadow-xl"
                style={{
                  backgroundImage: `url(${card.image})`,
                  left: `${index * overlapOffset + leftOffset}px`,
                  zIndex: hoveredIndex === index ? 20 : 10 - index,
                  transform: isHovered ? "scale(1.08)" : "scale(1)",
                }}
              >
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center z-10 px-6">
                  <h3
                    className={`text-2xl font-bold mb-2 ${index === 2 ? "text-[#F6C542]" : "text-white"
                      }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`text-base max-w-xs ${index === 2 ? "text-[#F6C542]" : "text-white"
                      }`}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile view: horizontal scroll with hover zoom effect */}
        <div className="md:hidden flex overflow-x-auto gap-4 no-scrollbar pb-4">
          {cards.map((card, index) => {
            const isHovered = hoveredMobileIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredMobileIndex(index)}
                onMouseLeave={() => setHoveredMobileIndex(null)}
                className="min-w-[280px] shrink-0 rounded-[20px] bg-cover bg-center shadow-lg h-[500px] relative cursor-pointer transition-all duration-300"
                style={{
                  backgroundImage: `url(${card.image})`,
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  transformOrigin: 'center center'
                }}
              >
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center z-10 px-4">
                  <h3
                    className={`text-2xl font-bold mb-2 ${index === 2 ? "text-[#F6C542]" : "text-white"
                      }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`text-base ${index === 2 ? "text-[#F6C542]" : "text-white"
                      }`}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Origins Section */}
        <div className="mt-10 text-white font-poppins">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            The Origins of Our Journey
          </h2>
          <p className="text-xl max-w-5xl mx-auto text-center mb-12 ">
            Karisma Academy telah mencapai tonggak penting sebagai Lembaga Kursus & Pelatihan
            berstandar Industri yang didirikan oleh PT. Karisma Garuda Mulia sejak tahun 2005.
            Dengan NPSN K9989817, kami bangga memiliki Akreditasi A berdasarkan penilaian kinerja
            Lembaga Kursus & Pelatihan Berbasis Dunia Kerja pada tahun 2022, yang diberikan oleh
            Direktorat Jenderal Pendidikan Vokasi, Direktorat Kursus dan Pelatihan.
          </p>

          {/* Scrollable Image Row */}
          <div className="overflow-x-auto no-scrollbar pb-6">
            <div className="flex gap-4 md:gap-6 w-max px-2 md:px-4">
              {[Member1, Member2, Member3, Member4].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Journey ${idx + 1}`}
                  className="w-[360px] h-[220px] md:w-[500px] md:h-[320px] object-cover rounded-xl flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Meet Our Team Section */}
        <div className="mt-10 text-white font-poppins relative z-0">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl max-w-5xl mx-auto text-center mb-12 px-4">
            Di balik Karisma Academy, ada tim pengajar dan mentor yang berpengalaman di industri digital. Mereka bukan hanya ahli di bidangnya, tetapi juga berdedikasi untuk membantu Anda mengasah keterampilan dan membangun kepercayaan diri.
          </p>

          <div className="flex justify-center mb-20 px-2">
            <img
              src={Company}
              alt="Our Team"
              onClick={() => setShowZoom(true)}
              className="w-[95%] md:w-[1200px] max-w-full cursor-zoom-in rounded-xl object-cover transition duration-300 hover:scale-[1.01]"
            />
          </div>

          {/* Modal Zoom */}
          {showZoom && (
            <div
              className="fixed inset-0 bg-black/80 z-50 overflow-y-auto"
              onClick={() => setShowZoom(false)}
            >
              <div className="min-h-screen flex items-center justify-center px-4 py-12">
                <img
                  src={Company}
                  alt="Zoomed Team"
                  className="max-w-full max-h-full rounded-xl shadow-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Section: Berkembang Bersama Karisma Academy */}
        <div className="text-white font-poppins mt-20 px-4 md:px-10 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Berkembang Bersama Karisma Academy
          </h2>
          <p className="text-xl text-center mb-10 max-w-5xl mx-auto">
            Didukung oleh kurikulum yang terdepan dan Instruktur yang merupakan praktisi profesional,
            Karisma Academy menjadi opsi solusi untuk percepatan pengembangan diri yang terpercaya.
          </p>

          {/* Statistik */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-white mb-20">
            {/* Alumni */}
            <div className="flex items-center gap-4 px-2">
              <img src={Robo} alt="Alumni" className="w-24 h-24 shrink-0" />
              <div>
                <p className="text-3xl font-bold leading-tight">5000+</p>
                <p className="text-sm leading-snug">Alumni telah akselerasi karir dan skill mereka bersama kami</p>
              </div>
            </div>

            {/* Instruktur */}
            <div className="flex items-center gap-4 px-1">
              <img src={Ijo} alt="Instruktur" className="w-24 h-24 shrink-0" />
              <div>
                <p className="text-3xl font-bold leading-tight">69+</p>
                <p className="text-sm leading-snug">Instruktur ahli yang siap membimbing kamu dari 0</p>
              </div>
            </div>

            {/* Hiring Partner */}
            <div className="flex items-center gap-4 px-2">
              <img src={Berang} alt="Hiring Partner" className="w-24 h-24 shrink-0" />
              <div>
                <p className="text-3xl font-bold leading-tight">320+</p>
                <p className="text-sm leading-snug">Hiring partner yang siap untuk jadi tempat kamu berkarir</p>
              </div>
            </div>

            {/* Magang */}
            <div className="flex items-center gap-4 px-2">
              <img src={Elang} alt="Magang" className="w-24 h-24 shrink-0" />
              <div>
                <p className="text-3xl font-bold leading-tight">97%</p>
                <p className="text-sm leading-snug">Alumni berhasil disalurkan magang setelah graduate</p>
              </div>
            </div>
          </div>

          {/* Section: Lini Kompetensi */}
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
            Lini Kompetensi Karisma Academy
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 group">
            {[Arsitek, Marketing, Video, Grafis, Mobile, Motion, Microsoft, Web].map((img, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden transition duration-300
                 opacity-40 group-hover:opacity-40 hover:opacity-100 hover:scale-[1.02]"
              >
                <img src={img} alt={`Kompetensi ${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Section4;