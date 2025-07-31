import instagramIcon from "../../assets/instagram.png";
import linkedinIcon from "../../assets/linkedin.png";
import whatsappIcon from "../../assets/whatsapp.png";
import karismaLogo from "../../assets/logoka.png";
import { useAuth } from "../../contexts/AuthContext";

export default function Footer() {
  const { isLoggedIn } = useAuth();

  return (
    <footer className="w-full bg-onyx text-white py-6 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-6 md:gap-12">
        <div>
          <img
            src={karismaLogo}
            alt="Karisma Academy Logo"
            className="w-[180px] md:w-[220px] object-contain"
          />
        </div>

        <div className="flex items-start gap-6">
          <div className="w-px h-full bg-white/60 hidden md:block" />

          <ul className="flex flex-col gap-1 text-sm font-medium font-poppins">
            <li>
              <a
                href={isLoggedIn ? "/dashboard" : "/Home"} // ✅ Kondisi dinamis
                className="hover:text-primary transition"
              >
                Home
              </a>
            </li>
            {isLoggedIn && (
              <li>
                <a href="/inventori" className="hover:text-primary transition">
                  Inventori
                </a>
              </li>
            )}
            <li>
              <a href="/blog" className="hover:text-primary transition">
                Blog
              </a>
            </li>
            <li>
              <a href="/tentang-kami" className="hover:text-primary transition">
                About
              </a>
            </li>
            <li>
              <a href="/bootcamp" className="hover:text-primary transition">
                Bootcamp
              </a>
            </li>
            <li>
              <a href="/free-class" className="hover:text-primary transition">
                Free Class
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Socials */}
        <div className="flex flex-col gap-2 text-sm">
          <a
            href="https://www.instagram.com/karismaacademy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-pink-400 transition"
          >
            <img src={instagramIcon} alt="Instagram" className="w-5 h-5" />
            karismaacademy
          </a>
          <a
            href="https://www.linkedin.com/company/lkp-karisma-academy/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-sky-400 transition"
          >
            <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5" />
            LKP Karisma Academy
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=628113631515"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-green-400 transition"
          >
            <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5" />
            Karisma Academy Center
          </a>
        </div>
      </div>
    </footer>
  );
}
