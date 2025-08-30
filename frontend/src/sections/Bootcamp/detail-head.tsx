import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FullstackDesc } from "./Description/Full-StackDesc";
import { GolangDesc } from "./Description/GolangDesc";
import { DataScienceDesc } from "./Description/DataScienceDesc";
import { UIDesignDesc } from "./Description/UIDesignDesc";
import { GraphicDesignDesc } from "./Description/GraphicDesignDesc";
import type { JSX } from "react";

interface Course {
  program_id: number;
  title: string;
  slug: string;
  harga: number;
  image_cover: string;
  instructor_name: string;
  instructor_mastery: string;
  skills: string[];
  image: string;
  deskripsi: string;
}

//Map slug ke komponen deskripsi
const descComponents: Record<string, JSX.Element> = {
  "full-stack-web-development": <FullstackDesc />,
  "back-end-development-golang": <GolangDesc />,
  "data-science--machine-learning": <DataScienceDesc />,
  "uiux--product-design": <UIDesignDesc />,
  "graphic-design--branding": <GraphicDesignDesc />,
};

const BootcampDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/program/bootcamp")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((p: any) => ({
          ...p,
          slug: p.slug,
          image: `http://localhost:3000/${p.image_cover}`,
          skills: p.skills || [],
        }));
        setCourses(formatted);
      })
      .catch((err) => console.error("Gagal ambil data:", err))
      .finally(() => setLoading(false));
  }, []);

  const data = courses.find((c) => c.slug === slug);

  if (loading)
    return <div className="text-center text-white py-20">Loading...</div>;
  if (!data)
    return (
      <div className="text-center text-white py-20">
        Bootcamp tidak ditemukan
      </div>
    );

  return (
    <section className="bg-ashh text-white py-20 px-6 md:px-16 min-h-screen font-poppins">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Text Info */}
        <div className="w-full lg:w-1/2">
          <p className="text-lg text-gray-300 mb-2 font-medium text-center lg:text-left">
            Siap Berkarir di Industri Kreatif?
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-rosegold mb-6 text-center lg:text-left">
            {data.title}
          </h1>
          <p className="text-gray-300 text-lg mb-4 text-justify lg:text-left">
            {/* Ini bisa diisi dengan deskripsi panjang masing-masing bootcamp */}
            {data.deskripsi}
          </p>
          <div className="flex justify-center lg:justify-start">
            <button className="bg-rosegold text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition cursor-pointer">
              Mulai Perjalananmu Sekarang!
            </button>
          </div>
        </div>

        {/* Gambar Maskot atau Karakter */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={data.image}
            alt={data.title}
            className="w-full max-w-xs md:max-w-md"
          />
        </div>
      </div>

      {/* Garis Pemisah */}
      <div className="my-12 border-t-4 border-gray-600 w-full max-w-md mx-auto"></div>

      {/* Section lanjutan: Deskripsi & List Pembelajaran */}
      <div className="mt-20 flex flex-col lg:flex-row gap-12">
        {/* Kiri: Paragraf panjang */}
        <div className="flex-1 space-y-6 text-gray-300 leading-relaxed">
          {/* Inject komponen berdasarkan slug */}
          {descComponents[slug || ""] || <p>Deskripsi belum tersedia</p>}
        </div>

        {/* Kanan: List yang dibungkus box kuning */}
        <div className="flex-1 bg-ashh border border-rosegold rounded-lg p-5 max-w-md shadow-md">
          <h3 className="text-3xl font-bold text-rosegold mb-4">
            Kamu akan Mempelajari:
          </h3>
          <ul className="space-y-3 list-disc list-inside text-lg text-white leading-relaxed">
            {data.skills.length > 0 ? (
              data.skills.map((skill: string, idx: number) => (
                <li key={idx}>{skill}</li>
              ))
            ) : (
              <li>Skills belum diisi</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BootcampDetail;
