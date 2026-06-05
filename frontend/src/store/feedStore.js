import { create } from "zustand";
import { INITIAL_POSTS } from "@/utils/mockData";

export const useFeedStore = create((set) => ({
  posts: INITIAL_POSTS,
  addPost: (post) =>
    set((state) => ({ posts: [post, ...state.posts] })),
  toggleLike: (id) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      ),
    })),
}));
