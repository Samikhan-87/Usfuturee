import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INSTITUTIONS } from "@/utils/mockData";

const SEED_ADS = [
  {
    id: "ad1",
    title: "Stanford Open House 2026",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&w=1200&q=70",
    targetInstitution: "Stanford University",
    cta: "Learn more",
    duration: 14,
    status: "active",
    createdAt: "Jun 1, 2026",
  },
];

export const useAdsStore = create(
  persist(
    (set) => ({
      ads: SEED_ADS,
      addAd: (ad) =>
        set((s) => ({
          ads: [{ ...ad, id: "ad_" + Date.now(), status: "active", createdAt: new Date().toLocaleDateString() }, ...s.ads],
        })),
      toggleStatus: (id) =>
        set((s) => ({
          ads: s.ads.map((a) => (a.id === id ? { ...a, status: a.status === "active" ? "paused" : "active" } : a)),
        })),
      deleteAd: (id) => set((s) => ({ ads: s.ads.filter((a) => a.id !== id) })),
    }),
    { name: "usfuturee-ads" }
  )
);

export const TARGET_INSTITUTIONS = INSTITUTIONS.map((i) => i.name);
