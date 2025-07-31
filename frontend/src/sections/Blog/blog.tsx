import { useEffect } from "react";

import Section1 from "./section1";
import Section2 from "./section2";

function Blog() {
  // Scroll to top ketika komponen About pertama kali dimount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Section1 />
      <Section2 />
    </>
  );
}

export default Blog;
