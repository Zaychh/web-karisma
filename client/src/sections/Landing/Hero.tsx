import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import herobg from "../../assets/herobg.png";

const rotatingWords = ['Lebih Cepat', 'Tanpa Ribet', 'Lebih SatSet'];

const Hero: React.FC = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % rotatingWords.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []); 
    
    return (
        <section
        className="relative w-full h-[840px] bg-cover bg-center flex items-center justify-center text-center text-putih"
        style={{ backgroundImage: `url(${herobg})`,}}
        >
            <div className='absolute inset-0 bg-onyx/60 backdrop-blur-sm'></div>

            <div className='relative z-10 max-w-4xl px-4'>
               <h1 className='text-4xl md:text-6xl font-bold leading-tight font-mont'>
                 Upgrade Skill & Raih Karir <br />
                 Digital Impianmu{' '}
                  <span className='relative inline-block h-[1em] align-baseline overflow-hidden'>
                   <span className='invisible font-bold text-rosegold block'>
                     {rotatingWords.reduce((a, b) => (a.length > b.length ? a : b))}
                  </span>
                <AnimatePresence mode='wait'>
                <motion.span
                    key={rotatingWords[index]}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className='absolute left-0 top-0 text-rosegold font-bold'>
                 {rotatingWords[index]}
              </motion.span>
         </AnimatePresence>
         </span>
    </h1>

                <p className='mt-6 text-lg md:text-xl font-medium leading-relaxed font-poppins'>
                    Melalui Career Accelerator Learning, Karisma Academy mempercepat karirmu di dunia digital 
                    dengan pembelajaran imersif berbasis proyek, pendampingan mentor profesional, dan persiapan
                    intensif agar kamu siap bersaing dan sukses-tanpa batasan latar belakang.
                </p>

                <div className='mt-8 flex flex-col md:flex-row items-center justify-center gap-4'>
                    <a
                        href='#start'
                        className='border-2 border-onyx px-6 py-3 bg-rosegold text-onyx font-semibold rounded-md hover:bg-amber-400 transition-all font-poppins'>
                        Mulai Perjalanan Suksesmu
                    </a>
                    <a
                        href='#consultation'
                        className='border-2 border-onyx px-6 py-3 bg-obsidian text-kertas font-semibold rounded-md hover:bg-navy transition-all font-poppins'>
                        Konsultasi Gratis!
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;