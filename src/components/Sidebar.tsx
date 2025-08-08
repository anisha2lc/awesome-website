import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaUsers,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";
import useAuthStore from "../store/authStore";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ mobileOpen, setMobileOpen }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { logout, user } = useAuthStore();

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    ...(user?.role === "admin"
      ? [{ label: "Users Table", path: "/users", icon: <FaUsers /> }]
      : []),
    { label: "Chart Page", path: "/charts", icon: <FaChartBar /> },
    {
      label: "Logout",
      path: "/logout",
      icon: <FaSignOutAlt />,
      action: "logout",
    },
  ];

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 bg-opacity-1 backdrop-blur-xs z-30 md:hidden transition-opacity",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={clsx(
          "fixed z-40 top-0 left-0 h-full bg-blue-400 text-white flex flex-col transition-all duration-300 ease-in-out",
          collapsed ? "w-20" : "w-64",
          "md:static md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
          <img src="/AwwwsomeIcon.svg" alt="Awwsome Icon" className="w-28" />
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setMobileOpen(false)}
          >
            <IoClose />
          </button>
          <button
            className="hidden md:block text-white text-xl"
            onClick={() => setCollapsed(!collapsed)}
          >
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto mt-4 space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            const handleClick = () => {
              if (item.action === "logout") {
                logout();
              } else {
                navigate(item.path);
              }

              setMobileOpen(false);
            };

            return (
              <button
                key={item.label}
                onClick={handleClick}
                className={clsx(
                  "w-full text-left flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 font-semibold",
                  isActive
                    ? "bg-white text-[#4E42D9] font-semibold"
                    : "hover:bg-white/10 hover:pl-4",
                  collapsed && "justify-center px-2"
                )}
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
