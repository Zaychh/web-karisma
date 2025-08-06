import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

interface PaymentState {
  title: string;
  price: number;
  slug: string;
  program_id: number;
}

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  
  // Get data dari location state
  const paymentData = location.state as PaymentState;
  const { title, price, slug, program_id } = paymentData || {};

  const [loading, setLoading] = useState(false);
  const [snapLoaded, setSnapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check authentication
  useEffect(() => {
    if (!user || !token) {
      navigate('/login', { 
        state: { 
          from: location.pathname,
          message: 'Silakan login terlebih dahulu untuk melanjutkan pembayaran' 
        }
      });
      return;
    }

    // Check if payment data exists
    if (!paymentData || !title || !price || !program_id) {
      navigate('/bootcamp', {
        state: { 
          message: 'Data pembayaran tidak valid. Silakan pilih program kembali.' 
        }
      });
      return;
    }
  }, [user, token, paymentData, navigate, location.pathname, title, price, program_id]);

  // Load Midtrans Snap script
  useEffect(() => {
    const loadSnapScript = () => {
      if (window.snap) {
        setSnapLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
      script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
      script.onload = () => {
        console.log('✅ Midtrans Snap loaded');
        setSnapLoaded(true);
      };
      script.onerror = () => {
        console.error('❌ Failed to load Midtrans Snap');
        setError('Gagal memuat sistem pembayaran. Silakan refresh halaman.');
      };
      
      document.head.appendChild(script);
    };

    loadSnapScript();

    // Cleanup function
    return () => {
      // Remove script jika component unmount
      const script = document.querySelector('script[src*="snap.js"]');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handlePay = async () => {
    if (!snapLoaded) {
      setError('Sistem pembayaran belum siap. Silakan tunggu sebentar.');
      return;
    }

    if (!user || !token) {
      setError('Anda harus login terlebih dahulu.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('🔄 Creating payment...', {
        program_id,
        title,
        price,
        user: user.name
      });

      const response = await axios.post(
        `${BASE_API_URL}/payment`,
        {
          program_id: program_id,
          full_name: user.name,
          email: user.email,
          phone: user.phone || '081234567890', // fallback jika phone kosong
          program_name: title,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('✅ Payment created:', response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Gagal membuat pembayaran');
      }

      const { redirect_url } = response.data.data;

      if (!redirect_url) {
        throw new Error('Link pembayaran tidak ditemukan');
      }

      window.location.href = redirect_url;

    } catch (error: any) {
      console.error('❌ Payment creation failed:', error);
      
      let errorMessage = 'Gagal memulai pembayaran. Silakan coba lagi.';
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          errorMessage = 'Sesi Anda telah berakhir. Silakan login kembali.';
          navigate('/login');
          return;
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Loading state saat belum ada data
  if (!user || !paymentData) {
    return (
      <div className="min-h-screen bg-abyssal text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rosegold mx-auto mb-4"></div>
          <p>Memuat data pembayaran...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-abyssal text-white flex items-center justify-center p-8">
      <div className="bg-ashh p-10 rounded-xl w-full max-w-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Form Pembayaran</h2>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Snap Loading Status */}
        {!snapLoaded && (
          <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-200 px-4 py-3 rounded mb-6">
            <p className="text-sm">Memuat sistem pembayaran...</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nama Lengkap</label>
            <input 
              disabled 
              className="w-full p-3 rounded bg-gray-700 text-gray-300" 
              value={user.name || ""} 
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input 
              disabled 
              className="w-full p-3 rounded bg-gray-700 text-gray-300" 
              value={user.email || ""} 
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">No HP</label>
            <input 
              disabled 
              className="w-full p-3 rounded bg-gray-700 text-gray-300" 
              value={user.phone || "Belum diisi"} 
            />
            {!user.phone && (
              <p className="text-xs text-yellow-400 mt-1">
                * Anda dapat mengupdate nomor HP di halaman profil
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Nama Program</label>
            <input 
              className="w-full p-3 rounded bg-gray-800 text-white" 
              value={title} 
              readOnly 
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Harga</label>
            <input
              className="w-full p-3 rounded bg-gray-800 text-white font-semibold"
              value={price?.toLocaleString("id-ID", { 
                style: "currency", 
                currency: "IDR" 
              })}
              readOnly
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-8">
          <Link
            to={`/bootcamp/${slug}`}
            className="w-full text-center border border-white text-white py-3 rounded font-semibold hover:bg-gray-600 transition duration-200"
          >
            Batal
          </Link>
          
          <button
            disabled={loading || !snapLoaded}
            onClick={handlePay}
            className={`w-full py-3 rounded font-semibold transition duration-200 ${
              loading || !snapLoaded
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-rosegold hover:bg-pink-500 text-black'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            ) : !snapLoaded ? (
              'Memuat...'
            ) : (
              'Bayar Sekarang'
            )}
          </button>
        </div>

        {/* Payment Methods Info */}
        <div className="mt-6 p-4 bg-gray-800 rounded">
          <h4 className="text-sm font-semibold mb-2">Metode Pembayaran Tersedia:</h4>
          <p className="text-xs text-gray-400">
            Virtual Account (BCA, BNI, BRI, Mandiri), E-Wallet (GoPay, OVO, DANA), 
            Kartu Kredit/Debit, dan Minimarket (Indomaret, Alfamart)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;