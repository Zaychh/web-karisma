import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/AuthContext';

import GuestLayout from "./components/layouts/GuestLayout";
import AuthLayout from "./components/layouts/AuthLayout";

import Landing from "./sections/Landing/Landing";
import About from "./sections/Tentang/page";
import Login from "./sections/LoginRegister/Login"
import Dashboard from "./sections/Dashboard/pages";
import Inventory from "./sections/Dashboard/Inventory/pages";
import Register from "./sections/LoginRegister/register";
import Bootcamp from "./sections/Bootcamp/page";
import BootcampDetail from "./sections/Bootcamp/BootcampDetail";
import FreeClass from "./sections/Free-Class/page";
import FreeClassDetail from "./sections/Free-Class/FreeclassDetail";
import Blog from "./sections/Blog/page";
import BlogDetail from "./sections/Blog/BlogDetail";

import ProfileLayout from "./sections/My-Profile/pages";
import MyProfile from "./sections/My-Profile/myprofile";
import Inbox from "./sections/My-Profile/inbox";
import Setting from "./sections/My-Profile/setting";
import EditProfile from "./sections/My-Profile/edit-profile";
import ChangePassword from "./sections/My-Profile/change-password";

import PaymentForm from "./sections/Payment/PaymentForm";
import PaymentFinishPage from './sections/Payment/PaymentFinishPage';

import DetailProgram from './sections/Dashboard/DetailProgram/pages';
import Materi from './sections/Dashboard/DetailProgram/materi';

// Interface untuk props
interface RouteProps {
  children: React.ReactNode;
}

// Protected Route Component
const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (untuk route yang hanya bisa diakses ketika belum login)
const PublicRoute: React.FC<RouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }
  
  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

// Main App Routes Component
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes - hanya bisa diakses ketika belum login */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Protected Routes - hanya bisa diakses ketika sudah login */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AuthLayout>
              <Dashboard />
            </AuthLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <AuthLayout>
              <Inventory />
            </AuthLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/bootcamp"
        element={
          <ProtectedRoute>
            <AuthLayout>
              <Bootcamp />
            </AuthLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/bootcamp/:slug"
        element={
          <ProtectedRoute>
            <AuthLayout>
              <BootcampDetail />
            </AuthLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/free-class"
        element={
          <ProtectedRoute>
            <AuthLayout>
              <FreeClass />
            </AuthLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/free-class/:slug"
        element={
          <ProtectedRoute>
            <AuthLayout>
              <FreeClassDetail />
            </AuthLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/blog"
        element={
          <ProtectedRoute>
            <AuthLayout>
              <Blog />
            </AuthLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/blog/detail/:slug"
        element={
          <ProtectedRoute>
            <AuthLayout>
              <BlogDetail />
            </AuthLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/tentang-kami"
        element={
          <ProtectedRoute>
            <AuthLayout>
              <About />
            </AuthLayout>
          </ProtectedRoute>
        }
      />

      {/* Profile Routes dengan Nested Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AuthLayout>
              <ProfileLayout />
            </AuthLayout>
          </ProtectedRoute>
        }
      >
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="setting" element={<Setting />} />
      </Route>

      <Route
        path="/profile/edit-profile"
        element={
          <ProtectedRoute>
            <AuthLayout>
              <EditProfile />
            </AuthLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/change-password"
        element={
          <ProtectedRoute>
            <AuthLayout>
              <ChangePassword />
            </AuthLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-program/:id"
        element={
          <ProtectedRoute>
            <DetailProgram />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="materi" replace />} />
        <Route path="materi" element={<Materi />} />
      </Route>

      {/* Payment Route - bisa diakses semua user */}
      <Route path="/pembayaran" element={<PaymentForm />} />
      <Route path="/payment/finish" element={<PaymentFinishPage />} />

      {/* Guest Routes dengan GuestLayout */}
      <Route
        path="/"
        element={
          <GuestLayout>
            <Landing />
          </GuestLayout>
        }
      />

      <Route
        path="/home"
        element={
          <GuestLayout>
            <Landing />
          </GuestLayout>
        }
      />

      {/* Guest routes untuk yang belum login */}
      <Route
        path="/guest/tentang-kami"
        element={
          <GuestLayout>
            <About />
          </GuestLayout>
        }
      />

      <Route
        path="/guest/bootcamp"
        element={
          <GuestLayout>
            <Bootcamp />
          </GuestLayout>
        }
      />

      <Route
        path="/guest/bootcamp/:slug"
        element={
          <GuestLayout>
            <BootcampDetail />
          </GuestLayout>
        }
      />

      <Route
        path="/guest/free-class"
        element={
          <GuestLayout>
            <FreeClass />
          </GuestLayout>
        }
      />

      <Route
        path="/guest/free-class/:slug"
        element={
          <GuestLayout>
            <FreeClassDetail />
          </GuestLayout>
        }
      />

      <Route
        path="/guest/blog"
        element={
          <GuestLayout>
            <Blog />
          </GuestLayout>
        }
      />

      <Route
        path="/guest/blog/detail/:slug"
        element={
          <GuestLayout>
            <BlogDetail />
          </GuestLayout>
        }
      />

      {/* Catch all route - redirect ke dashboard jika login, ke home jika belum */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
};

export default App;