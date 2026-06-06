import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { GroupPostCard } from "@/components/GroupPostCard";
import {
  GROUP_FEED, YOUR_GROUPS, DISCOVER_GROUPS, GROUP_CATEGORIES,
} from "@/utils/mockData";
import {
  Plus, Users, Globe, Lock, Settings, Search, Check, Image as ImageIcon, X,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const PrivacyBadge = ({ privacy }) => (
  <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${privacy === "public" ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground"}`}>
    {privacy === "public" ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
    {privacy === "public" ? "Public" : "Private"}
  </span>
);

export default function Groups() {
  const [open, setOpen] = useState(false);
  const [joined, setJoined] = useState({});
  const [activeCat, setActiveCat] = useState(null);
  const [form, setForm] = useState({ name: "", desc: "", category: "", isPublic: true, cover: null });

  const toggleJoin = (id, name) => {
    setJoined((j) => ({ ...j, [id]: !j[id] }));
    toast.success(joined[id] ? `Left ${name}` : `Joined ${name}!`);
  };

  const pickCover = (e) => {
    const file = e.target.files?.[0];
    if (file) setForm((f) => ({ ...f, cover: URL.createObjectURL(file) }));
  };

  const createGroup = () => {
    if (!form.name.trim() || !form.category) {
      toast.error("Please add a group name and category");
      return;
    }
    toast.success(`Group "${form.name}" created!`);
    setForm({ name: "", desc: "", category: "", isPublic: true, cover: null });
    setOpen(false);
  };

  const filteredDiscover = activeCat ? DISCOVER_GROUPS.filter((g) => g.category === activeCat) : DISCOVER_GROUPS;

  return (
    <MainLayout>
      <div data-testid="groups-page" className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Groups</h1>
          <button
            data-testid="create-group-button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4" /> Create Group
          </button>
        </div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-card p-1" data-testid="groups-tabs">
            <TabsTrigger value="posts" data-testid="groups-tab-posts" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Posts</TabsTrigger>
            <TabsTrigger value="yours" data-testid="groups-tab-yours" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Your Groups</TabsTrigger>
            <TabsTrigger value="discover" data-testid="groups-tab-discover" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Discover</TabsTrigger>
          </TabsList>

          {/* Posts */}
          <TabsContent value="posts" className="mt-6 flex flex-col gap-6" data-testid="groups-posts">
            {GROUP_FEED.map((p, i) => <GroupPostCard key={p.id} post={p} index={i} />)}
          </TabsContent>

          {/* Your Groups */}
          <TabsContent value="yours" className="mt-6" data-testid="groups-yours">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {YOUR_GROUPS.map((g) => (
                <div key={g.id} data-testid={`your-group-${g.id}`} className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1">
                  <div className="relative h-28">
                    <img src={g.banner} alt={g.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute right-2 top-2"><PrivacyBadge privacy={g.privacy} /></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-base font-bold text-foreground">{g.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" /> {g.members} members
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        data-testid={`view-group-${g.id}`}
                        className="flex-1 rounded-full bg-primary py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover"
                      >
                        View
                      </button>
                      <button
                        data-testid={`settings-group-${g.id}`}
                        onClick={() => toast.info("Group settings coming soon")}
                        className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground transition-all hover:bg-accent"
                      >
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Discover */}
          <TabsContent value="discover" className="mt-6 flex flex-col gap-6" data-testid="groups-discover">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                data-testid="discover-search-input"
                placeholder="Discover new groups..."
                className="h-12 w-full rounded-2xl border border-border bg-input pl-12 pr-4 text-foreground outline-none ring-primary transition-all focus:ring-2"
              />
            </div>

            {/* Suggested */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-4 font-heading text-lg font-bold text-foreground">Suggested for You</h3>
              <div className="flex flex-col gap-4">
                {filteredDiscover.map((g) => (
                  <div key={g.id} data-testid={`discover-group-${g.id}`} className="flex items-center gap-3">
                    <img src={g.banner} alt={g.name} className="h-12 w-12 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-foreground">{g.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{g.members} members · {g.category}</p>
                    </div>
                    <button
                      data-testid={`join-group-${g.id}`}
                      onClick={() => toggleJoin(g.id, g.name)}
                      className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${joined[g.id] ? "bg-secondary text-foreground" : "bg-primary text-primary-foreground hover:bg-primary-hover"}`}
                    >
                      {joined[g.id] ? <><Check className="h-4 w-4" /> Joined</> : "Join"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-4 font-heading text-lg font-bold text-foreground">Browse by Category</h3>
              <div className="flex flex-wrap gap-2.5" data-testid="category-pills">
                {GROUP_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    data-testid={`category-${cat.toLowerCase()}`}
                    onClick={() => setActiveCat(activeCat === cat ? null : cat)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${activeCat === cat ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary hover:text-primary"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Group Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl sm:max-w-lg" data-testid="create-group-modal">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Create a Group</DialogTitle>
            <DialogDescription className="sr-only">Fill in the details to create a new group.</DialogDescription>
          </DialogHeader>

          {form.cover ? (
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <img src={form.cover} alt="cover" className="h-36 w-full object-cover" />
              <button onClick={() => setForm((f) => ({ ...f, cover: null }))} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label data-testid="group-cover-upload" className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border text-muted-foreground transition-all hover:border-primary hover:text-primary">
              <ImageIcon className="h-7 w-7" />
              <span className="text-sm font-medium">Upload cover image</span>
              <input type="file" accept="image/*" hidden onChange={pickCover} />
            </label>
          )}

          <input
            data-testid="group-name-input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Group name"
            className="h-12 w-full rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2"
          />
          <textarea
            data-testid="group-desc-input"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            placeholder="Description"
            rows={3}
            className="w-full resize-none rounded-2xl border border-border bg-input p-4 text-foreground outline-none ring-primary focus:ring-2"
          />
          <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
            <SelectTrigger data-testid="group-category-select" className="h-12 rounded-2xl border-border bg-input">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {GROUP_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center justify-between rounded-2xl border border-border p-4">
            <div className="flex items-center gap-2">
              {form.isPublic ? <Globe className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-muted-foreground" />}
              <div>
                <p className="text-sm font-semibold text-foreground">{form.isPublic ? "Public group" : "Private group"}</p>
                <p className="text-xs text-muted-foreground">{form.isPublic ? "Anyone can find and join" : "Members join by invite only"}</p>
              </div>
            </div>
            <Switch data-testid="group-privacy-toggle" checked={form.isPublic} onCheckedChange={(v) => setForm({ ...form, isPublic: v })} />
          </div>

          <button
            data-testid="submit-create-group"
            onClick={createGroup}
            className="h-11 rounded-full bg-primary font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover"
          >
            Create Group
          </button>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
