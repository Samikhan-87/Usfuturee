import { useState } from "react";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Flag, Check, Trash2, Ban, Filter } from "lucide-react";
import { AVATARS } from "@/utils/mockData";
import { toast } from "sonner";

const SEED = [
  { id: "r1", target: "Post by @noah_w", reason: "Spam", reporter: "Sofia Nguyen", time: "2h ago", avatar: AVATARS.aisha, status: "open" },
  { id: "r2", target: "Post by @study_with_me", reason: "Inappropriate content", reporter: "Liam Chen", time: "4h ago", avatar: AVATARS.diego, status: "open" },
  { id: "r3", target: "User @aggro_88", reason: "Harassment", reporter: "Emma Davis", time: "6h ago", avatar: AVATARS.maya, status: "open" },
  { id: "r4", target: "Post by @fake_promo", reason: "False information", reporter: "Carlos Mendez", time: "1d ago", avatar: AVATARS.diego, status: "resolved" },
  { id: "r5", target: "Post by @bot_v2", reason: "Spam", reporter: "Priya Sharma", time: "1d ago", avatar: AVATARS.aisha, status: "open" },
];

const REASON_STYLE = {
  Spam: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Inappropriate content": "bg-destructive/10 text-destructive",
  Harassment: "bg-destructive/10 text-destructive",
  "False information": "bg-violet-500/10 text-violet-500",
};

export default function SuperAdminReports() {
  const [rows, setRows] = useState(SEED);
  const [tab, setTab] = useState("open");

  const filtered = rows.filter((r) => (tab === "all" ? true : r.status === tab));

  const resolve = (id, msg) => {
    setRows((arr) => arr.map((r) => (r.id === id ? { ...r, status: "resolved" } : r)));
    toast.success(msg);
  };

  return (
    <SuperAdminLayout title="Reports Management" subtitle="Triage every report fast and fair.">
      <div className="mb-5 flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {[
          { k: "open", l: "Open" },
          { k: "resolved", l: "Resolved" },
          { k: "all", l: "All" },
        ].map((t) => (
          <button
            key={t.k}
            data-testid={`reports-tab-${t.k}`}
            onClick={() => setTab(t.k)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold ${tab === t.k ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-accent"}`}
          >
            {t.l}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3" data-testid="reports-list">
        {filtered.length === 0 && (
          <div className="grid h-32 place-items-center rounded-2xl border border-dashed border-border bg-card text-sm text-muted-foreground">
            Nothing here — you're caught up!
          </div>
        )}
        {filtered.map((r) => (
          <div key={r.id} data-testid={`report-${r.id}`} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-destructive/10 text-destructive">
                <Flag className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold text-foreground">{r.target}</p>
                <p className="text-xs text-muted-foreground">Reported by {r.reporter} · {r.time}</p>
                <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${REASON_STYLE[r.reason] || "bg-secondary"}`}>{r.reason}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {r.status === "open" ? (
                <>
                  <button
                    data-testid={`dismiss-${r.id}`}
                    onClick={() => resolve(r.id, "Report dismissed.")}
                    className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground hover:bg-accent"
                  >
                    <Check className="h-3 w-3" /> Dismiss
                  </button>
                  <button
                    data-testid={`remove-post-${r.id}`}
                    onClick={() => resolve(r.id, "Post removed.")}
                    className="flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive hover:bg-destructive/20"
                  >
                    <Trash2 className="h-3 w-3" /> Remove post
                  </button>
                  <button
                    data-testid={`suspend-user-${r.id}`}
                    onClick={() => resolve(r.id, "User suspended.")}
                    className="flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-600 hover:bg-amber-500/20 dark:text-amber-400"
                  >
                    <Ban className="h-3 w-3" /> Suspend user
                  </button>
                </>
              ) : (
                <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Resolved</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </SuperAdminLayout>
  );
}
