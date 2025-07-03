import { useState } from "react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { BookOpenIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logoka.png";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="w-full sticky h-[90px] top-0 z-50 bg-onyx shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-14 w-auto" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-10 relative">
          <Link
            to="/Home"
            className={`${
              currentPath === "/Home" ? "text-rosegold" : "text-putih"
            } hover:text-rosegold font-medium font-poppins`}
          >
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown(true)}
            onMouseLeave={() => setOpenDropdown(false)}
          >
            <button className="flex items-center gap-1 text-putih hover:text-primary font-medium">
              Program Kami <ChevronDownIcon className="h-4 w-4" />
            </button>

            <AnimatePresence>
              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 w-80 bg-putih shadow-xl rounded-xl py-4 px-4 z-50 space-y-4"
                >
                  <a
                    href="#bootcamp"
                    className="flex items-start gap-3 hover:bg-gray-100 p-3 rounded-lg text-onyx"
                  >
                    <AcademicCapIcon className="h-6 w-6 text-onyx" />
                    <div>
                      <p className="font-semibold">Bootcamp</p>
                      <p className="text-sm">
                        Hadir untuk level up skill digital kamu dengan real-life
                        project.
                      </p>
                    </div>
                  </a>
                  <a
                    href="#free-class"
                    className="flex items-start gap-3 hover:bg-gray-100 p-3 rounded-lg text-onyx"
                  >
                    <BookOpenIcon className="h-6 w-6 text-onyx" />
                    <div>
                      <p className="font-semibold">Free Class</p>
                      <p className="text-sm">
                        Cobain Pengalaman Belajar Gratis di Karisma Academy!
                      </p>
                    </div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/blog"
            className={`${
              currentPath === "/blog" ? "text-rosegold" : "text-putih"
            } hover:text-rosegold font-medium font-poppins`}
          >
            Blog
          </Link>
          <Link
            to="/tentang-kami"
            className={`${
              currentPath === "/tentang-kami" ? "text-rosegold" : "text-putih"
            } hover:text-rosegold font-medium font-poppins`}
          >
            Tentang Kami
          </Link>
        </nav>

        <div className="hidden md:block relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 border border-white rounded-full px-3 py-1 hover:bg-white hover:text-black transition"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium">Ariodanul17</span>
            <ChevronDownIcon className="h-4 w-4" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-20">
              <Link
                to="/profil"
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => setShowDropdown(false)}
              >
                Profil
              </Link>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => {
                  // Logout logic here
                  setShowDropdown(false);
                  console.log("Logout clicked");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <XMarkIcon className="h-8 w-8 text-white" />
            ) : (
              <Bars3Icon className="h-8 w-8 text-white" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-onyx px-6 py-4 space-y-4"
          >
            <Link
              to="/Home"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-putih hover:text-rosegold"
            >
              Home
            </Link>
            <div className="space-y-2">
              <p className="text-putih font-semibold">Program Kami</p>
              <a
                href="#bootcamp"
                className="block text-sm text-gray-300 hover:text-rosegold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bootcamp
              </a>
              <a
                href="#free-class"
                className="block text-sm text-gray-300 hover:text-rosegold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Free Class
              </a>
            </div>
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-putih hover:text-rosegold"
            >
              Blog
            </Link>
            <Link
              to="/tentang-kami"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-putih hover:text-rosegold"
            >
              Tentang Kami
            </Link>
            <div className="hidden md:block relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 border border-white rounded-full px-3 py-1 hover:bg-white hover:text-black transition"
              >
                <img
                  src="https://i.pravatar.cc/40"
                  alt="User"
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm font-medium">Ariodanul17</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-20">
                  <Link
                    to="/profil"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profil
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => {
                      // nanti tinggal pasang logout logic (misal clear token, redirect)
                      setShowDropdown(false);
                      console.log("Logout clicked");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
