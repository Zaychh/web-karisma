import React from "react";
import kuning from "../../assets/Foto1.png";
import biru from "../../assets/Foto3.png";
import ungu from "../../assets/Foto6.png";
import merah from "../../assets/Foto7.png";

type CardProps = {
  title: string;
  bgImage: string;
  className?: string;
};

const Card: React.FC<CardProps> = ({ title, bgImage, className }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-lg group transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-[0_0_30px_5px_rgba(255,255,255,0.2)] ${className}`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-opacity-20 group-hover:bg-opacity-10 transition duration-300" />
      {/* Title at top-left */}
      <div className="absolute top-4 left-4 z-10 px-2 py-1 text-white text-sm md:text-base font-semibold font-poppins rounded-md backdrop-blur-sm">
        {title}
      </div>

      {/* Radial glow on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-500">
        <div className="w-[200%] h-[200%] bg-gradient-radial from-white/20 to-transparent rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl opacity-40" />
      </div>
    </div>
  );
};

const HeroSecond: React.FC = () => {
  return (
    <section className="w-full bg-onyx py-16 px-6 md:px-12 lg:px-20">
      <h2 className="text-white text-2xl md:text-4xl font-bold text-center mb-12">
        Raih Impianmu. Lebih Mudah. Lebih Seru.
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
        <Card
          title="Tailored Mentorship"
          bgImage={kuning}
          className="row-span-2"
        />
        <Card title="Phygital Vibes" bgImage={biru} />
        <Card title="Career Boost Squad" bgImage={ungu} />
        <Card
          title="Specialize & Dominate"
          bgImage={merah}
          className="row-span-2"
        />
        <Card title="Game On Learning" bgImage={biru} />
        <Card title="Fast ROI" bgImage={ungu} />
      </div>
    </section>
  );
};

export default HeroSecond;
