import { useNavigate } from "react-router-dom";
import herobg from "../../assets/herobg.png";

export default function Section1() {
    const navigate = useNavigate();
    
    return (
      <section
        className="text-white px-6 md:px-20 font-poppins flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${herobg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        {/* Konten */}
        <div>
          <h1 className="text-3xl md:text-6xl font-bold">
            Temukan Inspirasi dari blog
          </h1>
          <h2 className="text-3xl md:text-6xl font-bold mt-2 text-rosegold">
            Para Pembelajar!
          </h2>
          <button className="mt-6 px-6 py-3 rounded-lg bg-rosegold hover:bg-gray-300 text-[#0C1947] font-semibold text-lg cursor-pointer"
          onClick={() => navigate("/blog/create")}
          >
            Post Your Blog
          </button>
        </div>
      </section>
    );
}