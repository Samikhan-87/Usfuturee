import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import {
  Users, Building2, DollarSign, Activity, TrendingUp, UserPlus, ShieldCheck, Flag,
} from "lucide-react";
import { AVATARS } from "@/utils/mockData";

const STATS = [
  { id: "users", icon: Users, label: "Total Users", value: "12,840", delta: "+8.4%", accent: "from-primary/20" },
  { id: "inst", icon: Building2, label: "Institutions", value: "342", delta: "+12 this week", accent: "from-violet-500/20" },
  { id: "revenue", icon: DollarSign, label: "Total Revenue", value: "$284,910", delta: "+18.2%", accent: "from-emerald-500/20" },
  { id: "active", icon: Activity, label: "Active Today", value: "4,213", delta: "Live", accent: "from-amber-500/20" },
];

const ACTIVITY = [
  { id: "a1", icon: UserPlus, color: "text-primary", who: "Liam Chen", what: "joined as a Student", time: "2 min ago", avatar: AVATARS.diego },
  { id: "a2", icon: ShieldCheck, color: "text-emerald-500", who: "Lincoln Academy", what: "verification approved by you", time: "1h ago", avatar: AVATARS.aisha },
  { id: "a3", icon: Flag, color: "text-destructive", who: "@noah_w", what: "reported a post", time: "3h ago", avatar: AVATARS.maya },
  { id: "a4", icon: DollarSign, color: "text-amber-500", who: "Stanford University", what: "paid Verified Plan invoice", time: "6h ago", avatar: AVATARS.maya },
  { id: "a5", icon: UserPlus, color: "text-primary", who: "Emma Davis", what: "joined as a Student", time: "9h ago", avatar: AVATARS.aisha },
  { id: "a6", icon: TrendingUp, color: "text-violet-500", who: "Riverside High School", what: "grew to 1,200 followers", time: "1d ago", avatar: AVATARS.diego },
];

export default function SuperAdminDashboard() {
  return (
    <SuperAdminLayout title="Dashboard" subtitle="Eagle-eye view of the entire Usfuturee platform.">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.id} data-testid={`sa-stat-${s.id}`} className={`overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${s.accent} to-card p-5`}>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-card text-primary"><s.icon className="h-5 w-5" /></span>
            <p className="mt-4 font-heading text-3xl font-black text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-[11px] font-bold text-emerald-500">{s.delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-5" data-testid="sa-activity">
          <h2 className="mb-4 flex items-center gap-2 font-heading text-base font-bold text-foreground">
            <Activity className="h-4 w-4 text-primary" /> Recent activity
          </h2>
          <div className="flex flex-col gap-2">
            {ACTIVITY.map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3">
                <img src={a.avatar} alt={a.who} className="h-9 w-9 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{a.who}</span> <span className="text-muted-foreground">{a.what}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">{a.time}</p>
                </div>
                <span className={`grid h-8 w-8 place-items-center rounded-lg bg-card ${a.color}`}><a.icon className="h-4 w-4" /></span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-heading text-base font-bold text-foreground">Platform health</h2>
          <div className="flex flex-col gap-3">
            {[
              { l: "Daily Active Users", v: "4,213", p: 78 },
              { l: "New Sign-ups (24h)", v: "128", p: 64 },
              { l: "Payment success", v: "98.4%", p: 98 },
              { l: "Report queue", v: "23 open", p: 18 },
            ].map((m) => (
              <div key={m.l}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{m.l}</span>
                  <span className="font-semibold text-foreground">{m.v}</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-violet-500" style={{ width: `${m.p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
