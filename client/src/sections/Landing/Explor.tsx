import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import graph from "../../assets/graphdes.png";
import back from "../../assets/backend.png";
import full from "../../assets/fullstack.png";
import mock from "../../assets/Mock.png";
import ml from "../../assets/Datascience.png";
import mobile from "../../assets/MobDev.png";
import cyber from "../../assets/CybSec.png";
import game from "../../assets/UnityGameDev.png";

interface Course {
  id: number;
  slug: string;
  title: string;
  duration: string;
  image: string;
  skills: string[];
}

const courses: Course[] = [
  // Slide 1
  {
    id: 1,
    slug: "graphic-design-branding",
    title: "Bootcamp Graphic Design & Branding",
    duration: "3 atau 6 bulan",
    image: graph,
    skills: [
      "Prinsip desain grafis dan elemen visual yang kuat",
      "Logo, ikon, ilustrasi, dan brand identity",
      "Presentasi visual (poster, sosial media, iklan)",
    ],
  },
  {
    id: 2,
    slug: "fullstack-web-development",
    title: "Bootcamp Full-Stack Web Development",
    duration: "3 atau 6 bulan",
    image: full,
    skills: [
      "Dasar-dasar pemrograman (HTML, CSS, JavaScript)",
      "Pengembangan web (front-end dan back-end)",
      "Pengenalan frameworks seperti React, Node.js, atau Django",
      "Peluang Karir Cerah (Web Developer, Mobile App Developer, Full-Stack Developer)",
    ],
  },
  {
    id: 3,
    slug: "back-end-development-golang",
    title: "Bootcamp Back-End Development: Golang",
    duration: "3 atau 6 bulan",
    image: back,
    skills: [
      "Konsep inti DevOps & Jaringan Esensial",
      "Penguasaan Dasar Linux & Scripting Awal",
      "Revolusi Aplikasi dengan Kontainerisasi Docker",
      "Observabilitas Sistem & Wawasan Cloud Computing",
    ],
  },
  // Slide 2
  {
    id: 4,
    slug: "ui-ux-product-design",
    title: "Bootcamp UI/UX & Product Design",
    duration: "3 atau 6 bulan",
    image: mock,
    skills: [
      "Dasar UI/UX & Design Thinking",
      "Research dan User Persona",
      "Wireframing & Prototyping",
      "Handoff ke Developer",
    ],
  },
  {
    id: 5,
    slug: "data-science-machine-learning",
    title: "Bootcamp Data Science & Machine Learning",
    duration: "3 atau 6 bulan",
    image: ml,
    skills: [
      "Python for Data Science",
      "Exploratory Data Analysis",
      "Machine Learning dasar",
      "Deploy model ke production",
    ],
  },
  {
    id: 6,
    slug: "mobile-development-flutter",
    title: "Bootcamp Mobile Development (Flutter)",
    duration: "3 atau 6 bulan",
    image: mobile,
    skills: [
      "Fundamental Flutter & Dart",
      "Membangun aplikasi mobile multi-platform",
      "State Management & UI Performance",
      "Integrasi API & Firebase",
    ],
  },
  // Slide 3
  {
    id: 7,
    slug: "cybersecurity-fundamentals",
    title: "Bootcamp Cybersecurity Fundamentals",
    duration: "3 atau 6 bulan",
    image: cyber,
    skills: [
      "Network Security & Firewall",
      "Ethical Hacking Basics",
      "Security Auditing Tools",
      "Incident Response & Risk Management",
    ],
  },
  {
    id: 8,
    slug: "cloud-engineering-aws-gcp",
    title: "Bootcamp Cloud Engineer (AWS/GCP)",
    duration: "3 atau 6 bulan",
    image: back,
    skills: [
      "Cloud Fundamentals",
      "Deployment & Monitoring",
      "Scalability & Load Balancing",
      "Hands-on AWS/GCP",
    ],
  },
  {
    id: 9,
    slug: "game-development-unity",
    title: "Bootcamp Game Development Unity",
    duration: "3 atau 6 bulan",
    image: game,
    skills: [
      "C# Programming Basics",
      "2D/3D Game Design & Animation Menggunakan Blender",
      "Game Physics & Sound",
      "Deploy ke Play Store & App Store",
    ],
  },
];

const CourseCard = ({ course }: { course: Course }) => (
  <motion.div
    key={course.id}
    className="bg-onyx rounded-2xl w-[320px] flex-shrink-0 overflow-hidden border border-kertas hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
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
        <span className="bg-green-500 text-sm px-3 py-1 rounded-full font-semibold text-onyx">
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

const BootcampLanding = () => {
  const [page, setPage] = useState(0);
  const pageSize = 3;
  const totalPages = Math.ceil(courses.length / pageSize);

  const handleNext = () => setPage((prev) => (prev + 1) % totalPages);
  const handlePrev = () =>
    setPage((prev) => (prev - 1 + totalPages) % totalPages);

  const currentCourses = courses.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="min-h-screen bg-onyx text-white px-6 py-16">
      <div className="max-w-6xl w-full mx-auto px-6 mb-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
          Jelajahi Program Kami Sesuai dengan{" "}
          <span className="relative text-rosegold hover:text-transparent hover:bg-gradient-to-l hover:from-[#fff8dc] hover:via-[#FFD700] hover:to-[#b8860b] hover:bg-[length:200%_100%] hover:bg-clip-text hover:animate-shiny transition-all duration-300 ease-linear">
            Kebutuhan Kamu
          </span>

        </h1>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Level up hardskill, softskill, dan portfolio kamu disini. Dapatkan
          juga bimbingan karir terlengkap untuk mendukungmu menjadi talenta siap
          kerja di dunia digital
        </p>
        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="bg-bluberi hover:bg-rosegold hover:text-onyx text-kertas px-12 py-2 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
            Bootcamp Course
          </button>
          <button className="border-2 border-kertas text-kertas px-12 py-2 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-kertas hover:text-onyx hover:scale-105 cursor-pointer">
            Free Class
          </button>
        </div>
      </div>

      <div className="text-left max-w-screen-xl mx-auto px-4 mb-8">
        <h2 className="text-2xl font-bold font-mont mb-2 leading-tight">
          Bootcamp Course
        </h2>
        <p className="text-lg font-poppins text-gray-400 max-w-3xl leading-relaxed">
          Belajar intensif buat persiapan karir dan pelajari skill baru
        </p>
      </div>

      <div className="relative flex flex-col items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="p-2 text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <ChevronLeft size={28} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className="flex gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
            >
              {currentCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handleNext}
            className="p-2 text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-3 h-3 rounded-full ${
                page === i ? "bg-bluberi" : "bg-kertas"
              } transition-all`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BootcampLanding;
