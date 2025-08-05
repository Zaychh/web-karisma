import React, { useState } from 'react';
import { User, Lock, Loader2, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { register } from '../../services/auth';
import axios from 'axios';

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

  const validateForm = () => {
    if (!formData.name.trim()) {
      return 'Nama tidak boleh kosong';
    }
    if (formData.name.trim().length < 2) {
      return 'Nama minimal 2 karakter';
    }
    if (!formData.email.trim()) {
      return 'Email tidak boleh kosong';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Format email tidak valid';
    }
    if (!formData.password) {
      return 'Password tidak boleh kosong';
    }
    if (formData.password.length < 6) {
      return 'Password minimal 6 karakter';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting || submitStatus === 'success') return;

    // Validasi form
    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus('error');
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const response = await register(
        formData.name.trim(),
        formData.email.trim().toLowerCase(),
        formData.password
      );

      console.log('✅ Registration successful:', response.data);
      setSubmitStatus('success');

      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
      });

      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      
    } catch (err: any) {
      console.error('❌ Registration failed:', err);
      setSubmitStatus('error');
      
      // Improved error handling
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // Server responded with error status
          const status = err.response.status;
          const message = err.response.data?.message || err.response.data?.error;
          
          switch (status) {
            case 400:
              setErrorMessage(message || 'Data yang dikirim tidak valid');
              break;
            case 409:
              setErrorMessage('Email sudah terdaftar. Gunakan email lain.');
              break;
            case 500:
              setErrorMessage('Terjadi kesalahan server. Silakan coba lagi nanti.');
              break;
            default:
              setErrorMessage(message || `Error ${status}: Registrasi gagal`);
          }
        } else if (err.request) {
          // Network error
          setErrorMessage('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
        } else {
          setErrorMessage('Terjadi kesalahan yang tidak diketahui.');
        }
      } else {
        setErrorMessage('Registrasi gagal! Silakan coba lagi.');
      }
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
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-start">
              <AlertCircle className="mr-2 w-5 h-5 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{errorMessage}</span>
            </div>
          )}

          {/* Form Start */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 focus-within:border-blue-500 focus-within:bg-white transition-colors">
                <User className="text-gray-400 mr-2 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan username"
                  className="bg-transparent outline-none w-full"
                  required
                  disabled={isSubmitting}
                  minLength={2}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 focus-within:border-blue-500 focus-within:bg-white transition-colors">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="contoh@email.com"
                  className="bg-transparent outline-none w-full"
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 focus-within:border-blue-500 focus-within:bg-white transition-colors">
                <Lock className="text-gray-400 mr-2 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Minimal 6 karakter"
                  className="bg-transparent outline-none w-full"
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  minLength={6}
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