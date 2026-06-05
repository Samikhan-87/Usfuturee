import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, UserPlus, Heart, MessageSquare, Calendar, Wallet, ClipboardList, CheckCheck } from "lucide-react";
import { AVATARS } from "@/utils/mockData";

const ICONS = {
  follower: { i: UserPlus, color: "text-primary" },
  like: { i: Heart, color: "text-rose-500" },
  comment: { i: MessageSquare, color: "text-violet-500" },
  event: { i: Calendar, color: "text-amber-500" },
  fee: { i: Wallet, color: "text-emerald-500" },
  assignment: { i: ClipboardList, color: "text-destructive" },
};

const SEED = [
  { id: "n1", type: "follower", from: "Liam Chen", avatar: AVATARS.diego, msg: "started following you", time: "2m", to: "/profile", unread: true },
  { id: "n2", type: "like", from: "Sofia Nguyen", avatar: AVATARS.aisha, msg: "liked your post on DP", time: "12m", to: "/", unread: true },
  { id: "n3", type: "comment", from: "Mr. Okafor", avatar: AVATARS.maya, msg: "commented on your lab report", time: "1h", to: "/", unread: true },
  { id: "n4", type: "event", from: "Stanford University", avatar: AVATARS.maya, msg: "AI in Education Summit starts tomorrow", time: "3h", to: "/events", unread: false },
  { id: "n5", type: "fee", from: "Lincoln Academy", avatar: AVATARS.aisha, msg: "Tuition fee due in 5 days — $1,200", time: "5h", to: "/portal", unread: false },
  { id: "n6", type: "assignment", from: "Dr. Lee", avatar: AVATARS.diego, msg: "Organic Reactions Worksheet — due Jun 12", time: "1d", to: "/portal", unread: false },
  { id: "n7", type: "like", from: "Emma Davis", avatar: AVATARS.aisha, msg: "and 12 others liked your post", time: "2d", to: "/", unread: false },
];

export const NotificationsDropdown = ({ children }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState(SEED);
  const [tab, setTab] = useState("all");
  const [open, setOpen] = useState(false);

  const unreadCount = items.filter((i) => i.unread).length;
  const list = tab === "unread" ? items.filter((i) => i.unread) : items;

  const onClick = (n) => {
    setItems((arr) => arr.map((x) => (x.id === n.id ? { ...x, unread: false } : x)));
    setOpen(false);
    navigate(n.to);
  };
  const markAllRead = () => setItems((arr) => arr.map((x) => ({ ...x, unread: false })));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children(unreadCount)}</PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="w-[360px] rounded-2xl border-border p-0 shadow-xl" data-testid="notifications-dropdown">
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <h3 className="font-heading text-base font-bold text-foreground">Notifications</h3>
          </div>
          <button
            data-testid="mark-all-read"
            onClick={markAllRead}
            disabled={!unreadCount}
            className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-primary transition-all hover:bg-primary/10 disabled:opacity-40"
          >
            <CheckCheck className="h-3.5 w-3.5" /> Mark all as read
          </button>
        </div>

        <div className="flex gap-1 border-b border-border p-2">
          {[{ k: "all", l: "All" }, { k: "unread", l: `Unread${unreadCount ? ` (${unreadCount})` : ""}` }].map((t) => (
            <button
              key={t.k}
              data-testid={`notif-tab-${t.k}`}
              onClick={() => setTab(t.k)}
              className={`flex-1 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                tab === t.k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
              }`}
            >
              {t.l}
            </button>
          ))}
        </div>

        <div className="max-h-[420px] overflow-auto" data-testid="notif-list">
          {list.length === 0 ? (
            <div className="grid h-32 place-items-center text-center text-sm text-muted-foreground">
              You're all caught up 🎉
            </div>
          ) : (
            list.map((n) => {
              const { i: Icon, color } = ICONS[n.type];
              return (
                <button
                  key={n.id}
                  data-testid={`notif-item-${n.id}`}
                  onClick={() => onClick(n)}
                  className={`flex w-full items-start gap-3 border-b border-border/60 px-4 py-3 text-left transition-all hover:bg-accent ${
                    n.unread ? "bg-primary/[0.04]" : ""
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={n.avatar} alt={n.from} className="h-10 w-10 rounded-full object-cover" />
                    <span className={`absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-card ${color}`}>
                      <Icon className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">{n.from}</span> <span className="text-muted-foreground">{n.msg}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
                  </div>
                  {n.unread && <span data-testid={`unread-dot-${n.id}`} className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                </button>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
