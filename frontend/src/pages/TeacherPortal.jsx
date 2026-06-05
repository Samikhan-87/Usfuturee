import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { StatCard, portalToast } from "@/components/PortalStat";
import {
  TEACHER_CLASSES_TODAY, TEACHER_ASSIGNMENT_STATUS, TEACHER_MESSAGES,
  TEACHER_GRADING_STUDENTS, TEACHER_WEEK_DAYS, TEACHER_PERIODS, TEACHER_SCHEDULE,
} from "@/utils/mockData";
import {
  BookOpen, Users, ClipboardList, Calendar, MapPin, Megaphone, FileCheck2,
  Pencil, PlusCircle, FolderPlus, CalendarPlus, ArrowLeft, MessageSquare,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function TeacherPortal() {
  const [grading, setGrading] = useState(null); // assignment being graded
  const [marks, setMarks] = useState({});

  const setMark = (sid, v) => setMarks((m) => ({ ...m, [sid]: v }));

  const submitGrades = () => {
    portalToast(toast, `Grades submitted for "${grading.title}"`);
    setGrading(null);
    setMarks({});
  };

  return (
    <MainLayout showRight={false}>
      <div data-testid="teacher-portal" className="flex flex-col gap-6">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Teacher Portal</h1>
          <p className="mt-1 text-muted-foreground">Manage classes, assignments and student progress.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={BookOpen} label="Active Courses" value="4" />
          <StatCard icon={Users} label="Total Students" value="128" accent="bg-violet-500/10 text-violet-500" />
          <StatCard icon={ClipboardList} label="Assignments" value="9" accent="bg-amber-500/10 text-amber-500" />
          <StatCard icon={Calendar} label="Classes Today" value={String(TEACHER_CLASSES_TODAY.length)} accent="bg-emerald-500/10 text-emerald-500" />
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="flex w-full flex-wrap justify-start gap-1 rounded-2xl bg-card p-1" data-testid="teacher-tabs">
            {[
              { v: "dashboard", l: "Dashboard" },
              { v: "courses", l: "My Courses" },
              { v: "assignments", l: "Assignments" },
              { v: "schedule", l: "Schedule" },
            ].map((t) => (
              <TabsTrigger key={t.v} value={t.v} data-testid={`teacher-tab-${t.v}`}
                className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t.l}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="mt-6 grid gap-6 lg:grid-cols-2" data-testid="teacher-dashboard">
            <Panel title="Today's Classes" icon={Calendar}>
              {TEACHER_CLASSES_TODAY.map((c) => (
                <div key={c.id} className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3">
                  <div className="grid h-11 w-16 shrink-0 place-items-center rounded-xl bg-card text-xs font-bold text-primary">{c.time}</div>
                  <div>
                    <p className="font-semibold text-foreground">{c.subject}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {c.room}</p>
                  </div>
                </div>
              ))}
            </Panel>

            <Panel title="Assignment Status" icon={FileCheck2}>
              {TEACHER_ASSIGNMENT_STATUS.map((a) => {
                const pct = Math.round((a.submitted / a.total) * 100);
                return (
                  <div key={a.id} className="rounded-xl bg-secondary/60 p-3">
                    <div className="flex justify-between">
                      <p className="font-semibold text-foreground">{a.title}</p>
                      <p className="text-xs font-bold text-primary">{a.submitted}/{a.total}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{a.subject}</p>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </Panel>

            <Panel title="Recent Messages" icon={Megaphone}>
              {TEACHER_MESSAGES.map((m) => (
                <div key={m.id} className="rounded-xl bg-secondary/60 p-3">
                  <p className="text-sm font-semibold text-foreground">{m.from} <span className="font-normal text-muted-foreground">· {m.time}</span></p>
                  <p className="mt-1 text-sm text-foreground/80">{m.message}</p>
                </div>
              ))}
            </Panel>

            <Panel title="Quick Actions" icon={PlusCircle}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l: "Grade Assignments", i: Pencil },
                  { l: "Create Assignment", i: PlusCircle },
                  { l: "Add Course Material", i: FolderPlus },
                  { l: "Schedule Meeting", i: CalendarPlus },
                ].map((q) => (
                  <button key={q.l}
                    data-testid={`quick-${q.l.toLowerCase().replace(/ /g, "-")}`}
                    onClick={() => portalToast(toast, `${q.l} opened`)}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-border p-4 text-center transition-all hover:-translate-y-0.5 hover:border-primary">
                    <q.i className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium text-foreground">{q.l}</span>
                  </button>
                ))}
              </div>
            </Panel>
          </TabsContent>

          {/* My Courses */}
          <TabsContent value="courses" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="teacher-courses">
            {[
              { id: "c1", name: "Physics — Grade 11", students: 32, color: "from-violet-500/20" },
              { id: "c2", name: "Physics — Grade 12", students: 28, color: "from-primary/20" },
              { id: "c3", name: "Science Club", students: 18, color: "from-emerald-500/20" },
              { id: "c4", name: "Advanced Mechanics", students: 14, color: "from-amber-500/20" },
            ].map((c) => (
              <div key={c.id} data-testid={`course-${c.id}`}
                className={`overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${c.color} to-card p-5`}>
                <BookOpen className="h-7 w-7 text-primary" />
                <h3 className="mt-3 font-heading text-lg font-bold text-foreground">{c.name}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-3.5 w-3.5" /> {c.students} students
                </p>
                <button onClick={() => portalToast(toast, `Opened ${c.name}`)}
                  className="mt-4 flex w-full items-center justify-center gap-1 rounded-full bg-card py-2 text-sm font-semibold text-foreground transition-all hover:bg-accent">
                  View Course
                </button>
              </div>
            ))}
          </TabsContent>

          {/* Assignments */}
          <TabsContent value="assignments" className="mt-6 flex flex-col gap-3" data-testid="teacher-assignments-tab">
            {TEACHER_ASSIGNMENT_STATUS.map((a) => (
              <div key={a.id} data-testid={`t-assignment-${a.id}`}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">{a.subject}</p>
                  <p className="font-semibold text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.submitted}/{a.total} submitted</p>
                </div>
                <button data-testid={`grade-${a.id}`}
                  onClick={() => { setGrading(a); setMarks({}); }}
                  className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-hover">
                  <Pencil className="h-4 w-4" /> Grade Assignments
                </button>
              </div>
            ))}
          </TabsContent>

          {/* Schedule */}
          <TabsContent value="schedule" className="mt-6" data-testid="teacher-schedule">
            <div className="overflow-x-auto rounded-2xl border border-border bg-card p-2 sm:p-4">
              <div className="grid min-w-[600px]" style={{ gridTemplateColumns: `90px repeat(${TEACHER_WEEK_DAYS.length}, 1fr)` }}>
                <div />
                {TEACHER_WEEK_DAYS.map((d) => (
                  <div key={d} className="px-2 py-2 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">{d}</div>
                ))}
                {TEACHER_PERIODS.map((p) => (
                  <div key={p} className="contents">
                    <div className="grid place-items-center border-t border-border py-3 text-xs font-bold text-muted-foreground">{p}</div>
                    {TEACHER_WEEK_DAYS.map((d) => {
                      const slot = TEACHER_SCHEDULE[`${d}-${p}`];
                      return (
                        <div key={`${d}-${p}`} className="border-t border-border p-1.5">
                          {slot && (
                            <div data-testid={`slot-${d}-${p}`} className="h-full rounded-xl bg-primary/10 p-2 text-center">
                              <p className="text-[11px] font-bold text-primary">{slot.subject}</p>
                              <p className="text-[10px] text-muted-foreground">{slot.room}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Grading modal */}
      <Dialog open={!!grading} onOpenChange={(o) => !o && setGrading(null)}>
        <DialogContent className="rounded-2xl sm:max-w-2xl" data-testid="grading-modal">
          <DialogHeader>
            <button onClick={() => setGrading(null)} className="flex w-fit items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
            <DialogTitle className="font-heading text-xl">{grading?.title}</DialogTitle>
            <p className="text-sm text-muted-foreground">{grading?.subject} · Grade student submissions</p>
          </DialogHeader>
          <div className="flex max-h-[55vh] flex-col gap-2 overflow-auto">
            {TEACHER_GRADING_STUDENTS.map((s) => (
              <div key={s.id} data-testid={`grade-row-${s.id}`}
                className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {s.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{s.name}</p>
                  <button onClick={() => portalToast(toast, `Opening ${s.file}`)}
                    className="flex items-center gap-1 text-xs text-primary hover:underline">
                    <MessageSquare className="h-3 w-3" /> {s.file}
                  </button>
                </div>
                <input
                  data-testid={`marks-${s.id}`}
                  type="number" min="0" max="100"
                  value={marks[s.id] ?? ""}
                  onChange={(e) => setMark(s.id, e.target.value)}
                  placeholder="—" inputMode="numeric"
                  className="h-9 w-20 rounded-lg border border-border bg-background text-center text-sm font-semibold text-foreground outline-none focus:border-primary"
                />
                <span className="text-xs text-muted-foreground">/100</span>
              </div>
            ))}
          </div>
          <button data-testid="submit-grades-button" onClick={submitGrades}
            className="h-11 rounded-full bg-primary font-semibold text-primary-foreground transition-all hover:bg-primary-hover">
            Submit Grades
          </button>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}

const Panel = ({ title, icon: Icon, children, className = "" }) => (
  <div className={`rounded-2xl border border-border bg-card p-5 ${className}`}>
    <h3 className="mb-4 flex items-center gap-2 font-heading text-base font-bold text-foreground">
      <Icon className="h-4 w-4 text-primary" /> {title}
    </h3>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);
