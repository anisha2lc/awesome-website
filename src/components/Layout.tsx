import { useState } from "react";
import Sidebar from "./Sidebar";
import { Link, Outlet } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa";
import Footer from "./Footer";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="w-full flex items-center justify-between px-4 py-3 bg-blue-100 shadow-md">
          <button
            className="md:hidden text-2xl text-[#4E42D9]"
            onClick={() => setMobileOpen(true)}
          >
            <FaBars />
          </button>

          <Link to="/profile/edit" className="text-3xl text-[#4E42D9]">
            <FaUserCircle />
          </Link>
        </header>

        <div className="flex-1 flex flex-col overflow-y-auto">
          <main className="flex-1 bg-white">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
