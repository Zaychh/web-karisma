import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Transaction {
  id: number;
  full_name: string;
  program_name: string;
  gross_amount: number;
  status: "Success" | "Pending" | "Failed";
}

interface TransactionDetail {
  order_id: string;
  full_name: string;
  program_name: string;
  categories: string;
  transaction_time: string;
  payment_method: string;
  gross_amount: number;
  transaction_status: string;
}

export default function TransactionManagement() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetail | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/transactions")
      .then((res) => res.json())
      .then((resData) => {
        if (resData?.data) {
          setTransactions(resData.data as Transaction[]);
        }
      })
      .catch((err) => console.error("Failed to fetch transactions:", err));
  }, []);

  const fetchTransactionDetail = (id: number) => {
    fetch(`http://localhost:3000/api/transactions/${id}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData?.data) {
          setSelectedTransaction(resData.data);
          setShowModal(true);
        }
      })
      .catch((err) => console.error("Failed to fetch transaction detail:", err));
  };

  const filteredData = transactions.filter((item) =>
    `${item.full_name} ${item.program_name} ${item.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Success":
        return "bg-green-500 text-white";
      case "Pending":
        return "bg-yellow-400 text-white";
      case "Failed":
        return "bg-red-500 text-white";
      default:
        return "";
    }
  };

  return (
    <div className="p-8 font-poppins">
      <h1 className="text-2xl font-bold mb-6">Manajemen Transaksi</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Cari nama, program, atau status"
        className="w-full border px-4 py-2 rounded mb-4 shadow"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Nama User</th>
              <th className="py-2 px-4 border">Program</th>
              <th className="py-2 px-4 border">Total Harga</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="py-2 px-4 border">{item.id}</td>
                <td className="py-2 px-4 border">{item.full_name}</td>
                <td className="py-2 px-4 border">{item.program_name}</td>
                <td className="py-2 px-4 border">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(item.gross_amount)}
                </td>
                <td className="py-2 px-4 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-2 px-4 border">
                  <button
                    className="bg-[#4B5563] text-white px-4 py-1 rounded shadow hover:bg-[#374151] cursor-pointer"
                    onClick={() => fetchTransactionDetail(item.id)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Nota */}
      <AnimatePresence>
        {showModal && selectedTransaction && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Background blur transparan */}
            <div
              className="absolute inset-0 backdrop-blur-md bg-white/30"
              onClick={() => setShowModal(false)}
            ></div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white text-black rounded-xl shadow-lg p-8 w-full max-w-md z-10"
            >
              {/* Tombol close */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer text-lg"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>

              {/* Judul */}
              <h2 className="text-2xl font-bold mb-6 text-center">
                Detail Pembelian Program
              </h2>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold">Id Pembelian</p>
                  <p className="text-gray-700">
                    {selectedTransaction.order_id}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Nama Pembeli</p>
                  <p className="text-gray-700">
                    {selectedTransaction.full_name}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Nama Program</p>
                  <p className="text-gray-700">
                    {selectedTransaction.program_name}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Kategori</p>
                  <p className="text-gray-700">
                    {selectedTransaction.categories}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Tanggal Pembelian</p>
                  <p className="text-gray-700">
                    {new Date(
                      selectedTransaction.transaction_time
                    ).toLocaleString("id-ID")}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Metode Pembayaran</p>
                  <p className="text-gray-700">
                    {selectedTransaction.payment_method}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Total Harga</p>
                  <p className="text-gray-700">
                    Rp{" "}
                    {Number(selectedTransaction.gross_amount).toLocaleString(
                      "id-ID"
                    )}
                  </p>
                  <hr className="mt-2 border-gray-300" />
                </div>

                <div>
                  <p className="font-semibold">Status</p>
                  <p
                    className={`text-sm font-medium ${
                      selectedTransaction.transaction_status === "success"
                        ? "text-green-600"
                        : selectedTransaction.transaction_status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedTransaction.transaction_status}
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
}
