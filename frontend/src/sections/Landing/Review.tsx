// Pastikan import tetap sama
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";

import Google from "../../assets/gugel.png";

import Gambar1 from "../../assets/Corey.jpeg";
import Gambar2 from "../../assets/Maya.jpeg";
import Gambar3 from "../../assets/Koigner.jpeg";
import Gambar4 from "../../assets/Ely.jpeg";
import Gambar5 from "../../assets/Cantarella.jpeg";
import Gambar6 from "../../assets/Furina.jpeg";
import Gambar7 from "../../assets/Saki.jpeg";

import Video1 from "../../assets/videos/v1.mp4";
import Video2 from "../../assets/videos/Awikwuk.mp4";
import Video3 from "../../assets/videos/Eyeless.mp4";
import Video4 from "../../assets/videos/Eba.mp4";
import Video5 from "../../assets/videos/ThankYou.mp4";
import Video6 from "../../assets/videos/hiks.mp4";

const videolist = [Video1, Video2, Video3, Video4, Video5, Video6]; 
const testimonials = [
  {
    name: "Corey Taylor",
    role: "Full-Stack Developer at Karisma Academy",
    image: Gambar1,
    text: "Program ini menawarkan pembelajaran mendalam dengan mentor berpengalaman, didukung praktik intensif dan materi yang terstruktur. Peserta bisa langsung kolaborasi dengan UMKM dalam Final Project.",
  },
  {
    name: "Maya Stevens",
    role: "UI Designer at Freelance",
    image: Gambar2,
    text: "Sangat terstruktur dan mudah diikuti. Saya jadi lebih percaya diri ambil project klien. Terima kasih Karisma!",
  },
  {
    name: "Siegfried Koigner",
    role: "Data Analyst at Shopee",
    image: Gambar3,
    text: "Dengan bimbingan langsung, saya paham tentang data lebih dalam. Bahkan sekarang bisa bantu tim analitik saya.",
  },
  {
    name: "Saki Yoshida",
    role: "Graph Designer at HoYoverse Corporation",
    image: Gambar7,
    text: "Mentor sangat ramah dan pembelajarannya tidak membosankan. Plus banyak project real-case!",
  },
  {
    name: "Furina De Fontaine",
    role: "Back-End Dev at Fontaine Institute Clockwork",
    image: Gambar6,
    text: "Saya dulu gaptek, sekarang bisa bikin backend service sendiri. Bootcamp-nya mantap!",
  },
  {
    name: "Cantarella Fisalia",
    role: "Software Engineer at Fisalia Corp",
    image: Gambar5,
    text: "Investasi terbaik saya tahun ini. Karisma Academy membuka jalan karir saya di tech!",
  },
  {
    name: "Elysia Moonlit",
    role: "Front-End Developer at Bukalapak",
    image: Gambar4,
    text: "Kursusnya sangat aplikatif, langsung bisa dipraktekkan. Mentor juga responsif dan membantu.",
  },
];

const SectionReview = () => {
  const [index, setIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="bg-onyx text-putih py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold font-mont mb-12">
          Apa Kata Mereka Tentang Karisma Academy?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center mb-14">
          {videolist.map((videoSrc, i) => (
            <div
              key={i}
              className="relative w-full h-[200px] md:h-[240px] rounded-xl overflow-hidden bg-black shadow-lg cursor-pointer"
              onClick={() => setSelectedVideo(videoSrc)}
            >
              <video
                className="object-cover w-full h-full rounded-xl"
                src={videoSrc}
                muted
                preload="metadata"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-5.197-3.027A1 1 0 008 9.027v5.946a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.664z"
                  />
                </svg>
              </div>
            </div>
          ))}

          <AnimatePresence>
            {selectedVideo && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
                onClick={() => setSelectedVideo(null)}
              >
                <motion.div
                  className="relative"
                  onClick={(e) => e.stopPropagation()} // Biar ga nutup modal pas klik video
                >
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-[-2rem] right-[-2rem] text-white text-3xl font-bold"
                  >
                    ×
                  </button>
                  <video
                    src={selectedVideo}
                    controls
                    autoPlay
                    className="max-w-full max-h-[80vh] w-auto h-auto rounded-lg"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        
        <div className="flex flex-col md:flex-row items-start md:items-stretch justify-between gap-10 max-w-6xl mx-auto">
          <div className="border-2 border-white bg-onyx text-putih p-6 rounded-xl w-full md:max-w-sm text-left">
            <p className="text-lg font-bold font-mont text-white mb-3">Cerita Mereka Bersama Karisma Academy</p>
            <div className="flex items-center gap-2 mb-2">
              <img
                src={Google}
                alt="Google"
                className="w-8 h-8"
              />
              <h3 className="text-xl font-bold">Google</h3>
            </div>
            <div className="flex gap-1 text-rosegold mb-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="font-semibold mb-2 text-putih">4.7/5 Rating</p>
            <p className="text-sm text-kertas leading-relaxed">
              Rate Program Course Karisma Academy yang sudah berlangsung. Ribuan
              peserta merasa terbantu dalam karir dan usaha setelah lulus.
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="bg-[#2a2a2a] p-6 rounded-xl w-full md:max-w-xl text-left min-h-[280px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex flex-col justify-between h-full"
              >
                <p className="text-sm leading-relaxed mb-6">
                  {testimonials[index].text}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonials[index].image}
                    alt={testimonials[index].name}
                    className="w-15 h-15 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonials[index].name}</p>
                    <p className="text-xs text-gray-400">
                      {testimonials[index].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-4 right-4 flex gap-2 z-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === index ? "bg-bluberi scale-125" : "bg-kertas"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionReview;
