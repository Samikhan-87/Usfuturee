import { useState } from "react";
import { ThumbsUp, MessageCircle, Share2, BadgeCheck, Users } from "lucide-react";

export const GroupPostCard = ({ post, index = 0 }) => {
  const [liked, setLiked] = useState(false);
  const likes = post.likes + (liked ? 1 : 0);

  return (
    <article
      data-testid={`group-post-${post.id}`}
      style={{ animationDelay: `${index * 60}ms` }}
      className="animate-fade-up overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-3 p-5 pb-3">
        <img src={post.author.avatar} alt={post.author.name} className="h-11 w-11 rounded-full object-cover" />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 font-semibold text-foreground">
            <span className="truncate">{post.author.name}</span>
            {post.author.verified && <BadgeCheck className="h-4 w-4 shrink-0 fill-primary text-card" />}
          </p>
          <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
            <Users className="h-3 w-3" /> {post.group} · {post.time}
          </p>
        </div>
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{post.tag}</span>
      </div>

      {post.content && <p className="px-5 pb-4 text-[15px] leading-relaxed text-foreground">{post.content}</p>}
      {post.image && <img src={post.image} alt="post" className="max-h-[420px] w-full object-cover" />}

      <div className="flex items-center justify-between px-5 py-3 text-sm text-muted-foreground">
        <span>{likes.toLocaleString()} likes</span>
        <span>{post.comments} comments · {post.shares} shares</span>
      </div>

      <div className="flex items-center justify-around border-t border-border px-2 py-1.5">
        <button
          data-testid={`group-post-${post.id}-like`}
          onClick={() => setLiked((l) => !l)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 hover:bg-accent ${liked ? "text-primary" : "text-muted-foreground"}`}
        >
          <ThumbsUp className={`h-5 w-5 ${liked ? "fill-primary" : ""}`} /> Like
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:bg-accent">
          <MessageCircle className="h-5 w-5" /> Comment
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:bg-accent">
          <Share2 className="h-5 w-5" /> Share
        </button>
      </div>
    </article>
  );
};
