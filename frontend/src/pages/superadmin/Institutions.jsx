import { useState } from "react";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { BadgeCheck, Check, X, Eye, Ban, Search } from "lucide-react";
import { AVATARS } from "@/utils/mockData";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SEED = [
  { id: "i1", name: "Stanford University", email: "admin@stanford.edu", followers: "1.2M", status: "Verified", avatar: AVATARS.maya },
  { id: "i2", name: "MIT OpenCourseware", email: "team@mit.edu", followers: "890k", status: "Verified", avatar: AVATARS.diego },
  { id: "i3", name: "Khan Academy", email: "support@khanacademy.org", followers: "2.4M", status: "Verified", avatar: AVATARS.aisha },
  { id: "i4", name: "Lincoln Academy", email: "office@lincoln.edu", followers: "84.2k", status: "Pending", avatar: AVATARS.aisha },
  { id: "i5", name: "Riverside High School", email: "info@riverside.org", followers: "12.6k", status: "Pending", avatar: AVATARS.diego },
  { id: "i6", name: "Citywide Coaching", email: "hi@citywide.in", followers: "3.4k", status: "Rejected", avatar: AVATARS.maya },
];

const STATUS_STYLE = {
  Verified: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Rejected: "bg-destructive/10 text-destructive",
  Suspended: "bg-secondary text-foreground",
};

export default function SuperAdminInstitutions() {
  const [rows, setRows] = useState(SEED);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const set = (id, status) => {
    setRows((arr) => arr.map((r) => (r.id === id ? { ...r, status } : r)));
    if (status === "Verified") toast.success("Institution verified — blue tick added.");
    else if (status === "Rejected") toast.error("Verification rejected.");
    else if (status === "Suspended") toast.message("Institution suspended.");
  };

  const filtered = rows.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <SuperAdminLayout title="Institutions Management" subtitle="Approve verifications, suspend bad actors, audit followers.">
      <div className="mb-5 flex items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            data-testid="inst-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search institutions"
            className="h-10 w-full rounded-full border border-border bg-card pl-10 pr-4 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[700px] text-left text-sm" data-testid="inst-table">
          <thead>
            <tr className="border-b border-border">
              {["Institution", "Followers", "Verification", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} data-testid={`inst-row-${r.id}`} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={r.avatar} alt={r.name} className="h-10 w-10 rounded-xl object-cover" />
                    <div>
                      <p className="flex items-center gap-1 font-semibold text-foreground">
                        {r.name}
                        {r.status === "Verified" && <BadgeCheck className="h-4 w-4 fill-primary text-card" />}
                      </p>
                      <p className="text-xs text-muted-foreground">{r.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{r.followers}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${STATUS_STYLE[r.status]}`}>{r.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      data-testid={`verify-${r.id}`}
                      onClick={() => set(r.id, "Verified")}
                      disabled={r.status === "Verified"}
                      className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 hover:bg-emerald-500/20 disabled:opacity-30 dark:text-emerald-400"
                    >
                      <Check className="h-3 w-3" /> Verify
                    </button>
                    <button
                      data-testid={`reject-${r.id}`}
                      onClick={() => set(r.id, "Rejected")}
                      disabled={r.status === "Rejected"}
                      className="flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1 text-xs font-bold text-destructive hover:bg-destructive/20 disabled:opacity-30"
                    >
                      <X className="h-3 w-3" /> Reject
                    </button>
                    <button
                      data-testid={`suspend-${r.id}`}
                      onClick={() => set(r.id, "Suspended")}
                      disabled={r.status === "Suspended"}
                      className="flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 hover:bg-amber-500/20 disabled:opacity-30 dark:text-amber-400"
                    >
                      <Ban className="h-3 w-3" /> Suspend
                    </button>
                    <button
                      data-testid={`view-inst-${r.id}`}
                      onClick={() => navigate("/institution")}
                      className="flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-bold text-foreground hover:bg-accent"
                    >
                      <Eye className="h-3 w-3" /> Profile
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SuperAdminLayout>
  );
}
