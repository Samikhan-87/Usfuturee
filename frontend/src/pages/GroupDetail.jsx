import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { GroupPostCard } from "@/components/GroupPostCard";
import { YOUR_GROUPS, DISCOVER_GROUPS, GROUP_FEED } from "@/utils/mockData";
import { ArrowLeft, Users, Globe, Lock, Settings, Check, Plus } from "lucide-react";
import { toast } from "sonner";

export default function GroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const allGroups = [...YOUR_GROUPS, ...DISCOVER_GROUPS];
  const group = allGroups.find((g) => g.id === id);
  const [joined, setJoined] = useState(YOUR_GROUPS.some((g) => g.id === id));

  if (!group) return (
    <MainLayout showRight={false}>
      <div className="grid min-h-[60vh] place-items-center">
        <p className="font-heading text-xl font-bold text-foreground">Group not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Go Back</button>
      </div>
    </MainLayout>
  );

  const groupPosts = GROUP_FEED.filter((p) => p.group === group.name);

  return (
    <MainLayout showRight={false}>
      <div data-testid={`group-detail-${id}`} className="flex flex-col gap-6">
        <button onClick={() => navigate(-1)}
          className="flex w-fit items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Groups
        </button>

        {/* Hero */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="relative h-40">
            <img src={group.banner} alt={group.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            {"privacy" in group && (
              <span className={`absolute right-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${group.privacy === "public" ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground"}`}>
                {group.privacy === "public" ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                {group.privacy === "public" ? "Public" : "Private"}
              </span>
            )}
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-heading text-2xl font-bold text-foreground">{group.name}</h1>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" /> {group.members} members
                </p>
                {"category" in group && <p className="mt-0.5 text-sm text-muted-foreground">{group.category}</p>}
                {"desc" in group && <p className="mt-3 text-sm text-foreground">{group.desc}</p>}
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => { setJoined((j) => !j); toast.success(joined ? `Left ${group.name}` : `Joined ${group.name}!`); }}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${joined ? "bg-secondary text-foreground hover:bg-accent" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                >
                  {joined ? <><Check className="h-4 w-4" /> Joined</> : <><Plus className="h-4 w-4" /> Join</>}
                </button>
                {joined && (
                  <button onClick={() => toast.info("Group settings coming soon")}
                    className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground hover:bg-accent">
                    <Settings className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div>
          <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Group Posts</h2>
          {groupPosts.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border py-10 text-center text-muted-foreground">No posts in this group yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {groupPosts.map((p, i) => <GroupPostCard key={p.id} post={p} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
