import React, { useState } from "react";
import logo from "../../assets/logo.png";

const CourseDetailFrontend = () => {
  const [selected, setSelected] = useState("session1");

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] px-4 py-6 border-r border-gray-700">
              <div className="text-center mb-6">
                  <img src={logo} alt="Logo" className="w-25 mx-auto" />
                  <h2 className="text-lg font-bold leading-tight mt-3">
                      <span className="underline underline-offset-[6px] decoration-[3px] decoration-black-400">
                          Kursus Front-end
                      </span>
                      <br />
                      <span className="underline underline-offset-[6px] decoration-[3px] decoration-black-400">
                          Development
                      </span>
                  </h2>
                  {/* Progress bar */}
                  <div className="mt-4 w-full">
                      <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                          <div className="bg-blue-400 h-full w-[60%]"></div>
                      </div>
                      <p className="text-xs mt-1 text-left">60% Lengkap</p>
                  </div>
              </div>


        <nav className="space-y-4 text-sm">
          <div>
            <p className="text-gray-400 uppercase mb-1">Pendahuluan</p>
            <ul className="ml-2 border-l border-gray-600 pl-3">
              <li
                className={`cursor-pointer ${
                  selected === "pendahuluan" ? "text-green-400 font-semibold" : ""
                }`}
                onClick={() => setSelected("pendahuluan")}
              >
                Pendahuluan
              </li>
            </ul>
          </div>

          <div>
            <p className="text-gray-400 uppercase mb-1">Introduction to HTML</p>
            <ul className="ml-2 border-l border-gray-600 pl-3 space-y-1">
              <li
                className={`cursor-pointer ${
                  selected === "session1" ? "text-green-400 font-semibold" : ""
                }`}
                onClick={() => setSelected("session1")}
              >
                Session 1
              </li>
              <li
                className={`cursor-pointer ${
                  selected === "session2" ? "text-green-400 font-semibold" : ""
                }`}
                onClick={() => setSelected("session2")}
              >
                Session 2
              </li>
              <li
                className={`cursor-pointer ${
                  selected === "session3" ? "text-green-400 font-semibold" : ""
                }`}
                onClick={() => setSelected("session3")}
              >
                Session 3
              </li>
            </ul>
          </div>

          <div>
            <p className="text-gray-400 uppercase mb-1">Basic of HTML</p>
            <ul className="ml-2 border-l border-gray-600 pl-3">
              <li
                className={`cursor-pointer ${
                  selected === "basic" ? "text-green-400 font-semibold" : ""
                }`}
                onClick={() => setSelected("basic")}
              >
                Basic of HTML
              </li>
            </ul>
          </div>

          <div>
            <p className="text-gray-400 uppercase mb-1">Intermediate HTML</p>
            <ul className="ml-2 border-l border-gray-600 pl-3">
              <li
                className={`cursor-pointer ${
                  selected === "intermediate" ? "text-green-400 font-semibold" : ""
                }`}
                onClick={() => setSelected("intermediate")}
              >
                Intermediate HTML
              </li>
            </ul>
          </div>

          <div>
            <p className="text-gray-400 uppercase mb-1">Tugas</p>
            <ul className="ml-2 border-l border-gray-600 pl-3">
              <li
                className={`cursor-pointer ${
                  selected === "tugas" ? "text-green-400 font-semibold" : ""
                }`}
                onClick={() => setSelected("tugas")}
              >
                Tugas
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-2">
          {selected === "pendahuluan"
            ? "Pendahuluan"
            : ["session1", "session2", "session3"].includes(selected)
            ? "Introduction to HTML"
            : selected === "basic"
            ? "Basic of HTML"
            : selected === "intermediate"
            ? "Intermediate HTML"
            : "Tugas"}
        </h1>

        <p className="text-lg mb-6">
          {selected === "session1"
            ? "Session 1"
            : selected === "session2"
            ? "Session 2"
            : selected === "session3"
            ? "Session 3"
            : null}
        </p>

       {/* Main Content Area */}
{selected === "tugas" ? (
  <div className="bg-[#111111] border border-gray-600 rounded-lg p-6 space-y-4">
    <h2 className="text-xl font-bold">Pertanyaan 1</h2>
    <p className="text-sm text-gray-300 leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    </p>

    <div className="border border-gray-500 rounded-md py-10 px-4 text-center cursor-pointer hover:border-yellow-400 transition">
      <p className="text-gray-400 text-sm">
        📎 Letakkan dokumenmu disini atau klik untuk mencari
      </p>
      <input type="file" className="hidden" />
    </div>
  </div>
) : (
  <div className="bg-gray-300 w-full h-[300px] md:h-[400px] rounded-lg flex items-center justify-center text-black text-lg font-semibold">
    Video
  </div>
)}

      </main>
    </div>
  );
};

export default CourseDetailFrontend;
