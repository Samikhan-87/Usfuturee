import { MainLayout } from "@/layouts/MainLayout";
import { PostCard } from "@/components/PostCard";
import { useAuth } from "@/hooks/useAuth";
import { useFeedStore } from "@/store/feedStore";
import { MapPin, Link2, CalendarDays, Pencil } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const posts = useFeedStore((s) => s.posts).slice(0, 2);

  return (
    <MainLayout showRight={false}>
      <div className="flex flex-col gap-6" data-testid="profile-page">
        {/* Banner + header */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="relative h-44 sm:h-56">
            <img src={user?.banner} alt="banner" className="h-full w-full object-cover" />
          </div>
          <div className="px-5 pb-5 sm:px-8">
            <div className="-mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="h-28 w-28 rounded-full border-4 border-card object-cover"
                />
                <div className="pb-1">
                  <h1 className="font-heading text-2xl font-bold text-foreground">{user?.name}</h1>
                  <p className="text-muted-foreground">{user?.headline}</p>
                </div>
              </div>
              <button
                data-testid="edit-profile-button"
                className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover"
              >
                <Pencil className="h-4 w-4" /> Edit Profile
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> San Francisco, CA</span>
              <span className="flex items-center gap-1.5"><Link2 className="h-4 w-4" /> usfuturee.com/{user?.name?.split(" ")[0]?.toLowerCase()}</span>
              <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> Joined June 2026</span>
            </div>

            <div className="mt-4 flex gap-8 border-t border-border pt-4">
              <Stat label="Posts" value={posts.length} />
              <Stat label="Followers" value={user?.followers?.toLocaleString()} />
              <Stat label="Following" value={user?.following?.toLocaleString()} />
            </div>
          </div>
        </div>

        <h2 className="font-heading text-xl font-bold text-foreground">Recent Activity</h2>
        {posts.map((p, i) => (
          <PostCard key={p.id} post={p} index={i} />
        ))}
      </div>
    </MainLayout>
  );
}

const Stat = ({ label, value }) => (
  <div>
    <p className="font-heading text-xl font-bold text-foreground">{value}</p>
    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
  </div>
);
