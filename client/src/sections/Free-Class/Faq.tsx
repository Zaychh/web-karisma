import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react"; // Pastikan lucide-react sudah di-install

const faqs = [
  {
    question: "Apa itu BNSP?",
    answer:
      "BNSP (Badan Nasional Sertifikasi Profesi) adalah lembaga independen yang dibentuk oleh pemerintah Republik Indonesia. Tugas utamanya adalah memastikan standar kompetensi kerja di Indonesia sesuai dengan kebutuhan industri. Sertifikasi BNSP adalah pengakuan resmi negara bahwa Anda telah memiliki kompetensi sesuai dengan standar yang ditetapkan, sehingga meningkatkan kredibilitas dan daya saing profesional Anda."
  },
  {
    question: "Berapa lama masa berlaku sertifikat BNSP?",
    answer:
      "Sertifikat kompetensi BNSP umumnya memiliki masa berlaku selama 3 (tiga) tahun sejak tanggal penerbitan. Setelah masa berlaku habis, Anda perlu melakukan proses resertifikasi untuk memperbarui dan mempertahankan pengakuan kompetensi Anda agar tetap relevan dengan dinamika industri."
  },
  {
    question: "Siapa saja yang bisa mengikuti sertifikasi ini?",
    answer: (
      <div>
        <p className="mb-4">
          Sertifikasi BNSP terbuka bagi individu yang ingin membuktikan dan meningkatkan kompetensinya.
          Ini mencakup berbagai kalangan seperti:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Fresh Graduate yang ingin menonjol di pasar kerja.</li>
          <li>Job Seeker yang mencari pekerjaan impian.</li>
          <li>Karyawan yang ingin promosi, naik jabatan, atau meningkatkan gaji.</li>
          <li>Profesional yang ingin beralih karir atau menjaga relevansi skill.</li>
          <li>Pelaku Usaha/Freelancer yang ingin meningkatkan kredibilitas layanan.</li>
        </ul>
        <p className="mt-4">
          Syarat spesifik dapat bervariasi tergantung pada skema sertifikasi yang Anda pilih
          (misalnya, memerlukan pengalaman kerja atau latar belakang pendidikan tertentu).
        </p>
      </div>
    )
  },
  {
    question: "Apakah sertifikat BNSP diakui oleh perusahaan?",
    answer:
      "Ya, sertifikat BNSP umumnya diakui oleh perusahaan, terutama di Indonesia. Sertifikasi BNSP menunjukkan bahwa seseorang memiliki kompetensi yang diakui secara nasional dan seringkali menjadi nilai tambah dalam proses rekrutmen dan pengembangan karir."
  },
  {
    question: "Bagaimana jika saya tidak lulus ujian kompetensi?",
    answer:
      "Karisma Academy berkomitmen penuh pada keberhasilan Anda. Jika Anda belum dinyatakan kompeten pada ujian pertama, kami akan memberikan panduan dan dukungan untuk proses remedial atau ujian ulang (asesmen ulang) sesuai dengan ketentuan skema sertifikasi. Anda akan mendapatkan feedback dari asesor untuk area yang perlu ditingkatkan, dan kami akan membantu Anda mempersiapkan diri kembali."
  },
  {
    question: "Apakah bisa dilakukan secara online?",
    answer: (
      "Ya, proses asesmen dapat dilakukan secara daring melalui platform terpercaya BNSP."
    )
  },
  {
    question: "Apa bedanya sertifikasi BNSP dengan kursus biasa?",
    answer: (
      "Sertifikasi BNSP adalah pengakuan resmi kompetensi Anda oleh negara, berdasarkan standar SKKNI. Kursus adalah proses belajar, namun tidak selalu diakhiri dengan pengujian dan pengakuan resmi."
    )
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-areng text-white py-16 px-6">
      <div className="max-w-3xl mx-auto bg-onyx p-8 rounded-xl shadow-md">
        <h2 className="text-center text-xl sm:text-2xl font-bold font-poppins mb-8">
          Ada Pertanyaan Seputar Sertifikasi BNSP? <br />Temukan Jawabannya di Sini!
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
