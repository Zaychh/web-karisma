import { useEffect } from "react";

import Section1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";
import Faq from "./Faq";
import Final from "./finalsection";
function FreeClass() {
  // Scroll to top ketika komponen About pertama kali dimount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    return (
        <>
            <Section1 />
            <Section2 />
            <Section3 />
            <Faq />
            <Final />
        </>
    );
}

export default FreeClass;