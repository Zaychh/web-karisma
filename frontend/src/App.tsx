import { Routes, Route } from "react-router-dom";
import Landing from "./sections/Landing/Landing";
import About from "./sections/Tentang/page";
import Login from "./sections/LoginRegister/Login"
import Dashboard from "./sections/Dashboard/pages";
import Register from "./sections/LoginRegister/register";
import Bootcamp from "./sections/Bootcamp/page";
import BootcampDetail from "./sections/Bootcamp/BootcampDetail";
import FreeClass from "./sections/Free-Class/page";
import FreeClassDetail from "./sections/Free-Class/FreeclassDetail";

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
        <Route path="/free-class/:slug" element={<FreeClassDetail />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
