import { MainLayout } from "@/layouts/MainLayout";
import { BookOpen, Clock, Users } from "lucide-react";
import { AVATARS } from "@/utils/mockData";

const COURSES = [
  { id: "co1", subject: "Calculus II", teacher: "Maria Lopez", avatar: AVATARS.aisha, progress: 72, lessons: 24, hue: "from-primary/20" },
  { id: "co2", subject: "Modern Physics", teacher: "David Okafor", avatar: AVATARS.maya, progress: 45, lessons: 18, hue: "from-violet-500/20" },
  { id: "co3", subject: "Organic Chemistry", teacher: "Dr. Susan Lee", avatar: AVATARS.diego, progress: 88, lessons: 30, hue: "from-emerald-500/20" },
  { id: "co4", subject: "English Literature", teacher: "James Patel", avatar: AVATARS.aisha, progress: 30, lessons: 16, hue: "from-amber-500/20" },
  { id: "co5", subject: "Algorithms & DS", teacher: "Liam Chen", avatar: AVATARS.diego, progress: 60, lessons: 28, hue: "from-rose-500/20" },
  { id: "co6", subject: "World History", teacher: "Carlos Mendez", avatar: AVATARS.maya, progress: 15, lessons: 22, hue: "from-cyan-500/20" },
];

export default function Courses() {
  return (
    <MainLayout showRight={false}>
      <div data-testid="courses-page" className="flex flex-col gap-6">
        <header>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">My Courses</h1>
          <p className="mt-1 text-muted-foreground">Pick up where you left off — keep your streak going.</p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {COURSES.map((c) => (
            <article
              key={c.id}
              data-testid={`course-card-${c.id}`}
              className={`group flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${c.hue} to-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5`}
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-card text-primary">
                  <BookOpen className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-card/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground">
                  {c.lessons} lessons
                </span>
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">{c.subject}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <img src={c.avatar} alt={c.teacher} className="h-6 w-6 rounded-full object-cover" />
                  <p className="text-sm text-muted-foreground">{c.teacher}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                  <span className="text-muted-foreground">Progress</span>
                  <span>{c.progress}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background/60">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 2h left this week</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> 28</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
