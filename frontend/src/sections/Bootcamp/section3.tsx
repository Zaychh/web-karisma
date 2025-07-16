import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

import graph from "../../assets/graphdes.png";
import back from "../../assets/backend.png";
import full from "../../assets/fullstack.png";
import mock from "../../assets/Mock.png";
import ml from "../../assets/Datascience.png";
import mobile from "../../assets/MobDev.png";
import cyber from "../../assets/CybSec.png";
import game from "../../assets/UnityGameDev.png";

import { FullstackDesc } from "./Fullstackdesc";
import { GraphicDesignDesc } from "./GraphicDesignDesc";
import { GolangDesc } from "./GolangDesc";
import { UIDesignDesc } from "./UIDesignDesc";
import { DataScienceDesc } from "./DataScienceDesc";
import { MobileDevDesc } from "./MobileDevDesc";
import { CybersecurityDesc } from "./CybersecurityDesc";
import { CloudEngineerDesc } from "./CloudEngineerDesc";
import { GameDevDesc } from "./GameDevDesc";

import kuning from "../../assets/Foto1.png";
import biru from "../../assets/Foto3.png";
import ungu from "../../assets/Foto6.png";
import merah from "../../assets/Foto7.png";
import hijau from "../../assets/hijau.png";

import JobstreetLogo from "../../assets/jobstreet.png";
import IndeedLogo from "../../assets/indeed.png";
import GlassdoorLogo from "../../assets/glassdoor.png";
import GlintsLogo from "../../assets/glints.png";
import KalibrLogo from "../../assets/kalibr.png";

// CourseCard Component
const CourseCard = ({ course }: { course: Course }) => (
  <motion.div
    key={course.id}
    className="bg-[#1D1D1D] rounded-2xl w-[90vw] sm:w-[320px] flex-shrink-0 overflow-hidden border border-gray-600 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.5, ease: "easeIn" }}
  >
    <img
      src={course.image}
      alt={course.title}
      className="w-full h-[180px] object-cover"
    />
    <div className="p-5 flex flex-col h-[460px]">
      <div className="flex justify-between items-center mb-2">
        <span className="bg-green-500 text-sm px-3 py-1 rounded-full font-semibold text-black">
          Bootcamp Program
        </span>
        <span className="text-sm text-gray-400">{course.duration}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-3">{course.title}</h3>
      <ul className="space-y-2 text-sm text-gray-300 mb-4 overflow-auto">
        {course.skills.map((s, i) => (
          <li key={i} className="flex items-start gap-2">
            <div className="mt-1 w-2 h-2 bg-green-400 rounded-full" />
            <span>{s}</span>
          </li>
        ))}
      </ul>
      <Link to={`/bootcamp/${course.slug}`} className="mt-auto">
        <button className="py-2 w-full rounded-lg border border-gray-500 hover:border-bluberi hover:bg-bluberi hover:text-putih transition-all font-semibold cursor-pointer">
          Lebih Lanjut
        </button>
      </Link>
    </div>
  </motion.div>
);

