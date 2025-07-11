import t1 from "../../assets/chico.png";
import t2 from "../../assets/Kim.png";
import t3 from "../../assets/Dianaa.png";
import t4 from "../../assets/t3.png";
import t5 from "../../assets/t2.png";
import t6 from "../../assets/t1.png";

import PricingCard from "./PricingCard";
import type { Course } from "./section3";

const testimonials = [
    {
        img: t1,
        name: "Chico Lachowski",
        role: "Full-Stack Developer",
        company: "Karisma Academy",
        text: `Program ini menawarkan pembelajaran mendalam dengan mentor berpengalaman, didukung praktik intensif dan materi yang terstruktur. Yang menarik, peserta berkesempatan mengaplikasikan ilmu langsung melalui kolaborasi dengan UMKM dalam Final Project. Semoga program ini terus berkembang!`,
    },
    {
        img: t2,
        name: "Kim Jaegyun",
        role: "Graphic Designer",
        company: "POT Branding House",
        text: `Potensi karier dan pasar yang menjanjikan mendorong saya mendalami Graphic Design. Di sini, saya mendapat bimbingan yang luar biasa – mentor yang sangat dedikasi, tim yang supportif dan materi pembelajaran yang komprehensif. Hasilnya? Saya sudah mendapat tawaran kerja bahkan sebelum menyelesaikan program!`,
    },
    {
        img: t3,
        name: "Diana Cesare",
        role: "Human Resource Manager",
        company: "EY",
        text: `Bootcamp ini melampaui ekspektasi. Para instruktur tidak hanya informatif, tapi juga proaktif memantau progres dan tugas. Setiap pertanyaan dijawab dengan tuntas. Yang paling penting, mentor membawakan materi yang nyata, membuat pembelajaran jadi sangat aplikatif.`,
    },
    {
        img: t4,
        name: "Siegfried Koigner",
        role: "UI/UX Designer",
        company: "Tokopedia",
        text: `Saya belajar langsung dari praktisi industri dan diberi kebebasan eksplorasi desain produk nyata. Saya makin pede buat terjun ke dunia kerja!`,
    },
    {
        img: t5,
        name: "Saki Yoshida",
        role: "Front-End Developer",
        company: "Traveloka",
        text: `Kurikulum dan project-nya keren banget! Saya bisa punya portofolio nyata yang langsung dilirik recruiter. Mentornya juga sabar banget.`,
    },
    {
        img: t6,
        name: "Sofia Pavlovna Irinovskaya",
        role: "Social Media Strategist",
        company: "IDN Media",
        text: `Belajar digital marketing dari dasar banget sampai advance. Kelasnya seru, studinya relevan sama tren industri. Saya jadi ngerti cara ngiklan yang efektif!`,
    },
];

export default function DetailSection4({ data }: { data: Course }) {
    return (
        <section className="bg-irreng text-white py-20 px-6 md:px-16 min-h-screen font-poppins">
            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-rosegold font-bold">
                    Bukan Sekedar Belajar, Tapi Jadi Career Ready <br /> Professional
                </h2>
            </div>

            {/* Carousel */}
            <div className="overflow-x-auto no-scrollbar pb-4">
                <div className="flex gap-8 w-max px-2 md:px-4">
                    {testimonials.map((item, idx) => (
                        <div
                            key={idx}
                            className="w-[280px] md:w-[480px] flex-shrink-0 bg-bluberi rounded-3xl overflow-hidden shadow-md"
                        >
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-[420px] object-cover"
                            />
                            <div className="p-5 text-sm md:text-2xl">
                                <p className="font-bold">{item.name}</p>
                                <p className="text-lg">{item.role}</p>
                                <p className="text-lg mb-3 italic">
                                    at <span className="font-semibold">{item.company}</span>
                                </p>
                                <p className="text-white text-xl leading-relaxed">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pricing Section */}
            <div className="mt-20">
                <h3 className="text-center text-2xl md:text-3xl font-bold mb-10">
                    Investasi Terbaik dan Bersahabat buat Kamu
                </h3>

                {/* Mobile Scrollable Cards */}
                <div className="block md:hidden overflow-x-auto no-scrollbar pb-6 pl-4 pr-4">
                    <div className="flex gap-6 w-max">
                        {data.pricing.map((plan, idx) => (
                            <div key={idx} className="flex-shrink-0 w-[380px]">
                                <PricingCard plan={plan} />
                            </div>
                        ))}
                    </div>
                </div>


                {/* Desktop View */}
                <div className="hidden md:flex flex-col md:flex-row justify-center items-stretch gap-8">
                    {data.pricing.map((plan, idx) => (
                        <PricingCard key={idx} plan={plan} />
                    ))}
                </div>
            </div>

        </section>
    );
}
