import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const ProfileLayout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-60">
                <Outlet />
            </div>
        </div>
    );
};

export default ProfileLayout;