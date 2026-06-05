import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Bookmark } from "lucide-react";
import { useFeedStore } from "@/store/feedStore";

export const PostCard = ({ post, index = 0 }) => {
  const toggleLike = useFeedStore((s) => s.toggleLike);

  return (
    <article
      data-testid={`post-${post.id}`}
      style={{ animationDelay: `${index * 60}ms` }}
      className="animate-fade-up overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-5 pb-3">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="h-11 w-11 rounded-full object-cover ring-2 ring-transparent transition-all duration-200 hover:ring-primary"
        />
        <div className="flex-1">
          <p className="font-semibold text-foreground">{post.author.name}</p>
          <p className="text-xs text-muted-foreground">
            {post.author.headline} · {post.time}
          </p>
        </div>
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
          {post.tag}
        </span>
        <button
          data-testid={`post-${post.id}-more`}
          className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-accent"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <p className="px-5 pb-4 text-[15px] leading-relaxed text-foreground">{post.content}</p>

      {post.image && (
        <img src={post.image} alt="post" className="max-h-[480px] w-full object-cover" />
      )}

      {/* Stats */}
      <div className="flex items-center justify-between px-5 py-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground">
            <ThumbsUp className="h-3 w-3" />
          </span>
          {post.likes.toLocaleString()}
        </span>
        <span>
          {post.comments} comments · {post.shares} shares
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-around border-t border-border px-2 py-1.5">
        <button
          data-testid={`post-${post.id}-like-button`}
          onClick={() => toggleLike(post.id)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 hover:bg-accent ${
            post.liked ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <ThumbsUp className={`h-5 w-5 ${post.liked ? "fill-primary" : ""}`} /> Like
        </button>
        <button
          data-testid={`post-${post.id}-comment-button`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:bg-accent"
        >
          <MessageCircle className="h-5 w-5" /> Comment
        </button>
        <button
          data-testid={`post-${post.id}-share-button`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:bg-accent"
        >
          <Share2 className="h-5 w-5" /> Share
        </button>
        <button
          data-testid={`post-${post.id}-save-button`}
          className="hidden flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:bg-accent sm:flex"
        >
          <Bookmark className="h-5 w-5" /> Save
        </button>
      </div>
    </article>
  );
};
