import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_BANNER, AVATARS, DEMO_ACCOUNTS } from "@/utils/mockData";

// Frontend-only mock auth. No backend yet (no real JWT / hashing).
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      role: null,
      token: null,
      isAuthenticated: false,
      login: ({ email, name, role, institution, avatar, headline }) => {
        const demo = DEMO_ACCOUNTS.find((d) => d.email === email);
        const finalRole = role || demo?.role || "student";
        const displayName =
          name || demo?.name || (email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1));
        const user = {
          id: "u_" + Math.random().toString(36).slice(2, 9),
          name: displayName,
          email,
          role: finalRole,
          institution: institution || demo?.institution || "Usfuturee Community",
          headline: headline || demo?.headline || "Lifelong learner • Usfuturee member",
          location: "San Francisco, CA",
          joinDate: "June 2026",
          avatar: avatar || demo?.avatar || AVATARS.maya,
          banner: DEFAULT_BANNER,
          followers: 1284,
          following: 342,
        };
        set({
          user,
          role: finalRole,
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
