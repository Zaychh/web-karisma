import Robo from "../../assets/Robo2.png";

export default function Section1() {
  return (
    <div className="relative bg-ashh text-white overflow-hidden font-poppins">
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 pt-6 md:pt-10 pb-16 gap-10">
        
        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-6">
          {/* Heading */}
          <div className="text-3xl md:text-5xl font-bold leading-tight text-[#C8A86B] space-y-2">
            <h1 className="block">Dari Nggak Punya Skill,</h1>
            <h1 className="block">Jadi Siap Bersaing di</h1>
            <h1 className="block">Dunia Kerja Digital!</h1>
          </div>

          {/* Paragraph */}
          <p className="text-base md:text-lg text-white">
            Kamu lagi stuck? Pengen kerja di industri digital tapi skill belum mumpuni? Tenang, kamu nggak sendirian.
            Ratusan alumni Karisma Academy dulu juga mulai dari nol — sekarang udah kerja di startup, jadi freelancer,
            atau bahkan bikin brand sendiri.
          </p>

          {/* CTA Button */}
          <button className="bg-[#C8A86B] hover:bg-gray-300 text-black font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer">
            Mulai Perjalananmu Sekarang!
          </button>
        </div>

        {/* Robot Image Section (Only on md and above) */}
        <div className="hidden md:flex md:w-1/2 justify-center">
          <img
            src={Robo}
            alt="Robot"
            className="w-[300px] md:w-[350px] object-contain"
          />
        </div>
      </section>
    </div>
  );
}
