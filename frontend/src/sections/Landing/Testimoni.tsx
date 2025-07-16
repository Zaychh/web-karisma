import React from "react";
import { motion } from "framer-motion";

// Ganti dengan path ke image lo sendiri
import t1 from "../../assets/chico.png";
import t2 from "../../assets/Kim.png";
import t3 from "../../assets/Dianaa.png";
import t4 from "../../assets/t3.png";
import t5 from "../../assets/t2.png";
import t6 from "../../assets/t1.png";

const testimonies = [
  { image: t1, 
    name: "Chico Lachowski", 
    role: "Full-Stack Developer", 
    company: "at Karisma Academy", 
    text: "Program ini menawarkan pembelajaran mendalam dengan mentor berpengalaman, didukung praktik intensif dan materi yang terstruktur. Yang menarik, peserta berkesempatan mengaplikasikan ilmu langsung melalui kolaborasi dengan UMKM dalam Final Project. Semoga program ini terus berkembang!" },

  { image: t2, 
    name: "Kim Jaegyun", 
    role: "Graphic Designer", 
    company: "at Karisma Academy", 
    text: "Program ini menawarkan pembelajaran mendalam dengan mentor berpengalaman, didukung praktik intensif dan materi yang terstruktur. Yang menarik, peserta berkesempatan mengaplikasikan ilmu langsung melalui kolaborasi dengan UMKM dalam Final Project. Semoga program ini terus berkembang!" },

  { image: t3, 
    name: "Diana Cesare", 
    role: "Digital Marketing", 
    company: "at Karisma Academy", 
    text: "Program ini menawarkan pembelajaran mendalam dengan mentor berpengalaman, didukung praktik intensif dan materi yang terstruktur. Yang menarik, peserta berkesempatan mengaplikasikan ilmu langsung melalui kolaborasi dengan UMKM dalam Final Project. Semoga program ini terus berkembang!" },

  { image: t4, 
    name: "Siegfried Koigner", 
    role: "Senior Penetration Tester", 
    company: "at Karisma Academy", 
    text: "Program ini menawarkan pembelajaran mendalam dengan mentor berpengalaman, didukung praktik intensif dan materi yang terstruktur. Yang menarik, peserta berkesempatan mengaplikasikan ilmu langsung melalui kolaborasi dengan UMKM dalam Final Project. Semoga program ini terus berkembang!" },

  { image: t5, 
    name: "Chisa Yoshida", 
    role: "UI/UX Designer", 
    company: "at Karisma Academy", 
    text: "Program ini menawarkan pembelajaran mendalam dengan mentor berpengalaman, didukung praktik intensif dan materi yang terstruktur. Yang menarik, peserta berkesempatan mengaplikasikan ilmu langsung melalui kolaborasi dengan UMKM dalam Final Project. Semoga program ini terus berkembang!" },

  { image: t6, 
    name: "Sofia Pavlovna Irinovskaya", 
    role: "Mobile Developer", 
    company: "at Karisma Academy", 
    text: "Program ini menawarkan pembelajaran mendalam dengan mentor berpengalaman, didukung praktik intensif dan materi yang terstruktur. Yang menarik, peserta berkesempatan mengaplikasikan ilmu langsung melalui kolaborasi dengan UMKM dalam Final Project. Semoga program ini terus berkembang!" },
];

const Testimoni: React.FC = () => {
  return (
    <section className="bg-onyx py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      <h2 className="text-white text-3xl md:text-4xl font-bold font-mont text-center mb-16 leading-snug">
        Bukan Sekedar Belajar, Tapi Jadi <br />
        Career-Ready Professional!
      </h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 10, 
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="flex gap-6 w-[200%]"
        >
          {[...testimonies, ...testimonies].map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[350px] h-[500px] bg-onyx rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[220px] object-cover"
              />
              <div className="bg-bluberi text-white px-4 py-4 h-[280px] flex flex-col justify-start">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm">{item.role}</p>
                <p className="text-xs font-light">{item.company}</p>
                <p className="mt-3 text-xs leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimoni;
