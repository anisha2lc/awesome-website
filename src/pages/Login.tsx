import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import clsx from "clsx";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    username: false,
    password: false,
  });

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newFieldErrors = {
      username: username.trim() === "",
      password: password.trim() === "",
    };
    setFieldErrors(newFieldErrors);

    if (newFieldErrors.username || newFieldErrors.password) {
      setError(
        "Please fill in all the fields properly before submitting the form."
      );
      return;
    }

    const success = login(username, password);
    console.log(newFieldErrors, "newFieldErrors");
    if (!success) {
      setError("Invalid credentials. Please try again.");
      setFieldErrors({ username: true, password: true });
      return;
    }

    const role = useAuthStore.getState().user?.role;
    localStorage.setItem("role", role || "");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center mb-6">
          <img src="wallpaper.svg" alt="Food" className="w-24 h-24" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign in to your account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Email or Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setFieldErrors((prev) => ({ ...prev, username: false }));
                setError("");
              }}
              className={clsx(
                "w-full px-4 py-3 border rounded-lg focus:outline-none transition focus:ring-2",
                fieldErrors.username
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              )}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors((prev) => ({ ...prev, password: false }));
                setError("");
              }}
              className={clsx(
                "w-full px-4 py-3 border rounded-lg focus:outline-none transition focus:ring-2",
                fieldErrors.password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-sm transition cursor-pointer"
          >
            Sign in
          </button>
        </form>

        {error && (
          <div className="mt-3 text-center text-red-600 text-sm">{error}</div>
        )}

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        <div className="my-6">
          <div className="flex items-center justify-between">
            <hr className="w-full border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">or continue with</span>
            <hr className="w-full border-gray-300" />
          </div>
        </div>

        <div className="flex gap-4">
          <button className="flex items-center gap-3 border border-gray-300 px-2 md:px-4 py-2 rounded-lg w-full justify-center hover:bg-gray-50 transition shadow-sm">
            <FcGoogle className="text-xl" />
            <span className="text-sm text-gray-700">Google</span>
          </button>
          <button className="flex items-center gap-3 border border-gray-300 px-2 md:px-4 py-2 rounded-lg w-full justify-center hover:bg-gray-50 transition shadow-sm">
            <FaFacebookF className="text-blue-600 text-xl" />
            <span className="text-sm text-gray-700">Facebook</span>
          </button>
        </div>

        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
