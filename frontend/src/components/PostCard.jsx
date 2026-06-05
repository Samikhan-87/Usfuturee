import { useState } from "react";
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Bookmark, BadgeCheck, Plus, Check, Flag, EyeOff } from "lucide-react";
import { useFeedStore } from "@/store/feedStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const PostCard = ({ post, index = 0 }) => {
  const toggleLike = useFeedStore((s) => s.toggleLike);
  const [following, setFollowing] = useState(post.following);

  return (
    <article
      data-testid={`post-${post.id}`}
      style={{ animationDelay: `${index * 60}ms` }}
      className="animate-fade-up overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-5 pb-3">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="h-11 w-11 rounded-full object-cover ring-2 ring-transparent transition-all duration-200 hover:ring-primary"
        />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 font-semibold text-foreground">
            <span className="truncate">{post.author.name}</span>
            {post.author.verified && <BadgeCheck className="h-4 w-4 shrink-0 fill-primary text-card" />}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {post.author.headline} · {post.time}
          </p>
        </div>

        <button
          data-testid={`post-${post.id}-follow-button`}
          onClick={() => setFollowing((f) => !f)}
          className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
            following ? "bg-secondary text-foreground" : "bg-accent text-primary hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          {following ? <><Check className="h-3.5 w-3.5" /> Following</> : <><Plus className="h-3.5 w-3.5" /> Follow</>}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              data-testid={`post-${post.id}-more`}
              className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-accent"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-2xl">
            <DropdownMenuItem className="cursor-pointer"><Bookmark className="mr-2 h-4 w-4" /> Save post</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"><EyeOff className="mr-2 h-4 w-4" /> Hide post</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive"><Flag className="mr-2 h-4 w-4" /> Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      {post.content && <p className="px-5 pb-4 text-[15px] leading-relaxed text-foreground">{post.content}</p>}

      {post.image && <img src={post.image} alt="post" className="max-h-[480px] w-full object-cover" />}

      {/* Stats */}
      <div className="flex items-center justify-between px-5 py-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground">
            <ThumbsUp className="h-3 w-3" />
          </span>
          {post.likes.toLocaleString()}
        </span>
        <span>{post.comments} comments · {post.shares} shares</span>
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
      </div>
    </article>
  );
};
