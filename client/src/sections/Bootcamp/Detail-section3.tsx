import { useParams } from "react-router-dom";
import { courses } from "./section3";

const DetailSection3 = () => {
    const { slug } = useParams<{ slug: string }>();
    const course = courses.find((c) => c.slug === slug);

    if (!course) return null;

    return (
        <section className="bg-ashh text-white py-20 px-6 md:px-16">
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-10">
                {/* Desktop version */}
                <span className="hidden md:block">
                    Peluang karir <span className="text-rosegold">{course.careerTitle}</span> menjanjikan
                    dengan jenjang yang jelas, dibutuhkan perusahaan dalam jangka panjang.
                </span>

                {/* Mobile version */}
                <span className="block md:hidden">
                    Peluang karir <span className="text-rosegold">{course.careerTitle}</span>
                </span>
            </h2>

            <div className="hidden md:block">
                <div className="space-y-4 max-w-4xl mx-auto">
                    {course.jobs.map((job, idx) => (
                        <div
                            key={idx}
                            className="bg-[#F9F7F0] text-black flex flex-col md:flex-row md:items-center justify-between rounded-xl px-6 py-4 shadow-sm"
                        >
                            <div className="flex items-center gap-8">
                                <img src={job.logo} alt={job.company} className="w-24 h-auto object-contain" />
                                <div className="pl-2 md:pl-6 flex flex-wrap items-center gap-12 text-lg">
                                    <p>
                                        <span className="font-medium">Posisi</span> <br />
                                        <span className="font-bold">{job.position}</span>
                                    </p>
                                    <p>
                                        <span className="font-medium">Tipe Pekerjaan</span> <br />
                                        <span className="font-bold">{job.type}</span>
                                    </p>
                                    <p>
                                        <span className="font-medium">Range Gaji</span> <br />
                                        <span className="font-bold">{job.salary}</span>
                                    </p>
                                </div>
                            </div>
                            <a
                                href={job.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 md:mt-0 bg-[#2B3990] text-white px-4 py-2 rounded font-semibold w-max hover:bg-blue-700"
                            >
                                Lebih Lanjut
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex overflow-x-auto space-x-4 snap-x snap-mandatory px-1 pt-4 pb-6">
                {course.jobs.map((job, idx) => (
                    <div
                        key={idx}
                        className="snap-center min-w-[90%] bg-[#F9F7F0] text-black rounded-xl shadow-md p-4 flex flex-col justify-between"
                    >
                        <div className="w-full flex justify-center mb-4">
                            <img src={job.logo} alt={job.company} className="w-[80%] h-auto object-contain" />
                        </div>
                        <div className="space-y-2 text-center text-base">
                            <p>
                                <span className="font-medium">Posisi</span> <br />
                                <span className="font-bold">{job.position}</span>
                            </p>
                            <p>
                                <span className="font-medium">Tipe</span> <br />
                                <span className="font-bold">{job.type}</span>
                            </p>
                            <p>
                                <span className="font-medium">Gaji</span> <br />
                                <span className="font-bold">{job.salary}</span>
                            </p>
                        </div>
                        <a
                            href={job.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 bg-[#2B3990] text-white px-4 py-2 rounded font-semibold w-max mx-auto hover:bg-blue-700"
                        >
                            Lebih Lanjut
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DetailSection3;
