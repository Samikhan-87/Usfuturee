import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home, Users, Calendar, Bot, Bell, LayoutGrid, LogOut, Menu, X, Search,
  BookOpen, Bookmark, TrendingUp, MessageCircle, User as UserIcon, Settings,
  Moon, Sun, ChevronRight,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useThemeStore } from "@/store/themeStore";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PRIMARY_NAV = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Users, label: "Groups", to: "/groups" },
  { icon: Calendar, label: "Events", to: "/events" },
  { icon: Bot, label: "AI Chat", to: "/ai-chat" },
];

const FULL_NAV = [
  ...PRIMARY_NAV,
  { icon: BookOpen, label: "Courses", to: "/courses" },
  { icon: Bookmark, label: "Saved", to: "/saved" },
  { icon: TrendingUp, label: "Trending", to: "/trending" },
];

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawer, setDrawer] = useState(false);
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  useEffect(() => {
    setDrawer(false);
  }, [location.pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (drawer) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = original; };
    }
  }, [drawer]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="glass-nav sticky top-0 z-50 border-b border-border bg-background/80">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between gap-3 px-4 lg:px-6">
          {/* MOBILE: Logo left + hamburger right (nothing else) */}
          <Link to="/" data-testid="navbar-logo-link" className="shrink-0 lg:hidden">
            <Logo />
          </Link>
          <button
            data-testid="mobile-nav-toggle"
            onClick={() => setDrawer(true)}
            className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground transition-all hover:bg-accent lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* DESKTOP: Logo + center nav + right actions */}
          <Link to="/" className="hidden shrink-0 lg:block">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAV.map(({ icon: Icon, label, to }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={label}
                  to={to}
                  data-testid={`nav-tab-${label.toLowerCase().replace(" ", "-")}`}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-accent ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" /> {label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                data-testid="navbar-search-input"
                placeholder="Search Usfuturee"
                className="h-10 w-48 rounded-full border border-transparent bg-input pl-10 pr-4 text-sm text-foreground outline-none transition-all duration-200 focus:w-64 focus:border-primary focus:bg-card"
              />
            </div>

            <IconButton testid="navbar-chat-button" icon={MessageCircle} onClick={() => navigate("/messages")} />
            <NotificationsDropdown>
              {(unread) => (
                <button
                  type="button"
                  data-testid="navbar-notifications-button"
                  className="relative grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground transition-all duration-200 hover:bg-accent hover:text-primary"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {unread > 0 && (
                    <span data-testid="notifications-badge" className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                      {unread}
                    </span>
                  )}
                </button>
              )}
            </NotificationsDropdown>

            <button
              data-testid="portal-button"
              onClick={() => navigate("/portal")}
              className="flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
            >
              <LayoutGrid className="h-4 w-4" /> Portal
            </button>

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  data-testid="navbar-profile-button"
                  className="rounded-full p-0.5 ring-2 ring-transparent transition-all duration-200 hover:ring-primary"
                >
                  <img src={user?.avatar} alt={user?.name} className="h-9 w-9 rounded-full object-cover" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl">
                <DropdownMenuLabel className="font-heading">
                  {user?.name}
                  <p className="text-xs font-normal text-muted-foreground">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem data-testid="menu-profile-link" onClick={() => navigate("/profile")} className="cursor-pointer">View Profile</DropdownMenuItem>
                <DropdownMenuItem data-testid="menu-groups-link" onClick={() => navigate("/groups")} className="cursor-pointer">My Groups</DropdownMenuItem>
                <DropdownMenuItem data-testid="menu-settings-link" onClick={() => navigate("/settings")} className="cursor-pointer">Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem data-testid="menu-logout-button" onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {drawer && (
        <div className="fixed inset-0 z-[100] lg:hidden" data-testid="mobile-drawer">
          {/* Scrim */}
          <button
            aria-label="Close menu"
            onClick={() => setDrawer(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          {/* Drawer */}
          <aside className="absolute left-0 top-0 flex h-full w-[84vw] max-w-[340px] flex-col bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border p-4">
              <Logo />
              <button
                data-testid="drawer-close"
                onClick={() => setDrawer(false)}
                className="grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Profile */}
            <Link
              to="/profile"
              data-testid="drawer-profile"
              className="flex items-center gap-3 border-b border-border p-4 transition-all hover:bg-accent"
            >
              <img src={user?.avatar} alt={user?.name} className="h-12 w-12 rounded-full object-cover" />
              <div className="min-w-0">
                <p className="truncate font-heading text-sm font-bold text-foreground">{user?.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user?.headline}</p>
              </div>
              <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </Link>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto p-3">
              <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Navigate</p>
              {FULL_NAV.map(({ icon: Icon, label, to }) => {
                const active = location.pathname === to;
                return (
                  <Link
                    key={label}
                    to={to}
                    data-testid={`drawer-nav-${label.toLowerCase().replace(" ", "-")}`}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all hover:bg-accent ${
                      active ? "text-primary" : "text-foreground"
                    }`}
                  >
                    <span className={`grid h-9 w-9 place-items-center rounded-xl ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    {label}
                  </Link>
                );
              })}

              <div className="my-3 h-px bg-border" />
              <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Account</p>

              <Link
                to="/messages"
                data-testid="drawer-messages"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-foreground hover:bg-accent"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-secondary"><MessageCircle className="h-[18px] w-[18px]" /></span>
                Messages
              </Link>
              <NotificationsDropdown>
                {(unread) => (
                  <button
                    type="button"
                    data-testid="drawer-notifications"
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-foreground hover:bg-accent"
                  >
                    <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-secondary">
                      <Bell className="h-[18px] w-[18px]" />
                      {unread > 0 && (
                        <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground">
                          {unread}
                        </span>
                      )}
                    </span>
                    Notifications
                  </button>
                )}
              </NotificationsDropdown>
              <Link
                to="/settings"
                data-testid="drawer-settings"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-foreground hover:bg-accent"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-secondary"><Settings className="h-[18px] w-[18px]" /></span>
                Settings
              </Link>
            </nav>

            {/* Bottom area: portal + theme + logout */}
            <div className="border-t border-border p-3">
              <button
                data-testid="drawer-portal"
                onClick={() => navigate("/portal")}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-hover"
              >
                <LayoutGrid className="h-4 w-4" /> Open Portal
              </button>
              <div className="mt-2 flex gap-2">
                <button
                  data-testid="drawer-theme"
                  onClick={toggleTheme}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-2.5 text-xs font-bold text-foreground hover:bg-accent"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {theme === "dark" ? "Light" : "Dark"}
                </button>
                <button
                  data-testid="drawer-logout"
                  onClick={handleLogout}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-destructive py-2.5 text-xs font-bold text-destructive-foreground transition-all hover:opacity-90"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

const IconButton = ({ icon: Icon, testid, onClick }) => (
  <button
    data-testid={testid}
    onClick={onClick}
    className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground transition-all duration-200 hover:bg-accent hover:text-primary"
  >
    <Icon className="h-5 w-5" />
  </button>
);
