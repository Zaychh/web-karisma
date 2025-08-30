import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import t1 from "../../assets/chico.png";
import t2 from "../../assets/Kim.png";
import t3 from "../../assets/Dianaa.png";
import t4 from "../../assets/t3.png";
import t5 from "../../assets/t2.png";
import t6 from "../../assets/t1.png";

import PricingCard from "./PricingCard";

interface PricingPlan {
  name: string;
  price: number;
  originalPrice?: number;
  benefits: string[];
}

interface Course {
  program_id: number;
  slug: string;
  pricing?: PricingPlan[];
  harga: number;
}

const testimonials = [
  {
    img: t1,
    name: "Chico Lachowski",
    role: "Full-Stack Developer",
    company: "Karisma Academy",
    text: `Program ini menawarkan pembelajaran mendalam dengan mentor berpengalaman, didukung praktik intensif dan materi yang terstruktur. Yang menarik, peserta berkesempatan mengaplikasikan ilmu langsung melalui kolaborasi dengan UMKM dalam Final Project. Semoga program ini terus berkembang!`,
  },
  {
    img: t2,
    name: "Kim Jaegyun",
    role: "Graphic Designer",
    company: "POT Branding House",
    text: `Potensi karier dan pasar yang menjanjikan mendorong saya mendalami Graphic Design. Di sini, saya mendapat bimbingan yang luar biasa – mentor yang sangat dedikasi, tim yang supportif dan materi pembelajaran yang komprehensif. Hasilnya? Saya sudah mendapat tawaran kerja bahkan sebelum menyelesaikan program!`,
  },
  {
    img: t3,
    name: "Diana Cesare",
    role: "Human Resource Manager",
    company: "EY",
    text: `Bootcamp ini melampaui ekspektasi. Para instruktur tidak hanya informatif, tapi juga proaktif memantau progres dan tugas. Setiap pertanyaan dijawab dengan tuntas. Yang paling penting, mentor membawakan materi yang nyata, membuat pembelajaran jadi sangat aplikatif.`,
  },
  {
    img: t4,
    name: "Siegfried Koigner",
    role: "UI/UX Designer",
    company: "Tokopedia",
    text: `Saya belajar langsung dari praktisi industri dan diberi kebebasan eksplorasi desain produk nyata. Saya makin pede buat terjun ke dunia kerja!`,
  },
  {
    img: t5,
    name: "Saki Yoshida",
    role: "Front-End Developer",
    company: "Traveloka",
    text: `Kurikulum dan project-nya keren banget! Saya bisa punya portofolio nyata yang langsung dilirik recruiter. Mentornya juga sabar banget.`,
  },
  {
    img: t6,
    name: "Sofia Pavlovna Irinovskaya",
    role: "Social Media Strategist",
    company: "IDN Media",
    text: `Belajar digital marketing dari dasar banget sampai advance. Kelasnya seru, studinya relevan sama tren industri. Saya jadi ngerti cara ngiklan yang efektif!`,
  },
];

export default function DetailSection4({ data }: { data: Course }) {
  const navigate = useNavigate();
  const [pricing, setPricing] = useState<PricingPlan[]>([]);

  useEffect(() => {
  fetch(`/api/program/${data.program_id}/pricing`)
    .then((res) => res.json())
    .then((result: PricingPlan[]) => {
      // ✅ Cek apakah ada Get A Job
      const hasGetAJob = result.some((p) => p.name === "Get A Job");

      if (!hasGetAJob) {
        // 🔁 Fallback: bikin 1 plan Scale Up manual dari data program
        const fallbackPlan: PricingPlan = {
          name: "Scale Up",
          price: data.harga,
          benefits: [
            "Live Online Class intensif dan seru",
            "Lifetime Access Materi (Modul Belajar, Video Pembelajaran)",
            "Actual Case Study & Portofolio Development",
            "Sesi English & Mental Health bareng profesional",
            "Freelance/Part Time Project untuk alumni"
          ],
        };

        setPricing([fallbackPlan]);
      } else {
        // ✅ Urutkan: Get A Job di kanan
        const sorted = result.sort((a, b) => {
          if (a.name === "Scale Up") return -1;
          if (b.name === "Scale Up") return 1;
          return 0;
        });

        setPricing(sorted);
      }
    })
    .catch((err) => {
      console.error("❌ Gagal ambil pricing:", err);
    });
}, [data.program_id]);


  const handleDaftar = (paymentData: {
    title: string;
    price: number;
    program_id: number;
    slug: string;
  }) => {
    console.log("handleDaftar dipanggil", paymentData);

    navigate("/pembayaran", {
      state: {
        title: paymentData.title,
        price: paymentData.price,
        slug: paymentData.slug,
        program_id: paymentData.program_id,
      },
    });
  };

  return (
    <section className="bg-abyssal text-white py-20 px-6 md:px-16 min-h-screen font-poppins">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl text-rosegold font-bold">
          Bukan Sekedar Belajar, Tapi Jadi Career Ready <br /> Professional
        </h2>
      </div>

      {/* Carousel */}
      <div className="overflow-x-auto no-scrollbar pb-4">
        <div className="flex gap-8 w-max px-2 md:px-4">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="w-[280px] md:w-[480px] flex-shrink-0 bg-bluberi rounded-3xl overflow-hidden shadow-md"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-[420px] object-cover"
              />
              <div className="p-5 text-sm md:text-2xl">
                <p className="font-bold">{item.name}</p>
                <p className="text-lg">{item.role}</p>
                <p className="text-lg mb-3 italic">
                  at <span className="font-semibold">{item.company}</span>
                </p>
                <p className="text-white text-xl leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mt-20">
        <h3 className="text-center text-2xl md:text-3xl font-bold mb-10">
          Investasi Terbaik dan Bersahabat buat Kamu
        </h3>

        {/* Mobile View */}
        <div className="block md:hidden overflow-x-auto no-scrollbar pb-6 pl-4 pr-4">
          <div className="flex gap-6 w-max">
            {pricing.map((plan, idx) => (
              <PricingCard
                key={idx}
                plan={{
                  ...plan,
                  program_id: data.program_id,
                  slug: data.slug,
                }}
                onClick={handleDaftar}
              />
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex flex-col md:flex-row justify-center items-stretch gap-8">
          {pricing.map((plan, idx) => (
            <PricingCard
              key={idx}
              plan={{
                ...plan,
                program_id: data.program_id,
                slug: data.slug,
              }}
              onClick={handleDaftar}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
