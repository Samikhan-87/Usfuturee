import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, Building2, Megaphone, Flag, DollarSign,
  ShieldCheck, LogOut, Moon, Sun,
} from "lucide-react";
import { useSuperAdminStore } from "@/store/superAdminStore";
import { useThemeStore } from "@/store/themeStore";

const NAV = [
  { to: "/superadmin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/superadmin/users", icon: Users, label: "Users" },
  { to: "/superadmin/institutions", icon: Building2, label: "Institutions" },
  { to: "/superadmin/ads", icon: Megaphone, label: "Ads" },
  { to: "/superadmin/reports", icon: Flag, label: "Reports" },
  { to: "/superadmin/revenue", icon: DollarSign, label: "Revenue" },
];

export const SuperAdminLayout = ({ children, title, subtitle }) => {
  const { admin, logout } = useSuperAdminStore();
  const navigate = useNavigate();
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <div className="min-h-screen bg-background font-body">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="hidden border-r border-border bg-card p-5 lg:flex lg:flex-col" data-testid="sa-sidebar">
          <Link to="/superadmin/dashboard" className="mb-8 flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-primary to-violet-500 text-primary-foreground shadow-lg shadow-primary/30">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="font-heading text-base font-extrabold tracking-tight text-foreground">Super Admin</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Usfuturee Console</p>
            </div>
          </Link>

          <nav className="flex flex-col gap-1">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                data-testid={`sa-nav-${n.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"
                  }`
                }
              >
                <n.icon className="h-[18px] w-[18px]" /> {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-2">
            <div className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{admin?.name}</p>
                <p className="truncate text-[10px] text-muted-foreground">{admin?.email}</p>
              </div>
            </div>
            <button
              data-testid="sa-theme-toggle"
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 rounded-xl border border-border py-2 text-xs font-semibold text-foreground transition-all hover:bg-accent"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
            <button
              data-testid="sa-logout"
              onClick={() => { logout(); navigate("/superadmin"); }}
              className="flex items-center justify-center gap-2 rounded-xl bg-destructive py-2 text-xs font-bold text-destructive-foreground transition-all hover:opacity-90"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0">
          {/* Mobile top bar */}
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-card/80 px-4 py-3 backdrop-blur lg:hidden">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground"><ShieldCheck className="h-4 w-4" /></span>
              <p className="font-heading text-sm font-extrabold text-foreground">Super Admin</p>
            </div>
            <button onClick={() => { logout(); navigate("/superadmin"); }} className="rounded-full bg-destructive px-3 py-1.5 text-xs font-bold text-destructive-foreground">Log out</button>
          </header>

          {/* Mobile nav */}
          <nav className="flex gap-2 overflow-x-auto scrollbar-hide border-b border-border bg-card px-3 py-2 lg:hidden">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}
              >
                <n.icon className="h-3.5 w-3.5" /> {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-5 sm:p-7 lg:p-10">
            <div className="mb-6">
              <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">{title}</h1>
              {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
