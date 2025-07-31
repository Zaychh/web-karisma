import { useParams } from "react-router-dom";
import { freeClasses } from "./section3"; 

import Icon1 from "../../assets/icon1.png";
import Icon2 from "../../assets/icon2.png";
import Icon3 from "../../assets/icon3.png";
import Icon4 from "../../assets/icon4.png";
import { Linkedin } from "lucide-react";

const DetailSection2 = () => {
const { slug } = useParams(); // ambil slug dari URL

  // Cari freeClass berdasarkan slug
  const selectedClass = freeClasses.find((item) => item.slug === slug);

    return (
        <section className="bg-abyssal text-white py-20 px-6 md:px-16 font-poppins">
            {/* Section Utama */}
            <div className="space-y-12">
                <h3 className="text-5xl font-bold text-rosegold leading-snug">
                    Karisma Academy membuat Anda berbeda!
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Box 1 - 4 */}
                    {[{
                        icon: Icon1,
                        title: "Webinar Rasa Bootcamp",
                        text: "Intensif Ala Bootcamp: Lebih dari sekadar webinar! Kami fokus pada transfer keterampilan praktis yang bisa langsung kamu terapkan. Dapatkan pengalaman langsung, belajar dari para ahli, dan berkolaborasi dengan peserta lainnya."
                    }, {
                        icon: Icon2,
                        title: "Teori & Praktik Langsung",
                        text: "Hands-On Langsung: Pahami konsep dengan mendalam dan langsung praktikkan! Belajar sambil melakukan adalah cara yang paling efektif untuk memahami materi. Dengan cara ini, kamu tidak hanya mengerti teori, namun juga menerapkannya."
                    }, {
                        icon: Icon3,
                        title: "Mentoring Bareng Expert",
                        text: "Mentor Ahli Siap Membimbing Anda: Dapatkan wawasan berharga dan jawaban untuk semua pertanyaan yang Anda miliki dari praktisi berpengalaman. Kami hadir untuk membantu mengatasi tantangan dengan percaya diri."
                    }, {
                        icon: Icon4,
                        title: "Portfolio Ready",
                        text: "Portofolio Nyata: Bangun portofolio pertama Anda dengan proyek-proyek praktis yang mencerminkan keterampilan yang telah Anda kuasai, sehingga Anda bisa tampil lebih percaya diri di dunia profesional."
                    }].map((item, idx) => (
                        <div key={idx} className="border border-rosegold p-6 rounded-xl bg-abyssal">
                            <div className="flex items-center gap-4">
                                <img src={item.icon} alt={`Icon${idx + 1}`} className="w-12 h-12" />
                                <h4 className="text-2xl font-semibold">{item.title}</h4>
                            </div>
                            <p className="text-lg mt-3">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section Instruktur */}
            {selectedClass && (
            <div className="text-center mt-20">
                <h3 className="text-3xl md:text-4xl font-bold text-rosegold mb-12">
                Instruktur Ahli buat belajar kamu makin Easy
                </h3>

            <div className="max-w-md mx-auto border border-rosegold rounded-xl p-6 bg-abyssal flex flex-col md:flex-row items-center gap-6">
            {/* Foto Instruktur */}
            <img
              src={selectedClass.instructor.image}
              alt={selectedClass.instructor.name}
              className="w-36 h-36 object-cover rounded-md"
            />

            {/* Detail */}
            <div className="text-left">
              <h4 className="text-white font-bold text-xl">{selectedClass.instructor.name}</h4>
              <p className="text-sm text-gray-300">{selectedClass.instructor.role}</p>

              {/* Tombol LinkedIn */}
              <a
                href={selectedClass.instructor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-rosegold text-rosegold px-4 py-2 mt-4 rounded-md hover:bg-rosegold hover:text-abyssal transition-all"
              >
                Lihat Profil <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
        </section>
    );
};

export default DetailSection2;
