import { Link, useLocation } from "react-router-dom";
import { Home, Users, BookOpen, Bookmark, Calendar, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { NAV_SHORTCUTS } from "@/utils/mockData";

const NAV = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Users, label: "Groups", to: "/groups" },
  { icon: BookOpen, label: "Courses", to: "/" },
  { icon: Bookmark, label: "Saved", to: "/" },
  { icon: Calendar, label: "Events", to: "/" },
  { icon: TrendingUp, label: "Trending", to: "/" },
];

export const LeftSidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <aside className="sticky top-20 hidden h-fit flex-col gap-1 lg:flex" data-testid="left-sidebar">
      <Link
        to="/profile"
        data-testid="sidebar-profile-link"
        className="mb-2 flex items-center gap-3 rounded-2xl p-2.5 transition-all duration-200 hover:bg-accent"
      >
        <img src={user?.avatar} alt={user?.name} className="h-9 w-9 rounded-full object-cover" />
        <span className="font-semibold text-foreground">{user?.name}</span>
      </Link>

      {NAV.map(({ icon: Icon, label, to }) => {
        const active = location.pathname === to && (to !== "/" || label === "Home");
        return (
          <Link
            key={label}
            to={to}
            data-testid={`sidebar-nav-${label.toLowerCase()}`}
            className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 font-medium transition-all duration-200 hover:bg-accent ${
              active ? "text-primary" : "text-foreground"
            }`}
          >
            <span
              className={`grid h-9 w-9 place-items-center rounded-xl ${
                active ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
            </span>
            {label}
          </Link>
        );
      })}

      <div className="my-3 h-px bg-border" />
      <p className="px-3 pb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Your Shortcuts
      </p>
      {NAV_SHORTCUTS.map((s) => (
        <Link
          key={s.name}
          to="/groups"
          className="flex items-center gap-3 rounded-2xl px-3 py-2 transition-all duration-200 hover:bg-accent"
        >
          <img src={s.avatar} alt={s.name} className="h-9 w-9 rounded-xl object-cover" />
          <span className="text-sm font-medium text-foreground">{s.name}</span>
        </Link>
      ))}
    </aside>
  );
};
