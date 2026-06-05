import { MainLayout } from "@/layouts/MainLayout";
import { PostCard } from "@/components/PostCard";
import { INITIAL_POSTS, TRENDING } from "@/utils/mockData";
import { TrendingUp, Flame } from "lucide-react";

const TRENDING_POSTS = [...INITIAL_POSTS]
  .sort((a, b) => b.likes - a.likes)
  .map((p, i) => ({ ...p, id: "trend-" + p.id, rank: i + 1 }));

export default function Trending() {
  return (
    <MainLayout>
      <div data-testid="trending-page" className="flex flex-col gap-5">
        <header className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-500/10 text-rose-500">
            <Flame className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Trending</h1>
            <p className="text-muted-foreground">Posts most loved by the community this week.</p>
          </div>
        </header>

        {/* Trending tags strip */}
        <div className="flex flex-wrap gap-2" data-testid="trending-tags">
          {TRENDING.map((t) => (
            <span key={t.id} className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-accent hover:text-primary">
              <TrendingUp className="h-3 w-3 text-primary" /> {t.tag}
              <span className="text-muted-foreground">· {t.posts}</span>
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-4" data-testid="trending-list">
          {TRENDING_POSTS.map((p, i) => (
            <div key={p.id} className="relative">
              <span className="absolute -left-3 top-4 z-10 grid h-8 w-8 -rotate-6 place-items-center rounded-xl bg-primary font-heading text-sm font-black text-primary-foreground shadow-lg shadow-primary/20 sm:-left-4">
                #{p.rank}
              </span>
              <PostCard post={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
