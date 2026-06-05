import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { useThemeStore } from "@/store/themeStore";
import {
  UserCog, ShieldCheck, Eye, Database, BellRing, Moon, Sun, Globe,
  Mail, Phone, KeyRound, MonitorSmartphone, Download, Trash2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

const MENU = [
  { id: "account", label: "Account Preferences", icon: UserCog },
  { id: "security", label: "Sign in & Security", icon: ShieldCheck },
  { id: "visibility", label: "Visibility", icon: Eye },
  { id: "privacy", label: "Data Privacy", icon: Database },
  { id: "notifications", label: "Notifications", icon: BellRing },
];

export default function Settings() {
  const { user } = useAuth();
  const themeStore = useThemeStore?.() || {};
  const [active, setActive] = useState("account");
  const [twoFA, setTwoFA] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const isDark = themeStore?.theme === "dark";
  const toggleDark = () => themeStore?.toggleTheme?.();

  return (
    <MainLayout showRight={false}>
      <div data-testid="settings-page" className="flex flex-col gap-6">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Settings</h1>
          <p className="mt-1 text-muted-foreground">Manage your account, privacy and notification preferences.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-border bg-card p-2" data-testid="settings-sidebar">
            {MENU.map((m) => {
              const isActive = active === m.id;
              return (
                <button key={m.id}
                  data-testid={`settings-menu-${m.id}`}
                  onClick={() => setActive(m.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all ${
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"
                  }`}>
                  <m.icon className="h-4 w-4" /> {m.label}
                </button>
              );
            })}
          </aside>

          {/* Panel */}
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-7" data-testid={`settings-panel-${active}`}>
            {active === "account" && (
              <div className="flex flex-col gap-6">
                <Section title="Profile Information">
                  <Row label="Name" value={user?.name || "—"} editTestId="edit-name" />
                  <Row label="Location" value={user?.location || "—"} editTestId="edit-location" />
                  <Row label="Headline" value={user?.headline || "—"} editTestId="edit-headline" />
                </Section>
                <Section title="Display">
                  <Toggle
                    icon={isDark ? Moon : Sun}
                    label="Dark mode"
                    desc="Switch between light and dark theme"
                    checked={isDark}
                    onChange={toggleDark}
                    testid="toggle-dark-mode"
                  />
                </Section>
                <Section title="General">
                  <SelectRow label="Language" icon={Globe} options={["English", "Spanish", "French", "Hindi", "Arabic"]} testid="lang-select" />
                  <SelectRow label="Content language" icon={Globe} options={["English", "Spanish", "French"]} testid="content-lang-select" />
                </Section>
              </div>
            )}

            {active === "security" && (
              <div className="flex flex-col gap-6">
                <Section title="Sign in">
                  <Row icon={Mail} label="Email address" value={maskEmail(user?.email)} editTestId="edit-email" />
                  <Row icon={Phone} label="Phone number" value="+1 ••• ••• 4821" editTestId="edit-phone" />
                  <Row icon={KeyRound} label="Password" value="Last changed 2 months ago" editLabel="Change" editTestId="change-password" />
                </Section>
                <Section title="Security">
                  <Toggle icon={ShieldCheck} label="Two-step verification" desc="Add an extra layer of security to your account" checked={twoFA} onChange={() => setTwoFA(v => !v)} testid="toggle-2fa" />
                </Section>
                <Section title="Active sessions">
                  <SessionRow device="MacBook Pro · Chrome" location="San Francisco, CA" current />
                  <SessionRow device="iPhone 15 · Safari" location="San Francisco, CA" />
                  <SessionRow device="iPad · Safari" location="Seattle, WA" />
                  <button data-testid="signout-all-button" onClick={() => toast.success("Signed out of all devices", { position: "bottom-right" })}
                    className="mt-2 flex items-center gap-2 self-start rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground transition-all hover:opacity-90">
                    Sign out all devices
                  </button>
                </Section>
              </div>
            )}

            {active === "visibility" && (
              <div className="flex flex-col gap-6">
                <Section title="Profile">
                  <SelectRow label="Who can view your profile" options={["Anyone", "Connections", "Nobody"]} testid="profile-visibility" />
                  <Toggle label="Who can see your connections" desc="Show your follower list publicly" checked testid="toggle-connections-vis" />
                  <Toggle label="Who can see members you follow" desc="Show people you follow on your profile" checked testid="toggle-following-vis" />
                </Section>
                <Section title="Discovery">
                  <SelectRow label="Profile discovery using email" options={["Anyone", "Connections", "Nobody"]} testid="discovery-email" />
                </Section>
                <Section title="Blocking">
                  <p className="text-sm text-muted-foreground">You haven't blocked anyone yet.</p>
                  <button data-testid="manage-blocked" onClick={() => toast.message("Block list opened", { position: "bottom-right" })}
                    className="mt-2 self-start rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-accent">
                    Manage blocked accounts
                  </button>
                </Section>
              </div>
            )}

            {active === "privacy" && (
              <div className="flex flex-col gap-6">
                <Section title="Your data">
                  <button data-testid="download-data-button" onClick={() => toast.success("Data export started — you'll get an email", { position: "bottom-right" })}
                    className="flex items-center gap-2 self-start rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-hover">
                    <Download className="h-4 w-4" /> Download your data
                  </button>
                </Section>
                <Section title="Activity">
                  <Toggle label="Activity status" desc="Let others see when you're active" checked testid="toggle-activity-status" />
                  <Toggle label="Mentions by others" desc="Allow others to mention you in posts and comments" checked testid="toggle-mentions" />
                </Section>
                <Section title="Danger zone">
                  <button data-testid="delete-account-button" onClick={() => setDeleteConfirm(true)}
                    className="flex items-center gap-2 self-start rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground transition-all hover:opacity-90">
                    <Trash2 className="h-4 w-4" /> Delete account
                  </button>
                </Section>
              </div>
            )}

            {active === "notifications" && (
              <div className="flex flex-col gap-6">
                <Section title="In-app notifications">
                  <Toggle label="New followers" testid="notif-followers" checked />
                  <Toggle label="Post likes" testid="notif-likes" checked />
                  <Toggle label="Comments" testid="notif-comments" checked />
                  <Toggle label="Messages" testid="notif-messages" checked />
                  <Toggle label="Events" testid="notif-events" checked />
                  <Toggle label="Announcements" testid="notif-announcements" checked />
                </Section>
                <Section title="Channels">
                  <Toggle label="Email notifications" desc="Receive a daily digest" testid="notif-email" checked />
                  <Toggle label="Push notifications" desc="Real-time alerts on this device" testid="notif-push" checked />
                </Section>
              </div>
            )}
          </section>
        </div>
      </div>

      <Dialog open={deleteConfirm} onOpenChange={setDeleteConfirm}>
        <DialogContent className="rounded-2xl sm:max-w-md" data-testid="delete-account-modal">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-destructive">Delete your account?</DialogTitle>
            <DialogDescription>
              This action is permanent. All your posts, messages and data will be removed. Type "delete" to confirm.
            </DialogDescription>
          </DialogHeader>
          <input data-testid="delete-confirm-input" placeholder='Type "delete"'
            className="h-11 rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-destructive" />
          <div className="flex gap-3">
            <button onClick={() => setDeleteConfirm(false)} className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold text-foreground hover:bg-accent">Cancel</button>
            <button data-testid="confirm-delete-account" onClick={() => { setDeleteConfirm(false); toast.error("Deletion request submitted", { position: "bottom-right" }); }}
              className="flex-1 rounded-full bg-destructive py-2.5 text-sm font-semibold text-destructive-foreground hover:opacity-90">Delete forever</button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}

const Section = ({ title, children }) => (
  <div>
    <h3 className="mb-3 font-heading text-base font-bold text-foreground">{title}</h3>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

const Row = ({ icon: Icon, label, value, editLabel = "Edit", editTestId }) => (
  <div className="flex items-center justify-between rounded-xl bg-secondary/60 p-3">
    <div className="flex items-center gap-3">
      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
    <button data-testid={editTestId} onClick={() => toast.message(`${label} editor`, { position: "bottom-right" })}
      className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground hover:bg-accent">
      {editLabel}
    </button>
  </div>
);

const Toggle = ({ icon: Icon, label, desc, checked, onChange, testid }) => {
  const [local, setLocal] = useState(!!checked);
  const value = onChange ? checked : local;
  const handle = (v) => {
    if (onChange) onChange(v);
    else setLocal(v);
  };
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl bg-secondary/60 p-3">
      <div className="flex items-start gap-3">
        {Icon && <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />}
        <div>
          <p className="text-sm font-semibold text-foreground">{label}</p>
          {desc && <p className="text-xs text-muted-foreground">{desc}</p>}
        </div>
      </div>
      <Switch data-testid={testid} checked={value} onCheckedChange={handle} />
    </div>
  );
};

const SelectRow = ({ icon: Icon, label, options, testid }) => (
  <div className="flex items-center justify-between rounded-xl bg-secondary/60 p-3">
    <div className="flex items-center gap-3">
      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      <p className="text-sm font-semibold text-foreground">{label}</p>
    </div>
    <select data-testid={testid}
      className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary">
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  </div>
);

const SessionRow = ({ device, location, current }) => (
  <div className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3">
    <MonitorSmartphone className="h-4 w-4 text-muted-foreground" />
    <div className="flex-1">
      <p className="text-sm font-semibold text-foreground">{device} {current && <span className="ml-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">CURRENT</span>}</p>
      <p className="text-xs text-muted-foreground">{location}</p>
    </div>
  </div>
);

const maskEmail = (e) => {
  if (!e) return "—";
  const [n, d] = e.split("@");
  return `${n.slice(0, 2)}•••@${d}`;
};
