import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { oldPassword: "", newPassword: "", confirmPassword: "" };
    let valid = true;

    if (!oldPassword) {
      newErrors.oldPassword = "Old Password, harus diisi";
      valid = false;
    }

    if (newPassword.length < 8) {
      newErrors.newPassword = "New Password, minimal harus 8 karakter";
      valid = false;
    }

    if (confirmPassword.length < 8 || confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Confirm New Password, minimal harus 8 karakter dan sama dengan New Password";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "/api/user/change-password",
        { oldPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Password berhasil diubah");
      navigate("/profile/setting");
    } catch (err) {
      console.error("Gagal mengubah password", err);
      alert("Gagal mengubah password");
    }
  };

  return (
    <div className="min-h-screen bg-ashh text-white font-poppins flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-ashh border border-white rounded-xl p-8 max-w-2xl w-full"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Change Password</h1>

        <div className="space-y-4">
          {/* Old Password */}
          <div>
            <label className="block mb-1">Old Password</label>
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className={`w-full bg-ashh border ${errors.oldPassword ? "border-red-500" : "border-white"} text-white p-3 rounded pr-10`}
              />
              <span
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>}
          </div>

          {/* New Password */}
          <div>
            <label className="block mb-1">New Password <span className="text-sm">(maks. 24 karakter)</span></label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                maxLength={24}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full bg-ashh border ${errors.newPassword ? "border-red-500" : "border-white"} text-white p-3 rounded pr-10`}
              />
              <span
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1">Confirm New Password <span className="text-sm">(maks. 24 karakter)</span></label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                maxLength={24}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full bg-ashh border ${errors.confirmPassword ? "border-red-500" : "border-white"} text-white p-3 rounded pr-10`}
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-6 py-2 rounded cursor-pointer"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/profile/setting")}
            className="bg-white text-black px-6 py-2 rounded font-semibold cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
