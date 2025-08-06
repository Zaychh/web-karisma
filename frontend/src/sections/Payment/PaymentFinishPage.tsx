import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const BASE_API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const PaymentFinishPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [status, setStatus] = useState<string>("checking");

  const orderId = searchParams.get("order_id");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(
          `${BASE_API_URL}/payment/status/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const transactionStatus = response.data.data.transaction_status;
          console.log("✅ Transaction status dari DB:", transactionStatus);

          if (["success"].includes(transactionStatus)) {
            Swal.fire({
              toast: true,
              icon: "success",
              title: "Pembayaran berhasil. Selamat belajar!",
              position: "top-end",
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true,
            });

            navigate("/dashboard");
          } else if (transactionStatus === "pending") {
            setStatus("pending");
          } else if (
            ["failed", "expire", "cancel"].includes(transactionStatus)
          ) {
            setStatus("failed");
          } else {
            setStatus("unknown");
          }
        } else {
          setStatus("not_found");
        }
      } catch (err) {
        console.error("Gagal cek status pembayaran", err);
        setStatus("error");
      }
    };

    if (orderId) {
      fetchStatus();
    } else {
      setStatus("missing_order");
    }
  }, [orderId, token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-abyssal">
      {status === "checking" && <p>🔍 Memeriksa status pembayaran...</p>}
      {status === "pending" && (
        <p>⏳ Pembayaran masih diproses. Silakan cek kembali nanti.</p>
      )}
      {status === "not_found" && <p>❌ Transaksi tidak ditemukan.</p>}
      {status === "failed" && (
        <p>❌ Pembayaran gagal, dibatalkan, atau telah kadaluarsa.</p>
      )}
      {status === "unknown" && <p>⚠️ Status pembayaran tidak dikenali.</p>}
      {status === "error" && <p>⚠️ Gagal memeriksa transaksi.</p>}
      {status === "missing_order" && <p>⚠️ Order ID tidak tersedia.</p>}
    </div>
  );
};

export default PaymentFinishPage;
