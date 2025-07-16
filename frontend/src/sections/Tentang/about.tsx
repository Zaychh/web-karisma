import { useEffect } from "react";

import Section1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";
import Section4 from "./section4";
import Section5 from "./section5";

function About() {
  // Scroll to top ketika komponen About pertama kali dimount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </>
  );
}

export default About;
