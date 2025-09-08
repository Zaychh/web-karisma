import Cat from "../../assets/cat.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

type Transaction = {
  transaction_id: number;
  transaction_time: string;
  program_name: string;
  status: "Success" | "Pending" | "Failed";
};

const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const Inbox = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [transactionDetail, setTransactionDetail] = useState<any | null>(null);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Yakin hapus notifikasi ini?",
      text: "Notifikasi akan dihapus dari daftar kamu.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Menghapus...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        const token = localStorage.getItem("token");
        await axios.patch(`${BASE_API_URL}/transactions/${id}/read`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTransactions((prev) =>
          prev.filter((tx) => tx.transaction_id !== id)
        );

        Swal.fire({
          icon: "success",
          title: "Notifikasi dihapus",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat menghapus notifikasi.",
        });
      }
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_API_URL}/transactions/my-transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data.data);
      } catch (err) {
        console.error("❌ Gagal ambil transaksi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const fetchTransactionDetail = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_API_URL}/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactionDetail(res.data.data);
      setShowModal(true);
    } catch (err) {
      console.error("❌ Gagal ambil detail transaksi", err);
    }
  };

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-ashh text-white font-poppins">
      <div className="w-20" />

      <div className="flex-1 py-10 px-8">
        <h1 className="text-4xl font-bold mb-10">Inbox</h1>

        {transactions.length === 0 ? (
          <div className="bg-white text-black border border-white rounded-2xl p-8 max-w-4xl">
            <div className="flex flex-col items-center gap-y-4">
              <img
                src={Cat}
                alt="No notifications"
                style={{ width: "280px", height: "280px" }}
              />
              <p className="text-xl font-semibold text-center">
                Tidak ada notifikasi!
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-[#1e1e1e] rounded-2xl p-6 shadow-lg max-w-4xl">
  <table className="w-full text-left">
    <thead className="border-b-4 border-[#2d2d2d]">
      <tr className="text-gray-300">
        <th className="py-3">Date</th>
        <th className="py-3">Program Name</th>
        {/* ✅ Header Action di tengah */}
        <th className="py-3 text-center w-48">Action</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((tx) => (
        <tr key={tx.transaction_id} className="border-b-2 border-[#2d2d2d]">
          <td className="py-4">
            {new Date(tx.transaction_time).toLocaleString("id-ID")}
          </td>
          <td className="py-4">{tx.program_name}</td>
          <td className="py-4">
            {/* ✅ Flex untuk center button */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => fetchTransactionDetail(tx.transaction_id)}
                className="min-w-[90px] text-center bg-gray-700 hover:bg-gray-600 transition-all duration-200 text-white px-4 py-2 rounded-xl cursor-pointer hover:scale-[1.03]"
              >
                Detail
              </button>
              <button
                onClick={() => handleDelete(tx.transaction_id)}
                className="min-w-[90px] text-center bg-red-600 hover:bg-red-700 transition-all duration-200 text-white px-4 py-2 rounded-xl cursor-pointer hover:scale-[1.03]"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        )}
      </div>

      {/* Modal Nota */}
      <AnimatePresence>
        {showModal && transactionDetail && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 backdrop-blur-md bg-white/30"
              onClick={() => setShowModal(false)}
            ></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white text-black rounded-xl shadow-lg p-8 w-full max-w-md z-10"
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-6 text-center">
                Detail Pembelian Program
              </h2>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold">Id Pembelian</p>
                  <p className="text-gray-700">{transactionDetail.order_id}</p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Nama Pembeli</p>
                  <p className="text-gray-700">{transactionDetail.full_name}</p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Nama Program</p>
                  <p className="text-gray-700">
                    {transactionDetail.program_name}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Kategori</p>
                  <p className="text-gray-700">
                    {transactionDetail.categories}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Tanggal Pembelian</p>
                  <p className="text-gray-700">
                    {transactionDetail.transaction_time}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Metode Pembayaran</p>
                  <p className="text-gray-700">
                    {transactionDetail.payment_method}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Total Harga</p>
                  <p className="text-gray-700">
                    Rp{" "}
                    {Number(transactionDetail.gross_amount).toLocaleString(
                      "id-ID"
                    )}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Status</p>
                  <p
                    className={`text-sm font-medium ${
                      transactionDetail.transaction_status === "success"
                        ? "text-green-600"
                        : transactionDetail.transaction_status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {transactionDetail.transaction_status}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Inbox;