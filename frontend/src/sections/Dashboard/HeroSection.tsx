import { useAuth } from "../../contexts/AuthContext";
export default function HeroSection() {
    const { user } = useAuth();
    
    return (
      <section className="w-full bg-abyssal text-white pt-10 pb-6 px-4 md:px-12">
        <div>
          <h1 className="text-xl font-bold">
            Hai, <span className="text-white">{user?.name || "User"}</span>
          </h1>
          <p className="text-base mt-1">
            Jangan Lupa Untuk Mengikuti Kursus Yang Sudah Dibeli, Ya!
          </p>
        </div>
      </section>
    );
};