import { motion } from "framer-motion";

// Import 8 logo partner (pastikan ini benar path-nya)
import p1 from "../../assets/got.png";
import p2 from "../../assets/tiketcom.png";
import p3 from "../../assets/logoflip.png";
import p4 from "../../assets/telkom.png";
import p5 from "../../assets/unileverr.png";
import p6 from "../../assets/telkomnew.png";
import p7 from "../../assets/cmlabss.png";
import p8 from "../../assets/shopee.png";

const partners = [p1, p2, p3, p4, p5, p6, p7, p8];

export default function PartnersSection() {
  const duplicated = [...partners, ...partners]; 

  return (
    <section className="bg-onyx text-white py-16 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4 font-mont">
          Partner Andalan Berbagai Sektor Industri di Indonesia
        </h2>
        <p className="text-sm sm:text-base max-w-3xl mx-auto mb-10 font-poppins text-kertas">
          Tingkatkan skillmu lewat proyek industri real, dapatkan mentoring expert,
          perkaya portofolio dengan brand ternama, atau wujudkan transformasi digital bisnismu bersama kami
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-10 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20 
          }}
        >
          {duplicated.map((src, idx) => (
            <div key={idx} className="flex justify-center items-center min-w-[150px]">
              <img
                src={src}
                alt={`Partner ${idx + 1}`}
                className="max-h-16 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
