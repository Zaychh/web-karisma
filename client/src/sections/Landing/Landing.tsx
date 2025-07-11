import { useEffect } from "react";

import Header from "./Header";
import Hero from "./Hero";
import Info from "./Information";
import Eksplor from "./Explor";
import HeroSecond from "./Herosec";
import Testi from "./Testimoni"; 
import Review from "./Review";
import Partner from "./Partner";
import Penghargaan from "./Award";
import FAQ from "./Faq";
import Contact from "./Contact";
import Footer from "./Footer";

function App() {
  // Scroll to top ketika komponen About pertama kali dimount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <Info />
      <Eksplor />
      <HeroSecond />
      <Testi />
      <Review />
      <Partner />
      <Penghargaan />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
