import { useLocation, Link } from "react-router-dom";

const PaymentForm = () => {
  const location = useLocation();
  const { title, price, slug } = location.state || {};

  return (
    <div className="min-h-screen bg-abyssal text-white flex items-center justify-center p-8">
      <div className="bg-ashh p-10 rounded-xl w-full max-w-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Form Pembayaran</h2>

        {/* Nama */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Nama Lengkap</label>
          <input disabled className="w-full p-3 rounded bg-gray-700 text-gray-300" />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input disabled className="w-full p-3 rounded bg-gray-700 text-gray-300" />
        </div>

        {/* No HP */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">No HP</label>
          <input disabled className="w-full p-3 rounded bg-gray-700 text-gray-300" />
        </div>

        {/* Nama Program */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Nama Program</label>
          <input className="w-full p-3 rounded bg-gray-800 text-white" value={title} readOnly />
        </div>

        {/* Harga */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-1">Harga</label>
          <input
            className="w-full p-3 rounded bg-gray-800 text-white"
            value={price?.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
            readOnly
          />
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-between gap-4">
          <Link
            to={`/bootcamp/${slug}`}
            className="w-full text-center border border-white text-white py-3 rounded font-semibold hover:bg-gray-600 transition"
          >
            Batal
          </Link>
          <button className="w-full bg-rosegold hover:bg-pink-500 text-black py-3 rounded font-semibold transition">
            Bayar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
