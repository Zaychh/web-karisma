import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react"; // Pastikan lucide-react sudah di-install

const faqs = [
  {
    question: "Apakah saya perlu punya pengalaman di Digital Marketing untuk ikut workshop ini?",
    answer:
      "Tidak! Workshop ini dirancang untuk pemula hingga fresh graduate yang ingin memahami dasar-dasar Digital Marketing dan langsung praktik. Beberapa program gratis akan memberikan Anda pondasi yang kuat."
  },
  {
    question: "Bagaimana cara mendapatkan rekaman kelas dan sertifikat?",
    answer:
      "Rekaman kelas, sertifikat accomplishment, dan materi lengkap akan kami kirimkan kepada seluruh peserta setelah workshop selesai. Semuanya bisa kamu dapatkan tanpa biaya tambahan!"
  },
  {
    question: "Apa itu 'Community Event Unlimited'?",
    answer:
      "Ini adalah akses ke grup komunitas eksklusif kami (misal: di Discord/Telegram) di mana Anda bisa networking dengan peserta lain, bertanya kepada mentor di luar jam kelas, dan mendapatkan update seputar peluang karir terbaru."
  },
  {
    question: "Bisakah saya hanya ikut Sesi 1 saja?",
    answer:
      "Bisa, tapi kamu juga bisa mengikuti seluruh sesi, mengakses rekaman, dan mendapatkan sertifikat tanpa biaya. Nikmati semua manfaatnya tanpa harus memilih paket apa pun!"
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-areng text-white py-16 px-6">
      <div className="max-w-3xl mx-auto bg-onyx p-8 rounded-xl shadow-md">
        <h2 className="text-center text-rosegold text-xl sm:text-2xl font-bold font-poppins mb-8">
          Ada Pertanyaan Seputar Sertifikasi BNSP? <br /> <span className="text-center text-rosegold text-base sm:text-lg font-medium">Kami bantu jawab semua hal yang perlu kamu tahu, biar kamu makin yakin <br /> melangkah.</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-ashh pb-4">
              <button
                onClick={() => toggle(idx)}
                className="w-full flex justify-between items-center text-left text-white font-medium focus:outline-none cursor-pointer"
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 text-gray-300 text-lg leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
