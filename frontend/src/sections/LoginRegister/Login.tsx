import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import mascot from '../../assets/mascot.png';
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // install ini
import { useAuth } from '../../contexts/AuthContext'; // ⬅️ Import context

interface DecodedToken {
  user_id: number;
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  exp: number;
}

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = useAuth(); // akses context

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!identifier.trim()) {
      alert('Username atau Email tidak boleh kosong!');
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      alert('Password tidak boleh kosong!');
      setIsLoading(false);
      return;
    }

    try {
      const response = await login(identifier, password);

        if (response.data.success) {
        const token = response.data.token;

      // Simpan via context (bukan langsung localStorage)
      auth.login(token);

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.data.user));


      // Decode token untuk ambil role
      const decoded = jwtDecode<DecodedToken>(token);

      if (decoded.role === 'admin') {
        window.location.href = 'http://localhost:5174/dashboard';
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(response.data.message || 'Login gagal!');
    }
    } catch (err: any) {
      console.error('Login gagal:', err);

     if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 401) {
        setError('Email/Username atau password salah!');
      } else if (err.response?.status === 500) {
        setError('Terjadi kesalahan server. Silakan coba lagi.');
      } else {
        setError('Terjadi kesalahan. Periksa koneksi internet Anda.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-[900px] h-[500px] bg-white rounded-[10px] overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.1)] mx-auto mt-[50px] font-sans">
      <div className="flex-1 p-[50px]">
        <h1 className="text-[2.5em] font-bold mb-[40px]">Sign In</h1>
        
        {error && (
          <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-[20px]">
            <label className="flex items-center border-[1.5px] border-black rounded-full px-[15px] py-[10px] gap-[10px]">
              <FaUser />
              <input
                type="text"
                name="identifier"
                placeholder="Username atau Email"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={isLoading}
                className="flex-1 outline-none bg-transparent text-base"
              />
            </label>
          </div>

          <div className="mb-[20px]">
            <label className="flex items-center border-[1.5px] border-black rounded-full px-[15px] py-[10px] gap-[10px]">
              <FaLock />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="flex-1 outline-none bg-transparent text-base"
              />
            </label>
          </div>
          
          <div className="mb-[20px] text-sm">
            Belum punya akun?{' '}
            <a href="/Register" className="text-blue-700 underline">
              Buat Akun
            </a>
          </div>
          <button
            type="submit"
            className="bg-[#16238D] text-white py-[12px] px-[30px] rounded-full text-base hover:bg-[#0f1b6b] transition-all"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Login'}
          </button>
        </form>
      </div>
      <div className="flex-1 bg-gradient-to-b from-[#5d69c0] via-[#2b3990] to-[#112151] flex items-center justify-center">
        <img src={mascot} alt="Characters" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default Login;
