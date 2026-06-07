import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { useFeedStore } from "@/store/feedStore";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, ThumbsUp, MessageCircle, Share2, BadgeCheck, Send } from "lucide-react";
import { toast } from "sonner";

const MOCK_COMMENTS = [
  { id: "c1", author: "Liam Chen", avatar: "https://images.unsplash.com/photo-1596688787955-72a75ec303b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIweW91bmclMjBhZHVsdHMlMjBwb3J0cmFpdHN8ZW58MHx8fHwxNzgwNjg4Nzg0fDA&ixlib=rb-4.1.0&q=85&w=200", text: "This is really insightful! Thanks for sharing 🙌", time: "1h" },
  { id: "c2", author: "Sofia Nguyen", avatar: "https://images.pexels.com/photos/8764912/pexels-photo-8764912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200", text: "Great breakdown! Would love to see more content like this.", time: "2h" },
  { id: "c3", author: "Noah Williams", avatar: "https://images.pexels.com/photos/6338370/pexels-photo-6338370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200", text: "Bookmarked this for my study sessions. Thanks!", time: "3h" },
];

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const posts = useFeedStore((s) => s.posts);
  const toggleLike = useFeedStore((s) => s.toggleLike);
  const post = posts.find((p) => p.id === id);
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState("");

  if (!post) return (
    <MainLayout showRight={false}>
      <div className="grid min-h-[60vh] place-items-center">
        <p className="font-heading text-xl font-bold text-foreground">Post not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Go Back</button>
      </div>
    </MainLayout>
  );

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments((c) => [...c, {
      id: "c_" + Date.now(),
      author: user?.name || "You",
      avatar: user?.avatar,
      text: newComment.trim(),
      time: "now",
    }]);
    setNewComment("");
    toast.success("Comment added!", { position: "bottom-right" });
  };

  return (
    <MainLayout showRight={false}>
      <div data-testid={`post-detail-${id}`} className="flex flex-col gap-6">
        <button onClick={() => navigate(-1)}
          className="flex w-fit items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Feed
        </button>

        {/* Post */}
        <article className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-3 p-5 pb-3">
            <img src={post.author.avatar} alt={post.author.name} className="h-11 w-11 rounded-full object-cover ring-2 ring-transparent transition-all hover:ring-primary" />
            <div>
              <p className="flex items-center gap-1 font-semibold text-foreground">
                {post.author.name}
                {post.author.verified && <BadgeCheck className="h-4 w-4 fill-primary text-card" />}
              </p>
              <p className="text-xs text-muted-foreground">{post.author.headline} · {post.time}</p>
            </div>
          </div>
          {post.content && <p className="px-5 pb-4 text-[15px] leading-relaxed text-foreground">{post.content}</p>}
          {post.image && <img src={post.image} alt="post" className="max-h-[480px] w-full object-cover" />}
          <div className="flex items-center justify-between px-5 py-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground">
                <ThumbsUp className="h-3 w-3" />
              </span>
              {post.likes.toLocaleString()}
            </span>
            <span>{comments.length} comments · {post.shares} shares</span>
          </div>
          <div className="flex items-center justify-around border-t border-border px-2 py-1.5">
            <button onClick={() => toggleLike(post.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all hover:bg-accent ${post.liked ? "text-primary" : "text-muted-foreground"}`}>
              <ThumbsUp className={`h-5 w-5 ${post.liked ? "fill-primary" : ""}`} /> Like
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:bg-accent">
              <MessageCircle className="h-5 w-5" /> Comment
            </button>
            <button onClick={() => toast.info("Post shared!")}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:bg-accent">
              <Share2 className="h-5 w-5" /> Share
            </button>
          </div>
        </article>

        {/* Comments */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-heading text-base font-bold text-foreground">Comments ({comments.length})</h2>
          <div className="flex flex-col gap-4">
            {comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <img src={c.avatar} alt={c.author} className="h-9 w-9 shrink-0 rounded-full object-cover" />
                <div className="rounded-2xl bg-secondary/60 px-4 py-3">
                  <p className="text-sm font-semibold text-foreground">{c.author} <span className="font-normal text-xs text-muted-foreground">· {c.time}</span></p>
                  <p className="mt-1 text-sm text-foreground">{c.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add comment */}
          <div className="mt-5 flex items-center gap-3">
            <img src={user?.avatar} alt={user?.name} className="h-9 w-9 shrink-0 rounded-full object-cover" />
            <div className="flex flex-1 items-center gap-2 overflow-hidden rounded-full border border-border bg-input pr-2">
              <input value={newComment} onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addComment()}
                placeholder="Write a comment..."
                className="h-10 flex-1 bg-transparent px-4 text-sm text-foreground outline-none" />
              <button onClick={addComment} disabled={!newComment.trim()}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
