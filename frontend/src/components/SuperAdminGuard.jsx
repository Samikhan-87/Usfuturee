import { Navigate } from "react-router-dom";
import { useSuperAdminStore } from "@/store/superAdminStore";

export const SuperAdminGuard = ({ children }) => {
  const isAuth = useSuperAdminStore((s) => s.isAuthenticated);
  if (!isAuth) return <Navigate to="/superadmin" replace />;
  return children;
};
