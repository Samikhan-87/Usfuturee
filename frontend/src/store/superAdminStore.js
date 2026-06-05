import { create } from "zustand";
import { persist } from "zustand/middleware";

const CREDENTIALS = {
  email: "superadmin@usfuturee.com",
  password: "superadmin123",
};

export const useSuperAdminStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      admin: null,
      login: ({ email, password }) => {
        if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
          set({
            isAuthenticated: true,
            admin: { email, name: "Super Admin", role: "superadmin" },
          });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false, admin: null }),
    }),
    { name: "usfuturee-superadmin" }
  )
);
