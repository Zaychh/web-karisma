import { motion } from 'framer-motion';
import Spline from "@splinetool/react-spline";

import linkedinIcon from "../../assets/linkedin.png";
import whatsappIcon from "../../assets/whatsapp.png";
import tiktokIcon from "../../assets/tiktok.png";
import instagramIcon from "../../assets/instagram.png";

export default function Contact() {
  return (
    <div className="min-h-screen bg-onyx flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>

      <div className="bg-white w-full max-w-7xl flex flex-col items-center p-4 relative">
        <div className="w-full max-w-7xl aspect-[2/1] relative z-10">
          <Spline scene="https://prod.spline.design/upGTGm9U7QKJfEWd/scene.splinecode" />
        </div>

        <div className="absolute top-[50%] left-0 -translate-y-1/2 flex flex-col gap-8 pl-4">
          <SocialButton
            label="LinkedIn"
            color="from-sky-700 to-sky-500"
            iconSrc={linkedinIcon}
            url="https://www.linkedin.com/company/lkp-karisma-academy/"
          />
          <SocialButton
            label="WhatsApp"
            color="from-green-600 to-green-400"
            iconSrc={whatsappIcon}
            url="https://api.whatsapp.com/send/?phone=628113631515&text&type=phone_number&app_absent=0"
          />
        </div>

        <div className="absolute top-[50%] right-0 -translate-y-1/2 flex flex-col gap-8 pr-4">
          <SocialButton
            label="TikTok"
            color="from-cyan-400 to-pink-600"
            iconSrc={tiktokIcon}
            url="https://www.tiktok.com/@karismaacademy"
          />
          <SocialButton
            label="Instagram"
            color="from-yellow-500 to-pink-600"
            iconSrc={instagramIcon}
            url="https://www.instagram.com/karismaacademy?igsh=MW93ZGJkY3JsOXQ1Yw=="
          />
        </div>
      </div>
    </div>
  );
}

type SocialButtonProps = {
  label: string;
  color: string;
  iconSrc: string;
  url: string;
};

function SocialButton({ label, color, iconSrc, url }: SocialButtonProps) {
  return (
    <div className="group">
    <motion.button
    whileHover={{ scale: 1.07 }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
    className={`shine-effect flex items-center gap-2 px-4 md:px-6 py-2 rounded-full bg-gradient-to-r ${color} text-white text-sm md:text-base font-medium font-poppins shadow-lg`}
    >
      <img src={iconSrc} alt={label} className="w-5 h-5" />
      {label}
    </motion.button>
</div>
  );
}
