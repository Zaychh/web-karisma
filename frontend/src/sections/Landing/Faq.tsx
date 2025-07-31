import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react"; // Pastikan lucide-react sudah di-install

const faqs = [
  {
    question: "Apa itu Karisma Boostcamp?",
    answer:
      "Karisma Boostcamp adalah program pelatihan intensif yang dirancang untuk membekali peserta dengan keterampilan praktis di industri digital."
  },
  {
    question: "Apa perbedaan Karisma Boostcamp dengan Karisma Boostcamp+?",
    answer:
      "Boostcamp+ mencakup semua fitur Boostcamp, ditambah mentoring 1-on-1, project real client, dan akses premium ke komunitas expert."
  },
  {
    question: "Apakah ada sertifikat setelah menyelesaikan Boostcamp?",
    answer:
      "Ya, peserta yang menyelesaikan program akan mendapatkan e-sertifikat resmi dari Karisma Academy serta mendapatkan badge Achievement juga."
  },
  {
    question: "Apakah disediakan rekaman kelas?",
    answer:
      "Ya, setiap sesi kelas akan direkam dan bisa diakses kembali melalui portal peserta selama masa aktif bootcamp."
  },
 {
    question: "Bagaimana cara mendaftar program bootcamp?",
    answer: (
      <ol className="list-decimal list-inside space-y-1">
        <li>Buka laman karismaacademy.com</li>
        <li>Login akun jika sudah memiliki akun. Jika belum, klik "Daftar"</li>
        <li>
          Lengkapi data diri kamu dengan benar mulai dari nama lengkap, nomor
          ponsel/WhatsApp, dan password. Biar nggak lupa, catat password-mu di tempat yang aman ya
        </li>
        <li>Pilih program yang kamu inginkan dan klik "Daftar Sekarang"</li>
        <li>
          Masuk ke tahap pembayaran. Pilih metode pembayaran sesuai yang kamu inginkan, bisa melalui bank transfer, e-wallet, atau QRIS
        </li>
        <li>
          Jika pembayaran berhasil dilakukan, kamu akan mendapat bukti pelunasan (invoice) di email kamu
        </li>
        <li>
          Yey, You are on the way to be The Next Level of You! Kamu sudah berhasil mendaftar dan akan MinKA follow-up melalui WhatsApp dan email
        </li>
      </ol>
    )
  },
  {
  question: "Apakah ada sistem refund?",
  answer: (
    <p className="text-sm leading-relaxed text-gray-300">
      Setelah transaksi kamu berhasil dan terkonfirmasi, sayangnya kamu tidak bisa melakukan refund dalam kondisi apapun, karena pembayaran bersifat final.
      Jadi, pastikan dulu semua data pemesanan kamu (program pilihan, tanggal mulai, jadwal kelas, dll.) sudah benar sebelum klik "Bayar".
      Cek dengan teliti agar aman dan nyaman!
    </p>
  )
},
{
  question: "Apakah ada fasilitas penyaluran kerja?",
  answer: (
    <p className="text-sm leading-relaxed text-gray-300">
      Karisma Academy menyediakan fasilitas magang bagi kamu yang ingin merasakan pengalaman langsung di dunia kerja.
      Fasilitas ini tersedia pada program KaBoost +.
    </p>
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
          Ada pertanyaan terkait Bootcamp di Karisma Academy
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
                    className="mt-3 text-gray-300 text-sm leading-relaxed"
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
