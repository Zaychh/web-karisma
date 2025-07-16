import Office from '../../assets/office.png';
import cardK from '../../assets/cardKuning.png';
import cardH from '../../assets/cardHijau.png';
import cardM from '../../assets/cardMerah.png';
export default function Section1() {
    return (
        <section className="bg-[#262626] text-white py-16 px-6 md:px-20 font-poppins">
            {/* Heading */}
            <h2 className="text-center font-bold text-xl md:text-3xl mb-12">
                Perjalanan Membangun Mimpi: Lebih dari Sekadar Skill, Kami Membentuk Pemimpin Digital Masa Depan.
            </h2>

            {/* Flex Layout: Gambar & Teks */}
            <div className="flex flex-col md:flex-row gap-10 items-center">

                {/* Gambar Kiri */}
                <div className="w-full md:w-1/2">
                    <img src={Office} alt="Kantor Karisma Academy" className="w-full rounded-lg" />
                </div>

                {/* Teks Kanan */}
                <div className="w-full md:w-1/2 text-left text-base md:text-lg leading-relaxed">
                    <p className="mb-4">
                        Di tengah gelombang perubahan digital yang tak henti, banyak yang <strong>merasa tersesat, dibayangi keraguan, dan hanya mengejar skill teknis</strong> tanpa bekal keberanian atau keyakinan. Padahal, era ini menuntut <br className="hidden md:block" /> lebih: pemimpin yang tak hanya cerdas teknologi, tapi juga berkarakter, berani, dan berkarisma, mampu menginspirasi perubahan nyata.
                    </p>
                    <p>
                        <strong>Karisma Academy</strong> hadir untuk menjawab panggilan ini. Kami percaya setiap individu yang bertekad kuat berhak mengembangkan potensi teknis dan kepemimpinan mereka. Ini bukan sekadar tentang skill, ini tentang menjadi pemimpin digital yang berkarakter dan berdampak.
                    </p>
                </div>
            </div>

            {/* Tiga Pilar */}
            <h3 className="text-center font-semibold text-xl md:text-5xl mt-20 mb-12">
                Tiga Pilar Utama Karisma Academy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {/* Pilar 1 */}
                <div
                    className="rounded-lg p-6 flex flex-col justify-between transition duration-300 hover:shadow-[0_0_30px_#F6C542] hover:scale-105"
                    style={{
                        backgroundImage: `url(${cardK})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '662px'
                    }}
                >
                    <div>
                        <h4 className="font-bold text-lg md:text-3xl mb-4 text-[#F6C542]">
                            Pemberdayaan Holistik: Lebih dari Sekedar Keterampilan Digital
                        </h4>
                        <p className="text-sm md:text-base mb-6 text-[#F6C542]">
                            Karisma Academy berkomitmen memberikan pemberdayaan holistik yang mencakup pengembangan keterampilan digital, soft skill, dan kepercayaan diri untuk menghadapi tantangan dunia kerja modern. Kami percaya bahwa setiap individu memiliki potensi untuk sukses dan berkontribusi dalam masyarakat digital.
                        </p>
                    </div>
                </div>

                {/* Pilar 2 */}
                <div className="rounded-lg p-6 flex flex-col justify-between transition duration-300 hover:shadow-[0_0_30px_#76C7C4] hover:scale-105"
                    style={{
                        backgroundImage: `url(${cardH})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '662px'
                    }}
                >
                    <div>
                        <h4 className="font-bold text-lg md:text-3xl mb-4">Pengalaman Belajar Inovatif dan Relevan Industri</h4>
                        <p className="text-sm md:text-base mb-6">
                            Kami menawarkan pengalaman belajar revolusioner melalui pembelajaran misi dan gamifikasi yang seru. Kurikulum kami mutakhir dan terintegrasi dengan kebutuhan industri digital serta tren teknologi. Ini memastikan pengetahuan dan keterampilan yang Anda peroleh relevan dan aplikatif di dunia kerja. Kami mengubah proses belajar menjadi petualangan menarik, di mana setiap tantangan adalah kesempatan untuk tumbuh.
                        </p>
                    </div>
                </div>

                {/* Pilar 3 */}
                <div className="rounded-lg p-6 flex flex-col justify-between transition duration-300 hover:shadow-[0_0_30px_#D74644] hover:scale-105"
                    style={{
                        backgroundImage: `url(${cardM})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '662px'
                    }}
                >
                    <div>
                        <h4 className="font-bold text-lg md:text-3xl mb-4">Jembatan Karier dan Komunitas Pembentuk Pemimpin</h4>
                        <p className="text-sm md:text-base mb-6">
                            Karisma Academy fokus pada hasil belajar. Kami membangun jembatan karier dengan industri melalui bimbingan portofolio dan proyek nyata. Anda akan menjadi bagian dari komunitas belajar yang inspiratif. Kami membentuk pemimpin digital yang kompeten dan berkarakter, sesuai dengan slogan kami: Grow with Skills.
                        </p>
                    </div>
                </div>
            </div>

            {/* Penutup */}
            <h3 className="text-center font-bold text-xl md:text-5xl mb-6">
                Masa Depan Dimulai di Sini
            </h3>
            <p className="text-center text-base md:text-xl leading-relaxed max-w-8xl mx-auto">
                Karisma Academy adalah lebih dari sekadar platform edutech, kami adalah katalisator perubahan, pembentuk pemimpin, dan <br className="hidden md:block" /> jembatan menuju masa depan yang cerah. Kami mengundang Anda, individu muda yang ambisius dan berorientasi masa <br className="hidden md:block" /> depan, untuk bergabung dalam perjalanan ini. Bersama Karisma Academy, Anda tidak hanya akan menguasai keterampilan <br className="hidden md:block" /> digital, tetapi juga akan menemukan dan mengembangkan karisma personal serta karakter kepemimpinan yang akan <br className="hidden md:block" /> membedakan Anda. Masa depan digital menanti, dan Karisma Academy siap membimbing Anda untuk memimpinnya.
            </p>
        </section>
    );
}