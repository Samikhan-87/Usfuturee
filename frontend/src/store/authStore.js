import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_BANNER, AVATARS } from "@/utils/mockData";

// Frontend-only mock auth. No backend yet (no real JWT / hashing).
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      role: null,
      token: null,
      isAuthenticated: false,
      login: ({ email, name, role = "student", institution, avatar, headline }) => {
        const displayName =
          name || email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1);
        const user = {
          id: "u_" + Math.random().toString(36).slice(2, 9),
          name: displayName,
          email,
          role,
          institution: institution || "Usfuturee Community",
          headline: headline || "Lifelong learner • Usfuturee member",
          location: "San Francisco, CA",
          joinDate: "June 2026",
          avatar: avatar || AVATARS.maya,
          banner: DEFAULT_BANNER,
          followers: 1284,
          following: 342,
        };
        set({
          user,
          role,
          token: "mock-jwt-" + Math.random().toString(36).slice(2),
          isAuthenticated: true,
        });
      },
      logout: () => set({ user: null, role: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "usfuturee-auth",
    }
  )
);
