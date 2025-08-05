import { useParams, useNavigate } from "react-router-dom";
import SidebarOnlyLayout from "../../SidebarOnly";
import { initialData } from "../transaction/interface";
import { ArrowLeft } from "lucide-react";
export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const data = initialData.find((item) => item.id === id);

  if (!data) {
    return (
      <SidebarOnlyLayout>
        <div className="min-h-screen flex items-center justify-center text-center">
          <p className="text-red-500 text-xl font-semibold">
            Transaksi dengan ID {id} tidak ditemukan.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 border border-black rounded-full hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Kembali
          </button>
        </div>
      </SidebarOnlyLayout>
    );
  }

  // ✅ Ini bagian utama saat data ditemukan
  return (
    <SidebarOnlyLayout>
      <div className="flex justify-center items-center min-h-screen bg-white px-4">
        <div className="border rounded-xl p-8 max-w-md w-full shadow-md">
          <h2 className="text-center text-xl font-bold mb-6">
            Detail Pembelian Program
          </h2>

          <div className="space-y-4 text-sm">
            <InfoRow label="Id Pembelian:" value={data.id} />
            <InfoRow label="Nama Pembeli:" value={data.user} />
            <InfoRow label="Nama Program:" value={data.program} />
            <InfoRow label="Kategori:" value={data.kategori} />
            <InfoRow label="Tanggal Pembelian:" value={data.date} />
            <InfoRow label="Metode Pembayaran:" value={data.payment} />
            <InfoRow label="Total Harga:" value={data.price} />
            <InfoRow label="Status:" value={data.status} />
          </div>

          <button
            onClick={() => navigate(-1)}
            className="mt-8 w-full border border-black py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            Kembali
          </button>
        </div>
      </div>
    </SidebarOnlyLayout>
  );
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="font-semibold">{label}</p>
    <p className="border-b border-gray-300 pb-1">{value}</p>
  </div>
);
