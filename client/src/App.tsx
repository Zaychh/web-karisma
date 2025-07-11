import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./sections/Landing/Landing";
import About from "./sections/Tentang/page";
import Login from "./sections/LoginRegister/Login"
import Dashboard from "./sections/Dashboard/pages";
import Register from "./sections/LoginRegister/register";
import DashAdmin from "../../admin/src/Dashboard";
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Landing />} />
        <Route path="/tentang-kami" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<DashAdmin />} />
      </Routes>
    </>
  );
}

export default App;
