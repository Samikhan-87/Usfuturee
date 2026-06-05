import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { GROUPS } from "@/utils/mockData";
import { Users, Check, Plus } from "lucide-react";
import { toast } from "sonner";

export default function Groups() {
  const [groups, setGroups] = useState(GROUPS);

  const toggle = (id) => {
    setGroups((g) =>
      g.map((x) => (x.id === id ? { ...x, joined: !x.joined } : x))
    );
    const grp = groups.find((x) => x.id === id);
    toast.success(grp.joined ? `Left ${grp.name}` : `Joined ${grp.name}!`);
  };

  return (
    <MainLayout showRight={false}>
      <div data-testid="groups-page">
        <div className="mb-6">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Study Groups & Communities
          </h1>
          <p className="mt-1 text-muted-foreground">
            Find your people. Learn faster, together.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {groups.map((g) => (
            <div
              key={g.id}
              data-testid={`group-${g.id}`}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative h-32">
                <img src={g.banner} alt={g.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-bold text-foreground">{g.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" /> {g.members} members
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{g.desc}</p>
                <button
                  data-testid={`group-${g.id}-join-button`}
                  onClick={() => toggle(g.id)}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-all duration-200 ${
                    g.joined
                      ? "bg-secondary text-foreground hover:bg-accent"
                      : "bg-primary text-primary-foreground hover:bg-primary-hover"
                  }`}
                >
                  {g.joined ? <><Check className="h-4 w-4" /> Joined</> : <><Plus className="h-4 w-4" /> Join Group</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
