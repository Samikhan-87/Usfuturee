import { MainLayout } from "@/layouts/MainLayout";
import { StoriesRow } from "@/components/StoriesRow";
import { PostComposer } from "@/components/PostComposer";
import { PostCard } from "@/components/PostCard";
import { useFeedStore } from "@/store/feedStore";

export default function Home() {
  const posts = useFeedStore((s) => s.posts);

  return (
    <MainLayout>
      <div className="flex flex-col gap-6" data-testid="home-feed">
        <StoriesRow />
        <PostComposer />
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </MainLayout>
  );
}
