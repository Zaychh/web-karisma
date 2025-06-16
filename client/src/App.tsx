import { Routes, Route } from "react-router-dom";
import Header from "./sections/Landing/Header";
import Hero from "./sections/Landing/Hero";
import Info from "./sections/Landing/Information";
import Eksplor from "./sections/Landing/Explor";
import AboutPage from "./sections/Tentang/about";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Info />
      <Eksplor />
    </>
  );
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<LandingPage />} />
        <Route path="/tentang-kami" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
