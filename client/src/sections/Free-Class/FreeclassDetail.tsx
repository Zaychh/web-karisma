import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { freeClasses } from "./section3";

import Header from "../Landing/Header";
import Section1 from "./detail-head";
import Section2 from "./Detail-section2";
import Foot from "../Landing/Footer";

function Detail() {

    const { slug } = useParams<{ slug: string }>();
    const data = freeClasses.find((c) => c.slug === slug);

    if (!data) {
        return <div className="text-white p-10 text-center">Bootcamp tidak ditemukan.</div>;
    }
    // Scroll to top ketika komponen pertama kali dimount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />
            <Section1 />
            <Section2 />
            <Foot />
        </>
    );
}

export default Detail;