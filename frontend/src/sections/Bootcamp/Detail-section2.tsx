import { useParams } from "react-router-dom";
import { courses } from "./section3";

const DetailSection2 = () => {
    const { slug } = useParams<{ slug: string }>();
    const course = courses.find((c) => c.slug === slug);

    if (!course) return null;

    return (
        <section className="bg-abyssal text-white py-16 px-6 md:px-16 font-poppins">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
                5 Fakta Menarik Tentang Karir <br className="block md:hidden" />
                <span className="text-rosegold">{course.title2}</span>
            </h2>

            {/* Desktop */}
            <div
                className="hidden md:grid grid-cols-4 gap-4 max-w-6xl mx-auto group"
                style={{
                    gridTemplateRows: "repeat(2, 1fr)",
                    gridTemplateAreas: `
      "card1 card2 card3 card5"
      "card1 card4 card4 card5"
    `,
                    height: "520px",
                }}
            >
                {course.facts.map((fact, i) => {
                    const areaName = `card${i + 1}`;
                    return (
                        <div
                            key={i}
                            style={{ gridArea: areaName }}
                            className="relative rounded-xl overflow-hidden w-full h-full
          transition duration-300 group-hover:opacity-40 hover:opacity-100 hover:scale-[1.02]"
                        >
                            <img
                                src={fact.image}
                                alt={fact.text}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-start justify-start p-4">
                                <p className="text-sm md:text-lg font-bold leading-snug text-white">{fact.text}</p>
                            </div>
                        </div>
                    );
                })}
            </div>


            {/* Mobile */}
            <div className="grid grid-cols-2 gap-4 md:hidden max-w-lg mx-auto">
                {course.facts.map((fact, i) => (
                    <div
                        key={i}
                        className="relative rounded-xl overflow-hidden w-full h-[180px]
        transition duration-300 group-hover:opacity-40 hover:opacity-100 hover:scale-[1.02]"
                    >
                        <img
                            src={fact.image}
                            alt={fact.text}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-start justify-start p-2">
                            <p className="text-sm font-semibold leading-snug text-white">{fact.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DetailSection2;
