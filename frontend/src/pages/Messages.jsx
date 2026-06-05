import { useState, useRef, useEffect } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { AVATARS } from "@/utils/mockData";
import { Search, Send, ArrowLeft, MessageSquareDashed, CheckCheck } from "lucide-react";

const SEED_CHATS = [
  {
    id: "c1", name: "Liam Chen", avatar: AVATARS.diego, online: true, unread: 2,
    messages: [
      { id: "m1", from: "them", text: "Hey! Are you joining the DSA study session tonight?", time: "10:24 AM", group: "Today" },
      { id: "m2", from: "me", text: "Yes, definitely. Same Zoom link?", time: "10:26 AM", group: "Today" },
      { id: "m3", from: "them", text: "Yep, 7 PM. We're covering segment trees.", time: "10:27 AM", group: "Today" },
      { id: "m4", from: "them", text: "Bring your laptop 💻", time: "10:27 AM", group: "Today" },
    ],
  },
  {
    id: "c2", name: "Sofia Nguyen", avatar: AVATARS.aisha, online: true, unread: 0,
    messages: [
      { id: "m1", from: "them", text: "The new Figma tokens look great!", time: "Yesterday", group: "Yesterday" },
      { id: "m2", from: "me", text: "Thanks! Let me know if you spot anything off.", time: "Yesterday", group: "Yesterday" },
    ],
  },
  {
    id: "c3", name: "Mr. Okafor", avatar: AVATARS.maya, online: false, unread: 1,
    messages: [
      { id: "m1", from: "them", text: "Lab reports are due Friday — please don't be late this time 🙂", time: "Mon", group: "Monday" },
    ],
  },
  {
    id: "c4", name: "Emma Davis", avatar: AVATARS.aisha, online: false, unread: 0,
    messages: [
      { id: "m1", from: "me", text: "Did you get the bio notes?", time: "Sun", group: "Sunday" },
      { id: "m2", from: "them", text: "Sending now!", time: "Sun", group: "Sunday" },
    ],
  },
  {
    id: "c5", name: "Carlos Mendez", avatar: AVATARS.diego, online: true, unread: 0,
    messages: [
      { id: "m1", from: "them", text: "Up for a chess match this weekend?", time: "Fri", group: "Friday" },
    ],
  },
];

