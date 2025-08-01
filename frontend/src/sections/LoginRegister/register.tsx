import React, { useState } from 'react';
import { User, Lock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { register } from '../../services/auth';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (submitStatus === 'error') {
      setSubmitStatus(null);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting || submitStatus === 'success') return;

    if (!formData.name || !formData.email || !formData.password) {
      setSubmitStatus('error');
      setErrorMessage('Semua field wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      await register(
        formData.name,
        formData.email,
        formData.password
      );

      console.log('Form Submitted:', formData);
      setSubmitStatus('success');

      setTimeout(() => {
        window.location.href = '/Login';
      }, 2000);
    } catch (err: any) {
      console.log('Register gagal!', err);
      setSubmitStatus('error');
      setErrorMessage(err.response?.data?.message || 'Registrasi gagal! Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen shadow-[0_5px_15px_rgba(0,0,0,0.1)] bg-gray-100">
      <div className="flex w-[900px] bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 bg-gradient-to-br from-[#5d69c0] via-[#2b3990] to-[#112151] flex items-center justify-center p-6">
          <div className="text-center text-white">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Join Us Today!</h3>
            <p className="text-blue-100">Create your account and get started</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-6">
            Create
            <br />
            Account
          </h2>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center">
              <CheckCircle className="mr-2 w-5 h-5" />
              <span>Registrasi berhasil! Mengalihkan ke halaman login...</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
              <AlertCircle className="mr-2 w-5 h-5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Start */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-gray-100 focus-within:border-blue-500 focus-within:bg-white transition-colors">
                <User className="text-gray-400 mr-2 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Username"
                  className="bg-transparent outline-none w-full"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-gray-100 focus-within:border-blue-500 focus-within:bg-white transition-colors">
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
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                  className="bg-transparent outline-none w-full"
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-gray-100 focus-within:border-blue-500 focus-within:bg-white transition-colors">
                <Lock className="text-gray-400 mr-2 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Password"
                  className="bg-transparent outline-none w-full"
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className={`w-full mt-6 font-semibold py-3 rounded-md transition-all duration-200 flex items-center justify-center ${
                isSubmitting || submitStatus === 'success'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-700 hover:bg-blue-800 hover:shadow-lg transform hover:-translate-y-0.5'
              } text-white`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 w-5 h-5" />
                  Mendaftarkan...
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <CheckCircle className="mr-2 w-5 h-5" />
                  Berhasil!
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Sudah punya akun?{' '}
            <a href="/Login" className="text-blue-600 hover:underline font-medium transition-colors">
              Masuk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
