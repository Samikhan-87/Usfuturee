import { UserPlus } from "lucide-react";
import { SUGGESTED_PEOPLE, TRENDING } from "@/utils/mockData";

export const RightSidebar = () => {
  return (
    <aside className="sticky top-20 hidden h-fit flex-col gap-6 xl:flex" data-testid="right-sidebar">
      {/* Suggestions */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-4 font-heading text-base font-bold text-foreground">People to follow</h3>
        <div className="flex flex-col gap-4">
          {SUGGESTED_PEOPLE.map((p) => (
            <div key={p.id} className="flex items-center gap-3" data-testid={`suggested-${p.id}`}>
              <img src={p.avatar} alt={p.name} className="h-11 w-11 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{p.name}</p>
                <p className="truncate text-xs text-muted-foreground">{p.mutual} mutual connections</p>
              </div>
              <button
                data-testid={`follow-${p.id}-button`}
                className="grid h-9 w-9 place-items-center rounded-full bg-accent text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
              >
                <UserPlus className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-4 font-heading text-base font-bold text-foreground">Trending now</h3>
        <div className="flex flex-col gap-3">
          {TRENDING.map((t) => (
            <button
              key={t.id}
              data-testid={`trending-${t.id}`}
              className="group flex flex-col items-start rounded-xl px-2 py-1.5 text-left transition-all duration-200 hover:bg-accent"
            >
              <span className="font-semibold text-primary">{t.tag}</span>
              <span className="text-xs text-muted-foreground">{t.posts}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="px-2 text-xs text-muted-foreground">
        Usfuturee © 2026 · About · Help · Privacy · Terms
      </p>
    </aside>
  );
};
