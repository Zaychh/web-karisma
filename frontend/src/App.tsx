import { Routes, Route } from "react-router-dom";
import Landing from "./sections/Landing/Landing";
import About from "./sections/Tentang/page";
import Login from "./sections/LoginRegister/Login"
import Dashboard from "./sections/Dashboard/pages";
import Register from "./sections/LoginRegister/register";
import Bootcamp from "./sections/Bootcamp/page";
import BootcampDetail from "./sections/Bootcamp/BootcampDetail";
import FreeClass from "./sections/Free-Class/page";
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
        <Route path="/Bootcamp" element={<Bootcamp />} />
        <Route path="/Bootcamp/:slug" element={<BootcampDetail />} />
        <Route path="/Free-Class" element={<FreeClass />} />
      </Routes>
    </>
  );
}

export default App;
