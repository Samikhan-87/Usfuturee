import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search, Home, Users, Calendar, Bot, MessageCircle, Bell,
  LayoutGrid, LogOut, Menu, X, BookOpen, Bookmark, TrendingUp,
  User, Settings,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_TABS = [
  { icon: Home,      label: "Home",     to: "/" },
  { icon: Users,     label: "Groups",   to: "/groups" },
  { icon: Calendar,  label: "Events",   to: "/events" },
  { icon: Bot,       label: "AI Chat",  to: "/ai-chat" },
];

const MOBILE_NAV_ITEMS = [
  { icon: Home,       label: "Home",       to: "/" },
  { icon: Users,      label: "Groups",     to: "/groups" },
  { icon: Calendar,   label: "Events",     to: "/events" },
  { icon: Bot,        label: "AI Chat",    to: "/ai-chat" },
  { icon: BookOpen,   label: "Courses",    to: "/portal" },
  { icon: Bookmark,   label: "Saved",      to: "/" },
  { icon: TrendingUp, label: "Trending",   to: "/" },
];

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileNav, setMobileNav] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileNav(false);
  };

  const closeNav = () => setMobileNav(false);

  return (
    <>
      <header className="glass-nav sticky top-0 z-50 border-b border-border bg-background/80">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-4 sm:px-6">

          {/* ── LEFT: hamburger + logo ── */}
          <div className="flex items-center gap-2">
            {/* Hamburger — mobile only */}
            <button
              data-testid="mobile-nav-toggle"
              onClick={() => setMobileNav((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full text-foreground transition-all hover:bg-accent lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" data-testid="navbar-logo-link" className="shrink-0">
              <Logo />
            </Link>
          </div>

          {/* ── CENTER: desktop nav tabs ── */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_TABS.map(({ icon: Icon, label, to }) => {
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

          {/* ── RIGHT: desktop actions ── */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Desktop search */}
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                data-testid="navbar-search-input"
                placeholder="Search Usfuturee"
                className="h-10 w-48 rounded-full border border-transparent bg-input pl-10 pr-4 text-sm text-foreground outline-none transition-all duration-200 focus:w-64 focus:border-primary focus:bg-card"
              />
            </div>

            <IconButton testid="navbar-chat-button" icon={MessageCircle} onClick={() => {}} />

            <div className="relative">
              <IconButton testid="navbar-notifications-button" icon={Bell} onClick={() => {}} />
              <span
                data-testid="notifications-badge"
                className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground"
              >
                3
              </span>
            </div>

            <button
              data-testid="portal-button"
              onClick={() => navigate("/portal")}
              className="hidden items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground sm:flex"
            >
              <LayoutGrid className="h-4 w-4" /> Portal
            </button>

            <ThemeToggle />

            {/* Avatar dropdown — desktop */}
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
                <DropdownMenuItem data-testid="menu-profile-link" onClick={() => navigate("/profile")} className="cursor-pointer">
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem data-testid="menu-groups-link" onClick={() => navigate("/groups")} className="cursor-pointer">
                  My Groups
                </DropdownMenuItem>
                <DropdownMenuItem data-testid="menu-settings-link" onClick={() => navigate("/settings")} className="cursor-pointer">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem data-testid="menu-logout-button" onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {mobileNav && (
        <div className="fixed inset-0 z-[60] lg:hidden" data-testid="mobile-nav-overlay">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeNav}
          />

          {/* Drawer panel */}
          <div className="absolute left-0 top-0 flex h-full w-72 max-w-[85vw] flex-col bg-background shadow-2xl"
            data-testid="mobile-nav-menu">

            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <Logo />
              <button
                onClick={closeNav}
                className="grid h-9 w-9 place-items-center rounded-full text-foreground hover:bg-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* User profile row */}
            <Link
              to="/profile"
              onClick={closeNav}
              className="flex items-center gap-3 border-b border-border px-4 py-4 hover:bg-accent"
            >
              <img src={user?.avatar} alt={user?.name} className="h-10 w-10 rounded-full object-cover" />
              <div className="min-w-0">
                <p className="truncate font-semibold text-foreground">{user?.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </Link>

            {/* Nav items — scrollable */}
            <nav className="flex-1 overflow-y-auto px-3 py-3">
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Navigation</p>
              {MOBILE_NAV_ITEMS.map(({ icon: Icon, label, to }) => {
                const active = location.pathname === to && !(to === "/" && label !== "Home");
                return (
                  <Link
                    key={label}
                    to={to}
                    onClick={closeNav}
                    data-testid={`mobile-nav-${label.toLowerCase().replace(" ", "-")}`}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition-all hover:bg-accent ${
                      active ? "bg-accent text-primary" : "text-foreground"
                    }`}
                  >
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${active ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    {label}
                  </Link>
                );
              })}

              <div className="my-3 h-px bg-border" />
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Account</p>

              {/* Search */}
              <div className="relative mb-2 px-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Search Usfuturee"
                  className="h-10 w-full rounded-2xl bg-input pl-10 pr-4 text-sm text-foreground outline-none ring-primary focus:ring-2"
                />
              </div>

              {/* Notifications */}
              <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-foreground hover:bg-accent">
                <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary">
                  <Bell className="h-[18px] w-[18px]" />
                  <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full bg-destructive text-[9px] font-bold text-white grid place-items-center">3</span>
                </span>
                Notifications
              </button>

              {/* Portal */}
              <button
                onClick={() => { navigate("/portal"); closeNav(); }}
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-foreground hover:bg-accent"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary">
                  <LayoutGrid className="h-[18px] w-[18px]" />
                </span>
                Portal
              </button>

              {/* Settings */}
              <Link to="/settings" onClick={closeNav}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-foreground hover:bg-accent">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary">
                  <Settings className="h-[18px] w-[18px]" />
                </span>
                Settings
              </Link>
            </nav>

            {/* Drawer footer */}
            <div className="flex items-center justify-between border-t border-border px-4 py-4">
              <ThemeToggle />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-full border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive hover:text-white transition-all"
              >
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </div>
          </div>
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
