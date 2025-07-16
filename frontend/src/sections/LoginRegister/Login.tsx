import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import mascot from '../../assets/mascot.png';
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // install ini

interface DecodedToken {
  username: string;
  role: 'admin' | 'user';
  exp: number;
}

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier.trim()) {
      alert('Username atau Email tidak boleh kosong!');
      return;
    }

    if (!password.trim()) {
      alert('Password tidak boleh kosong!');
      return;
    }

    try {
      const res = await login(identifier, password);
      const token = res.data.token;

      localStorage.setItem('token', token);

      // Decode token untuk ambil role
      const decoded = jwtDecode<DecodedToken>(token);

      if (decoded.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Login gagal:', err);
      alert(err.response?.data?.message || 'Login gagal! Periksa kembali data Anda.');
    }
  };

  return (
    <div className="flex w-[900px] h-[500px] bg-white rounded-[10px] overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.1)] mx-auto mt-[50px] font-sans">
      <div className="flex-1 p-[50px]">
        <h1 className="text-[2.5em] font-bold mb-[40px]">Sign In</h1>
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
          >
            Sign In
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
