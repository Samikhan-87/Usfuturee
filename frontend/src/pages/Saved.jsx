import { MainLayout } from "@/layouts/MainLayout";
import { PostCard } from "@/components/PostCard";
import { useFeedStore } from "@/store/feedStore";
import { Bookmark } from "lucide-react";

export default function Saved() {
  const savedIds = useFeedStore((s) => s.saved);
  const posts = useFeedStore((s) => s.posts);
  const list = savedIds.map((id) => posts.find((p) => p.id === id)).filter(Boolean);

  return (
    <MainLayout>
      <div data-testid="saved-page" className="flex flex-col gap-5">
        <header className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Bookmark className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Saved Posts</h1>
            <p className="text-muted-foreground">{list.length ? `${list.length} post${list.length === 1 ? "" : "s"} saved.` : "Bookmark any post to find it here later."}</p>
          </div>
        </header>

        {list.length === 0 ? (
          <div className="grid min-h-[40vh] place-items-center rounded-2xl border border-dashed border-border bg-card/50 text-center" data-testid="saved-empty">
            <div>
              <Bookmark className="mx-auto h-10 w-10 text-muted-foreground/60" />
              <p className="mt-3 font-heading text-lg font-bold text-foreground">No content yet</p>
              <p className="text-sm text-muted-foreground">Tap the bookmark on any post to save it here.</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4" data-testid="saved-list">
            {list.map((p, i) => <PostCard key={p.id} post={p} index={i} />)}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
