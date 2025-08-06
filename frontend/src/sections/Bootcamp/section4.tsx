import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import benefit1 from "../../assets/benefit1.png"; // ganti sesuai ilustrasi
import benefit2 from "../../assets/benefit2.png";
import benefit3 from "../../assets/benefit3.png";
import benefit4 from "../../assets/benefit4.png";

interface BenefitItem {
    title: string;
    description: string;
    image: string;
}

const benefits: BenefitItem[] = [
    {
        title: "Build your Portfolio",
        description:
            "Setiap tugas dan proyek di bootcamp Karisma Academy dirancang langsung dari kasus nyata yang sedang dihadapi oleh dunia industri digital. Kamu akan menyelesaikan tantangan seperti profesional sungguhan – mulai dari riset, eksekusi, hingga presentasi hasil.\n\nBukan hanya belajar, kamu membangun problem-solving mindset yang dibutuhkan perusahaan hari ini. Hasil akhirnya? Proyekmu bukan sekadar latihan, tapi karya otentik yang layak masuk portofolio dan dibanggakan di dunia kerja.",
        image: benefit1,
    },
    {
        title: "Internship Launchpad",
        description:
            "Sesi belajar bisa diatur sesuai jadwal dan kebutuhan kamu, sehingga cocok untuk kamu yang memiliki preferensi waktu tertentu atau ingin fokus pada bidang tertentu.\n\n Di sinilah kamu terjun ke dinamika kerja sesungguhnya — menyelesaikan tantangan, menghadapi deadline real-time, berkolaborasi dengan tim profesional, dan membuktikan skill-mu dalam konteks dunia kerja yang sebenarnya.",
        image: benefit2,
    },
    {
        title: "Brand Yourself to Get Hired",
        description:
            "Skill yang bagus belum tentu cukup. Di dunia kerja sekarang, kamu harus tahu cara menjual dirimu secara profesional. Melalui sesi career coaching, tools branding, dan bimbingan dari mentor HR, kamu akan: menyusun CV yang menarik dan ATS-friendly, merancang profil LinkedIn yang memikat, menentukan positioning yang autentik. Dengan branding yang kuat, kamu bisa mencuri perhatian recruiter, bahkan sebelum bicara soal skill.",
        image: benefit3,
    },
    {
        title: "Designed to Hire",
        description:
            "Kurikulum dirancang langsung dari kebutuhan industri, fokus pada skill yang benar-benar dibutuhkan perusahaan. Dipandu mentor berpengalaman, kamu belajar lewat praktik nyata, tools terkini, dan studi kasus dari dunia kerja. Hasilnya? Kamu bukan cuma belajar, tapi siap direkrut dengan portofolio dan kompetensi yang relevan di pasar kerja.",
        image: benefit4,
    },
];

const Benefit = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="bg-ashh text-white py-20 px-6 md:px-16">
            <div className="text-center mb-12 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    Bayangkan Apa yang Bisa Kamu Capai Setelah Menyelesaikan Bootcamp Ini
                </h2>
                <p className="text-gray-300 text-base md:text-lg">
                    Unlock new possibilities and shape your future with the skills and connections you'll gain.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
                {benefits.map((b, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`px-4 py-2 rounded-lg border text-sm md:text-base font-semibold transition-all duration-200 cursor-pointer
              ${activeIndex === i
                                ? "bg-[#864AF9] text-white border-[#864AF9]"
                                : "bg-transparent text-white border-gray-400 hover:border-white"
                            }`}
                    >
                        {b.title}
                    </button>
                ))}
            </div>

            {/* Content Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5 }}
                    className="bg-abyssal rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto"
                >
                    {/* Image */}
                    <motion.img
                        src={benefits[activeIndex].image}
                        alt={benefits[activeIndex].title}
                        className="w-[250px] h-[250px] object-contain flex-shrink-0"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* Text */}
                    <div className="flex-1 text-left">
                        <h3 className="text-xl md:text-2xl font-bold mb-3">
                            {benefits[activeIndex].title}
                        </h3>
                        <p className="text-gray-300 whitespace-pre-line text-sm md:text-base leading-relaxed">
                            {benefits[activeIndex].description}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
};

export default Benefit;
