import RoboB from '../../assets/roboB.png';

export default function Section1() {
    return (
        <section className="bg-[#1D1D1D] text-white font-poppins py-16 px-6 md:px-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center">
                {/* LEFT - Robot Image */}
                <div className="hidden md:block flex-1">
                    <img
                        src={RoboB}
                        alt="Robot Karisma"
                        className="w-full max-w-[500px] h-auto"
                    />
                </div>

                {/* RIGHT - Cards */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Card 1 */}
                    <div className="bg-white text-black rounded-xl p-6 md:w-[639px] md:h-[202px] shadow-md">
                        <h3 className="text-lg md:text-3xl font-bold mb-2">Masa Depan yang Kami Wujudkan</h3>
                        <p className="text-sm md:text-xl leading-relaxed">
                            Menjadi platform edutech terdepan yang membentuk 1 juta <br className="hidden md:block" /> talenta digital berkarakter, percaya diri, dan berkarisma, siap <br className="hidden md:block" /> memimpin perubahan dan inovasi di era digital.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white text-black rounded-xl p-6 md:w-[639px] md:h-[562px] shadow-md">
                        <h3 className="text-lg md:text-2xl font-bold mb-4">Langkah Nyata Kami Menuju Masa Depan</h3>
                        <p className="text-sm md:text-xl leading-relaxed mb-4">
                            Untuk mencapai visi dan mewujudkan tujuan kami, Karisma Academy berkomitmen pada langkah-langkah nyata ini:
                        </p>
                        <ul className="list-none text-sm md:text-lg space-y-3">
                            {[
                                "Menghadirkan pengalaman belajar teknologi digital yang inovatif, seru, dan terstruktur melalui platform berbasis gamifikasi untuk hasil optimal.",
                                "Mengembangkan kurikulum mutakhir yang adaptif dan terintegrasi penuh dengan kebutuhan industri digital serta tren teknologi masa depan.",
                                "Menanamkan karakter kepemimpinan digital, kepercayaan diri, growth mindset, dan karisma personal pada setiap peserta.",
                                "Membangun jembatan karier dengan ekosistem industri dan peluang kerja gemilang melalui bimbingan portofolio, proyek nyata, dan jaringan profesional.",
                                "Mendorong kolaborasi aktif untuk menciptakan inovasi digital yang berkelanjutan dan berdampak positif bagi masyarakat.",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:top-0"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}