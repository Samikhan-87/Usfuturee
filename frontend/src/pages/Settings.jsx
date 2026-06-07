import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { useThemeStore } from "@/store/themeStore";
import { User, Mail, Lock, Bell, Moon, Sun, Shield, Trash2, LogOut } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Panel = ({ title, icon: Icon, children }) => (
  <div className="rounded-2xl border border-border bg-card p-5">
    <h2 className="mb-5 flex items-center gap-2 font-heading text-base font-bold text-foreground">
      <Icon className="h-4 w-4 text-primary" /> {title}
    </h2>
    <div className="flex flex-col gap-4">{children}</div>
  </div>
);

const Field = ({ label, type = "text", placeholder, defaultValue }) => (
  <div>
    <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</label>
    <input type={type} placeholder={placeholder} defaultValue={defaultValue}
      className="h-11 w-full rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary transition-all focus:ring-2" />
  </div>
);

export default function Settings() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const [notifPrefs, setNotifPrefs] = useState({
    announcements: true,
    assignments: true,
    tests: true,
    fees: true,
    messages: false,
  });

  const save = (section) => toast.success(`${section} settings saved!`, { position: "bottom-right" });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <MainLayout showRight={false}>
      <div data-testid="settings-page" className="flex flex-col gap-6">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Settings</h1>
          <p className="mt-1 text-muted-foreground">Manage your account and preferences.</p>
        </div>

        {/* Profile */}
        <Panel title="Profile Information" icon={User}>
          <div className="flex items-center gap-4">
            <img src={user?.avatar} alt={user?.name} className="h-16 w-16 rounded-full object-cover" />
            <div>
              <p className="font-heading text-lg font-bold text-foreground">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Field label="Full Name" placeholder="Your full name" defaultValue={user?.name} />
          <Field label="Email Address" type="email" placeholder="your@email.com" defaultValue={user?.email} />
          <Field label="Institution" placeholder="Institution name" defaultValue={user?.institution} />
          <Field label="Headline / Bio" placeholder="e.g. CS Student • Class of 2027" defaultValue={user?.headline} />
          <button onClick={() => save("Profile")}
            className="self-start rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90">
            Save Profile
          </button>
        </Panel>

        {/* Password */}
        <Panel title="Change Password" icon={Lock}>
          <Field label="Current Password" type="password" placeholder="••••••••" />
          <Field label="New Password" type="password" placeholder="••••••••" />
          <Field label="Confirm New Password" type="password" placeholder="••••••••" />
          <button onClick={() => save("Password")}
            className="self-start rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90">
            Update Password
          </button>
        </Panel>

        {/* Appearance */}
        <Panel title="Appearance" icon={theme === "dark" ? Moon : Sun}>
          <div className="flex items-center justify-between rounded-2xl bg-secondary/60 p-4">
            <div className="flex items-center gap-3">
              {theme === "dark" ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
              <div>
                <p className="font-semibold text-foreground">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Switch between light and dark theme</p>
              </div>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} data-testid="settings-theme-toggle" />
          </div>
        </Panel>

        {/* Notifications */}
        <Panel title="Notification Preferences" icon={Bell}>
          {Object.entries(notifPrefs).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-semibold capitalize text-foreground">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                <p className="text-xs text-muted-foreground">Receive notifications for {key.toLowerCase()}</p>
              </div>
              <Switch checked={value} onCheckedChange={(v) => setNotifPrefs((n) => ({ ...n, [key]: v }))} />
            </div>
          ))}
          <button onClick={() => save("Notification")}
            className="self-start rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90">
            Save Preferences
          </button>
        </Panel>

        {/* Privacy */}
        <Panel title="Privacy & Security" icon={Shield}>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <p>Your data is handled according to our privacy policy. We never share your personal information with third parties without your consent.</p>
            <button onClick={() => toast.info("2FA setup coming soon")}
              className="self-start rounded-full border border-border px-5 py-2.5 font-semibold text-foreground transition-all hover:bg-accent">
              Enable Two-Factor Authentication
            </button>
          </div>
        </Panel>

        {/* Danger zone */}
        <div className="rounded-2xl border-2 border-destructive/30 bg-card p-5">
          <h2 className="mb-3 flex items-center gap-2 font-heading text-base font-bold text-destructive">
            <Trash2 className="h-4 w-4" /> Danger Zone
          </h2>
          <div className="flex flex-col gap-3">
            <button onClick={handleLogout}
              className="flex items-center gap-2 self-start rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-accent">
              <LogOut className="h-4 w-4" /> Log Out
            </button>
            <button onClick={() => toast.error("Account deletion requires contacting support.")}
              className="flex items-center gap-2 self-start rounded-full border-2 border-destructive px-5 py-2.5 text-sm font-semibold text-destructive transition-all hover:bg-destructive hover:text-white">
              <Trash2 className="h-4 w-4" /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
