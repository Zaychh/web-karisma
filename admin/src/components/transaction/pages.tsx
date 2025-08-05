import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialData } from "../transaction/interface";

export default function TransactionManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Tambahkan

  const filteredData = initialData.filter((item) =>
    `${item.user} ${item.program} ${item.status}`
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
    <div className="p-8">
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
                <td className="py-2 px-4 border">{item.user}</td>
                <td className="py-2 px-4 border">{item.program}</td>
                <td className="py-2 px-4 border">{item.price}</td>
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
                    className="bg-[#4B5563] text-white px-4 py-1 rounded shadow hover:bg-[#374151]"
                    onClick={() => navigate(`/transaction/${item.id}`)} // <-- Ini penting
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
