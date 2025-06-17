import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import mascot from '../../assets/mascot.png';

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen shadow-[0_5px_15px_rgba(0,0,0,0.1)] bg-gray-100">
      <div className="flex w-[900px] bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left Side - Illustration */}
        <div className="w-1/2 bg-gradient-to-br from-[#5d69c0] via-[#2b3990] to-[#112151] flex items-center justify-center p-6">
          <img src={mascot} alt="Characters" className="max-w-full h-auto" />
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-6">
            Create
            <br />
            Account
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-gray-100">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Username"
                  className="bg-transparent outline-none w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-gray-100">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-transparent outline-none w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-gray-100">
                <svg
                  className="w-5 h-5 text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent outline-none w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-md"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Sudah punya akun?{' '}
            <a href="/Login" className="text-blue-600 hover:underline">
              Masuk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
