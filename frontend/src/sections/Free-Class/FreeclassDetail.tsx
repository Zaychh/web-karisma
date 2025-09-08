import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Section1 from "./detail-head";
import Section2 from "./Detail-section2";
import Section3 from "./Detail-section3";
import Section4 from "./FaqDetail";
import Final from "./finalsection";
import Foot from "../Landing/Footer";

// ⬇️ Import interface FreeClass biar konsisten
import type { FreeClass } from "./section3";

function FreeClassDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [classes, setClasses] = useState<FreeClass[]>([]);
  const [loading, setLoading] = useState(true);

  // Scroll ke atas tiap kali ganti slug
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Fetch data freeclass detail by slug
  useEffect(() => {
    if (!slug) return;

    fetch(`/api/program/freeclass/${slug}`) // ⬅️ langsung hit endpoint detail
      .then((res) => res.json())
      .then((data) => {
        setClasses([data]); // simpan 1 object ke array, biar gampang dipakai
      })
      .catch((err) => console.error("Gagal ambil freeclass:", err))
      .finally(() => setLoading(false));
  }, [slug]);

  const data = classes[0];

  if (loading)
    return <div className="text-white p-10 text-center">Loading...</div>;

  if (!data)
    return (
      <div className="text-white p-10 text-center">
        Free Class tidak ditemukan.
      </div>
    );

  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 data={data} />
      <Section4 />
      <Final />
      <Foot />
    </>
  );
}

export default FreeClassDetail;
