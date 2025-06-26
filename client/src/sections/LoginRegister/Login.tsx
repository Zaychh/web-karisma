import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import mascot from '../../assets/mascot.png';
import { login } from '../../services/auth';

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  
const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('State before login:', identifier, password);
    console.log('Identifier length:', identifier.length);
    console.log('Password length:', password.length);

    if (!identifier.trim()) {
      alert('Username atau Email tidak boleh kosong!');
      return;
    }

    if (!password.trim()) {
      alert('Password tidak boleh kosong!');
      return;
    }

    try {
      console.log('Mencoba login dengan:', identifier, password);
      const res = await login(identifier, password);
      localStorage.setItem('token', res.data.token);
      alert('Login berhasil!');
    } catch (err: any) {
      console.log('Login gagal! mencoba login dengan:', identifier, password);
      console.error('Full Error:', err);
      alert(err.response?.data?.error || 'Login gagal!');
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
                name='identifier'
                placeholder="Username atau Email"
                required
                value={identifier}
                onChange={(e) => {
                  console.log('Identifier changed:', e.target.value);
                  setIdentifier(e.target.value);
                }}
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
                value={password}
                 onChange={(e) => {
                        console.log('Password changed:', e.target.value); // DEBUG
                        setPassword(e.target.value);
                 }}
                required
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
            onClick={() => console.log('Button clicked, current state:', { identifier, password })}
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
