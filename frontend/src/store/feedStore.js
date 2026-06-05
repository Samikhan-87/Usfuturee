import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INITIAL_POSTS, AVATARS } from "@/utils/mockData";

const SEED_COMMENTS = {
  p1: [
    { id: "c1", parent: null, author: { name: "Liam Chen", avatar: AVATARS.diego }, text: "This is gold — sharing with my study group!", time: "1h", likes: 12 },
    { id: "c2", parent: "c1", author: { name: "Sofia Nguyen", avatar: AVATARS.aisha }, text: "Same here. The memoization explanation finally clicked.", time: "55m", likes: 4 },
    { id: "c3", parent: null, author: { name: "Noah Williams", avatar: AVATARS.maya }, text: "Any chance you can share the source PDF?", time: "30m", likes: 2 },
  ],
};

export const REACTION_TYPES = [
  { key: "like", emoji: "👍", label: "Like", color: "text-primary" },
  { key: "love", emoji: "❤️", label: "Love", color: "text-rose-500" },
  { key: "haha", emoji: "😂", label: "Haha", color: "text-amber-500" },
  { key: "wow", emoji: "😮", label: "Wow", color: "text-amber-500" },
  { key: "sad", emoji: "😢", label: "Sad", color: "text-blue-400" },
  { key: "angry", emoji: "😡", label: "Angry", color: "text-orange-500" },
];

export const useFeedStore = create(
  persist(
    (set) => ({
      posts: INITIAL_POSTS,
      reactions: {},       // { postId: 'like' | 'love' | ... }
      reactionCounts: {},  // { postId: { like: 12, love: 4, ... } }
      comments: SEED_COMMENTS,
      saved: [],
      following: {},       // { authorName: true }

      addPost: (post) => set((s) => ({ posts: [post, ...s.posts] })),
      editPost: (id, content, image) =>
        set((s) => ({
          posts: s.posts.map((p) => (p.id === id ? { ...p, content, image: image ?? p.image, edited: true } : p)),
        })),
      deletePost: (id) =>
        set((s) => ({
          posts: s.posts.filter((p) => p.id !== id),
          saved: s.saved.filter((sid) => sid !== id),
        })),

      // Reactions
      setReaction: (id, type) =>
        set((s) => {
          const prev = s.reactions[id];
          const counts = { ...(s.reactionCounts[id] || {}) };
          if (prev && prev !== type) counts[prev] = Math.max(0, (counts[prev] || 1) - 1);
          let newReaction = type;
          if (prev === type) {
            counts[type] = Math.max(0, (counts[type] || 1) - 1);
            newReaction = null;
          } else {
            counts[type] = (counts[type] || 0) + 1;
          }
          const totalDelta = (prev ? -1 : 0) + (newReaction ? 1 : 0);
          return {
            reactions: { ...s.reactions, [id]: newReaction },
            reactionCounts: { ...s.reactionCounts, [id]: counts },
            posts: s.posts.map((p) =>
              p.id === id ? { ...p, liked: !!newReaction, likes: p.likes + totalDelta } : p
            ),
          };
        }),

      // Comments
      addComment: (postId, parent, author, text) =>
        set((s) => {
          const c = { id: "c" + Date.now(), parent, author, text, time: "now", likes: 0 };
          return {
            comments: { ...s.comments, [postId]: [...(s.comments[postId] || []), c] },
            posts: s.posts.map((p) => (p.id === postId ? { ...p, comments: p.comments + 1 } : p)),
          };
        }),
      toggleCommentLike: (postId, commentId) =>
        set((s) => ({
          comments: {
            ...s.comments,
            [postId]: (s.comments[postId] || []).map((c) =>
              c.id === commentId
                ? { ...c, likedByMe: !c.likedByMe, likes: c.likedByMe ? c.likes - 1 : c.likes + 1 }
                : c
            ),
          },
        })),

      // Saved
      toggleSaved: (id) =>
        set((s) => ({
          saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [id, ...s.saved],
        })),

      // Follow author
      toggleFollow: (name) =>
        set((s) => ({ following: { ...s.following, [name]: !s.following[name] } })),

      // Legacy support
      toggleLike: (id) =>
        set((s) => {
          const has = s.reactions[id];
          // delegate to setReaction with default 'like'
          const newType = has ? null : "like";
          const counts = { ...(s.reactionCounts[id] || {}) };
          if (has) counts[has] = Math.max(0, (counts[has] || 1) - 1);
          else counts.like = (counts.like || 0) + 1;
          return {
            reactions: { ...s.reactions, [id]: newType },
            reactionCounts: { ...s.reactionCounts, [id]: counts },
            posts: s.posts.map((p) =>
              p.id === id ? { ...p, liked: !!newType, likes: p.likes + (has ? -1 : 1) } : p
            ),
          };
        }),
    }),
    {
      name: "usfuturee-feed",
      partialize: (s) => ({ saved: s.saved, reactions: s.reactions, following: s.following }),
    }
  )
);
