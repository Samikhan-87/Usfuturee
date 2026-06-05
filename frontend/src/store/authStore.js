import { create } from "zustand";
import { persist } from "zustand/middleware";

// Frontend-only mock auth. No backend yet.
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: ({ email, name }) => {
        const displayName = name || email.split("@")[0];
        const user = {
          id: "u_" + Math.random().toString(36).slice(2, 9),
          name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
          email,
          headline: "Lifelong learner • Usfuturee member",
          avatar:
            "https://images.unsplash.com/photo-1596688787955-72a75ec303b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIweW91bmclMjBhZHVsdHMlMjBwb3J0cmFpdHN8ZW58MHx8fHwxNzgwNjg4Nzg0fDA&ixlib=rb-4.1.0&q=85&w=200",
          banner:
            "https://images.unsplash.com/photo-1775933802859-27889463db79?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDB8fHx8MTc4MDY4ODc4M3ww&ixlib=rb-4.1.0&q=85&w=1200",
          followers: 1284,
          following: 342,
        };
        set({ user, isAuthenticated: true });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "usfuturee-auth",
    }
  )
);
