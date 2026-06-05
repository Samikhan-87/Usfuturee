import { useState, useRef, useEffect } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { api } from "@/services/api";
import { EDUBOT_QUESTIONS } from "@/utils/mockData";
import {
  Bot, Send, RotateCcw, ThumbsUp, ThumbsDown, Sparkles, Loader2,
} from "lucide-react";
import { toast } from "sonner";

const WELCOME = {
  id: "welcome",
  role: "assistant",
  content: "Hello! I'm EduBot, your educational assistant. How can I help you today?",
};

export default function AIChat() {
  const sessionId = useRef(
    (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now())
  );
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({});
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const userMsg = { id: "u_" + Date.now(), role: "user", content };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await api.post("/chat/edubot", { session_id: sessionId.current, message: content });
      setMessages((m) => [...m, { id: "a_" + Date.now(), role: "assistant", content: res.data.reply }]);
    } catch (e) {
      toast.error("EduBot couldn't respond. Please try again.");
      setMessages((m) => [...m, { id: "err_" + Date.now(), role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([WELCOME]);
    setFeedback({});
    sessionId.current = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now());
  };

  return (
    <MainLayout showRight={false}>
      <div data-testid="ai-chat-page" className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        {/* Suggested questions */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-5" data-testid="suggested-questions">
          <h3 className="mb-4 flex items-center gap-2 font-heading text-base font-bold text-foreground">
            <Sparkles className="h-4 w-4 text-primary" /> Suggested Questions
          </h3>
          <div className="flex flex-col gap-2">
            {EDUBOT_QUESTIONS.map((q, i) => (
              <button
                key={i}
                data-testid={`suggested-q-${i}`}
                onClick={() => sendMessage(q)}
                disabled={loading}
                className="rounded-xl border border-border bg-background px-3 py-2.5 text-left text-sm font-medium text-foreground transition-all duration-200 hover:border-primary hover:bg-accent hover:text-primary disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </aside>

        {/* Chat */}
        <section className="flex h-[calc(100vh-9rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card" data-testid="chat-panel">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground">EduBot Assistant</p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Online
                </p>
              </div>
            </div>
            <button
              data-testid="clear-chat-button"
              onClick={clearChat}
              className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground transition-all hover:bg-accent"
              title="Clear chat"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4" data-testid="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="h-5 w-5" />
                  </div>
                )}
                <div className={`max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div
                    data-testid={`msg-${msg.role}`}
                    className={`whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-tr-sm bg-primary text-primary-foreground"
                        : "rounded-tl-sm bg-secondary text-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "assistant" && msg.id !== "welcome" && (
                    <div className="flex items-center gap-1 px-1">
                      <button
                        data-testid={`thumbs-up-${msg.id}`}
                        onClick={() => setFeedback((f) => ({ ...f, [msg.id]: f[msg.id] === "up" ? null : "up" }))}
                        className={`grid h-7 w-7 place-items-center rounded-full transition-all hover:bg-accent ${feedback[msg.id] === "up" ? "text-primary" : "text-muted-foreground"}`}
                      >
                        <ThumbsUp className={`h-3.5 w-3.5 ${feedback[msg.id] === "up" ? "fill-primary" : ""}`} />
                      </button>
                      <button
                        data-testid={`thumbs-down-${msg.id}`}
                        onClick={() => setFeedback((f) => ({ ...f, [msg.id]: f[msg.id] === "down" ? null : "down" }))}
                        className={`grid h-7 w-7 place-items-center rounded-full transition-all hover:bg-accent ${feedback[msg.id] === "down" ? "text-destructive" : "text-muted-foreground"}`}
                      >
                        <ThumbsDown className={`h-3.5 w-3.5 ${feedback[msg.id] === "down" ? "fill-destructive" : ""}`} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3" data-testid="typing-indicator">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-secondary px-4 py-3.5">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              data-testid="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="h-11 flex-1 rounded-full bg-input px-5 text-foreground outline-none ring-primary transition-all focus:ring-2"
            />
            <button
              type="submit"
              data-testid="chat-send-button"
              disabled={loading || !input.trim()}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary-hover disabled:opacity-40"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </form>
        </section>
      </div>
    </MainLayout>
  );
}
