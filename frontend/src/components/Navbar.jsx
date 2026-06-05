import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Home, Users, Calendar, Bot, MessageCircle, Bell, LayoutGrid, LogOut, Menu, X } from "lucide-react";
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
  { icon: Home, label: "Home", to: "/" },
  { icon: Users, label: "Groups", to: "/groups" },
  { icon: Calendar, label: "Events", to: "/events" },
  { icon: Bot, label: "AI Chat", to: "/ai-chat" },
];

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSearch, setMobileSearch] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-border bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* Left: hamburger (mobile) + logo */}
        <div className="flex items-center gap-2">
          <button
            data-testid="mobile-nav-toggle"
            onClick={() => setMobileNav((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground transition-all hover:bg-accent lg:hidden"
          >
            {mobileNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to="/" data-testid="navbar-logo-link" className="shrink-0">
            <Logo />
          </Link>
        </div>

        {/* Center: nav tabs (desktop) */}
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

        {/* Right: search + actions */}
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
          {/* Mobile search icon */}
          <button
            data-testid="navbar-mobile-search-button"
            onClick={() => setMobileSearch((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground transition-all hover:bg-accent md:hidden"
          >
            <Search className="h-5 w-5" />
          </button>

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
            onClick={() => navigate("/groups")}
            className="hidden items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground sm:flex"
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
              <DropdownMenuItem data-testid="menu-profile-link" onClick={() => navigate("/profile")} className="cursor-pointer">
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem data-testid="menu-groups-link" onClick={() => navigate("/groups")} className="cursor-pointer">
                My Groups
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem data-testid="menu-logout-button" onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile search bar */}
      {mobileSearch && (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              data-testid="mobile-search-input"
              autoFocus
              placeholder="Search Usfuturee"
              className="h-10 w-full rounded-full bg-input pl-10 pr-4 text-sm text-foreground outline-none"
            />
          </div>
        </div>
      )}

      {/* Mobile nav menu */}
      {mobileNav && (
        <nav className="border-t border-border bg-background px-3 py-2 lg:hidden" data-testid="mobile-nav-menu">
          {NAV_TABS.map(({ icon: Icon, label, to }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                onClick={() => setMobileNav(false)}
                data-testid={`mobile-nav-${label.toLowerCase().replace(" ", "-")}`}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all hover:bg-accent ${
                  active ? "text-primary" : "text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" /> {label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
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
