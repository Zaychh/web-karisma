import sapuTerbang from '../../assets/sapu-terbang.png';
import officeImage from '../../assets/office.png';
import Karakter from '../../assets/char.png';
const AboutPage: React.FC = () => {
    return (
        <div className='relative'>
            {/* Section 1 */}
            <section className="h-screen bg-[#1D1D1D] flex items-center justify-center text-white text-2xl">
                <div className="text-center max-w-6xl mt-[-140px]">
                    <p className="font-poppins font-semibold text-4xl">
                        Tempat yang Tepat untuk Kamu Belajar dengan
                    </p>
                    <p className="font-poppins font-bold text-4xl mt-2">
                        Mudah, Nyaman, dan Terjangkau
                    </p>
                    <p className="font-poppins font-semibold text-3xl mt-10 leading-relaxed">
                        Karisma Academy merupakan sebuah lembaga yang hadir untuk optimalkan skill digital kamu dengan materi yang telah disusun dengan seksama bersama para profesional di bidangnya. Hingga kini, kami memiliki ribuan murid yang tersebar di Seluruh Indonesia.
                    </p>
                </div>
                <img
                    src={sapuTerbang}
                    alt="Sapu Terbang"
                    className="absolute top-15 right-25 w-50" // adjust 'top' dan 'right' sesuai kebutuhan
                />
            </section>

            <div className="absolute left-1/2 transform -translate-x-1/2 top-[100vh] -translate-y-1/2 z-10">
                <div className="bg-[#C6A758] rounded-tl-[40px] rounded-br-[40px] px-24 py-6 text-black text-4xl font-poppins font-bold shadow-lg">
                    Seputar Karisma Academy
                </div>
            </div>

            {/* Section 2 */}
            <section className="h-auto bg-[#262626] flex flex-col items-center justify-center text-white px-20 py-16">
                <div className="flex flex-col lg:flex-row items-start justify-start max-w-6xl gap-10 pt-10">
                    <div className="max-w-2xl">
                        <p className="font-poppins font-semibold text-2xl leading-relaxed">
                            Karisma Academy merupakan Lembaga Kursus & Pelatihan berstandar Industri dibawah bendera PT. Karisma Garuda Mulia berdiri sejak Tahun 2005, Terdaftar Resmi sebagai Lembaga Kursus & Pelatihan dengan NPSN K9989817, memiliki Akreditasi A dalam Hasil Penilaian Kinerja Lembaga Kursus & Pelatihan Berbasis Dunia Kerja Tahun 2022 oleh Direktorat Jenderal Pendidikan Vokasi, Direktorat Kursus dan Pelatihan, dan terdaftar Resmi dengan Legalitas Perusahaan SK MENKUM & HAM RI: AHU-0038501.AH.01.01. TAHUN 2020.
                        </p>
                    </div>
                    <img
                        src={officeImage}
                        alt="Kantor Karisma Academy"
                        className="w-[600px] h-auto rounded-lg shadow-lg"
                    />
                </div>

                <div className="mt-10 w-full flex justify-center">
                    <p className="text-white text-3xl font-poppins font-bold whitespace-nowrap">
                        ⭐⭐⭐ Sudah Terpercaya dan Meraih Beberapa Penghargaan ⭐⭐⭐
                    </p>
                </div>
            </section>

            {/* Section 3 */}
            <section className="bg-[#1D1D1D] min-h-screen flex items-center justify-center px-10 py-20">
                <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16">

                    {/* Gambar Karakter */}
                    <div className="flex-shrink-0">
                        <img
                            src={Karakter}
                            alt="Karakter Karisma Academy"
                            className="w-[450px] h-auto"
                        />
                    </div>

                    {/* Kotak Visi & Misi */}
                    <div className="flex flex-col gap-6 text-white w-full max-w-2xl">

                        {/* Visi */}
                        <div className="bg-[#4D4F50] rounded-[30px] px-8 py-6 shadow-md">
                            <h3 className="font-poppins font-bold text-3xl mb-2">Visi Karisma Academy</h3>
                            <p className="text-xl leading-relaxed font-poppins font-semibold">
                                Memberikan layanan pendidikan dan pelatihan secara profesional untuk mencetak SDM Ahli yang memiliki Skill kompeten & paripurna yang secara nyata untuk siap terjun sesuai dengan standar yang dibutuhkan di dunia kerja, dunia industri, maupun dunia wirausaha.
                            </p>
                        </div>

                        {/* Misi */}
                        <div className="bg-[#4D4F50] rounded-[30px] px-8 py-6 shadow-md">
                            <h3 className="font-poppins font-bold text-3xl mb-2">Misi Karisma Academy</h3>
                            <ul className="list-disc list-inside space-y-2 text-xl leading-relaxed font-poppins font-semibold">
                                <li>Menerapkan strategi Pembelajaran dan kurikulum Project Based Learning kepada setiap peserta didik.</li>
                                <li>Bekerjasama dengan Komunitas UMKM hadir dengan pelatihan yang sesuai dengan kebutuhan pasar ekonomi.</li>
                                <li>Mendirikan Teaching Factory untuk mendorong terwujudnya link & match dengan dunia usaha dan dunia industri.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
