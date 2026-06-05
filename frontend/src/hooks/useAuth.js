import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const { user, role, token, isAuthenticated, login, logout } = useAuthStore();
  return { user, role, token, isAuthenticated, login, logout };
};
