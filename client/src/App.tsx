import { Routes, Route } from "react-router-dom";
import Landing from "./sections/Landing/Landing";
import About from "./sections/Tentang/page";
import Dashboard from "./sections/Dashboard/pages";
import DashAdmin from "../../admin/src/Dashboard";
import Bootcamp from "./sections/Bootcamp/page";
import BootcampDetail from "./sections/Bootcamp/BootcampDetail";
import FreeClass from "./sections/Free-Class/page";
import Login from "./sections/LoginRegister/Login";
import Register from "./sections/LoginRegister/register";
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Landing />} />
        <Route path="/tentang-kami" element={<About />} />
        <Route path="/bootcamp" element={<Bootcamp />} />
        <Route path="/bootcamp/:slug" element={<BootcampDetail />} />
        <Route path="/free-class" element={<FreeClass />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<DashAdmin />} />
      </Routes>
    </>
  );
}

export default App;
