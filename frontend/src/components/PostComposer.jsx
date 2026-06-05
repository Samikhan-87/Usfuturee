import { useState, useRef } from "react";
import { Image as ImageIcon, Video, Smile, Calendar, X, Loader2, Crop as CropIcon, Check } from "lucide-react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { useAuth } from "@/hooks/useAuth";
import { useFeedStore } from "@/store/feedStore";
import { mockRequest } from "@/services/api";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

const MAX_SIZE = 5 * 1024 * 1024;

export const PostComposer = () => {
  const { user } = useAuth();
  const addPost = useFeedStore((s) => s.addPost);
  const fileRef = useRef(null);
  const imgRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [rawImage, setRawImage] = useState(null); // image being cropped
  const [croppedImage, setCroppedImage] = useState(null); // final image
  const [crop, setCrop] = useState(null);
  const [cropping, setCropping] = useState(false);
  const [posting, setPosting] = useState(false);

  const pickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_SIZE) {
      toast.error("Image too large — max 5 MB.");
      e.target.value = "";
      return;
    }
    setRawImage(URL.createObjectURL(file));
    setCroppedImage(null);
    setCropping(true);
  };

  const onImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    const initial = centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, 4 / 3, naturalWidth, naturalHeight),
      naturalWidth,
      naturalHeight
    );
    setCrop(initial);
  };

  const applyCrop = async () => {
    const image = imgRef.current;
    if (!image || !crop) {
      setCroppedImage(rawImage);
      setCropping(false);
      return;
    }
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const canvas = document.createElement("canvas");
    const pixelCrop = {
      x: (crop.x / 100) * image.width * scaleX,
      y: (crop.y / 100) * image.height * scaleY,
      width: (crop.width / 100) * image.width * scaleX,
      height: (crop.height / 100) * image.height * scaleY,
    };
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
    canvas.toBlob((blob) => {
      if (blob) {
        setCroppedImage(URL.createObjectURL(blob));
        setCropping(false);
      }
    }, "image/jpeg", 0.92);
  };

  const reset = () => {
    setText("");
    setRawImage(null);
    setCroppedImage(null);
    setCropping(false);
    setOpen(false);
  };

  const insertEmoji = (data) => {
    setText((t) => t + data.emoji);
  };

  const submit = async () => {
    if (!text.trim() && !croppedImage) return;
    setPosting(true);
    await mockRequest(null, 500);
    addPost({
      id: "p_" + Date.now(),
      author: { name: user.name, headline: user.institution, avatar: user.avatar, verified: false },
      time: "now",
      content: text.trim(),
      image: croppedImage,
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
            className="h-11 flex-1 rounded-full bg-input px-5 text-left text-sm text-muted-foreground transition-all hover:bg-secondary"
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
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent"
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
            className="w-full resize-none rounded-2xl bg-input p-4 text-foreground outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Crop UI */}
          {cropping && rawImage && (
            <div className="overflow-hidden rounded-2xl border border-border bg-secondary/40 p-2" data-testid="crop-container">
              <ReactCrop crop={crop} onChange={(_, p) => setCrop(p)} keepSelection aspect={undefined}>
                <img
                  ref={imgRef}
                  src={rawImage}
                  alt="to crop"
                  onLoad={onImageLoad}
                  style={{ maxHeight: "50vh", display: "block", margin: "0 auto" }}
                />
              </ReactCrop>
              <div className="mt-2 flex justify-end gap-2">
                <button onClick={() => { setRawImage(null); setCropping(false); }} className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent">Cancel</button>
                <button data-testid="apply-crop" onClick={applyCrop} className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary-hover">
                  <Check className="h-3.5 w-3.5" /> Apply crop
                </button>
              </div>
            </div>
          )}

          {/* Final cropped preview */}
          {croppedImage && !cropping && (
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <img src={croppedImage} alt="upload preview" className="max-h-72 w-full object-cover" />
              <button
                data-testid="recrop-button"
                onClick={() => { setCropping(true); }}
                className="absolute right-12 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
                title="Crop again"
              >
                <CropIcon className="h-4 w-4" />
              </button>
              <button
                data-testid="remove-image-button"
                onClick={() => { setCroppedImage(null); setRawImage(null); }}
                className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
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
                title="Add image"
              >
                <ImageIcon className="h-5 w-5" />
              </button>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    data-testid="emoji-picker-trigger"
                    className="grid h-10 w-10 place-items-center rounded-full text-amber-500 transition-all hover:bg-accent"
                    title="Add emoji"
                  >
                    <Smile className="h-5 w-5" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-auto border-none bg-transparent p-0 shadow-none" data-testid="emoji-picker">
                  <EmojiPicker
                    onEmojiClick={insertEmoji}
                    emojiStyle={EmojiStyle.NATIVE}
                    height={360}
                    width={300}
                    skinTonesDisabled
                    searchPlaceholder="Search emoji"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <button
            data-testid="modal-post-submit-button"
            onClick={submit}
            disabled={(!text.trim() && !croppedImage) || posting || cropping}
            className="flex h-11 items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground transition-all hover:bg-primary-hover disabled:opacity-40"
          >
            {posting && <Loader2 className="h-5 w-5 animate-spin" />} Post
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
};
