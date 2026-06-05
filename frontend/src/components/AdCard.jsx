import { ExternalLink, Megaphone } from "lucide-react";
import { toast } from "sonner";

export const AdCard = ({ ad }) => {
  if (!ad) return null;
  return (
    <article
      data-testid={`ad-card-${ad.id}`}
      className="animate-fade-up overflow-hidden rounded-2xl border border-primary/30 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="flex items-center justify-between px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-primary">
        <span className="flex items-center gap-1.5"><Megaphone className="h-3 w-3" /> Sponsored</span>
        <span className="text-muted-foreground">For {ad.targetInstitution}</span>
      </div>
      <div className="h-48 w-full bg-cover bg-center sm:h-64" style={{ backgroundImage: `url(${ad.image})` }} />
      <div className="flex items-center justify-between gap-3 p-5">
        <h3 className="min-w-0 truncate font-heading text-lg font-bold text-foreground">{ad.title}</h3>
        <button
          data-testid={`ad-cta-${ad.id}`}
          onClick={() => toast.success(`Opening "${ad.title}"`)}
          className="flex shrink-0 items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-all hover:bg-primary-hover"
        >
          {ad.cta || "Learn more"} <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </article>
  );
};
