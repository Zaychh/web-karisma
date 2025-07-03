import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./sections/Landing/Landing";
import About from "./sections/Tentang/page";
import Login from "./sections/LoginRegister/Login";
import DashboardRouter from "./sections/dashboard/DashboardRouter";
import CourseDetailFrontend from "./sections/dashboard/CourseDetailFrontend";
import CourseDetailMysql from "./sections/dashboard/CourseDetailMysql";
import CourseDetailLaravel from "./sections/dashboard/CourseDetailLaravel";
import Register from "./sections/LoginRegister/register";
import Dashboard from "./sections/dashboard/pages";
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Landing />} />
        <Route path="/tentang-kami" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<DashboardRouter />} />
        <Route path="/dashboard/kursus/frontend" element={<CourseDetailFrontend />} />
        <Route path="/dashboard/kursus/mysql" element={<CourseDetailMysql/>} />
        <Route path="/dashboard/kursus/laravel" element={<CourseDetailLaravel/>}/>
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
