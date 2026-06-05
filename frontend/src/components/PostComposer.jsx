import { useState, useRef } from "react";
import { Image as ImageIcon, Video, Smile, Calendar, X, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useFeedStore } from "@/store/feedStore";
import { mockRequest } from "@/services/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const PostComposer = () => {
  const { user } = useAuth();
  const addPost = useFeedStore((s) => s.addPost);
  const fileRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [posting, setPosting] = useState(false);

  const pickImage = (e) => {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const reset = () => {
    setText("");
    setImage(null);
    setOpen(false);
  };

  const submit = async () => {
    if (!text.trim() && !image) return;
    setPosting(true);
    await mockRequest(null, 600);
    addPost({
      id: "p_" + Date.now(),
      author: { name: user.name, headline: user.institution, avatar: user.avatar, verified: false },
      time: "now",
      content: text.trim(),
      image,
      tag: "Update",
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      following: false,
    });
    setPosting(false);
    reset();
    toast.success("Posted to your feed!");
  };

  return (
    <>
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5" data-testid="post-composer">
        <div className="flex items-center gap-3">
          <img src={user?.avatar} alt={user?.name} className="h-11 w-11 rounded-full object-cover" />
          <button
            data-testid="composer-open-button"
            onClick={() => setOpen(true)}
            className="h-11 flex-1 rounded-full bg-input px-5 text-left text-sm text-muted-foreground transition-all duration-200 hover:bg-secondary"
          >
            What's on your mind, {user?.name?.split(" ")[0]}?
          </button>
        </div>
        <div className="mt-4 flex items-center justify-around border-t border-border pt-3">
          {[
            { icon: ImageIcon, label: "Photo", color: "text-emerald-500" },
            { icon: Video, label: "Video", color: "text-rose-500" },
            { icon: Smile, label: "Feeling", color: "text-amber-500" },
            { icon: Calendar, label: "Event", color: "text-primary" },
          ].map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              data-testid={`composer-${label.toLowerCase()}-button`}
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-accent"
            >
              <Icon className={`h-5 w-5 ${color}`} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={(o) => (o ? setOpen(true) : reset())}>
        <DialogContent className="rounded-2xl sm:max-w-lg" data-testid="create-post-modal">
          <DialogHeader>
            <DialogTitle className="text-center font-heading text-xl">Create Post</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-3">
            <img src={user?.avatar} alt={user?.name} className="h-11 w-11 rounded-full object-cover" />
            <div>
              <p className="font-semibold text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.institution}</p>
            </div>
          </div>

          <textarea
            data-testid="modal-post-textarea"
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`What's on your mind, ${user?.name?.split(" ")[0]}?`}
            rows={4}
            className="w-full resize-none rounded-2xl bg-input p-4 text-foreground outline-none ring-primary transition-all duration-200 focus:ring-2"
          />

          {image && (
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <img src={image} alt="upload preview" className="max-h-72 w-full object-cover" />
              <button
                data-testid="remove-image-button"
                onClick={() => setImage(null)}
                className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white transition-all hover:bg-black/80"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between rounded-2xl border border-border p-3">
            <span className="text-sm font-medium text-foreground">Add to your post</span>
            <div className="flex items-center gap-1">
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={pickImage} data-testid="image-file-input" />
              <button
                data-testid="modal-add-image-button"
                onClick={() => fileRef.current?.click()}
                className="grid h-10 w-10 place-items-center rounded-full text-emerald-500 transition-all hover:bg-accent"
              >
                <ImageIcon className="h-5 w-5" />
              </button>
              <button className="grid h-10 w-10 place-items-center rounded-full text-amber-500 transition-all hover:bg-accent">
                <Smile className="h-5 w-5" />
              </button>
            </div>
          </div>

          <button
            data-testid="modal-post-submit-button"
            onClick={submit}
            disabled={(!text.trim() && !image) || posting}
            className="flex h-11 items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover disabled:opacity-40"
          >
            {posting && <Loader2 className="h-5 w-5 animate-spin" />} Post
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
};
