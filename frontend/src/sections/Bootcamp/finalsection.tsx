import { motion } from "framer-motion";
import illust1 from "../../assets/jawa.png";
import illust2 from "../../assets/sunda.png";

const BottomSection = () => {
  return (
    <section className="bg-ashh text-white px-6 md:px-20 py-16 md:py-28">
      {/* Bagian Atas */}
      <div className="text-center mb-16">
        <motion.h2
          whileHover={{
            scale: 1.05,
            textShadow: "0px 0px 8px white",
          }}
          transition={{ duration: 0.3 }}
          className="text-3xl md:text-5xl font-bold"
        >
          Siap Bawa Kariermu ke Level Baru?
        </motion.h2>
        <p className="mt-4 text-base md:text-lg text-gray-300">
          Jangan tunggu “nanti” buat punya skill yang kamu banggakan. Yuk, daftar
          sekarang dan mulai perjalananmu di dunia digital bareng Karisma Academy!
        </p>
      </div>

      {/* Bagian Bawah */}
      <div className="bg-abyssal rounded-xl px-8 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Teks */}
        <div className="md:w-1/2">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-snug">
            Skill Bisa Dipelajari, Karier Bisa Dibangun! <br />
            Gabung dan mulai langkahmu jadi talenta digital!
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-onyx font-semibold px-6 py-3 rounded-lg shadow transition-transform cursor-pointer"
          >
            Konsultasi Sekarang, Gratis!
          </motion.button>
        </div>

        {/* Ilustrasi Kartun */}
        <div className="flex -space-x-2 md:-space-x-10 items-end md:w-1/2 justify-end">
          <img
            src={illust1}
            alt="Ilustrasi 1"
            className="w-34 md:w-42"
          />
          <img
            src={illust2}
            alt="Ilustrasi 2"
            className="w-34 md:w-42"
          />
        </div>
      </div>
    </section>
  );
};

export default BottomSection;
