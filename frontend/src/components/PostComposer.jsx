import { useState } from "react";
import { Image, Video, Smile, Calendar, Send } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useFeedStore } from "@/store/feedStore";
import { toast } from "sonner";

export const PostComposer = () => {
  const { user } = useAuth();
  const addPost = useFeedStore((s) => s.addPost);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    addPost({
      id: "p_" + Date.now(),
      author: { name: user.name, headline: user.headline, avatar: user.avatar },
      time: "now",
      content: text.trim(),
      image: null,
      tag: "Update",
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
    });
    setText("");
    setOpen(false);
    toast.success("Posted to your feed!");
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5" data-testid="post-composer">
      <div className="flex items-center gap-3">
        <img src={user?.avatar} alt={user?.name} className="h-11 w-11 rounded-full object-cover" />
        <button
          data-testid="composer-open-button"
          onClick={() => setOpen(true)}
          className="h-11 flex-1 rounded-full bg-input px-5 text-left text-sm text-muted-foreground transition-all duration-200 hover:bg-secondary"
        >
          Share something you learned, {user?.name?.split(" ")[0]}...
        </button>
      </div>

      {open && (
        <div className="mt-4 animate-fade-up">
          <textarea
            data-testid="composer-textarea"
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            rows={3}
            className="w-full resize-none rounded-2xl bg-input p-4 text-foreground outline-none ring-primary transition-all duration-200 focus:ring-2"
          />
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-1">
          {[
            { icon: Image, label: "Photo", color: "text-emerald-500" },
            { icon: Video, label: "Video", color: "text-rose-500" },
            { icon: Smile, label: "Feeling", color: "text-amber-500" },
            { icon: Calendar, label: "Event", color: "text-primary" },
          ].map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              data-testid={`composer-${label.toLowerCase()}-button`}
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-accent sm:px-3"
            >
              <Icon className={`h-5 w-5 ${color}`} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
        <button
          data-testid="composer-submit-button"
          onClick={submit}
          disabled={!text.trim()}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover disabled:opacity-40"
        >
          <Send className="h-4 w-4" /> Post
        </button>
      </div>
    </div>
  );
};
