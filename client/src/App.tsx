import { Routes, Route } from "react-router-dom";
import Landing from "./sections/Landing/Landing";
import About from "./sections/Tentang/page";
import Login from "./sections/LoginRegister/Login";
import Register from "./sections/LoginRegister/register"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Landing />} />
        <Route path="/tentang-kami" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign Up" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
