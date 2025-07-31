import { useParams, Link } from "react-router-dom";
import { blogPosts } from "./section2";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = blogPosts.find((c) => c.slug === slug);

  if (!data)
    return (
      <div className="text-center py-20 text-white">Blog tidak ditemukan</div>
    );

  const otherPosts = blogPosts.filter((post) => post.slug !== slug);

  return (
    <section className="bg-ashh text-white py-20 px-6 md:px-16 min-h-screen font-poppins">
      <div className="bg-white text-black max-w-5xl mx-auto p-8 md:p-14 rounded-2xl shadow-xl">
        {/* Header: Judul + Author Box */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-10 mb-6">
          <h1 className="text-2xl md:text-4xl font-bold leading-snug flex-1">
            {data.title}
          </h1>

          {/* Author Box */}
          <div className="bg-[#2B3990] text-white rounded-xl p-4 w-full md:w-64 text-sm md:text-lg shrink-0">
            <p className="font-bold text-base md:text-xl">Author:</p>
            <p>{data.author}</p>
            <p className="font-bold mt-2 text-base md:text-xl">Category:</p>
            <p>{data.category}</p>
            <p className="mt-2">{data.date}</p>
          </div>
        </div>

        {/* Konten pembuka */}
        <p className="text-base md:text-xl leading-relaxed mb-6">
          {data.content}
        </p>

        {/* Deskripsi panjang */}
        <div className="text-base md:text-xl leading-relaxed space-y-6 mb-10">
          {data.deskripsi}

          <div className="space-y-6">
            <p>
              Saatnya kamu menuju{" "}
              <span className="font-bold italic">#NextLevel</span> dan wujudkan
              karier impianmu! Dengan{" "}
              <span className="font-bold">
                kursus online dan program bootcamp di Karisma Academy
              </span>
              , kamu bisa belajar dari nol hingga jadi pro lewat proyek praktis
              dan bimbingan instruktur keren. Jangan tunggu lagi—
              <span className="font-bold">
                buruan konsultasi gratis dan manfaatkan promo spesial sekarang!
              </span>
            </p>

            <p>
              Bagi kamu yang masih ragu untuk memulai, ada{" "}
              <span className="font-bold">kelas pengantar gratis</span> yang
              bisa membantu mengeksplorasi minatmu. Mulailah dari langkah kecil
              dan konsisten.{" "}
              <span className="italic">
                It's the small things that matter most.
              </span>
            </p>

            {/* Tombol kategori (statis) */}
            <div className="inline-block bg-[#0C1947] text-white font-bold px-6 py-2 rounded-md">
              {data.category}
            </div>
          </div>
        </div>
      </div>

      {/* Blog lain */}
      <div className="max-w-5xl mx-auto mt-20">
        <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 border-b-2 border-white pb-2">
          Mungkin kamu juga suka topik berikut
        </h2>

        {otherPosts.map((post) => (
          <div
            key={post.slug}
            className="bg-[#F3F4F6] text-black w-full p-8 md:p-12 md:pb-16 rounded-2xl shadow-lg relative mb-10"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold text-center mb-6 leading-snug">
              {post.title}
            </h3>

            <p className="text-base md:text-xl text-left mb-28 leading-relaxed">
              {post.content}
            </p>

            {/* Author Box */}
            <div className="bg-[#2B3990] text-white rounded-xl p-4 w-full md:w-64 text-sm md:text-lg mt-6 md:mt-0 md:absolute md:bottom-10 md:right-10">
              <p className="font-bold text-base md:text-xl">Author:</p>
              <p>{post.author}</p>
              <p className="font-bold mt-2 text-base md:text-xl">Category:</p>
              <p>{post.category}</p>
              <p className="mt-2">{post.date}</p>
            </div>

            <Link
              to={`/blog/detail/${post.slug}`}
              className="text-[#2B3990] font-semibold mt-4 text-lg cursor-pointer"
            >
              Lihat Detail
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogDetail;
