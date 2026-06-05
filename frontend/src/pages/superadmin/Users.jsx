import { useState } from "react";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Search, Eye, Ban, Trash2, GraduationCap, BookOpen, Building2, Users as UsersIcon } from "lucide-react";
import { AVATARS } from "@/utils/mockData";
import { toast } from "sonner";

const ROLES = [
  { key: "all", label: "All", icon: UsersIcon },
  { key: "student", label: "Students", icon: GraduationCap },
  { key: "teacher", label: "Teachers", icon: BookOpen },
  { key: "principal", label: "Principals", icon: Building2 },
  { key: "parent", label: "Parents", icon: UsersIcon },
];

const SEED = [
  { id: "u1", name: "Maya Rodriguez", email: "maya@usfuturee.com", role: "student", joined: "Apr 12, 2026", status: "active", avatar: AVATARS.maya },
  { id: "u2", name: "David Okafor", email: "david@usfuturee.com", role: "teacher", joined: "Feb 02, 2026", status: "active", avatar: AVATARS.diego },
  { id: "u3", name: "Sarah Bennett", email: "sarah@usfuturee.com", role: "principal", joined: "Jan 14, 2026", status: "active", avatar: AVATARS.aisha },
  { id: "u4", name: "James Carter", email: "james@usfuturee.com", role: "parent", joined: "May 08, 2026", status: "active", avatar: AVATARS.diego },
  { id: "u5", name: "Liam Chen", email: "liam@usfuturee.com", role: "student", joined: "Mar 22, 2026", status: "suspended", avatar: AVATARS.diego },
  { id: "u6", name: "Sofia Nguyen", email: "sofia@usfuturee.com", role: "teacher", joined: "Mar 30, 2026", status: "active", avatar: AVATARS.aisha },
  { id: "u7", name: "Noah Williams", email: "noah@usfuturee.com", role: "student", joined: "May 02, 2026", status: "active", avatar: AVATARS.maya },
  { id: "u8", name: "Emma Davis", email: "emma@usfuturee.com", role: "student", joined: "May 11, 2026", status: "active", avatar: AVATARS.aisha },
  { id: "u9", name: "Carlos Mendez", email: "carlos@usfuturee.com", role: "teacher", joined: "Feb 19, 2026", status: "active", avatar: AVATARS.diego },
  { id: "u10", name: "Priya Sharma", email: "priya@usfuturee.com", role: "student", joined: "May 28, 2026", status: "active", avatar: AVATARS.aisha },
];

const STATUS_STYLE = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  suspended: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export default function SuperAdminUsers() {
  const [users, setUsers] = useState(SEED);
  const [q, setQ] = useState("");
  const [role, setRole] = useState("all");

  const filtered = users.filter(
    (u) =>
      (role === "all" || u.role === role) &&
      (u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()))
  );

  const suspend = (id) => {
    setUsers((arr) => arr.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u)));
    toast.success("User status updated.");
  };
  const remove = (id) => {
    setUsers((arr) => arr.filter((u) => u.id !== id));
    toast.success("User deleted.");
  };

  return (
    <SuperAdminLayout title="Users Management" subtitle={`${filtered.length} of ${users.length} users shown.`}>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            data-testid="users-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or email"
            className="h-10 w-full rounded-full bg-card pl-10 pr-4 text-sm text-foreground outline-none border border-border focus:border-primary"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide" data-testid="role-filter">
          {ROLES.map((r) => (
            <button
              key={r.key}
              data-testid={`role-${r.key}`}
              onClick={() => setRole(r.key)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                role === r.key ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-accent"
              }`}
            >
              <r.icon className="h-3.5 w-3.5" /> {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[700px] text-left text-sm" data-testid="users-table">
          <thead>
            <tr className="border-b border-border">
              {["User", "Role", "Joined", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} data-testid={`user-row-${u.id}`} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="h-9 w-9 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-foreground">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3"><span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold uppercase text-foreground">{u.role}</span></td>
                <td className="px-4 py-3 text-muted-foreground">{u.joined}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${STATUS_STYLE[u.status]}`}>{u.status}</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <IconBtn testid={`view-${u.id}`} icon={Eye} title="View profile" onClick={() => toast.message(`Opening ${u.name}`)} />
                    <IconBtn testid={`suspend-${u.id}`} icon={Ban} title="Suspend / Reactivate" onClick={() => suspend(u.id)} className="text-amber-500 hover:bg-amber-500/10" />
                    <IconBtn testid={`delete-${u.id}`} icon={Trash2} title="Delete" onClick={() => remove(u.id)} className="text-destructive hover:bg-destructive/10" />
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">No users match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </SuperAdminLayout>
  );
}

const IconBtn = ({ icon: Icon, title, onClick, testid, className = "" }) => (
  <button data-testid={testid} title={title} onClick={onClick} className={`grid h-8 w-8 place-items-center rounded-lg text-foreground transition-all hover:bg-accent ${className}`}>
    <Icon className="h-4 w-4" />
  </button>
);
