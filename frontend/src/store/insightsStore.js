import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useInsightsStore = create(
  persist(
    (set) => ({
      target: null, // { university, major }
      setTarget: (target) => set({ target }),
      clear: () => set({ target: null }),
    }),
    { name: "usfuturee-insights" }
  )
);

export const isRelevantToTarget = (post, target) => {
  if (!target) return false;
  const hay = `${post.author?.name || ""} ${post.content || ""} ${post.tag || ""}`.toLowerCase();
  const uni = (target.university || "").toLowerCase().split(" ")[0];
  const major = (target.major || "").toLowerCase();
  return (uni && hay.includes(uni)) || (major && hay.includes(major));
};
