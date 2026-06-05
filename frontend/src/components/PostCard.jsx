import { useState, useRef } from "react";
import {
  ThumbsUp, MessageCircle, Share2, MoreHorizontal, Bookmark, BadgeCheck,
  Plus, Check, Flag, EyeOff, Pencil, Trash2, Link2, Download, Send,
  ChevronDown, ChevronUp, CornerDownRight, Image as ImageIcon, X, Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFeedStore, REACTION_TYPES } from "@/store/feedStore";
import { useInsightsStore, isRelevantToTarget } from "@/store/insightsStore";
import { useAuth } from "@/hooks/useAuth";
import { GROUPS } from "@/utils/mockData";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

const SEE_MORE_LIMIT = 220; // chars before truncation

const EMPTY_ARR = [];
const EMPTY_OBJ = {};

export const PostCard = ({ post, index = 0 }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const setReaction = useFeedStore((s) => s.setReaction);
  const reaction = useFeedStore((s) => s.reactions[post.id]);
  const reactionCounts = useFeedStore((s) => s.reactionCounts[post.id]) || EMPTY_OBJ;
  const allComments = useFeedStore((s) => s.comments[post.id]) || EMPTY_ARR;
  const addComment = useFeedStore((s) => s.addComment);
  const toggleCommentLike = useFeedStore((s) => s.toggleCommentLike);
  const saved = useFeedStore((s) => s.saved.includes(post.id));
  const toggleSaved = useFeedStore((s) => s.toggleSaved);
  const followingMap = useFeedStore((s) => s.following);
  const toggleFollow = useFeedStore((s) => s.toggleFollow);
  const editPost = useFeedStore((s) => s.editPost);
  const deletePost = useFeedStore((s) => s.deletePost);
  const target = useInsightsStore((s) => s.target);

  const [showReactions, setShowReactions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const hoverTimer = useRef(null);
  const isOwn = user?.name && post.author.name === user.name;
  const isFollowing = followingMap[post.author.name] ?? post.following;
  const relevant = isRelevantToTarget(post, target);
  const longText = (post.content || "").length > SEE_MORE_LIMIT;
  const shownText = !expanded && longText ? post.content.slice(0, SEE_MORE_LIMIT) + "…" : post.content;

  const myReaction = REACTION_TYPES.find((r) => r.key === reaction);

  const onLikeHover = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setShowReactions(true), 250);
  };
  const onLikeLeave = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setShowReactions(false), 400);
  };

  const onSave = () => {
    toggleSaved(post.id);
    if (!saved) {
      toast.success("Post saved — view in your Saved page.", {
        action: { label: "Go to Saved", onClick: () => navigate("/saved") },
      });
    } else {
      toast.message("Removed from saved.");
    }
  };

  // Threaded comments: build parents + their replies
  const parents = allComments.filter((c) => !c.parent);
  const repliesOf = (id) => allComments.filter((c) => c.parent === id);
  const totalReactions = Object.values(reactionCounts).reduce((a, b) => a + b, 0) || post.likes;
  const topReactions = REACTION_TYPES.filter((r) => (reactionCounts[r.key] || 0) > 0).slice(0, 3);

  return (
    <article
      data-testid={`post-${post.id}`}
      style={{ animationDelay: `${index * 60}ms` }}
      className="animate-fade-up overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
    >
      {/* Relevant badge */}
      {relevant && (
        <div data-testid={`relevant-badge-${post.id}`} className="flex items-center gap-1.5 border-b border-primary/20 bg-primary/10 px-5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
          <Sparkles className="h-3 w-3" /> Relevant to your goal
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 p-5 pb-3">
        <img src={post.author.avatar} alt={post.author.name} className="h-11 w-11 rounded-full object-cover ring-2 ring-transparent transition-all duration-200 hover:ring-primary" />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 font-semibold text-foreground">
            <span className="truncate">{post.author.name}</span>
            {post.author.verified && (
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span data-testid={`verified-${post.id}`}>
                      <BadgeCheck className="h-4 w-4 shrink-0 fill-primary text-card" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Verified Institution</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {post.edited && <span className="ml-1 text-[10px] font-normal text-muted-foreground">(edited)</span>}
          </p>
          <p className="truncate text-xs text-muted-foreground">{post.author.headline} · {post.time}</p>
        </div>

        {!isOwn && (
          <button
            data-testid={`post-${post.id}-follow-button`}
            onClick={() => toggleFollow(post.author.name)}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
              isFollowing ? "bg-secondary text-foreground" : "bg-accent text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {isFollowing ? <><Check className="h-3.5 w-3.5" /> Following</> : <><Plus className="h-3.5 w-3.5" /> Follow</>}
          </button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button data-testid={`post-${post.id}-more`} className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-all hover:bg-accent">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-2xl">
            <DropdownMenuItem onClick={onSave} className="cursor-pointer" data-testid={`save-${post.id}`}>
              <Bookmark className={`mr-2 h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} /> {saved ? "Unsave" : "Save post"}
            </DropdownMenuItem>
            {isOwn && (
              <DropdownMenuItem onClick={() => setEditOpen(true)} className="cursor-pointer" data-testid={`edit-${post.id}`}>
                <Pencil className="mr-2 h-4 w-4" /> Edit post
              </DropdownMenuItem>
            )}
            {isOwn && (
              <DropdownMenuItem onClick={() => setDeleteOpen(true)} className="cursor-pointer text-destructive focus:text-destructive" data-testid={`delete-${post.id}`}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete post
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="cursor-pointer"><EyeOff className="mr-2 h-4 w-4" /> Hide post</DropdownMenuItem>
            {!isOwn && (
              <DropdownMenuItem onClick={() => setReportOpen(true)} className="cursor-pointer text-destructive focus:text-destructive" data-testid={`report-${post.id}`}>
                <Flag className="mr-2 h-4 w-4" /> Report
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content with See more */}
      {post.content && (
        <p className="px-5 pb-4 text-[15px] leading-relaxed text-foreground whitespace-pre-wrap">
          {shownText}{" "}
          {longText && (
            <button
              data-testid={`see-more-${post.id}`}
              onClick={() => setExpanded((v) => !v)}
              className="font-semibold text-primary hover:underline"
            >
              {expanded ? "See less" : "See more"}
            </button>
          )}
        </p>
      )}

      {post.image && <img src={post.image} alt="post" className="max-h-[480px] w-full object-cover" />}

      {/* Stats */}
      <div className="flex items-center justify-between px-5 py-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          {topReactions.length ? (
            <span className="flex -space-x-1.5">
              {topReactions.map((r) => (
                <span key={r.key} className="grid h-5 w-5 place-items-center rounded-full bg-card text-xs ring-2 ring-card">{r.emoji}</span>
              ))}
            </span>
          ) : (
            <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground">
              <ThumbsUp className="h-3 w-3" />
            </span>
          )}
          {totalReactions.toLocaleString()}
        </span>
        <button onClick={() => setShowComments((v) => !v)} className="hover:underline" data-testid={`comments-count-${post.id}`}>
          {post.comments} comments · {post.shares} shares
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-around border-t border-border px-2 py-1.5">
        {/* Like w/ hover reactions */}
        <div className="relative flex-1" onMouseEnter={onLikeHover} onMouseLeave={onLikeLeave}>
          <button
            data-testid={`post-${post.id}-like-button`}
            onClick={() => setReaction(post.id, reaction || "like")}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 hover:bg-accent ${
              myReaction ? myReaction.color : "text-muted-foreground"
            }`}
          >
            {myReaction ? <span className="text-base">{myReaction.emoji}</span> : <ThumbsUp className="h-5 w-5" />}
            {myReaction ? myReaction.label : "Like"}
          </button>
          {showReactions && (
            <div
              data-testid={`reactions-popup-${post.id}`}
              onMouseEnter={onLikeHover}
              onMouseLeave={onLikeLeave}
              className="absolute -top-14 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-card p-1.5 shadow-xl"
            >
              {REACTION_TYPES.map((r) => (
                <button
                  key={r.key}
                  data-testid={`react-${r.key}-${post.id}`}
                  onClick={() => { setReaction(post.id, r.key); setShowReactions(false); }}
                  title={r.label}
                  className="grid h-9 w-9 place-items-center rounded-full text-lg transition-all hover:-translate-y-1 hover:scale-125"
                >
                  {r.emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          data-testid={`post-${post.id}-comment-button`}
          onClick={() => setShowComments((v) => !v)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:bg-accent"
        >
          <MessageCircle className="h-5 w-5" /> Comment
        </button>

        <button
          data-testid={`post-${post.id}-share-button`}
          onClick={() => setShareOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:bg-accent"
        >
          <Share2 className="h-5 w-5" /> Share
        </button>

        <button
          data-testid={`post-${post.id}-save-button`}
          onClick={onSave}
          className={`hidden flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all hover:bg-accent sm:flex ${saved ? "text-primary" : "text-muted-foreground"}`}
        >
          <Bookmark className={`h-5 w-5 ${saved ? "fill-primary" : ""}`} /> {saved ? "Saved" : "Save"}
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <CommentSection
          postId={post.id}
          parents={parents}
          repliesOf={repliesOf}
          user={user}
          onAdd={addComment}
          onLike={toggleCommentLike}
        />
      )}

      {/* Modals */}
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} post={post} />
      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} />
      <EditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        post={post}
        onSave={(content, image) => { editPost(post.id, content, image); toast.success("Post updated."); setEditOpen(false); }}
      />
      <DeleteConfirm
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => { deletePost(post.id); toast.success("Post deleted."); setDeleteOpen(false); }}
      />
    </article>
  );
};

// ---------- Comments ----------
const CommentSection = ({ postId, parents, repliesOf, user, onAdd, onLike }) => {
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const submit = () => {
    const t = text.trim();
    if (!t) return;
    onAdd(postId, replyTo, { name: user.name, avatar: user.avatar }, t);
    setText("");
    setReplyTo(null);
  };

  return (
    <div className="border-t border-border bg-secondary/30 px-5 py-4" data-testid={`comments-${postId}`}>
      <div className="flex flex-col gap-3">
        {parents.length === 0 && <p className="text-sm text-muted-foreground">No comments yet. Be the first!</p>}
        {parents.map((c) => (
          <CommentItem key={c.id} comment={c} postId={postId} onLike={onLike} onReply={setReplyTo} replies={repliesOf(c.id)} />
        ))}
      </div>

      <div className="mt-4 flex items-start gap-2">
        <img src={user?.avatar} alt={user?.name} className="h-9 w-9 shrink-0 rounded-full object-cover" />
        <div className="flex flex-1 items-center gap-2 rounded-2xl bg-card px-3 py-1.5">
          {replyTo && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
              Replying
            </span>
          )}
          <input
            data-testid={`comment-input-${postId}`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder={replyTo ? "Write a reply…" : "Write a comment…"}
            className="h-9 flex-1 bg-transparent text-sm text-foreground outline-none"
          />
          <button
            data-testid={`comment-submit-${postId}`}
            onClick={submit}
            disabled={!text.trim()}
            className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary-hover disabled:opacity-30"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CommentItem = ({ comment, postId, onLike, onReply, replies }) => (
  <div data-testid={`comment-${comment.id}`}>
    <div className="flex gap-2">
      <img src={comment.author.avatar} alt={comment.author.name} className="h-9 w-9 shrink-0 rounded-full object-cover" />
      <div className="min-w-0 flex-1">
        <div className="inline-block max-w-full rounded-2xl bg-card px-3 py-2">
          <p className="text-sm font-semibold text-foreground">{comment.author.name}</p>
          <p className="text-sm text-foreground/90">{comment.text}</p>
        </div>
        <div className="mt-1 flex items-center gap-3 px-2 text-[11px] font-semibold text-muted-foreground">
          <button
            data-testid={`like-comment-${comment.id}`}
            onClick={() => onLike(postId, comment.id)}
            className={`flex items-center gap-1 hover:underline ${comment.likedByMe ? "text-primary" : ""}`}
          >
            <ThumbsUp className="h-3 w-3" /> Like{comment.likes > 0 ? ` · ${comment.likes}` : ""}
          </button>
          <button
            data-testid={`reply-comment-${comment.id}`}
            onClick={() => onReply(comment.id)}
            className="flex items-center gap-1 hover:underline"
          >
            <CornerDownRight className="h-3 w-3" /> Reply
          </button>
          <span>{comment.time}</span>
        </div>
      </div>
    </div>
    {/* replies */}
    {replies.length > 0 && (
      <div className="ml-5 mt-3 border-l-2 border-border pl-4">
        <div className="flex flex-col gap-3">
          {replies.map((r) => (
            <div key={r.id} data-testid={`comment-${r.id}`} className="flex gap-2">
              <img src={r.author.avatar} alt={r.author.name} className="h-8 w-8 shrink-0 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <div className="inline-block max-w-full rounded-2xl bg-card px-3 py-2">
                  <p className="text-sm font-semibold text-foreground">{r.author.name}</p>
                  <p className="text-sm text-foreground/90">{r.text}</p>
                </div>
                <div className="mt-1 flex items-center gap-3 px-2 text-[11px] font-semibold text-muted-foreground">
                  <button onClick={() => onLike(postId, r.id)} className={`flex items-center gap-1 hover:underline ${r.likedByMe ? "text-primary" : ""}`}>
                    <ThumbsUp className="h-3 w-3" /> Like{r.likes > 0 ? ` · ${r.likes}` : ""}
                  </button>
                  <span>{r.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// ---------- Share Modal ----------
const ShareModal = ({ open, onClose, post }) => {
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/?post=${post.id}`);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Couldn't copy link.");
    }
  };
  const downloadImage = () => {
    if (!post.image) return;
    const a = document.createElement("a");
    a.href = post.image;
    a.download = `usfuturee-${post.id}.jpg`;
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast.success("Image download started.");
  };
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="rounded-2xl sm:max-w-md" data-testid="share-modal">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Share post</DialogTitle>
          <DialogDescription>Spread the word your way.</DialogDescription>
        </DialogHeader>
        <button data-testid="share-copy" onClick={copyLink} className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3 text-left transition-all hover:bg-accent">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Link2 className="h-5 w-5" /></span>
          <div>
            <p className="text-sm font-semibold text-foreground">Copy link</p>
            <p className="text-xs text-muted-foreground">Share the post URL anywhere</p>
          </div>
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button data-testid="share-group" className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3 text-left transition-all hover:bg-accent">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500/10 text-violet-500"><Share2 className="h-5 w-5" /></span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Share to a Group</p>
                <p className="text-xs text-muted-foreground">Pick from your groups</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 rounded-2xl">
            {GROUPS.map((g) => (
              <DropdownMenuItem
                key={g.id}
                data-testid={`share-to-${g.id}`}
                onClick={() => { toast.success(`Shared to ${g.name}`); onClose(); }}
                className="cursor-pointer"
              >
                <ImageIcon className="mr-2 h-4 w-4" /> {g.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {post.image && (
          <button data-testid="share-download" onClick={downloadImage} className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3 text-left transition-all hover:bg-accent">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-500"><Download className="h-5 w-5" /></span>
            <div>
              <p className="text-sm font-semibold text-foreground">Download image</p>
              <p className="text-xs text-muted-foreground">Save the post image to your device</p>
            </div>
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
};

// ---------- Report Modal ----------
const REPORT_OPTIONS = ["Spam", "Inappropriate content", "Harassment", "False information", "Other"];
const ReportModal = ({ open, onClose }) => {
  const [reason, setReason] = useState("Spam");
  const [other, setOther] = useState("");
  const submit = () => {
    const detail = reason === "Other" ? `${reason}: ${other}` : reason;
    console.log("[Report]", detail);
    toast.success("Report submitted. We'll review this post.");
    onClose();
    setReason("Spam"); setOther("");
  };
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="rounded-2xl sm:max-w-md" data-testid="report-modal">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Report post</DialogTitle>
          <DialogDescription>Help us keep Usfuturee safe. Pick a reason.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {REPORT_OPTIONS.map((opt) => (
            <label key={opt} data-testid={`report-${opt.toLowerCase().replace(/ /g, "-")}`} className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-all ${reason === opt ? "border-primary bg-primary/5 text-primary" : "border-border text-foreground hover:bg-accent"}`}>
              <input type="radio" name="report" value={opt} checked={reason === opt} onChange={() => setReason(opt)} className="accent-primary" />
              {opt}
            </label>
          ))}
        </div>
        {reason === "Other" && (
          <textarea
            data-testid="report-other-text"
            value={other}
            onChange={(e) => setOther(e.target.value)}
            placeholder="Tell us more…"
            rows={3}
            className="resize-none rounded-xl border border-border bg-background p-3 text-sm text-foreground outline-none focus:border-primary"
          />
        )}
        <button data-testid="report-submit" onClick={submit} className="h-11 rounded-full bg-primary font-semibold text-primary-foreground transition-all hover:bg-primary-hover">
          Submit Report
        </button>
      </DialogContent>
    </Dialog>
  );
};

// ---------- Edit Modal ----------
const EditModal = ({ open, onClose, post, onSave }) => {
  const [text, setText] = useState(post.content || "");
  const [image, setImage] = useState(post.image || null);
  const fileRef = useRef(null);
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="rounded-2xl sm:max-w-lg" data-testid="edit-modal">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Edit post</DialogTitle>
        </DialogHeader>
        <textarea
          data-testid="edit-textarea"
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full resize-none rounded-2xl bg-input p-4 text-foreground outline-none focus:ring-2 focus:ring-primary"
        />
        {image && (
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img src={image} alt="post" className="max-h-72 w-full object-cover" />
            <button onClick={() => setImage(null)} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="flex items-center justify-between">
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) setImage(URL.createObjectURL(f)); }} />
          <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-accent">
            <ImageIcon className="h-4 w-4" /> {image ? "Change image" : "Add image"}
          </button>
          <button data-testid="edit-save" onClick={() => onSave(text.trim(), image)} className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-hover">
            Save changes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ---------- Delete confirm ----------
const DeleteConfirm = ({ open, onClose, onConfirm }) => (
  <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
    <DialogContent className="rounded-2xl sm:max-w-sm" data-testid="delete-modal">
      <DialogHeader>
        <DialogTitle className="font-heading text-xl text-destructive">Delete this post?</DialogTitle>
        <DialogDescription>This can't be undone. Your post will be removed from your feed and connections.</DialogDescription>
      </DialogHeader>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold text-foreground hover:bg-accent">Cancel</button>
        <button data-testid="confirm-delete" onClick={onConfirm} className="flex-1 rounded-full bg-destructive py-2.5 text-sm font-semibold text-destructive-foreground hover:opacity-90">Delete</button>
      </div>
    </DialogContent>
  </Dialog>
);
