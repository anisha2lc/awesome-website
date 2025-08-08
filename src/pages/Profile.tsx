import { useState } from "react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout, updateUser } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user?.email || "");
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone?.toString() || "");
  const [role] = useState(user?.role || "viewer");

  const isViewer = user?.role === "viewer";

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-600">
        You are not logged in.
      </div>
    );
  }

  const handleSave = () => {
    const updatedUser = {
      ...user,
      email,
      fullname,
      address,
      phone: phone ? parseInt(phone) : undefined,
    };
    
    // Update the store
    updateUser(updatedUser);
    alert("✅ Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5ff] to-[#e5e5fa] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl rounded-3xl shadow-2xl backdrop-blur-xl bg-white/60 border border-white/30 p-10 transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-[#4E42D9]">My Profile</h2>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              role === "admin"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {role.toUpperCase()}
          </span>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                disabled={isViewer}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4E42D9] shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isViewer}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4E42D9] shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={isViewer}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4E42D9] shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isViewer}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4E42D9] shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              type="submit"
              onClick={handleSave}
              disabled={isViewer}
              className={`w-full py-3 rounded-xl text-white font-semibold shadow-md transition-transform duration-200 ${
                isViewer
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#4E42D9] hover:bg-[#3e35b5] hover:scale-105"
              }`}
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="w-full py-3 rounded-xl text-white font-semibold bg-red-500 hover:bg-red-600 hover:scale-105 transition-transform duration-200"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;