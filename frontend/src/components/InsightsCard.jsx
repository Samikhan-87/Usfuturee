import { useState } from "react";
import { Sparkles, GraduationCap, Building2, Pencil, ArrowRight, Users, CalendarDays, X } from "lucide-react";
import { useInsightsStore } from "@/store/insightsStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { INSTITUTIONS, GROUPS, UPCOMING_EVENTS } from "@/utils/mockData";

const SUGGESTED_GROUPS = GROUPS.slice(0, 2);
const SUGGESTED_EVENTS = UPCOMING_EVENTS.slice(0, 2);

export const InsightsCard = () => {
  const { target, setTarget, clear } = useInsightsStore();
  const [open, setOpen] = useState(false);
  const [uni, setUni] = useState(target?.university || "");
  const [major, setMajor] = useState(target?.major || "");

  const save = () => {
    if (!uni.trim() || !major.trim()) return;
    setTarget({ university: uni.trim(), major: major.trim() });
    setOpen(false);
  };

  return (
    <>
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-5" data-testid="insights-card">
        <div className="flex items-center justify-between gap-2">
          <h3 className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
            <Sparkles className="h-4 w-4 text-primary" /> Insights
          </h3>
          {target && (
            <button data-testid="insights-edit" onClick={() => setOpen(true)} className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground">
              <Pencil className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {!target ? (
          <div className="mt-3">
            <p className="text-sm text-muted-foreground">Tell us your dream school and major to get personalized study groups, events and connections.</p>
            <button
              data-testid="insights-setup-button"
              onClick={() => setOpen(true)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-hover"
            >
              Set your goal <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="mt-3 flex flex-col gap-4">
            <div className="rounded-xl bg-card p-3 text-sm" data-testid="insights-target">
              <p className="flex items-center gap-2 text-foreground"><GraduationCap className="h-3.5 w-3.5 text-primary" /> <span className="font-semibold">{target.university}</span></p>
              <p className="mt-1 flex items-center gap-2 text-muted-foreground"><Building2 className="h-3.5 w-3.5" /> {target.major}</p>
            </div>

            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Suggested groups</p>
              <div className="flex flex-col gap-2">
                {SUGGESTED_GROUPS.map((g) => (
                  <Link key={g.id} to="/groups" data-testid={`insights-group-${g.id}`} className="flex items-center gap-2 rounded-xl bg-card p-2 transition-all hover:bg-accent">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary"><Users className="h-3.5 w-3.5" /></span>
                    <p className="truncate text-xs font-semibold text-foreground">{g.name}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Relevant events</p>
              <div className="flex flex-col gap-2">
                {SUGGESTED_EVENTS.map((e) => (
                  <Link key={e.id} to="/events" data-testid={`insights-event-${e.id}`} className="flex items-center gap-2 rounded-xl bg-card p-2 transition-all hover:bg-accent">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-500/10 text-violet-500"><CalendarDays className="h-3.5 w-3.5" /></span>
                    <p className="truncate text-xs font-semibold text-foreground">{e.title}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Students like you follow</p>
              <div className="flex flex-wrap gap-1">
                {INSTITUTIONS.map((i) => (
                  <span key={i.id} className="rounded-full bg-card px-2.5 py-1 text-[10px] font-semibold text-foreground">{i.name}</span>
                ))}
              </div>
            </div>

            <button data-testid="insights-clear" onClick={clear} className="flex items-center justify-center gap-1 text-[11px] font-semibold text-destructive hover:underline">
              <X className="h-3 w-3" /> Clear goal
            </button>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md" data-testid="insights-modal">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Set your goal</DialogTitle>
            <DialogDescription>Tell us where you're headed and we'll personalize your feed.</DialogDescription>
          </DialogHeader>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Target University</label>
            <input
              data-testid="insights-university"
              value={uni}
              onChange={(e) => setUni(e.target.value)}
              placeholder="Stanford University"
              className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Major / Field</label>
            <input
              data-testid="insights-major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="Computer Science"
              className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <button
            data-testid="insights-save"
            onClick={save}
            disabled={!uni.trim() || !major.trim()}
            className="h-11 rounded-full bg-primary font-semibold text-primary-foreground transition-all hover:bg-primary-hover disabled:opacity-40"
          >
            Save goal
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
};
