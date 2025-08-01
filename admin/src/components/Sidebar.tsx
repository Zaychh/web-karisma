import { Home, LayoutGrid, Users, UserCog, PencilRuler, LogOut, Wallet, Award } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logoka.png";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: <Home size={20} />, to: "/dashboard" },
    { label: "Courses", icon: <LayoutGrid size={20} />, to: "/program" },
    { label: "Instructors", icon: <UserCog size={20} />, to: "/instructors" },
    { label: "User List", icon: <Users size={20} />, to: "/users" },
    { label: "Achievement List", icon: <Award size={20} />, to: "/achievement" },
    { label: "Transaction", icon: <Wallet size={20} />, to: "/transaction" },
    { label: "Tools List", icon: <PencilRuler size={20} />, to: "/tools" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-[#001F54] via-[#5D8AA8] to-[#CDE7F0] text-white shadow-md flex flex-col justify-between">
      <div>
        <div className="p-6 flex items-center justify-center">
          <img
            src={logo}
            alt="Logo KA"
            className="h-18 w-auto object-contain"
          />
        </div>

        <nav className="space-y-2 px-4 mt-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-balance font-medium transition
                  ${isActive ? 'backdrop-blur-md bg-white/20 text-white' : 'hover:backdrop-blur-md hover:bg-white/10 text-white'}`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-4 pb-4">
        <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-600 hover:backdrop-blur-md hover:bg-gray-500/10 transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
