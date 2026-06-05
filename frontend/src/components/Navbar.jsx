import { Link, useNavigate } from "react-router-dom";
import { Search, Home, Users, Bell, MessageCircle, LogOut } from "lucide-react";
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

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-border bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left: logo + search */}
        <div className="flex items-center gap-3">
          <Link to="/" data-testid="navbar-logo-link">
            <Logo />
          </Link>
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              data-testid="navbar-search-input"
              placeholder="Search Usfuturee"
              className="h-10 w-56 rounded-full border border-transparent bg-input pl-10 pr-4 text-sm text-foreground outline-none transition-all duration-200 focus:w-72 focus:border-primary focus:bg-card"
            />
          </div>
        </div>

        {/* Center: nav icons */}
        <nav className="hidden items-center gap-1 lg:flex">
          {[
            { icon: Home, label: "Home", to: "/" },
            { icon: Users, label: "Groups", to: "/groups" },
            { icon: MessageCircle, label: "Messages", to: "/" },
            { icon: Bell, label: "Notifications", to: "/" },
          ].map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
              data-testid={`navbar-${label.toLowerCase()}-link`}
              className="grid h-11 w-16 place-items-center rounded-xl text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-primary"
            >
              <Icon className="h-5 w-5" />
            </Link>
          ))}
        </nav>

        {/* Right: theme + profile */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                data-testid="navbar-profile-button"
                className="flex items-center gap-2 rounded-full p-0.5 ring-2 ring-transparent transition-all duration-200 hover:ring-primary"
              >
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="h-9 w-9 rounded-full object-cover"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-2xl">
              <DropdownMenuLabel className="font-heading">
                {user?.name}
                <p className="text-xs font-normal text-muted-foreground">{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                data-testid="menu-profile-link"
                onClick={() => navigate("/profile")}
                className="cursor-pointer"
              >
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                data-testid="menu-groups-link"
                onClick={() => navigate("/groups")}
                className="cursor-pointer"
              >
                My Groups
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                data-testid="menu-logout-button"
                onClick={handleLogout}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
