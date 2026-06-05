import { useState, useRef } from "react";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Megaphone, Upload, Play, Pause, Trash2, Plus, X, Image as ImageIcon } from "lucide-react";
import { useAdsStore, TARGET_INSTITUTIONS } from "@/store/adsStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function SuperAdminAds() {
  const ads = useAdsStore((s) => s.ads);
  const addAd = useAdsStore((s) => s.addAd);
  const toggleStatus = useAdsStore((s) => s.toggleStatus);
  const deleteAd = useAdsStore((s) => s.deleteAd);

  const fileRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", image: null, targetInstitution: TARGET_INSTITUTIONS[0] || "", duration: 7, cta: "Learn more" });

  const reset = () => setForm({ title: "", image: null, targetInstitution: TARGET_INSTITUTIONS[0] || "", duration: 7, cta: "Learn more" });

  const pickImage = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setForm((p) => ({ ...p, image: URL.createObjectURL(f) }));
  };

  const submit = () => {
    if (!form.title.trim() || !form.image) {
      toast.error("Add a title and image to publish the ad.");
      return;
    }
    addAd(form);
    toast.success("Banner ad is now live in the home feed.");
    reset();
    setOpen(false);
  };

  return (
    <SuperAdminLayout title="Ads Management" subtitle="Create banner ads that surface between posts in the home feed.">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{ads.length} ad{ads.length === 1 ? "" : "s"} on file</p>
        <button
          data-testid="new-ad-button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4" /> New Banner Ad
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="ads-grid">
        {ads.length === 0 ? (
          <div className="grid h-48 place-items-center rounded-2xl border border-dashed border-border bg-card text-center text-muted-foreground sm:col-span-2 lg:col-span-3">
            <div>
              <Megaphone className="mx-auto h-8 w-8" />
              <p className="mt-2 text-sm">No ads yet. Create your first banner.</p>
            </div>
          </div>
        ) : (
          ads.map((a) => (
            <div key={a.id} data-testid={`ad-${a.id}`} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative h-36 w-full bg-cover bg-center" style={{ backgroundImage: `url(${a.image})` }}>
                <span className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                  a.status === "active" ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                }`}>{a.status}</span>
              </div>
              <div className="p-4">
                <h3 className="font-heading text-base font-bold text-foreground">{a.title}</h3>
                <p className="text-xs text-muted-foreground">For {a.targetInstitution} · {a.duration} days · since {a.createdAt}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    data-testid={`ad-toggle-${a.id}`}
                    onClick={() => toggleStatus(a.id)}
                    className="flex flex-1 items-center justify-center gap-1 rounded-full bg-secondary py-2 text-xs font-bold text-foreground hover:bg-accent"
                  >
                    {a.status === "active" ? <><Pause className="h-3 w-3" /> Pause</> : <><Play className="h-3 w-3" /> Resume</>}
                  </button>
                  <button
                    data-testid={`ad-delete-${a.id}`}
                    onClick={() => { deleteAd(a.id); toast.success("Ad deleted."); }}
                    className="flex items-center justify-center gap-1 rounded-full bg-destructive/10 px-3 py-2 text-xs font-bold text-destructive hover:bg-destructive/20"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
        <DialogContent className="rounded-2xl sm:max-w-md" data-testid="ad-modal">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Create banner ad</DialogTitle>
            <DialogDescription>This ad will appear between posts in the home feed.</DialogDescription>
          </DialogHeader>

          <div>
            <label className="text-xs font-semibold text-muted-foreground">Title</label>
            <input
              data-testid="ad-title"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="Stanford Open House 2026"
              className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground">Banner image</label>
            {!form.image ? (
              <label data-testid="ad-image-zone" className="mt-1 flex h-32 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary">
                <Upload className="h-5 w-5" /> Upload image
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={pickImage} data-testid="ad-file" />
              </label>
            ) : (
              <div className="relative mt-1 overflow-hidden rounded-xl border border-border">
                <img src={form.image} alt="ad" className="max-h-40 w-full object-cover" />
                <button onClick={() => setForm((p) => ({ ...p, image: null }))} className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Target institution</label>
              <select
                data-testid="ad-target"
                value={form.targetInstitution}
                onChange={(e) => setForm((p) => ({ ...p, targetInstitution: e.target.value }))}
                className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
              >
                {TARGET_INSTITUTIONS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Duration (days)</label>
              <input
                data-testid="ad-duration"
                type="number"
                min="1"
                value={form.duration}
                onChange={(e) => setForm((p) => ({ ...p, duration: Number(e.target.value) }))}
                className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
              />
            </div>
          </div>

          <button
            data-testid="ad-submit"
            onClick={submit}
            className="h-11 rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary-hover"
          >
            Publish ad
          </button>
        </DialogContent>
      </Dialog>
    </SuperAdminLayout>
  );
}
