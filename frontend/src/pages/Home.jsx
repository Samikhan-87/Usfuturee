import { MainLayout } from "@/layouts/MainLayout";
import { StoriesRow } from "@/components/StoriesRow";
import { PostComposer } from "@/components/PostComposer";
import { PostCard } from "@/components/PostCard";
import { AdCard } from "@/components/AdCard";
import { useFeedStore } from "@/store/feedStore";
import { useAdsStore } from "@/store/adsStore";

export default function Home() {
  const posts = useFeedStore((s) => s.posts);
  const allAds = useAdsStore((s) => s.ads);
  const ads = allAds.filter((a) => a.status === "active");

  return (
    <MainLayout>
      <div className="flex flex-col gap-6" data-testid="home-feed">
        <StoriesRow />
        <PostComposer />
        {posts.map((post, i) => {
          // Insert an ad after every 2nd post (positions 2, 5, 8, …)
          const adIndex = Math.floor(i / 2) - 1;
          const showAd = i > 0 && i % 2 === 0 && ads[adIndex % Math.max(ads.length, 1)];
          return (
            <div key={post.id} className="flex flex-col gap-6">
              {showAd && ads.length > 0 && <AdCard ad={ads[adIndex % ads.length]} />}
              <PostCard post={post} index={i} />
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}
