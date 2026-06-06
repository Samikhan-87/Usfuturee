import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronLeft } from "lucide-react";
import { MainLayout } from "@/layouts/MainLayout";

/**
 * PortalLayout — left vertical sidebar nav (sections), right content.
 * Uses internal state for the active section (no route per section).
 */
export const PortalLayout = ({
  title,
  subtitle,
  sections, // [{ key, label, icon, content }]
  defaultSection,
  badge,    // e.g. "Principal", "Student", "Teacher"
  backTo = "/",
}) => {
  const [active, setActive] = useState(defaultSection || sections[0]?.key);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const section = sections.find((s) => s.key === active) || sections[0];

  return (
    <MainLayout showRight={false}>
      <div className="grid gap-5 lg:grid-cols-[260px_1fr]" data-testid={`portal-${badge?.toLowerCase()}`}>
        {/* Sidebar */}
        <aside
          className={`flex flex-col gap-1 rounded-2xl border border-border bg-card p-2 ${
            mobileOpen ? "block" : "hidden lg:flex"
          }`}
          data-testid="portal-sidebar"
        >
          <button
            onClick={() => navigate(backTo)}
            className="flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Back to feed
          </button>
          <div className="mb-1 px-3 pt-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{badge} Portal</p>
            <p className="font-heading text-base font-bold text-foreground">{title}</p>
          </div>
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.key;
            return (
              <button
                key={s.key}
                data-testid={`portal-nav-${s.key}`}
                onClick={() => { setActive(s.key); setMobileOpen(false); }}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-all ${
                  isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" /> {s.label}
              </button>
            );
          })}
        </aside>

        {/* Mobile section switcher */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex items-center justify-between gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-bold text-foreground lg:hidden"
          data-testid="portal-mobile-nav"
        >
          <span>{section.label}</span>
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>

        {/* Content */}
        <main className="min-w-0">
          <header className="mb-5">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{section.label}</h1>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </header>
          {section.content}
        </main>
      </div>
    </MainLayout>
  );
};

export const Stat = ({ icon: Icon, label, value, accent = "from-primary/20" }) => (
  <div className={`rounded-2xl border border-border bg-gradient-to-br ${accent} to-card p-5`}>
    <span className="grid h-11 w-11 place-items-center rounded-xl bg-card text-primary"><Icon className="h-5 w-5" /></span>
    <p className="mt-3 font-heading text-2xl font-black text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

export const Panel = ({ title, icon: Icon, children, action, className = "" }) => (
  <div className={`rounded-2xl border border-border bg-card p-5 ${className}`}>
    {(title || action) && (
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
          {Icon && <Icon className="h-4 w-4 text-primary" />} {title}
        </h3>
        {action}
      </div>
    )}
    {children}
  </div>
);

export const ClickableCard = ({ onClick, children, testid, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    data-testid={testid}
    className={`group block w-full text-left rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-lg hover:shadow-black/5 ${className}`}
  >
    {children}
  </button>
);
