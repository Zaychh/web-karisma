import { Link } from "react-router-dom";

import Profil from "../../assets/prof.png";
import Password from "../../assets/pass.png";

const Setting = () => {
  return (
    <div className="flex min-h-screen bg-ashh text-white font-poppins">
      {/* Spacer untuk sidebar (karena pakai fixed) */}
      <div className="w-20" />

      <div className="flex-1 py-10 px-8">
        <h1 className="text-4xl font-bold mb-10">Setting</h1>

        <div className="flex gap-8">
          {/* Card: Edit Profile */}
          <div className="bg-white text-black rounded-xl p-6 w-72 flex flex-col items-start shadow">
            <img src={Profil} alt="My Profile" className="w-16 h-16 mb-4" />
            <h2 className="text-2xl font-bold mb-1">My Profile</h2>
            <p className="text-lg text-gray-700 mb-4">Edit your profil</p>
            <Link
              to="/profile/edit-profile"
              className="w-full text-center px-4 py-2 border-2 border-black rounded-full font-semibold hover:bg-black hover:text-white transition"
            >
              Edit Now
            </Link>
          </div>

          {/* Card: Change Password */}
          <div className="bg-white text-black rounded-xl p-6 w-72 flex flex-col items-start shadow">
            <img src={Password} alt="Password" className="w-16 h-16 mb-4" />
            <h2 className="text-2xl font-bold mb-1">My Password</h2>
            <p className="text-lg text-gray-700 mb-4">Change your password</p>
            <Link
              to="/profile/change-password"
              className="w-full text-center px-4 py-2 border-2 border-black rounded-full font-semibold hover:bg-black hover:text-white transition"
            >
              Change Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Setting;
