import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const StoryViewer = ({ stories, startIndex = 0, onClose }) => {
  const [idx, setIdx] = useState(startIndex);
  const [paused, setPaused] = useState(false);
  const s = stories[idx];

  const next = useCallback(() => {
    setIdx((i) => (i + 1 >= stories.length ? -1 : i + 1));
  }, [stories.length]);
  const prev = () => setIdx((i) => Math.max(0, i - 1));

  // auto-advance
  useEffect(() => {
    if (idx === -1) {
      onClose();
      return;
    }
    if (paused) return;
    const t = setTimeout(next, 5000);
    return () => clearTimeout(t);
  }, [idx, paused, next, onClose]);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, onClose]);

  if (!s) return null;

  return (
    <div
      data-testid="story-viewer"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 px-4 py-8"
      onMouseDown={() => setPaused(true)}
      onMouseUp={() => setPaused(false)}
    >
      {/* Close */}
      <button
        data-testid="story-close"
        onClick={onClose}
        className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Prev */}
      {idx > 0 && (
        <button
          data-testid="story-prev"
          onClick={prev}
          className="absolute left-5 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
          aria-label="Previous"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Next */}
      <button
        data-testid="story-next"
        onClick={next}
        className="absolute right-5 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20"
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="relative w-full max-w-md">
        {/* Progress bars */}
        <div className="absolute left-0 right-0 top-0 z-10 flex gap-1 px-3 pt-3">
          {stories.map((_, i) => (
            <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
              <div
                key={`bar-${i}-${idx}`}
                className={`h-full bg-white ${i < idx ? "w-full" : i === idx ? "story-progress" : "w-0"}`}
                style={{ animationPlayState: paused ? "paused" : "running" }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute left-0 right-0 top-6 z-10 flex items-center gap-3 px-4 pt-3">
          <img src={s.avatar} alt={s.name} className="h-10 w-10 rounded-full border-2 border-white object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-white">{s.name}</p>
            <p className="text-xs text-white/70">just now</p>
          </div>
        </div>

        {/* Image */}
        <div className="overflow-hidden rounded-3xl">
          {s.video ? (
            <video
              key={s.id}
              src={s.image}
              autoPlay
              muted
              loop
              playsInline
              className="h-[80vh] w-full object-cover"
            />
          ) : (
            <img key={s.id} src={s.image} alt={s.name} className="h-[80vh] w-full object-cover" />
          )}
        </div>
      </div>
    </div>
  );
};
