import { Link } from "react-router-dom";
import MiselDesc from "./Miseldesc";
import RadenDesc from "./Radendesc";

export interface BlogPost {
  title: string;
  slug: string;
  content: string;
  deskripsi: React.ReactNode;
  author: string;
  category: string;
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Mulai dari Nol hingga Pro: Tips Praktis Upgrade Diri di Dunia digital",
    slug: "tips-upgrade-diri-digital",
    content: "Simak perjalanan karirku yang sukses mendapatkan kerjaan yang full time bahkan sebelum lulus wisuda dari kampus.",
    deskripsi: <MiselDesc />,
    author: "Misel Afraneta",
    category: "Upgrade Diri",
    date: "7 Juli 2025",
  },
  {
    title: "Menang di Era Digital: Caraku Raih Karier Impian Tanpa Menunggu Wisuda",
    slug: "karier-impian-tanpa-wisuda",
    content: "Lewat kombinasi belajar mandiri dan pengalaman proyek, saya berhasil mendapat tawaran kerja sebelum ikut wisuda. Cerita ini bakal kasih kamu insight nyata.",
    deskripsi: <RadenDesc />,
    author: "Raden Dimas Sam Pitak",
    category: "Upgrade Diri",
    date: "15 Agustus 2025",
  },
];

export default function Section2() {

  return (
    <section className="bg-abyssal text-black px-6 md:px-20 py-16 font-poppins">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Blog Cards */}
        <div className="flex-1 flex flex-col gap-12 items-center">
          {blogPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-[#F3F4F6] w-full max-w-5xl p-8 md:p-12 md:pb-16 rounded-2xl shadow-lg relative"
            >
              <h3 className="text-2xl md:text-4xl font-extrabold text-center mb-6 leading-snug">
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

          {/* Post Button - Visible on Mobile */}
          <div className="block md:hidden w-full pt-6">
            <Link to="/blog/create">
            <button
              className="bg-[#2B3990] hover:bg-[#1f2e77] transition-colors duration-300
              text-white w-full py-6 rounded-xl font-bold text-lg cursor-pointer">
              Post Your Blog
            </button>
            </Link>
          </div>
        </div>

        {/* Sticky Button - Visible on Desktop */}
        <div className="hidden md:block w-[240px] relative">
          <div className="sticky top-24">
            <div className="flex justify-center">
            <Link to={"/blog/create"}>
              <button
                className="bg-[#2B3990] hover:bg-[#1f2e77] transition-colors duration-300
               text-white px-14 py-8 rounded-xl font-bold text-lg whitespace-nowrap cursor-pointer"
              >
                Post Your Blog
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
