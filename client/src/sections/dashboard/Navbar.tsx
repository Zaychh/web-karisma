// src/components/Header.tsx
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import logo from "../client/src/assets/logo.png";
import {Link} from 'react-router-dom';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-black text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <div className="text-left leading-tight">
          <h1 className="text-sm font-bold">KARISMA</h1>
          <p className="text-xs">EDUKASI DIGITAL INDONESIA</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="hidden md:flex space-x-6 font-medium text-sm">
        <a href="/Home" className="hover:text-primary transition">Home</a>
        <a href="#" className="hover:text-gray-300">Inventori</a>
        <a href="/tentang-kami" className="hover:text-primary transition">About</a>
        <div className="relative group">
          <button className="hover:text-gray-300 flex items-center">
            Program Kami <ChevronDown size={14} className="ml-1" />
          </button>
          <div className="absolute hidden group-hover:block bg-white text-black mt-2 rounded shadow-md p-2 z-10">
            <a href="#" className="block px-4 py-1 hover:bg-gray-100">Program 1</a>
            <a href="#" className="block px-4 py-1 hover:bg-gray-100">Program 2</a>
          </div>
        </div>
        <a href="#" className="hover:text-gray-300">Blog</a>
      </nav>

      {/* User */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 border border-white rounded-full px-2 py-1 hover:bg-white hover:text-black transition"
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm">Ariodanul17</span>
          <ChevronDown size={14} />
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-20">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Profil</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Logout</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;