export default function Messages() {
  const [chats, setChats] = useState(SEED_CHATS);
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const scrollRef = useRef(null);

  const active = chats.find((c) => c.id === activeId);
  const filtered = chats.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [active?.messages.length, activeId]);

  const openChat = (id) => {
    setActiveId(id);
    setChats((arr) => arr.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  };

  const send = () => {
    const text = draft.trim();
    if (!text || !active) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChats((arr) =>
      arr.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [...c.messages, { id: "m" + Date.now(), from: "me", text, time, group: "Today" }],
            }
          : c
      )
    );
    setDraft("");
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // group messages by .group label for date separators
  const grouped = active
    ? active.messages.reduce((acc, m) => {
        const last = acc[acc.length - 1];
        if (!last || last.group !== m.group) acc.push({ group: m.group, items: [m] });
        else last.items.push(m);
        return acc;
      }, [])
    : [];

  return (
    <MainLayout showRight={false}>
      <div data-testid="messages-page" className="h-[calc(100vh-9rem)] overflow-hidden rounded-3xl border border-border bg-card">
        <div className="grid h-full grid-cols-1 md:grid-cols-[320px_1fr]">
          {/* Conversation list */}
          <aside
            data-testid="conversation-list"
            className={`flex h-full flex-col border-r border-border ${active ? "hidden md:flex" : "flex"}`}
          >
            <div className="flex items-center justify-between border-b border-border p-4">
              <h2 className="font-heading text-lg font-bold text-foreground">Messages</h2>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                {chats.reduce((s, c) => s + c.unread, 0)} new
              </span>
            </div>

            <div className="p-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  data-testid="conversation-search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search conversations"
                  className="h-10 w-full rounded-full bg-secondary pl-10 pr-4 text-sm text-foreground outline-none transition-all focus:bg-background focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              {filtered.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted-foreground">No conversations found</p>
              ) : (
                filtered.map((c) => {
                  const last = c.messages[c.messages.length - 1];
                  const isActive = c.id === activeId;
                  return (
                    <button
                      key={c.id}
                      data-testid={`conversation-${c.id}`}
                      onClick={() => openChat(c.id)}
                      className={`flex w-full items-center gap-3 px-3 py-3 text-left transition-all hover:bg-accent ${
                        isActive ? "bg-primary/[0.06]" : ""
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img src={c.avatar} alt={c.name} className="h-11 w-11 rounded-full object-cover" />
                        {c.online && (
                          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-semibold text-foreground">{c.name}</p>
                          <span className="shrink-0 text-[11px] text-muted-foreground">{last?.time}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <p className={`truncate text-xs ${c.unread ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                            {last?.from === "me" && "You: "}
                            {last?.text}
                          </p>
                          {c.unread > 0 && (
                            <span
                              data-testid={`unread-badge-${c.id}`}
                              className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground"
                            >
                              {c.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          {/* Active conversation panel */}
          <section
            data-testid="conversation-panel"
            className={`flex h-full min-w-0 flex-col bg-background ${active ? "flex" : "hidden md:flex"}`}
          >
            {!active ? (
              <div className="grid flex-1 place-items-center px-6 text-center text-muted-foreground">
                <div>
                  <MessageSquareDashed className="mx-auto h-12 w-12 text-primary/60" />
                  <p className="mt-4 font-heading text-lg font-bold text-foreground">Select a conversation to start messaging</p>
                  <p className="mt-1 text-sm">Pick a friend from the list to dive into the chat.</p>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3" data-testid="conversation-header">
                  <button
                    data-testid="back-to-list"
                    onClick={() => setActiveId(null)}
                    className="grid h-9 w-9 place-items-center rounded-full text-foreground transition-all hover:bg-accent md:hidden"
                    aria-label="Back"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <div className="relative">
                    <img src={active.avatar} alt={active.name} className="h-10 w-10 rounded-full object-cover" />
                    {active.online && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-heading text-base font-bold text-foreground">{active.name}</p>
                    <p className="text-xs text-muted-foreground">{active.online ? "Online now" : "Offline"}</p>
                  </div>
                </header>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-auto px-4 py-4" data-testid="messages-area">
                  <div className="flex flex-col gap-4">
                    {grouped.map((g) => (
                      <div key={g.group} className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 py-1">
                          <div className="h-px flex-1 bg-border" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{g.group}</span>
                          <div className="h-px flex-1 bg-border" />
                        </div>
                        {g.items.map((m) => {
                          const me = m.from === "me";
                          return (
                            <div
                              key={m.id}
                              data-testid={`message-${m.id}`}
                              className={`flex flex-col gap-1 ${me ? "items-end" : "items-start"}`}
                            >
                              <div
                                className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                                  me
                                    ? "rounded-br-md bg-primary text-primary-foreground"
                                    : "rounded-bl-md bg-secondary text-foreground"
                                }`}
                              >
                                {m.text}
                              </div>
                              <p className="flex items-center gap-1 px-1 text-[10px] text-muted-foreground">
                                {m.time}
                                {me && <CheckCheck className="h-3 w-3 text-primary" />}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="border-t border-border bg-card p-3" data-testid="message-input-bar">
                  <div className="flex items-center gap-2">
                    <input
                      data-testid="message-input"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={onKey}
                      placeholder={`Message ${active.name}`}
                      className="h-11 flex-1 rounded-full bg-secondary px-4 text-sm text-foreground outline-none transition-all focus:bg-background focus:ring-2 focus:ring-primary/40"
                    />
                    <button
                      data-testid="message-send"
                      onClick={send}
                      disabled={!draft.trim()}
                      className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary-hover disabled:opacity-40"
                      aria-label="Send"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
