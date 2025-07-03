import React, { useState } from "react";
import { ChevronDown, User, Inbox, LogOut } from "lucide-react";
import programImage from "../../assets/program.png";
import Progresilustration from "../../assets/progresilustration.png";
import Noprogres from "../../assets/noprogres.png";
import NoAchievement from "../../assets/NoAchievement.png";
import achievementguide from "../../assets/achievementguide.png";
import logo from "../../assets/logo.png"; // pastikan file logo ada

const MyProgram = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-black text-white px-6 md:px-16 py-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Karisma Academy" className="w-10" />
          <span className="text-lg font-bold">KARISMA ACADEMY</span>
          <ul className="hidden md:flex space-x-6 ml-8 text-sm font-medium">
            <li><a href="#" className="hover:text-yellow-400">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400">Inventori</a></li>
            <li><a href="#" className="hover:text-yellow-400">Tentang</a></li>
            <li className="relative group">
              <button className="hover:text-yellow-400 flex items-center gap-1">
                Program Kami <ChevronDown size={14} />
              </button>
              <ul className="absolute hidden group-hover:block mt-2 bg-white text-black rounded shadow-md p-2 w-40 z-10">
                <li><a href="#" className="block px-2 py-1 hover:bg-gray-200">Frontend</a></li>
                <li><a href="#" className="block px-2 py-1 hover:bg-gray-200">Backend</a></li>
              </ul>
            </li>
            <li><a href="#" className="hover:text-yellow-400">Blog</a></li>
          </ul>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-[#2b2b2b] px-3 py-1 rounded-full text-sm font-semibold hover:bg-[#3a3a3a] transition"
          >
            Ariodanu17
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-md z-20">
              <a href="#" className="flex items-center px-3 py-2 hover:bg-gray-100"><User size={16} className="mr-2" />My Profile</a>
              <a href="#" className="flex items-center px-3 py-2 hover:bg-gray-100"><Inbox size={16} className="mr-2" />Inbox</a>
              <a href="#" className="flex items-center px-3 py-2 hover:bg-gray-100"><LogOut size={16} className="mr-2" />Log Out</a>
            </div>
          )}
        </div>
      </nav>

      {/* My Program, Progress, Achievement Section */}
      <section className="bg-[#141414] px-6 py-10 text-center text-white">
        <div className="flex justify-start">
          <h2 className="text-2xl font-bold mb-6">My Program</h2>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src={programImage} alt="Gambar program" className="w-32 mb-6" />
          <p className="text-lg font-semibold">TIDAK ADA PROGRAM YANG DITEMUKAN!</p>
          <p className="text-sm text-gray-400 mt-2 max-w-md">
            Cobalah untuk membeli kursus di kami untuk mendapatkan programmu sendiri!
          </p>
        </div>

        {/* Progress */}
        <div className="flex justify-start mt-10">
          <h2 className="text-xl font-bold">My Progress</h2>
        </div>
        <p className="text-sm text-gray-300 mb-6">Pantau Progress Kamu di bulan ini!</p>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <img src={Progresilustration} alt="Progress Illustration" className="w-40 md:w-52" />
          <div className="border border-yellow-500 rounded-md p-4 text-center max-w-md">
            <img src={Noprogres} alt="No Progress" className="mx-auto mb-4 w-28" />
            <p className="text-sm font-semibold">TIDAK ADA PROGRES YANG DITEMUKAN!</p>
            <p className="text-xs text-gray-400 mt-1">
              Cobalah untuk mengerjakan kursus yang sudah kamu beli ya! Agar Progress kamu Tertampil!
            </p>
            <button className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition">
              See More
            </button>
          </div>
        </div>

        {/* Achievement */}
        <div className="flex justify-start mt-12">
          <h2 className="text-xl font-bold mb-6">My Achievement</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Left box */}
          <div className="border border-gray-600 rounded-md p-4 text-center">
            <img src={NoAchievement} alt="No Achievement" className="mx-auto mb-3 w-24" />
            <p className="text-sm font-semibold">YAH ACHIEVEMENT MU KOSONG NIH!</p>
            <p className="text-xs text-gray-400 mt-1">
              Cobalah untuk menyelesaikan kursus agar kamu dapat achievement pertama kamu ya!
            </p>
            <button className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition">
              All My Achievement
            </button>
          </div>

          {/* Right text + image */}
          <div className="text-center">
            <p className="text-sm mb-2 text-gray-300">
              Sejauh ini kamu sudah mendapatkan achievement sebanyak (angka total)
            </p>
            <p className="text-lg font-bold text-yellow-300">Ayo Semangat Untuk Mengoleksinya!</p>
            <img src={achievementguide} alt="Achievement Motivation" className="mx-auto mt-4 w-36" />
          </div>
        </div>
      </section>
    </>
  );
};

export default MyProgram;
