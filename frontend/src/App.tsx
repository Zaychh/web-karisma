import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

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

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <AuthLayout>
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Inventory" element={<Inventory />} />
            <Route path="/bootcamp" element={<Bootcamp />} />
            <Route path="/bootcamp/:slug" element={<BootcampDetail />} />
            <Route path="/free-class" element={<FreeClass />} />
            <Route path="/free-class/:slug" element={<FreeClassDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/detail/:slug" element={<BlogDetail />} />
            <Route path="/tentang-kami" element={<About />} />

            {/* 🧩 Nested route untuk Profile */}
            <Route path="/profile" element={<ProfileLayout />}>
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="setting" element={<Setting />} />
            </Route>
              <Route path="/profile/edit-profile" element={<EditProfile />} />
              <Route path="/profile/change-password" element={<ChangePassword />} />
          </Routes>
        </AuthLayout>
      ) : (
        <>
          <Routes>
            {/* Tanpa Layout */}
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/pembayaran" element={<PaymentForm />} />
            {/* Guest Layout (Landing, Bootcamp, Blog, dll) */}
            <Route
              path="/*"
              element={
                <GuestLayout>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/Home" element={<Landing />} />
                    <Route path="/tentang-kami" element={<About />} />
                    <Route path="/bootcamp" element={<Bootcamp />} />
                    <Route
                      path="/bootcamp/:slug"
                      element={<BootcampDetail />}
                    />
                    <Route path="/free-class" element={<FreeClass />} />
                    <Route
                      path="/free-class/:slug"
                      element={<FreeClassDetail />}
                    />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/detail/:slug" element={<BlogDetail />} />
                  </Routes>
                </GuestLayout>
              }
            />
          </Routes>
        </>
      )}
    </>
  );
}


export default App;
