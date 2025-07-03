import React from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import logo from "../../assets/logo.png"; // Ganti dengan path logo kamu

const Taskbar = () => {
  return (
    <header className="bg-black text-white py-4 px-6 flex flex-col md:flex-row items-center justify-between border-b border-gray-700">
      {/* Logo & Title */}
      <div className="flex items-center gap-4">
        <img src={logo} alt="Karisma Academy" className="w-12 md:w-14" />
        <div>
          <h1 className="text-lg md:text-xl font-bold">KARISMA ACADEMY</h1>
          <p className="text-xs text-gray-400 -mt-1">DIGITAL CAREER ACCELERATOR</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
        <ul className="flex gap-4 text-sm font-medium">
          <li className="hover:text-yellow-400 cursor-pointer">Home</li>
          <li className="hover:text-yellow-400 cursor-pointer">Blog</li>
          <li className="hover:text-yellow-400 cursor-pointer">About</li>
          <li className="hover:text-yellow-400 cursor-pointer">Courses</li>
          <li className="hover:text-yellow-400 cursor-pointer">Dashboard</li>
          <li className="hover:text-yellow-400 cursor-pointer">Achievement</li>
        </ul>

        {/* Social Media */}
        <div className="flex gap-4 items-center text-xl text-white">
          <a href="#" className="hover:text-pink-500">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-blue-400">
            <FaLinkedin />
          </a>
          <a href="#" className="hover:text-green-400">
            <FaWhatsapp />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Taskbar;
