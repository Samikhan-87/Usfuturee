import { STORIES } from "@/utils/mockData";
import { Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const StoriesRow = () => {
  const { user } = useAuth();
  return (
    <div
      className="flex gap-3 overflow-x-auto scrollbar-hide pb-1"
      data-testid="stories-row"
    >
      {/* Add story */}
      <button
        data-testid="add-story-button"
        className="group relative h-48 w-28 shrink-0 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5"
      >
        <img src={user?.avatar} alt="you" className="h-32 w-full object-cover" />
        <div className="absolute left-1/2 top-28 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border-4 border-card bg-primary text-primary-foreground">
          <Plus className="h-4 w-4" />
        </div>
        <p className="mt-5 text-center text-xs font-semibold text-foreground">Your Story</p>
      </button>

      {STORIES.map((s) => (
        <button
          key={s.id}
          data-testid={`story-${s.id}`}
          className="group relative h-48 w-28 shrink-0 overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
        >
          <img src={s.image} alt={s.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <img
            src={s.avatar}
            alt={s.name}
            className="absolute left-2.5 top-2.5 h-9 w-9 rounded-full border-2 border-primary object-cover"
          />
          <p className="absolute bottom-2 left-2 right-2 text-left text-xs font-semibold text-white">
            {s.name}
          </p>
        </button>
      ))}
    </div>
  );
};
