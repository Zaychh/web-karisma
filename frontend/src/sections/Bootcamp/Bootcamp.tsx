import { useEffect } from "react";

import Section1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";
import Section4 from "./section4";
import FAQ from "../Landing/Faq";
import Final from "./finalsection";

function Bootcamp() {
  // Scroll to top ketika komponen pertama kali dimount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    return (
        <>
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <FAQ />
            <Final />
        </>
    );
}

export default Bootcamp;