// HeroSec Component
const HeroSec = () => {
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pageSize = isMobile ? 1 : 3;
  const totalPages = Math.ceil(courses.length / pageSize);

  const handleNext = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (p: number) => {
    setPage(p);
  };

  const currentCourses = courses.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <section className="bg-ashh text-white py-20 px-6 md:px-16">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Choose Your Path, Build Your Career
        </h2>
        <p className="text-gray-300 text-base md:text-lg">
          Mulai perjalanan karirmu dengan minat dan tujuan karirmu, belajar keterampilan digital yang relevan,
          dan dapatkan bimbingan dari mentor berpengalaman untuk sukses di industri.
        </p>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Cards + Navigation */}
        <div className="flex items-center gap-4">
          <button onClick={handlePrev} className="p-2 text-gray-300 hover:text-white cursor-pointer">
            <ChevronLeft size={28} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className="flex gap-6 justify-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              {currentCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          </AnimatePresence>

          <button onClick={handleNext} className="p-2 text-gray-300 hover:text-white cursor-pointer">
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {isMobile ? (
            <>
              <button
                onClick={handlePrev}
                className="text-lg px-2 py-1 text-gray-300 hover:text-white"
              >
                &lt;
              </button>
              <span className="text-lg font-semibold text-white">{page + 1}</span>
              <button
                onClick={handleNext}
                className="text-lg px-2 py-1 text-gray-300 hover:text-white"
              >
                &gt;
              </button>
            </>
          ) : (
            [...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-3 h-3 rounded-full ${page === i ? "bg-bluberi" : "bg-kertas"
                  }`}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSec;

// Course Interface & Data
export interface Course {
  id: number;
  slug: string;
  title: string;
  title2: string;
  desc1: string;
  desc2: React.ReactNode;
  topics: string[];
  duration: string;
  image: string;
  skills: string[];
  facts: {
    text: string;
    image: string;
  }[];
  careerTitle?: string;
  jobs: {
    company: string;
    logo: string;
    position: string;
    type: string;
    salary: string;
    link: string;
  }[];
  pricing: {
    name: string;
    price: number;
    originalPrice?: number;
    benefits?: string[];
  }[];
}

const commonBenefits = [
  "Live Online Class intensif dan seru",
  "Lifetime Access Materi (Modul Belajar, Video Pembelajaran)",
  "Actual Case Study & Portofolio Development",
  "Sesi English & Mental Health bareng profesional",
  "Freelance/Part Time Project untuk alumni",
];

const getAJobExtra = [
  ...commonBenefits,
  "Job-ready Asset & Career Mentoring terarah",
  "Program Job Preparation & Connector +3 Bulan",
  "Magang/Apprenticeship real project",
  "Konsultasi Karir 1-on-1 fleksibel, kapan saja",
  "Garansi Karir: Refund sampai 110% jika belum bekerja > 1 tahun",
];

export const courses: Course[] = [
  {
    id: 1,
    slug: "graphic-design-branding",
    title: "Bootcamp Graphic Design & Branding",
    title2: "Graphic Design & Branding",
    careerTitle: "Desainer Grafis",
    desc1: "Apakah kamu tertarik menjadi graphic designer profesional tapi bingung harus mulai dari mana? Sudah belajar otodidak tapi desainmu masih terasa kurang rapi dan tidak konsisten? Belum punya portofolio yang kuat untuk melamar kerja atau freelance? Atau mungkin belum memahami cara membangun identitas brand yang kuat dan efektif di mata audiens?",
    desc2: <GraphicDesignDesc />,
    topics: [
      "Prinsip dasar desain grafis dan teori warna untuk komunikasi visual efektif",
      "Penggunaan tools desain profesional seperti Adobe Photoshop & Illustrator",
      "Tipografi, layouting, dan komposisi desain untuk berbagai media",
      "Pembuatan aset visual untuk media sosial, poster, dan kebutuhan digital",
      "Konsep branding: logo, identitas visual, dan guideline brand",
      "Penyusunan portofolio desain dan presentasi karya kepada klien",
    ],
    duration: "3 atau 6 bulan",
    image: graph,
    skills: [
      "Prinsip desain grafis dan elemen visual yang kuat",
      "Logo, ikon, ilustrasi, dan brand identity",
      "Presentasi visual (poster, sosial media, iklan)",
    ],
    facts: [
      {
        text: "Permintaan Desainer Grafis Terus Meningkat",
        image: kuning,
      },
      {
        text: "Fleksibilitas Kerja: Freelance hingga Agency",
        image: biru,
      },
      {
        text: "Skill yang Dibutuhkan Berbagai Industri",
        image: ungu,
      },
      {
        text: "Bisa Berkarier di Branding, UI, Editorial, dll",
        image: hijau,
      },
      {
        text: "Potensi Penghasilan dari Proyek Global",
        image: merah,
      },
    ],
    jobs: [
      {
        company: "JobStreet",
        logo: JobstreetLogo,
        position: "Graphic Designer",
        type: "Full Time",
        salary: "3 - 6 Jt/ Bulan",
        link: "https://id.jobstreet.com/career-advice/role/graphic-designer/salary",
      },
      {
        company: "Indeed",
        logo: IndeedLogo,
        position: "Graphic Designer",
        type: "Full Time",
        salary: "3 - 6 Jt/ Bulan",
        link: "https://id.indeed.com/jobs?q=graphic+designer&l=indonesia",
      },
      {
        company: "Glassdoor",
        logo: GlassdoorLogo,
        position: "Graphic Designer",
        type: "Full Time",
        salary: "3 - 6 Jt/ Bulan",
        link: "https://www.glassdoor.com/Salaries/indonesia-graphic-designer-salary-SRCH_IL.0,9_IN113_KO10,27.htm",
      },
      {
        company: "Glints",
        logo: GlintsLogo,
        position: "Graphic Designer",
        type: "Full Time",
        salary: "3 - 6 Jt/ Bulan",
        link: "https://glints.com/id/opportunities/jobs/explore?keyword=graphic+designer&country=ID",
      },
      {
        company: "Kalibrr",
        logo: KalibrLogo,
        position: "Graphic Designer",
        type: "Full Time",
        salary: "3 - 6 Jt/ Bulan",
        link: "https://www.kalibrr.id/id-ID/job-board/te/graphic-designer",
      },
    ],
    pricing: [
      {
        name: "Scale Up",
        price: 3000000,
        originalPrice: 3580000,
        benefits: commonBenefits,
      },
      {
        name: "Get A Job",
        price: 4271040,
        originalPrice: 5338800,
        benefits: getAJobExtra,
      },
    ],

  },
  {
    id: 2,
    slug: "fullstack-web-development",
    title: "Bootcamp Full-Stack Web Development",
    title2: "Full-Stack Web Developer",
    careerTitle: "Web Programming",
    desc1: "Apakah kamu ingin menjadi developer tapi bingung harus mulai belajar dari mana? Sudah mencoba belajar mandiri tapi materi terasa tidak terstruktur? Tidak memiliki portofolio yang cukup untuk melamar kerja? Belum percaya diri dengan skill coding yang dimiliki? Bingung teknologi apa saja yang benar-benar dibutuhkan di industri saat ini?",
    desc2: <FullstackDesc />,
    topics: [
      "Fundamental HTML, CSS, dan JavaScript untuk membangun antarmuka web",
      "Pembuatan tampilan website modern dan responsive dengan Tailwind CSS",
      "Pengembangan komponen UI interaktif menggunakan React.js",
      "Pembuatan RESTful API menggunakan Express.js dan Node.js",
      "Pengelolaan data dengan MongoDB dan integrasi ke backend",
      "Autentikasi user, middleware, dan deployment ke server produksi (Vercel/Render)",
    ],
    duration: "3 atau 6 bulan",
    image: full,
    skills: [
      "Dasar-dasar pemrograman (HTML, CSS, JavaScript)",
      "Pengembangan web (front-end dan back-end)",
      "Pengenalan frameworks seperti React, Node.js, atau Django",
      "Peluang Karir Cerah (Web Developer, Mobile App Developer, Full-Stack Developer)",
    ],
    facts: [
      {
        text: "Permintaan Fullstack Developer Tinggi",
        image: kuning,
      },
      {
        text: "Fleksibel: Bisa Frontend & Backend",
        image: biru,
      },
      {
        text: "Bisa Bekerja di Banyak Jenis Industri",
        image: ungu,
      },
      {
        text: "Jenjang Karier Luas: DevOps, CTO, dll",
        image: hijau,
      },
      {
        text: "Gaji Kompetitif di Pasar Global",
        image: merah,
      },
    ],
    jobs: [
      {
        company: "JobStreet",
        logo: JobstreetLogo,
        position: "Web Developer",
        type: "Full Time",
        salary: "4 - 8 Jt/ Bulan",
        link: "https://id.jobstreet.com/career-advice/role/web-developer/salary",
      },
      {
        company: "Indeed",
        logo: IndeedLogo,
        position: "Web Developer",
        type: "Full Time",
        salary: "4 - 8 Jt/ Bulan",
        link: "https://id.indeed.com/jobs?q=web+developer&l=indonesia&from=searchOnHP%2Cwhatautocomplete&vjk=4c35fac130250b82",
      },
      {
        company: "Glassdoor",
        logo: GlassdoorLogo,
        position: "Web Developer",
        type: "Full Time",
        salary: "4 - 8 Jt/ Bulan",
        link: "https://www.glassdoor.com/Salaries/indonesia-web-developer-salary-SRCH_IL.0,9_IN113_KO10,23.htm",
      },
      {
        company: "Glints",
        logo: GlintsLogo,
        position: "Web Developer",
        type: "Full Time",
        salary: "4 - 8 Jt/ Bulan",
        link: "https://glints.com/id/opportunities/jobs/explore?keyword=web+developer&country=ID&locationName=All+Cities%2FProvinces",
      },
      {
        company: "Kalibrr",
        logo: KalibrLogo,
        position: "Web Developer",
        type: "Full Time",
        salary: "4 - 8 Jt/ Bulan",
        link: "https://www.kalibrr.id/id-ID/home/te/web-developer",
      }
    ],
    pricing: [
      {
        name: "Scale Up",
        price: 3000000,
        benefits: commonBenefits,
      },
      {
        name: "Get A Job",
        price: 4271040,
        originalPrice: 5338800,
        benefits: getAJobExtra,
      },
    ],
  },
  {
    id: 3,
    slug: "back-end-development-golang",
    title: "Bootcamp Back-End Development: Golang",
    title2: "Back-End Developer: Golang",
    careerTitle: "Golang Developer",
    desc1: "Ingin menjadi back-end developer tapi bingung mulai dari mana? Sudah coba belajar sendiri tapi sulit memahami konsep server dan database? Belum punya pengalaman membangun API yang scalable dan aman? Atau masih ragu karena belum tahu teknologi apa yang paling dibutuhkan industri saat ini?",
    desc2: <GolangDesc />,
    topics: [
      "Pengenalan bahasa Go dan struktur dasar pemrograman Golang",
      "Penerapan konsep OOP, concurrency, dan error handling di Go",
      "Membangun RESTful API menggunakan Go dan framework populer (Echo/Gin)",
      "Integrasi database dengan ORM (GORM) dan manajemen query kompleks",
      "Autentikasi, otorisasi, dan keamanan aplikasi backend",
      "Deploy aplikasi backend ke server (VPS/Cloud) dan praktik CI/CD",
    ],
    duration: "3 atau 6 bulan",
    image: back,
    skills: [
      "Konsep inti DevOps & Jaringan Esensial",
      "Penguasaan Dasar Linux & Scripting Awal",
      "Revolusi Aplikasi dengan Kontainerisasi Docker",
      "Observabilitas Sistem & Wawasan Cloud Computing",
    ],
    facts: [
      {
        text: "Back-End Developer Sangat Dicari Industri",
        image: kuning,
      },
      {
        text: "Golang Dipakai di Startup & Tech Company Besar",
        image: biru,
      },
      {
        text: "Fokus Bangun API dan Sistem Skala Besar",
        image: ungu,
      },
      {
        text: "Karier Luas: Backend Engineer, DevOps, SRE",
        image: hijau,
      },
      {
        text: "Gaji Tinggi & Stabil di Pasar Teknologi",
        image: merah,
      },
    ],
    jobs: [
      {
        company: "JobStreet",
        logo: JobstreetLogo,
        position: "Back-End Dev (Golang)",
        type: "Full Time",
        salary: "5 - 10 Jt/ Bulan",
        link: "https://id.jobstreet.com/jobs?key=golang+developer&location=Indonesia",
      },
      {
        company: "Indeed",
        logo: IndeedLogo,
        position: "Back-End Dev (Golang)",
        type: "Full Time",
        salary: "5 - 10 Jt/ Bulan",
        link: "https://id.indeed.com/jobs?q=golang+developer&l=indonesia",
      },
      {
        company: "Glassdoor",
        logo: GlassdoorLogo,
        position: "Back-End Dev (Golang)",
        type: "Full Time",
        salary: "5 - 10 Jt/ Bulan",
        link: "https://www.glassdoor.com/Job/indonesia-golang-developer-jobs-SRCH_IL.0,9_IN113_KO10,27.htm",
      },
      {
        company: "Glints",
        logo: GlintsLogo,
        position: "Back-End Dev (Golang)",
        type: "Full Time",
        salary: "5 - 10 Jt/ Bulan",
        link: "https://glints.com/id/opportunities/jobs/explore?keyword=golang&country=ID",
      },
      {
        company: "Kalibrr",
        logo: KalibrLogo,
        position: "Back-End Dev (Golang)",
        type: "Full Time",
        salary: "5 - 10 Jt/ Bulan",
        link: "https://www.kalibrr.id/id-ID/job-board/te/golang-developer",
      },
    ],
    pricing: [
      {
        name: "Scale Up",
        price: 3000000,
        originalPrice: 3500000,
        benefits: commonBenefits,
      },
      {
        name: "Get A Job",
        price: 4250000,
        originalPrice: 5000000,
        benefits: getAJobExtra,
      },
    ],
  },
  {
    id: 4,
    slug: "ui-ux-product-design",
    title: "Bootcamp UI/UX & Product Design",
    title2: "UI/UX & Product Design",
    careerTitle: "UI/UX Designer",
    desc1: "Tertarik di dunia desain tapi bingung membedakan antara UI dan UX? Sering bingung bagaimana membuat desain yang tidak hanya indah tapi juga fungsional? Belum pernah riset pengguna atau membuat prototipe yang efektif? Ingin punya portofolio desain profesional untuk melamar kerja di bidang digital product?",
    desc2: <UIDesignDesc />,
    topics: [
      "Dasar-dasar UI/UX dan perbedaan antara desain antarmuka & pengalaman pengguna",
      "User Research: membuat persona, user journey, dan kebutuhan pengguna",
      "Wireframing dan prototyping dengan tools seperti Figma",
      "Penerapan prinsip desain visual: layout, warna, tipografi, dan hierarki visual",
      "Membuat desain produk digital yang efektif & estetis berbasis mobile/web",
      "Kolaborasi desain ke pengembangan: design handoff, responsive design, dan testing",
    ],
    duration: "3 atau 6 bulan",
    image: mock,
    skills: [
      "Dasar UI/UX & Design Thinking",
      "Research dan User Persona",
      "Wireframing & Prototyping",
      "Handoff ke Developer",
    ],
    facts: [
      {
        text: "Permintaan UI/UX Designer Terus Meningkat",
        image: kuning,
      },
      {
        text: "Desainer Berperan Penting di Setiap Produk",
        image: biru,
      },
      {
        text: "Skill Bisa Dipakai di Berbagai Industri",
        image: ungu,
      },
      {
        text: "Karier Luas: UI Designer, UX Researcher, Product Designer",
        image: hijau,
      },
      {
        text: "Fleksibel: Bisa Freelance atau Remote",
        image: merah,
      },
    ],
    jobs: [
      {
        company: "JobStreet",
        logo: JobstreetLogo,
        position: "UI/UX Designer",
        type: "Full Time",
        salary: "5 - 9 Jt/ Bulan",
        link: "https://id.jobstreet.com/jobs?key=ui%2Fux+designer&location=Indonesia",
      },
      {
        company: "Indeed",
        logo: IndeedLogo,
        position: "UI/UX Designer",
        type: "Full Time",
        salary: "5 - 9 Jt/ Bulan",
        link: "https://id.indeed.com/jobs?q=ui+ux+designer&l=indonesia",
      },
      {
        company: "Glassdoor",
        logo: GlassdoorLogo,
        position: "UI/UX Designer",
        type: "Full Time",
        salary: "5 - 9 Jt/ Bulan",
        link: "https://www.glassdoor.com/Job/indonesia-ui-ux-designer-jobs-SRCH_IL.0,9_IN113_KO10,25.htm",
      },
      {
        company: "Glints",
        logo: GlintsLogo,
        position: "UI/UX Designer",
        type: "Full Time",
        salary: "5 - 9 Jt/ Bulan",
        link: "https://glints.com/id/opportunities/jobs/explore?keyword=ui%2Fux%20designer&country=ID",
      },
      {
        company: "Kalibrr",
        logo: KalibrLogo,
        position: "UI/UX Designer",
        type: "Full Time",
        salary: "5 - 9 Jt/ Bulan",
        link: "https://www.kalibrr.id/id-ID/job-board/te/ui-ux-designer",
      },
    ],
    pricing: [
      {
        name: "Scale Up",
        price: 3000000,
        benefits: commonBenefits,
      },
      {
        name: "Get A Job",
        price: 4271040,
        originalPrice: 5338800,
        benefits: getAJobExtra,
      },
    ],

  },
  {
    id: 5,
    slug: "data-science-machine-learning",
    title: "Bootcamp Data Science & Machine Learning",
    title2: "Data Science & Machine Learning",
    careerTitle: "Data Scientist",
    desc1: "Pernah dengar istilah data science tapi bingung harus mulai dari mana? Punya data tapi tidak tahu bagaimana mengolah dan menganalisisnya? Bingung membedakan antara machine learning dan AI? Belum punya portofolio project yang bisa menunjukkan kemampuan analisis datamu?",
    duration: "3 atau 6 bulan",
    desc2: <DataScienceDesc />,
    topics: [
      "Pengantar Data Science, alur kerja analisis data, dan tools yang digunakan",
      "Pengolahan data dengan Python: NumPy, Pandas, dan visualisasi data (Matplotlib, Seaborn)",
      "Statistika dasar dan inferensial untuk analisis data",
      "Penerapan Machine Learning dengan Scikit-learn: supervised & unsupervised learning",
      "Proyek prediksi & klasifikasi dengan algoritma ML (Regression, Decision Tree, dsb)",
      "Pengenalan ke Deep Learning dan model neural network dengan TensorFlow/Keras",
    ],
    image: ml,
    skills: [
      "Python for Data Science",
      "Exploratory Data Analysis",
      "Machine Learning dasar",
      "Deploy model ke production",
    ],
    facts: [
      {
        text: "Data Scientist Sangat Dicari di Era Digital",
        image: kuning,
      },
      {
        text: "Skill Bisa Dipakai di Banyak Sektor Industri",
        image: biru,
      },
      {
        text: "Gaji Kompetitif dan Peluang Karier Global",
        image: ungu,
      },
      {
        text: "Kuasai Tools Populer: Python, SQL, TensorFlow",
        image: hijau,
      },
      {
        text: "Kontribusi Nyata dalam Pengambilan Keputusan",
        image: merah,
      },
    ],
    jobs: [
      {
        company: "JobStreet",
        logo: JobstreetLogo,
        position: "Data Scientist",
        type: "Full Time",
        salary: "6 - 12 Jt/ Bulan",
        link: "https://id.jobstreet.com/jobs?key=data+scientist&location=Indonesia",
      },
      {
        company: "Indeed",
        logo: IndeedLogo,
        position: "Data Scientist",
        type: "Full Time",
        salary: "6 - 12 Jt/ Bulan",
        link: "https://id.indeed.com/jobs?q=data+scientist&l=indonesia",
      },
      {
        company: "Glassdoor",
        logo: GlassdoorLogo,
        position: "Data Scientist",
        type: "Full Time",
        salary: "6 - 12 Jt/ Bulan",
        link: "https://www.glassdoor.com/Job/indonesia-data-scientist-jobs-SRCH_IL.0,9_IN113_KO10,25.htm",
      },
      {
        company: "Glints",
        logo: GlintsLogo,
        position: "Data Scientist",
        type: "Full Time",
        salary: "6 - 12 Jt/ Bulan",
        link: "https://glints.com/id/opportunities/jobs/explore?keyword=data+scientist&country=ID",
      },
      {
        company: "Kalibrr",
        logo: KalibrLogo,
        position: "Data Scientist",
        type: "Full Time",
        salary: "6 - 12 Jt/ Bulan",
        link: "https://www.kalibrr.id/id-ID/job-board/te/data-scientist",
      },
    ],
    pricing: [
      {
        name: "Scale Up",
        price: 3500000,
        benefits: commonBenefits,
      },
      {
        name: "Get A Job",
        price: 4980000,
        originalPrice: 6225000,
        benefits: getAJobExtra,
      },
    ],
  },
  {
    id: 6,
    slug: "mobile-development-flutter",
    title: "Bootcamp Mobile Development (Flutter)",
    title2: "Mobile Developer (Flutter)",
    careerTitle: "Mobile Developer (Flutter)",
    desc1: "Pengen bikin aplikasi mobile tapi bingung harus pakai teknologi apa? Sudah coba belajar Flutter tapi kesulitan membangun project dari nol? Belum punya portofolio aplikasi yang bisa ditunjukkan ke recruiter? Bingung gimana cara publish aplikasi ke Play Store atau App Store?",
    desc2: <MobileDevDesc />,
    topics: [
      "Pengantar pengembangan aplikasi mobile menggunakan Flutter & Dart",
      "Dasar-dasar bahasa Dart: syntax, struktur kontrol, dan OOP",
      "Membangun UI interaktif & responsif dengan Flutter Widgets",
      "State Management (Provider / Riverpod) dalam aplikasi Flutter",
      "Koneksi API & pengelolaan data lokal dengan SQLite / Hive",
      "Deploy aplikasi ke Android & iOS serta praktik terbaik dalam pengembangan mobile",
    ],
    duration: "3 atau 6 bulan",
    image: mobile,
    skills: [
      "Fundamental Flutter & Dart",
      "Membangun aplikasi mobile multi-platform",
      "State Management & UI Performance",
      "Integrasi API & Firebase",
    ],
    facts: [
      {
        text: "Flutter Digunakan oleh Perusahaan Global",
        image: kuning,
      },
      {
        text: "Satu Codebase untuk Android & iOS",
        image: biru,
      },
      {
        text: "Mobile Developer Banyak Dicari di Industri",
        image: ungu,
      },
      {
        text: "Karier Luas: Flutter Dev, App Engineer, Mobile Lead",
        image: hijau,
      },
      {
        text: "Potensi Gaji Tinggi & Bisa Remote Working",
        image: merah,
      },
    ],
    jobs: [
      {
        company: "JobStreet",
        logo: JobstreetLogo,
        position: "Flutter Developer",
        type: "Full Time",
        salary: "6 - 10 Jt/ Bulan",
        link: "https://id.jobstreet.com/jobs?key=flutter+developer&location=Indonesia",
      },
      {
        company: "Indeed",
        logo: IndeedLogo,
        position: "Flutter Developer",
        type: "Full Time",
        salary: "6 - 10 Jt/ Bulan",
        link: "https://id.indeed.com/jobs?q=flutter+developer&l=Indonesia",
      },
      {
        company: "Glassdoor",
        logo: GlassdoorLogo,
        position: "Flutter Developer",
        type: "Full Time",
        salary: "6 - 10 Jt/ Bulan",
        link: "https://www.glassdoor.com/Job/indonesia-flutter-developer-jobs-SRCH_IL.0,9_IN113_KO10,27.htm",
      },
      {
        company: "Glints",
        logo: GlintsLogo,
        position: "Flutter Developer",
        type: "Full Time",
        salary: "6 - 10 Jt/ Bulan",
        link: "https://glints.com/id/opportunities/jobs/explore?keyword=flutter+developer&country=ID",
      },
      {
        company: "Kalibrr",
        logo: KalibrLogo,
        position: "Flutter Developer",
        type: "Full Time",
        salary: "6 - 10 Jt/ Bulan",
        link: "https://www.kalibrr.id/id-ID/job-board/te/flutter-developer",
      },
    ],
    pricing: [
      {
        name: "Scale Up",
        price: 3200000,
        originalPrice: 4000000,
        benefits: commonBenefits,
      },
      {
        name: "Get A Job",
        price: 4968000,
        originalPrice: 6210000,
        benefits: getAJobExtra,
      },
    ],
  },
  {
    id: 7,
    slug: "cybersecurity-fundamentals",
    title: "Bootcamp Cybersecurity Fundamentals",
    title2: "Cybersecurity",
    careerTitle: "Cybersecurity",
    desc1: "Penasaran gimana cara kerja sistem keamanan digital? Belum paham cara melindungi data pribadi dan jaringan dari ancaman siber? Bingung mulai dari mana buat bangun karier di dunia cybersecurity? Ingin belajar ethical hacking tapi takut nggak punya background IT?",
    desc2: <CybersecurityDesc />,
    topics: [
      "Pengenalan dunia Cybersecurity & ancaman siber modern",
      "Konsep dasar keamanan informasi, CIA Triad, dan model pertahanan",
      "Jenis serangan: Malware, Phishing, Brute Force, hingga Social Engineering",
      "Dasar-dasar jaringan & protokol (TCP/IP, DNS, HTTP/HTTPS)",
      "Pengamanan sistem: Firewall, Antivirus, dan teknik hardening",
      "Simulasi ethical hacking & penetration testing dengan tools dasar (Kali Linux, Wireshark)",
    ],
    duration: "3 atau 6 bulan",
    image: cyber,
    skills: [
      "Network Security & Firewall",
      "Ethical Hacking Basics",
      "Security Auditing Tools",
      "Incident Response & Risk Management",
    ],
    facts: [
      {
        text: "Ancaman Siber Terus Meningkat Setiap Tahun",
        image: kuning,
      },
      {
        text: "Perusahaan Butuh Profesional Keamanan Digital",
        image: biru,
      },
      {
        text: "Skill Diperlukan di Berbagai Industri & Sektor",
        image: ungu,
      },
      {
        text: "Karier Luas: Security Analyst, Pentester, SOC Engineer",
        image: hijau,
      },
      {
        text: "Potensi Gaji Tinggi & Stabil di Industri Teknologi",
        image: merah,
      },
    ],
    jobs: [
      {
        company: "JobStreet",
        logo: JobstreetLogo,
        position: "Cybersecurity Analyst",
        type: "Full Time",
        salary: "7 - 12 Jt/ Bulan",
        link: "https://id.jobstreet.com/jobs?key=cybersecurity+analyst&location=Indonesia",
      },
      {
        company: "Indeed",
        logo: IndeedLogo,
        position: "Cybersecurity Analyst",
        type: "Full Time",
        salary: "7 - 12 Jt/ Bulan",
        link: "https://id.indeed.com/jobs?q=cybersecurity+analyst&l=Indonesia",
      },
      {
        company: "Glassdoor",
        logo: GlassdoorLogo,
        position: "Cybersecurity Analyst",
        type: "Full Time",
        salary: "7 - 12 Jt/ Bulan",
        link: "https://www.glassdoor.com/Job/indonesia-cybersecurity-analyst-jobs-SRCH_IL.0,9_IN113_KO10,33.htm",
      },
      {
        company: "Glints",
        logo: GlintsLogo,
        position: "Cybersecurity Analyst",
        type: "Full Time",
        salary: "7 - 12 Jt/ Bulan",
        link: "https://glints.com/id/opportunities/jobs/explore?keyword=cybersecurity+analyst&country=ID",
      },
      {
        company: "Kalibrr",
        logo: KalibrLogo,
        position: "Cybersecurity Analyst",
        type: "Full Time",
        salary: "7 - 12 Jt/ Bulan",
        link: "https://www.kalibrr.id/id-ID/job-board/te/cybersecurity-analyst",
      },
    ],
    pricing: [
      {
        name: "Scale Up",
        price: 2800000,
        originalPrice: 3500000,
        benefits: commonBenefits,
      },
      {
        name: "Get A Job",
        price: 4560000,
        originalPrice: 5700000,
        benefits: getAJobExtra,
      },
    ],
  },
  {
    id: 8,
    slug: "cloud-engineering-aws-gcp",
    title: "Bootcamp Cloud Engineer (AWS/GCP)",
    title2: "Cloud Engineer (AWS/GCP)",
    careerTitle: "Cloud Engineer",
    desc1: "Ingin berkarier di bidang Cloud tapi bingung harus mulai dari AWS atau GCP? Masih belum paham cara kerja cloud infrastructure dan deployment? Belum tahu tools dan konsep penting seperti Docker, CI/CD, atau Kubernetes? Ingin punya sertifikasi cloud tapi butuh panduan belajar yang jelas dan terstruktur?",
    desc2: <CloudEngineerDesc />,
    topics: [
      "Dasar-dasar Cloud Computing & perbedaan IaaS, PaaS, SaaS",
      "Pengenalan layanan inti AWS & GCP (EC2, S3, RDS, GCE, GCS, dll.)",
      "Deployment aplikasi sederhana ke cloud secara praktikal",
      "Konfigurasi keamanan & akses: IAM, VPC, Firewall Rules",
      "Monitoring, autoscaling, dan pengelolaan resource secara efisien",
      "Simulasi project DevOps: CI/CD, Docker, dan Cloud Logging",
    ],
    duration: "3 atau 6 bulan",
    image: back,
    skills: [
      "Cloud Fundamentals",
      "Deployment & Monitoring",
      "Scalability & Load Balancing",
      "Hands-on AWS/GCP",
    ],
    facts: [
      {
        text: "Cloud Computing Jadi Fondasi Transformasi Digital",
        image: kuning,
      },
      {
        text: "AWS & GCP Digunakan oleh Ribuan Perusahaan Global",
        image: biru,
      },
      {
        text: "Skill Cloud Dicari di Berbagai Sektor Industri",
        image: ungu,
      },
      {
        text: "Karier Luas: Cloud Engineer, DevOps, Site Reliability Engineer",
        image: hijau,
      },
      {
        text: "Gaji Kompetitif & Potensi Kerja Remote",
        image: merah,
      },
    ],
    jobs: [
      {
        company: "JobStreet",
        logo: JobstreetLogo,
        position: "Cloud Engineer",
        type: "Full Time",
        salary: "8 - 15 Jt/ Bulan",
        link: "https://id.jobstreet.com/jobs?key=cloud+engineer&location=Indonesia",
      },
      {
        company: "Indeed",
        logo: IndeedLogo,
        position: "Cloud Engineer",
        type: "Full Time",
        salary: "8 - 15 Jt/ Bulan",
        link: "https://id.indeed.com/jobs?q=cloud+engineer&l=Indonesia",
      },
      {
        company: "Glassdoor",
        logo: GlassdoorLogo,
        position: "Cloud Engineer",
        type: "Full Time",
        salary: "8 - 15 Jt/ Bulan",
        link: "https://www.glassdoor.com/Job/indonesia-cloud-engineer-jobs-SRCH_IL.0,9_IN113_KO10,25.htm",
      },
      {
        company: "Glints",
        logo: GlintsLogo,
        position: "Cloud Engineer",
        type: "Full Time",
        salary: "8 - 15 Jt/ Bulan",
        link: "https://glints.com/id/opportunities/jobs/explore?keyword=cloud+engineer&country=ID",
      },
      {
        company: "Kalibrr",
        logo: KalibrLogo,
        position: "Cloud Engineer",
        type: "Full Time",
        salary: "8 - 15 Jt/ Bulan",
        link: "https://www.kalibrr.id/id-ID/job-board/te/cloud-engineer",
      },
    ],
    pricing: [
      {
        name: "Scale Up",
        price: 3200000,
        originalPrice: 4000000,
        benefits: commonBenefits,
      },
      {
        name: "Get A Job",
        price: 4960000,
        originalPrice: 6200000,
        benefits: getAJobExtra,
      },
    ],
  },
  {
    id: 9,
    slug: "game-development-unity",
    title: "Bootcamp Game Development Unity",
    title2: "Game Developer Unity",
    careerTitle: "Game Developer",
    desc1: "Punya passion di dunia game tapi bingung cara mulai bikin game sendiri? Belum paham Unity dan C# untuk pengembangan game? Kesulitan membuat gameplay, animasi, dan interaksi dalam game? Ingin punya portofolio game yang menarik tapi tidak tahu harus mulai dari mana? Yuk bangun skill-mu dan wujudkan impian jadi Game Developer!",
    desc2: <GameDevDesc />,
    topics: [
      "Pengenalan Game Development & workflow Unity",
      "Pembuatan environment 2D & 3D menggunakan Unity Editor",
      "Pemrograman logika game dengan C# (script, events, input handling)",
      "Desain karakter, animasi, dan interaksi objek dalam game",
      "Implementasi UI game (score, health, menu, dll.)",
      "Build & publish game ke platform seperti Android, WebGL, dan lainnya",
    ],
    duration: "3 atau 6 bulan",
    image: game,
    skills: [
      "C# Programming Basics",
      "2D/3D Game Design & Animation Menggunakan Blender",
      "Game Physics & Sound",
      "Deploy ke Play Store & App Store",
    ],
    facts: [
      {
        text: "Unity Digunakan di 50% Game Mobile Dunia",
        image: kuning,
      },
      {
        text: "Bisa Bikin Game 2D & 3D dengan Tools Powerful",
        image: biru,
      },
      {
        text: "Karier di Industri Game, Edukasi, hingga AR/VR",
        image: ungu,
      },
      {
        text: "Skill C# & Unity Dicari Studio Game Lokal & Global",
        image: hijau,
      },
      {
        text: "Potensi Penghasilan dari Proyek & Game Sendiri",
        image: merah,
      },
    ],
    jobs: [
      {
        company: "JobStreet",
        logo: JobstreetLogo,
        position: "Game Developer (Unity)",
        type: "Full Time",
        salary: "5 - 10 Jt/ Bulan",
        link: "https://id.jobstreet.com/jobs?key=unity+game+developer&location=Indonesia",
      },
      {
        company: "Indeed",
        logo: IndeedLogo,
        position: "Unity Game Developer",
        type: "Full Time",
        salary: "5 - 10 Jt/ Bulan",
        link: "https://id.indeed.com/jobs?q=unity+game+developer&l=Indonesia",
      },
      {
        company: "Glassdoor",
        logo: GlassdoorLogo,
        position: "Game Developer (Unity)",
        type: "Full Time",
        salary: "5 - 10 Jt/ Bulan",
        link: "https://www.glassdoor.com/Job/indonesia-unity-developer-jobs-SRCH_IL.0,9_IN113_KO10,26.htm",
      },
      {
        company: "Glints",
        logo: GlintsLogo,
        position: "Unity Developer",
        type: "Full Time",
        salary: "5 - 10 Jt/ Bulan",
        link: "https://glints.com/id/opportunities/jobs/explore?keyword=unity+developer&country=ID",
      },
      {
        company: "Kalibrr",
        logo: KalibrLogo,
        position: "Unity Game Developer",
        type: "Full Time",
        salary: "5 - 10 Jt/ Bulan",
        link: "https://www.kalibrr.id/id-ID/job-board/te/unity-developer",
      },
    ],
    pricing: [
      {
        name: "Scale Up",
        price: 2800000,
        originalPrice: 3500000,
        benefits: commonBenefits,
      },
      {
        name: "Get A Job",
        price: 4560000,
        originalPrice: 5700000,
        benefits: getAJobExtra,
      },
    ],
  },
];
