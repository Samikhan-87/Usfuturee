import { MainLayout } from "@/layouts/MainLayout";
import { PostCard } from "@/components/PostCard";
import { INITIAL_POSTS } from "@/utils/mockData";
import { Bookmark } from "lucide-react";

// Mark a couple of posts as "saved" by the user
const SAVED = INITIAL_POSTS.slice(0, 2).map((p) => ({ ...p, id: "saved-" + p.id }));

export default function Saved() {
  return (
    <MainLayout>
      <div data-testid="saved-page" className="flex flex-col gap-5">
        <header className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Bookmark className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Saved Posts</h1>
            <p className="text-muted-foreground">Posts you've bookmarked for later.</p>
          </div>
        </header>

        {SAVED.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-4" data-testid="saved-list">
            {SAVED.map((p, i) => <PostCard key={p.id} post={p} index={i} />)}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

const EmptyState = () => (
  <div className="grid min-h-[40vh] place-items-center rounded-2xl border border-dashed border-border bg-card/50 text-center">
    <div>
      <Bookmark className="mx-auto h-10 w-10 text-muted-foreground/60" />
      <p className="mt-3 font-heading text-lg font-bold text-foreground">No content yet</p>
      <p className="text-sm text-muted-foreground">Tap the bookmark on any post to save it here.</p>
    </div>
  </div>
);
