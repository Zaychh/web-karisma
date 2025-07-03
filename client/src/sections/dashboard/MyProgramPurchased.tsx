import React, { useState } from "react";
import { FaReact } from "react-icons/fa";
import { SiMysql, SiLaravel } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Inbox, User } from "lucide-react";

// Assets
import logo from "../../assets/logo.png";
import ProgresIlustration from "../../assets/progresilustration.png";
import learner from "../../assets/achievements/learner.png";
import explorer from "../../assets/achievements/explorer.png";
import practitioner from "../../assets/achievements/practitioner.png";
import specialist from "../../assets/achievements/specialist.png";
import expert from "../../assets/achievements/expert.png";
import mastermind from "../../assets/achievements/mastermind.png";
import mascot1 from "../../assets/achievements/mascot1.png";
import mascot2 from "../../assets/achievements/mascot2.png";

const MyProgramPurchased = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <nav className="bg-black text-white px-6 md:px-16 py-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Karisma Academy" className="w-30" />
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

      {/* Konten Utama */}
      <div className="bg-black min-h-screen text-white px-6 md:px-16 py-10 space-y-12">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-semibold">Hai, User_Ariodanu17!</h2>
          <p className="text-sm text-gray-300">
            Jangan Lupa Untuk Mengikuti Kursus Yang Sudah Dibeli, Ya!
          </p>
        </div>

        {/* My Program */}
        <section>
          <h3 className="text-lg font-bold mb-4">My Program</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="border border-white rounded-md p-4 w-64 text-center space-y-2">
              <FaReact className="text-5xl mx-auto text-cyan-400" />
              <h4 className="font-bold">Kursus Front-end Development</h4>
              <button onClick={() => navigate("/dashboard/kursus/frontend")} className="bg-yellow-500 text-black py-1 px-4 rounded-md text-sm hover:bg-yellow-400">
                Detail
              </button>
            </div>
            <div className="border border-white rounded-md p-4 w-64 text-center space-y-2">
              <SiMysql className="text-5xl mx-auto text-orange-400" />
              <h4 className="font-bold">Kursus Database SQL</h4>
              <button onClick={() => navigate("/dashboard/kursus/mysql")} className="bg-yellow-500 text-black py-1 px-4 rounded-md text-sm hover:bg-yellow-400">
                Detail
              </button>
            </div>
            <div className="border border-white rounded-md p-4 w-64 text-center space-y-2">
              <SiLaravel className="text-5xl mx-auto text-red-400" />
              <h4 className="font-bold">Kursus Laravel 11 Backend Development</h4>
              <button onClick={() => navigate("/dashboard/kursus/laravel")} className="bg-yellow-500 text-black py-1 px-4 rounded-md text-sm hover:bg-yellow-400">
                Detail
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button className="bg-yellow-500 text-black py-1 px-6 rounded-md text-sm hover:bg-yellow-400">
              See More
            </button>
          </div>
        </section>

        {/* My Progress */}
        <section className="bg-[#1a1a1a] p-6 rounded-xl border border-yellow-500">
          <h3 className="text-lg font-bold mb-4">My Progress</h3>
          <p className="text-sm text-gray-300 mb-6">Pantau Progress Kamu di bulan ini!</p>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <img src={ProgresIlustration} alt="Progress" className="w-40 md:w-52" />
            <div className="flex-1 space-y-4 w-full">
              {[{
                title: "Laravel Course", width: "56%", color: "bg-red-500"
              }, {
                title: "React.js Course", width: "62%", color: "bg-blue-500"
              }, {
                title: "Python Course", width: "78%", color: "bg-yellow-400"
              }, {
                title: "Adobe Illustrator", width: "27%", color: "bg-fuchsia-500"
              }].map((item) => (
                <div key={item.title}>
                  <p className="text-sm mb-1">{item.title}</p>
                  <div className="bg-gray-700 w-full h-3 rounded">
                    <div className={`${item.color} h-3 rounded`} style={{ width: item.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button className="bg-yellow-500 text-black py-1 px-6 rounded-md text-sm hover:bg-yellow-400">
              See More
            </button>
          </div>
        </section>

        {/* My Achievement */}
        <section className="text-white px-0 py-10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="border border-blue-400 rounded-md p-4 space-y-4">
              <h3 className="text-lg font-bold">My Achievement</h3>
              <div className="grid grid-cols-3 gap-4">
                {[{
                  src: learner, title: "Learner"
                }, {
                  src: explorer, title: "Explorer"
                }, {
                  src: practitioner, title: "Practitioner"
                }, {
                  src: specialist, title: "Specialist"
                }, {
                  src: expert, title: "Expert"
                }, {
                  src: mastermind, title: "Mastermind"
                }].map((item) => (
                  <div key={item.title} className="flex flex-col items-center">
                    <img src={item.src} alt={item.title} className="w-14" />
                    <p className="text-sm mt-1">{item.title}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <button className="bg-yellow-500 text-black py-1 px-4 rounded-md text-sm hover:bg-yellow-400">
                  All My Achievement
                </button>
              </div>
            </div>

            <div className="text-white text-center md:text-left">
              <p className="text-sm mb-2">
                Sejauh ini kamu sudah mendapatkan achievement sebanyak {" "}
                <span className="font-bold">(angka total)</span>
              </p>
              <p className="text-lg font-bold mb-4">
                Ayo Semangat Untuk <br /> Mengoleksinya!
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <img src={mascot1} alt="Boy" className="w-20 md:w-24" />
                <img src={mascot2} alt="Lion" className="w-20 md:w-24" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MyProgramPurchased;
