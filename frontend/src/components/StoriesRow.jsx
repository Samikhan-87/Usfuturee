import { useState, useRef } from "react";
import { Plus, Upload, X, Image as ImageIcon, Film } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { STORIES } from "@/utils/mockData";
import { StoryViewer } from "@/components/StoryViewer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

export const StoriesRow = () => {
  const { user } = useAuth();
  const fileRef = useRef(null);
  const [stories, setStories] = useState(STORIES);
  const [viewerStart, setViewerStart] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [draft, setDraft] = useState(null); // { url, video }

  const pickFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > MAX_SIZE) {
      toast.error("File too large — max 2 MB allowed.");
      e.target.value = "";
      return;
    }
    setDraft({ url: URL.createObjectURL(f), video: f.type.startsWith("video/") });
  };

  const publish = () => {
    if (!draft) return;
    const newStory = {
      id: "s_" + Date.now(),
      name: user?.name || "You",
      avatar: user?.avatar,
      image: draft.url,
      video: draft.video,
    };
    setStories((arr) => [newStory, ...arr]);
    setDraft(null);
    setUploadOpen(false);
    toast.success("Your story is live for 24 hours!");
  };

  return (
    <>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1" data-testid="stories-row">
        {/* Add story */}
        <button
          data-testid="add-story-button"
          onClick={() => setUploadOpen(true)}
          className="group relative h-48 w-28 shrink-0 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary"
        >
          <img src={user?.avatar} alt="you" className="h-32 w-full object-cover" />
          <div className="absolute left-1/2 top-28 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border-4 border-card bg-primary text-primary-foreground">
            <Plus className="h-4 w-4" />
          </div>
          <p className="mt-5 text-center text-xs font-semibold text-foreground">Your Story</p>
        </button>

        {stories.map((s, i) => (
          <button
            key={s.id}
            data-testid={`story-${s.id}`}
            onClick={() => setViewerStart(i)}
            className="group relative h-48 w-28 shrink-0 overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
          >
            {s.video ? (
              <video src={s.image} muted className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            ) : (
              <img src={s.image} alt={s.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <img
              src={s.avatar}
              alt={s.name}
              className="absolute left-2.5 top-2.5 h-9 w-9 rounded-full border-2 border-primary object-cover"
            />
            <p className="absolute bottom-2 left-2 right-2 text-left text-xs font-semibold text-white">{s.name}</p>
          </button>
        ))}
      </div>

      {viewerStart !== null && (
        <StoryViewer stories={stories} startIndex={viewerStart} onClose={() => setViewerStart(null)} />
      )}

      {/* Upload story dialog */}
      <Dialog open={uploadOpen} onOpenChange={(o) => { setUploadOpen(o); if (!o) setDraft(null); }}>
        <DialogContent className="rounded-2xl sm:max-w-md" data-testid="story-upload-modal">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Share a Story</DialogTitle>
            <DialogDescription>Upload an image or short video. Max 2 MB.</DialogDescription>
          </DialogHeader>

          {!draft ? (
            <label data-testid="story-upload-zone" className="flex h-56 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border text-muted-foreground transition-all hover:border-primary hover:text-primary">
              <Upload className="h-9 w-9" />
              <p className="text-sm font-semibold">Click to upload</p>
              <p className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1"><ImageIcon className="h-3.5 w-3.5" /> Image</span>
                <span className="flex items-center gap-1"><Film className="h-3.5 w-3.5" /> Video</span>
              </p>
              <input ref={fileRef} data-testid="story-file-input" type="file" accept="image/*,video/*" hidden onChange={pickFile} />
            </label>
          ) : (
            <div className="relative overflow-hidden rounded-2xl border border-border">
              {draft.video ? (
                <video src={draft.url} autoPlay muted loop playsInline className="max-h-72 w-full object-cover" />
              ) : (
                <img src={draft.url} alt="story preview" className="max-h-72 w-full object-cover" />
              )}
              <button onClick={() => setDraft(null)} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <button
            data-testid="story-publish"
            onClick={publish}
            disabled={!draft}
            className="h-11 rounded-full bg-primary font-semibold text-primary-foreground transition-all hover:bg-primary-hover disabled:opacity-40"
          >
            Share Story
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
};
