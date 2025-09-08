import { useState } from "react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { BookOpenIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logoka.png";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import DefaultPng from "../../assets/default-avatar.png";

const Header: React.FC = () => {
  const BASE_URL = "http://localhost:3000";
  const auth = useAuth();
  const user = auth.user;
  const navigate = useNavigate();
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
            to="/dashboard"
            className={`${
              currentPath === "/dashboard" ? "text-rosegold" : "text-putih"
            } hover:text-rosegold font-medium font-poppins`}
          >
            Home
          </Link>

          <Link
            to="/inventory"
            className={`${
              currentPath === "/inventory" ? "text-rosegold" : "text-putih"
            } hover:text-rosegold font-medium font-poppins`}
          >
            Inventori
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
                  <Link
                    to="/bootcamp"
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
                  </Link>
                  <Link
                    to="/free-class"
                    className="flex items-start gap-3 hover:bg-gray-100 p-3 rounded-lg text-onyx"
                  >
                    <BookOpenIcon className="h-6 w-6 text-onyx" />
                    <div>
                      <p className="font-semibold">Free Class</p>
                      <p className="text-sm">
                        Cobain Pengalaman Belajar Gratis di Karisma Academy!
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* <Link
            to="/blog"
            className={`${
              currentPath === "/blog" ? "text-rosegold" : "text-putih"
            } hover:text-rosegold font-medium font-poppins`}
          >
            Blog
          </Link> */}
          <Link
            to="/tentang-kami"
            className={`${
              currentPath === "/tentang-kami" ? "text-rosegold" : "text-putih"
            } hover:text-rosegold font-medium font-poppins`}
          >
            Tentang Kami
          </Link>
        </nav>

        {/* Desktop: User Dropdown */}
        <div className="hidden md:block relative">
          {user ? (
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 border border-white text-white rounded-full px-3 py-1 hover:bg-white hover:text-black transition"
            >
              <img
                src={
                  user?.image
                    ? `${BASE_URL}/uploads/${user.image}`
                    : (DefaultPng as string)
                }
                alt="User"
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm font-medium">{user.name}</span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>
          ) : (
            <div className="w-[100px] h-8 bg-gray-600 rounded-full animate-pulse"></div>
          )}

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-20">
              <Link
                to="/profile/my-profile"
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => setShowDropdown(false)}
              >
                My Profil
              </Link>
              <button
                onClick={() => {
                  auth.logout();
                  navigate("/Home");
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
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

      {/* Mobile Navigation */}
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
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-putih hover:text-rosegold"
            >
              Home
            </Link>
            <Link
              to="/inventory"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-putih hover:text-rosegold"
            >
              Inventory
            </Link>
            <div className="space-y-2">
              <p className="text-putih font-semibold">Program Kami</p>
              <Link
                to="/bootcamp"
                className="block text-sm text-gray-300 hover:text-rosegold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bootcamp
              </Link>
              <Link
                to="/free-class"
                className="block text-sm text-gray-300 hover:text-rosegold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Free Class
              </Link>
            </div>
            {/* <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-putih hover:text-rosegold"
            >
              Blog
            </Link> */}
            <Link
              to="/tentang-kami"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-putih hover:text-rosegold"
            >
              Tentang Kami
            </Link>
            {user ? (
              <div className="flex items-center gap-3 border-t border-gray-600 pt-4">
                <img
                  src={
                    user?.image
                      ? `${BASE_URL}/uploads/${user.image}`
                      : (DefaultPng as string)
                  }
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">
                    {user.name}
                  </span>
                  <div className="flex gap-2 mt-1">
                    <Link
                      to="/profile/my-profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs text-gray-300 hover:text-rosegold"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        auth.logout();
                        navigate("/Home");
                        setMobileMenuOpen(false);
                      }}
                      className="text-xs text-gray-300 hover:text-rosegold"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block mt-2 px-5 py-2 bg-rosegold text-onyx font-semibold rounded-full text-center hover:bg-amber-400 transition-all"
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
