import { useParams } from "react-router-dom";
import { freeClasses } from "./section3";
import { FaArrowRightLong } from "react-icons/fa6";

const FreeClassDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const data = freeClasses.find((c) => c.slug === slug);

    if (!data)
        return (
            <div className="text-center py-20 text-white">
                Free Class tidak ditemukan
            </div>
        );

    return (
        <section className="bg-ashh text-white py-20 px-6 md:px-16 min-h-screen font-poppins">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
                {/* Text Info */}
                <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-rosegold">
                        {data.title}
                    </h1>

                    <p className="text-base md:text-2xl text-white font-bold leading-relaxed">
                        Impian berkarir di {data.title2} Terhalang <br />
                        Portofolio Kosong dan Rasa Bingung Harus <br />
                        Mulai dari Mana? Ini Solusinya!
                    </p>

                    <p className="text-base md:text-xl text-white font-medium leading-relaxed">
                        Peluang emas di dunia {data.title2} takkan menunggu! Persaingan ketat
                        menuntut Anda punya <span className="italic">skill</span> relevan dan portofolio yang bicara.
                        Berhenti sekadar berteori, saatnya <span className="italic">action</span> nyata dan
                        bangun pondasi <span className="italic">skill</span> yang bikin Anda dilirik!
                    </p>

                    <div className="flex justify-center lg:justify-start">
                        <button className="bg-rosegold text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition cursor-pointer flex items-center gap-2">
                            Daftar Sekarang <FaArrowRightLong />
                        </button>
                    </div>
                </div>

                {/* Gambar Maskot atau Karakter */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <img
                        src={data.image}
                        alt={data.title}
                        className="w-full max-w-xs md:max-w-md"
                    />
                </div>
            </div>

            {/* Garis Pemisah */}
            <div className="my-12 border-t-4 border-gray-600 w-full max-w-md mx-auto"></div>

            {/* Section lanjutan: Deskripsi & List Pembelajaran */}
            <div className="mt-20 flex flex-col lg:flex-row gap-12">
                {/* Kiri: Paragraf panjang */}
                <div className="flex-1 space-y-6 leading-relaxed">
                    <h3 className="text-5xl font-bold text-rosegold leading-snug">
                        Transformasi {data.title2} Anda <br /> Dimulai Di Sini!
                    </h3>
                    <p className="text-xl">Karisma Academy menghadirkan Skillsatset: Fundamental {data.title2}, sebuah workshop intensif 1 sesi yang didesain sebagai <span className="italic">mini-bootcamp</span> nyata! Dirancang untuk Anda yang serius membangun karir di dunia digital, kami akan membimbing Anda praktik langsung, bahkan jika Anda belum punya pengalaman sekalipun.<br /> <br />Kami akan membedah rahasia {data.title2} dari nol. Dari pemahaman dasar hingga Anda siap merancang strategi dan menganalisis performa kampanye. Pendekatan <span className="font-bold">'learning by doing'</span> kami memastikan Anda tidak hanya paham, tapi juga punya <span className="italic">skill</span> dan <span className="italic">portfolio</span> yang nyata!</p>
                </div>

                {/* Kanan: List yang dibungkus box kuning */}
                <div className="flex-1 bg-ashh border border-rosegold rounded-lg p-5 max-w-md shadow-md">
                    <h3 className="text-3xl font-bold text-rosegold mb-4">
                        Kamu akan Mempelajari:
                    </h3>
                    <ul className="space-y-3 list-disc list-inside text-lg text-white leading-relaxed">
                        {data.skills.map((skills, idx) => (
                            <li key={idx}>{skills}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default FreeClassDetail;
