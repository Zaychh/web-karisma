import Sertifikat from "../../assets/sertfikatkarisma.png"; 

export default function CompanyCertificateSection() {
  return (
    <section className="bg-onyx text-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-poppins mb-4">
            Telah Mendapat Sertifikat <br /> berpredikat A dari Kemendikbudristek
          </h2>
          <p className="text-sm sm:text-base font-poppins text-gray-300 leading-relaxed">
            Kami telah mencetak ribuan talenta digital siap kerja melalui kurikulum inovatif berbasis industri dan bimbingan mentor profesional,
            memastikan peserta menguasai keterampilan praktis sesuai dengan kebutuhan pasar.
            <br /><br />
            Sebagai lembaga kursus dan pelatihan resmi (NPSN K9989177) yang telah meraih akreditasi A dari Direktorat Pendidikan Vokasi,
            kami berkomitmen memberikan pendidikan berkualitas dalam lingkungan belajar kolaboratif untuk mendukung karier di dunia digital.
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src={Sertifikat}
            alt="Sertifikat Karisma Academy"
            className="max-w-full w-[500px] rounded shadow-lg"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
