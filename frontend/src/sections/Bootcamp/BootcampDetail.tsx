import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Section1 from "./detail-head";
import Section2 from "./Detail-section2";
import Section3 from "./Detail-section3";
import Section4 from "./Detail-section4";
import FAQ from "../Landing/Faq";
import Final from "../Free-Class/finalsection";
import Foot from "../Landing/Footer";

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
  career_title: string;
}

function Detail() {
  const { slug } = useParams<{ slug: string }>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top ketika komponen pertama kali dimount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch("/api/program/bootcamp")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((p: any) => ({
          ...p,
          image: `http://localhost:3000/${p.image_cover}`,
          skills: p.skills || [],
        }));
        setCourses(formatted);
      })
      .catch((err) => console.error("Gagal ambil bootcamp:", err))
      .finally(() => setLoading(false));
  }, []);

  const data = courses.find((c) => c.slug === slug);

  if (loading)
    return <div className="text-white p-10 text-center">Loading...</div>;
  if (!data)
    return (
      <div className="text-white p-10 text-center">
        Bootcamp tidak ditemukan.
      </div>
    );

  return (
    <>
      <Section1 />
      <Section2 course={data} />
      <Section3 course={data} />
      <Section4 data={data} />
      <FAQ />
      <Final />
      <Foot />
    </>
  );
}

export default Detail;
