import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

import linkedinIcon from '../../assets/linkedin.png';
import whatsappIcon from '../../assets/whatsapp.png';
import tiktokIcon from '../../assets/tiktok.png';
import instagramIcon from '../../assets/instagram.png';

export default function Contact() {
  return (
    <div className="min-h-screen bg-onyx flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold font-poppins mb-12">Contact Us</h1>

      <div className="bg-white w-full flex flex-col items-center p-0 relative overflow-hidden">
        <div className="w-full h-[500px] relative z-0">
          <Spline scene="https://prod.spline.design/upGTGm9U7QKJfEWd/scene.splinecode" />
        </div>

        <div className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col gap-18 pl-8 md:pl-12 z-20">
          <SocialButton
            label="LinkedIn"
            color="from-sky-700 to-sky-500"
            glowColor="#0e76a8"
            iconSrc={linkedinIcon}
            url="https://www.linkedin.com/company/lkp-karisma-academy/"
          />
          <SocialButton
            label="WhatsApp"
            color="from-green-600 to-green-400"
            glowColor="#25D366"
            iconSrc={whatsappIcon}
            url="https://api.whatsapp.com/send/?phone=628113631515&text&type=phone_number&app_absent=0"
          />
        </div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 flex flex-col gap-18 pr-8 md:pr-12 z-20">
          <SocialButton
            label="TikTok"
            color="from-cyan-400 to-pink-600"
            glowColor="#69C9D0"
            iconSrc={tiktokIcon}
            url="https://www.tiktok.com/@karismaacademy"
          />
          <SocialButton
            label="Instagram"
            color="from-yellow-500 to-pink-600"
            glowColor="#FEDA75"
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
  glowColor: string;
};

function SocialButton({ label, color, iconSrc, url, glowColor }: SocialButtonProps) {
  return (
    <motion.button
      whileHover={{
        scale: 1.07,
        boxShadow: `0 0 16px ${glowColor}`,
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
      className={`w-[180px] h-[48px] shine-hover flex items-center justify-center gap-2 px-4 rounded-full bg-gradient-to-r ${color} text-white text-sm font-medium font-poppins shadow-md z-20 cursor-pointer`}
    >
      <img src={iconSrc} alt={label} className="w-5 h-5" />
      {label}
    </motion.button>
  );
}
