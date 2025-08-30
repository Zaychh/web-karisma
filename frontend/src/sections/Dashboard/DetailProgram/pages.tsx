// components/DetailProgram/pages.tsx
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

export default function DetailProgram() {
  return (
    <div className="flex">
      <div className="w-72 shrink-0">
        {" "}
        {/* 72 = 18rem */}
        <Sidebar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
