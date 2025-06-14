import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { BookOpenIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logoka.png";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <header className="w-full sticky h-[90px] top-0 z-50 bg-onyx shadow-sm">
   <div className="max-w-7xl mx-auto pl-0 md:pl-2 pr-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-14 w-auto ml-[-8px]" />
        </div>

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

        <div className="hidden md:block">
          <Link
            to="/login"
            className="flex items-center gap-2 px-5 py-2 bg-rosegold text-onyx font-semibold rounded-full hover:bg-amber-400 transition-all"
          >
            Login
            <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
