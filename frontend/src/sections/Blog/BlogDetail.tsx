import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { blogPosts } from "./section2";

import Section1 from "./detail-head";
import Foot from "../Landing/Footer";

function Detail() {

    const { slug } = useParams<{ slug: string }>();
    const data = blogPosts.find((c) => c.slug === slug);

    if (!data) {
        return <div className="text-white p-10 text-center">Blog tidak ditemukan.</div>;
    }
    // Scroll to top ketika komponen pertama kali dimount
   useEffect(() => {
     window.scrollTo(0, 0);
   }, [slug]);

   return (
    <>
        <Section1 />
        <Foot />
    </>
   )
}

export default Detail;