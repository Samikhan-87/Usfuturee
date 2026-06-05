import { useState } from "react";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { DollarSign, Check, ArrowUpRight, CreditCard } from "lucide-react";
import { AVATARS } from "@/utils/mockData";
import { toast } from "sonner";

const SEED = [
  { id: "p1", institution: "Stanford University", plan: "Verified · Annual", amount: 1200, date: "Jun 01, 2026", status: "Received", method: "Wire", avatar: AVATARS.maya },
  { id: "p2", institution: "MIT OpenCourseware", plan: "Verified · Annual", amount: 1200, date: "Jun 02, 2026", status: "Received", method: "Card", avatar: AVATARS.diego },
  { id: "p3", institution: "Khan Academy", plan: "Verified · Annual", amount: 1200, date: "Jun 02, 2026", status: "Received", method: "Card", avatar: AVATARS.aisha },
  { id: "p4", institution: "Lincoln Academy", plan: "Verified · Monthly", amount: 120, date: "Jun 04, 2026", status: "Pending", method: "Bank transfer", avatar: AVATARS.aisha },
  { id: "p5", institution: "Riverside High School", plan: "Verified · Monthly", amount: 120, date: "Jun 04, 2026", status: "Pending", method: "Bank transfer", avatar: AVATARS.diego },
];

const STATUS_STYLE = {
  Received: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Failed: "bg-destructive/10 text-destructive",
};

export default function SuperAdminRevenue() {
  const [rows, setRows] = useState(SEED);

  const mark = (id) => {
    setRows((arr) => arr.map((r) => (r.id === id ? { ...r, status: "Received" } : r)));
    toast.success("Payment marked as received.");
  };

  const totalReceived = rows.filter((r) => r.status === "Received").reduce((s, r) => s + r.amount, 0);
  const totalPending = rows.filter((r) => r.status === "Pending").reduce((s, r) => s + r.amount, 0);

  return (
    <SuperAdminLayout title="Revenue & Subscriptions" subtitle="Track Verified plan payments from institutions.">
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat icon={DollarSign} label="Received (this month)" value={`$${totalReceived.toLocaleString()}`} accent="from-emerald-500/20" />
        <Stat icon={CreditCard} label="Pending" value={`$${totalPending.toLocaleString()}`} accent="from-amber-500/20" />
        <Stat icon={ArrowUpRight} label="Active subscriptions" value={String(rows.length)} accent="from-primary/20" />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card" data-testid="revenue-table">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Institution", "Plan", "Amount", "Date", "Method", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} data-testid={`revenue-row-${r.id}`} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={r.avatar} alt={r.institution} className="h-9 w-9 rounded-xl object-cover" />
                    <p className="font-semibold text-foreground">{r.institution}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{r.plan}</td>
                <td className="px-4 py-3 font-heading text-base font-bold text-foreground">${r.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.method}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${STATUS_STYLE[r.status]}`}>{r.status}</span></td>
                <td className="px-4 py-3">
                  {r.status === "Pending" ? (
                    <button
                      data-testid={`mark-received-${r.id}`}
                      onClick={() => mark(r.id)}
                      className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400"
                    >
                      <Check className="h-3 w-3" /> Mark received
                    </button>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SuperAdminLayout>
  );
}

const Stat = ({ icon: Icon, label, value, accent }) => (
  <div className={`rounded-2xl border border-border bg-gradient-to-br ${accent} to-card p-5`}>
    <span className="grid h-11 w-11 place-items-center rounded-xl bg-card text-primary"><Icon className="h-5 w-5" /></span>
    <p className="mt-3 font-heading text-2xl font-black text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);
