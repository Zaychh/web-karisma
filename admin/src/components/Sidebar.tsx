import { Home, LayoutGrid, Users, ChartLine, LogOut, Wallet, IdCard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logoka.png";

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { label: "Dashboard", icon: <Home size={20} />, to: "/dashboard"},
        { label: "Courses", icon: <LayoutGrid size={20} />, to: "/courses"},
        { label: "Instructors", icon: <Users size={20} />, to: "/users" },
        { label: "Sertificate", icon: <IdCard size={20} />, to: "/sertifikat" },
        { label: "Transaction", icon: <Wallet size={20} />, to: "/transaction" },
        { label: "Stats & Reports", icon: <ChartLine size={20} />, to: "/stats" },
        { label: "Logout", icon: <LogOut size={20} />, to: "/logout" },
    ];

    return (
        <aside className="w-64 bg-kertas shadow-md h-screen flex flex-col justify-between p-4">
            <img src={logo} alt="Logo KA" className="h-10 w-auto"/>
            <nav className="space-y-2">
                {navItems.map((item) => (
                    <Link
                       key={item.label}
                       to={item.to}
                       className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition hover:bg-blue-100 ${location.pathname === item.to ? "bg-blue-100 text-blue-700" : "text-gray-700"}`}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                ))}
            </nav>
            <button className="flex items-center gap-2 text-red-500 px-4 py-2 text-sm hover:bg-red-50 rounded-lg">
                <LogOut size={20} />
                Logout
            </button>
        </aside>
    );

};