import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import type { JSX } from "react";

const RoleBasedRoute = ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: JSX.Element;
}) => {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/dashboard" replace />;

  return children;
};

export default RoleBasedRoute;
