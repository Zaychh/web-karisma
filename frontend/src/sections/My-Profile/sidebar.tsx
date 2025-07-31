import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { FaArrowLeftLong } from "react-icons/fa6";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname.includes(path)
      ? "bg-white text-black font-bold"
      : "text-white hover:bg-gray-800";

  return (
    <aside className="bg-abyssal w-72 h-screen px-0 py-10 flex flex-col justify-between fixed">
      <div>
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <img src={Logo} alt="Logo" className="w-45 h-auto" />
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <Link
            to="/profile/my-profile"
            className={`block w-full py-3 px-6 transition duration-200 ${isActive(
              "my-profile"
            )}`}
          >
            My Profile
          </Link>
          <Link
            to="/profile/inbox"
            className={`block w-full py-3 px-6 transition duration-200 ${isActive(
              "inbox"
            )}`}
          >
            Inbox
          </Link>
          <Link
            to="/profile/setting"
            className={`block w-full py-3 px-6 transition duration-200 ${isActive(
              "setting"
            )}`}
          >
            Setting
          </Link>
        </nav>
      </div>

      {/* Back Button */}
      <div className="px-6">
        <Link
          to="/dashboard"
          className="text-white hover:text-red-400 text-sm flex items-center space-x-2"
        >
          <FaArrowLeftLong />
          <span>Back</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
