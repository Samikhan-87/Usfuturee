import { useState } from "react";
import { Check, Plus, CalendarDays, BadgeCheck } from "lucide-react";
import { INSTITUTIONS, UPCOMING_EVENTS } from "@/utils/mockData";

export const RightSidebar = () => {
  const [following, setFollowing] = useState({});

  const toggle = (id) => setFollowing((f) => ({ ...f, [id]: !f[id] }));

  return (
    <aside className="sticky top-20 hidden h-fit flex-col gap-6 xl:flex" data-testid="right-sidebar">
      {/* Follow Institution */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-4 font-heading text-base font-bold text-foreground">Follow Institutions</h3>
        <div className="flex flex-col gap-4">
          {INSTITUTIONS.map((inst) => (
            <div key={inst.id} className="flex items-center gap-3" data-testid={`institution-${inst.id}`}>
              <img src={inst.avatar} alt={inst.name} className="h-11 w-11 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 truncate text-sm font-semibold text-foreground">
                  {inst.name}
                  {inst.verified && <BadgeCheck className="h-4 w-4 shrink-0 fill-primary text-card" />}
                </p>
                <p className="truncate text-xs text-muted-foreground">{inst.followers} followers</p>
              </div>
              <button
                data-testid={`follow-institution-${inst.id}`}
                onClick={() => toggle(inst.id)}
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                  following[inst.id]
                    ? "bg-secondary text-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary-hover"
                }`}
              >
                {following[inst.id] ? <><Check className="h-3.5 w-3.5" /> Following</> : <><Plus className="h-3.5 w-3.5" /> Follow</>}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="mb-4 flex items-center gap-2 font-heading text-base font-bold text-foreground">
          <CalendarDays className="h-4 w-4 text-primary" /> Upcoming Events
        </h3>
        <div className="flex flex-col gap-3">
          {UPCOMING_EVENTS.map((ev) => (
            <button
              key={ev.id}
              data-testid={`event-${ev.id}`}
              className="group flex items-center gap-3 rounded-xl p-2 text-left transition-all duration-200 hover:bg-accent"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                <span className="font-heading text-base font-black leading-none">{ev.date.day}</span>
                <span className="text-[10px] font-bold uppercase">{ev.date.month}</span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{ev.title}</p>
                <p className="truncate text-xs text-muted-foreground">{ev.location}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Website footer */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {["About", "Privacy", "Terms", "Help", "Careers"].map((l) => (
            <a
              key={l}
              href="#"
              data-testid={`footer-${l.toLowerCase()}-link`}
              className="text-muted-foreground transition-colors hover:text-primary hover:underline"
            >
              {l}
            </a>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Usfuturee © 2026 · Connecting educational communities worldwide.
        </p>
      </div>
    </aside>
  );
};
