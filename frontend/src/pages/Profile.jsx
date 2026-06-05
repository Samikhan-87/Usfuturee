import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { PostCard } from "@/components/PostCard";
import { useAuth } from "@/hooks/useAuth";
import { useFeedStore } from "@/store/feedStore";
import { ROLES } from "@/utils/roles";
import { FOLLOWERS, ACHIEVEMENTS } from "@/utils/mockData";
import {
  Camera, Pencil, MapPin, Building2, CalendarDays, BadgeCheck, Mail,
  Plus, Check, Trophy, MoreHorizontal, Flag,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const AchievementsBox = () => (
  <aside className="sticky top-20 hidden h-fit xl:block" data-testid="achievements-box">
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-4 flex items-center gap-2 font-heading text-base font-bold text-foreground">
        <Trophy className="h-4 w-4 text-amber-500" /> Achievements
      </h3>
      <div className="flex flex-col gap-3">
        {ACHIEVEMENTS.map((a) => (
          <div key={a.id} data-testid={`achievement-${a.id}`} className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-card">
              <Trophy className={`h-5 w-5 ${a.color}`} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{a.title}</p>
              <p className="text-xs text-muted-foreground">{a.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </aside>
);

export default function Profile() {
  const { user } = useAuth();
  const posts = useFeedStore((s) => s.posts).slice(0, 2);
  const roleMeta = ROLES[user?.role] || ROLES.student;
  const RoleIcon = roleMeta.icon;
  const [followers, setFollowers] = useState(FOLLOWERS);

  const toggleFollowBack = (id) =>
    setFollowers((list) => list.map((f) => (f.id === id ? { ...f, following: !f.following } : f)));

  return (
    <MainLayout right={<AchievementsBox />}>
      <div className="flex flex-col gap-6" data-testid="profile-page">
        {/* Header card */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="relative h-44 sm:h-60">
            <img src={user?.banner} alt="cover" className="h-full w-full object-cover" />
            <button
              data-testid="edit-cover-button"
              onClick={() => toast.info("Cover editing coming soon")}
              className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-black/80"
            >
              <Camera className="h-4 w-4" /> Edit Cover
            </button>
          </div>

          <div className="px-5 pb-5 sm:px-8">
            <div className="-mt-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="h-32 w-32 rounded-full border-4 border-card object-cover"
                  />
                </div>
                <div className="pb-1">
                  <h1 className="flex items-center gap-1.5 font-heading text-2xl font-bold text-foreground">
                    {user?.name}
                    <BadgeCheck className="h-5 w-5 fill-primary text-card" />
                  </h1>
                  <span className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${roleMeta.badge}`}>
                    <RoleIcon className="h-3.5 w-3.5" /> {roleMeta.label}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  data-testid="edit-profile-button"
                  className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover"
                >
                  <Pencil className="h-4 w-4" /> Edit Profile
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      data-testid="profile-more-button"
                      className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground transition-all hover:bg-accent"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-2xl">
                    <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                      <Flag className="mr-2 h-4 w-4" /> Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Bio box */}
            <div className="mt-4 rounded-2xl bg-secondary/60 p-4 text-sm text-foreground" data-testid="profile-bio">
              {user?.headline} at <span className="font-semibold">{user?.institution}</span>. Passionate about learning, sharing knowledge, and growing with the Usfuturee community. 💙
            </div>

            <div className="mt-4 flex gap-8 border-t border-border pt-4">
              <Stat label="Posts" value={posts.length} />
              <Stat label="Followers" value={user?.followers?.toLocaleString()} />
              <Stat label="Following" value={user?.following?.toLocaleString()} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-card p-1" data-testid="profile-tabs">
            <TabsTrigger value="posts" data-testid="tab-posts" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Posts</TabsTrigger>
            <TabsTrigger value="about" data-testid="tab-about" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">About</TabsTrigger>
            <TabsTrigger value="followers" data-testid="tab-followers" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Followers</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6 flex flex-col gap-6" data-testid="tab-content-posts">
            {posts.map((p, i) => <PostCard key={p.id} post={p} index={i} />)}
          </TabsContent>

          <TabsContent value="about" className="mt-6" data-testid="tab-content-about">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 font-heading text-lg font-bold text-foreground">About</h3>
              <div className="flex flex-col gap-4">
                <AboutRow icon={Mail} label="Name" value={user?.name} />
                <AboutRow icon={Building2} label="Institution" value={user?.institution} />
                <AboutRow icon={RoleIcon} label="Role" value={roleMeta.label} />
                <AboutRow icon={CalendarDays} label="Joined" value={user?.joinDate} />
                <AboutRow icon={MapPin} label="Location" value={user?.location} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="followers" className="mt-6" data-testid="tab-content-followers">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {followers.map((f) => {
                const fMeta = ROLES[f.role];
                return (
                  <div key={f.id} data-testid={`follower-${f.id}`} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                    <img src={f.avatar} alt={f.name} className="h-12 w-12 rounded-full object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-foreground">{f.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{f.headline}</p>
                    </div>
                    <button
                      data-testid={`follow-back-${f.id}`}
                      onClick={() => toggleFollowBack(f.id)}
                      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                        f.following ? "bg-secondary text-foreground" : "bg-primary text-primary-foreground hover:bg-primary-hover"
                      }`}
                    >
                      {f.following ? <><Check className="h-3.5 w-3.5" /> Following</> : <><Plus className="h-3.5 w-3.5" /> Follow back</>}
                    </button>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
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

const AboutRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-semibold text-foreground">{value}</p>
    </div>
  </div>
);
