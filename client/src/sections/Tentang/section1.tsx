import Robo from '../../assets/robotic.png';
export default function Section1() {
    return (
        <div className="relative bg-[#1D1D1D] text-white overflow-hidden">
        <section className="min-h-screen flex items-center justify-center px-6 md:px-16">
            <div className="w-full flex flex-col md:flex-row items-start justify-between">

                {/* Robot Image */}
                <div className="hidden md:flex justify-center w-1/2 md:-ml-16">
                    <img
                        src={Robo}
                        alt="Robot Karisma"
                        className="w-[90%] max-w-[500px]"
                    />
                </div>

                {/* Text content */}
                <div className="w-full md:w-[90%] md:ml-[-80px] mt-10 md:mt-0">
                    <p className="font-poppins font-bold text-4xl md:text-5xl leading-snug text-center">
                        Grow with Skills, Shine with Karisma
                    </p>
                    <p className="font-poppins font-semibold text-2xl md:text-3xl mt-8 leading-relaxed text-center">
                        Bentuk Dirimu Menjadi Pemimpin Digital <br className="hidden md:block" /> yang Berkarakter dan Berdampak.
                    </p>
                    <p className="font-poppins font-normal text-lg md:text-2xl mt-8 leading-relaxed text-center">
                        Di Karisma Academy, kami hadir untuk memberdayakan Anda. Kami tidak <br className="hidden md:block" /> hanya mengajarkan teknologi, tetapi juga membimbing Anda <br className="hidden md:block" /> mengembangkan karakter kepemimpinan yang kuat dan karisma personal <br className="hidden md:block" /> untuk menciptakan masa depan digital yang lebih cerah.
                    </p>
                </div>

            </div>
        </section>
        </div>
    );
}