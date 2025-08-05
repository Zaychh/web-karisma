import Bocah from "../../assets/bocahbiru.png";
import './HeroCourse.css';
export default function Hero() {

    return (
            <section className="w-full bg-ashh text-white pt-6 pb-12 px-4 md:px-12">
                <h2 className="text-lg font-semibold mb-6">My Program</h2>

                <div className="flex flex-col items-center justify-center mt-12 text-center">
                    <img src={Bocah} alt="Sorry" className="w-32 h-auto mb-6 animate-bounce" />

                    <h3 className="glitch-text font-bold uppercase text-lg sm:text-xl md:text-2xl tracking-wide">
                        TIDAK ADA PROGRAM YANG DITEMUKAN!
                    </h3>

                    <p className="text-sm text-gray-300 mt-2 max-w-md">
                        Cobalah untuk membeli kursus di kami untuk mendapatkan programmu sendiri!
                    </p>

                    <p className="glitch-subtext mt-3 italic font-bold text-xs sm:text-sm">
                        ERROR 404  -  Program Not Found, Please Buy Course First
                    </p>
                </div>
            </section>
    );
};