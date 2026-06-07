import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { StatCard, portalToast } from "@/components/PortalStat";
import {
  TEACHER_CLASSES_TODAY, TEACHER_MESSAGES, TEACHER_COURSES, TEACHER_ASSIGNMENTS,
  TEACHER_TESTS, TEACHER_STUDENTS, TEACHER_WEEK_DAYS, TEACHER_PERIODS, TEACHER_SCHEDULE,
} from "@/utils/mockData";
import {
  BookOpen, Users, ClipboardList, Calendar, MapPin, Upload, Plus,
  ChevronRight, CheckSquare, Megaphone, Clock, FileText, Send,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const Panel = ({ title, icon: Icon, children, className = "", action }) => (
  <div className={`rounded-2xl border border-border bg-card p-5 ${className}`}>
    <div className="mb-4 flex items-center justify-between">
      <h3 className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
        <Icon className="h-4 w-4 text-primary" /> {title}
      </h3>
      {action}
    </div>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

export default function TeacherPortal() {
  const navigate = useNavigate();
  const [courses] = useState(TEACHER_COURSES);
  const [assignments, setAssignments] = useState(TEACHER_ASSIGNMENTS);
  const [tests, setTests] = useState(TEACHER_TESTS);
  const [announcementOpen, setAnnouncementOpen] = useState(false);
  const [createAssignmentOpen, setCreateAssignmentOpen] = useState(false);
  const [createTestOpen, setCreateTestOpen] = useState(false);
  const [announcement, setAnnouncement] = useState({ message: "", course: "" });
  const [assignForm, setAssignForm] = useState({ title: "", description: "", courseId: "", dueDate: "", totalMarks: "" });
  const [testForm, setTestForm] = useState({
    title: "", subject: "", courseId: "", duration: "", totalMarks: "", scheduledDate: "",
    disableCopy: true, tabWarning: true, autoSubmit: true,
    questions: [{ q: "", options: ["", "", "", ""], answer: 0 }],
  });

  const createAssignment = () => {
    if (!assignForm.title || !assignForm.courseId || !assignForm.dueDate) {
      toast.error("Please fill in title, course and due date.");
      return;
    }
    setAssignments((a) => [...a, {
      id: "ta_" + Date.now(),
      ...assignForm,
      submissions: [],
    }]);
    portalToast(toast, `Assignment "${assignForm.title}" created!`);
    setAssignForm({ title: "", description: "", courseId: "", dueDate: "", totalMarks: "" });
    setCreateAssignmentOpen(false);
  };

  const addQuestion = () => {
    setTestForm((f) => ({
      ...f,
      questions: [...f.questions, { q: "", options: ["", "", "", ""], answer: 0 }],
    }));
  };

  const updateQuestion = (qi, field, value) => {
    setTestForm((f) => ({
      ...f,
      questions: f.questions.map((q, i) => i === qi ? { ...q, [field]: value } : q),
    }));
  };

  const updateOption = (qi, oi, value) => {
    setTestForm((f) => ({
      ...f,
      questions: f.questions.map((q, i) => i === qi ? { ...q, options: q.options.map((o, j) => j === oi ? value : o) } : q),
    }));
  };

  const publishTest = () => {
    if (!testForm.title || !testForm.courseId || !testForm.duration) {
      toast.error("Please fill in title, course and duration.");
      return;
    }
    setTests((t) => [...t, { id: "tt_" + Date.now(), ...testForm, results: [], published: true }]);
    portalToast(toast, `Test "${testForm.title}" published!`);
    setTestForm({ title: "", subject: "", courseId: "", duration: "", totalMarks: "", scheduledDate: "", disableCopy: true, tabWarning: true, autoSubmit: true, questions: [{ q: "", options: ["", "", "", ""], answer: 0 }] });
    setCreateTestOpen(false);
  };

  const sendAnnouncement = () => {
    if (!announcement.message) { toast.error("Message cannot be empty."); return; }
    console.log(`[ANNOUNCEMENT] To students of ${announcement.course || "all courses"}: ${announcement.message}`);
    portalToast(toast, "Announcement sent to students!");
    setAnnouncement({ message: "", course: "" });
    setAnnouncementOpen(false);
  };

  const pendingGrading = assignments.reduce((acc, a) => acc + a.submissions.filter(s => s.marks === null).length, 0);

  return (
    <MainLayout showRight={false}>
      <div data-testid="teacher-portal" className="flex flex-col gap-6">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Teacher Portal</h1>
          <p className="mt-1 text-muted-foreground">Manage your courses, assignments, tests and students.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={BookOpen} label="Active Courses" value={courses.length} />
          <StatCard icon={Users} label="Total Students" value={TEACHER_STUDENTS.length} accent="bg-emerald-500/10 text-emerald-500" />
          <StatCard icon={ClipboardList} label="Pending Grading" value={pendingGrading} accent="bg-amber-500/10 text-amber-500" />
          <StatCard icon={Calendar} label="Classes Today" value={TEACHER_CLASSES_TODAY.length} accent="bg-violet-500/10 text-violet-500" />
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="flex w-full flex-wrap justify-start gap-1 rounded-2xl bg-card p-1" data-testid="teacher-tabs">
            {["dashboard", "courses", "assignments", "tests", "gradebook", "schedule", "announcements"].map((t) => (
              <TabsTrigger key={t} value={t} data-testid={`teacher-tab-${t}`}
                className="rounded-xl capitalize text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── DASHBOARD ── */}
          <TabsContent value="dashboard" className="mt-6 grid gap-6 lg:grid-cols-2" data-testid="teacher-dashboard">
            <Panel title="Today's Schedule" icon={Calendar}>
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

            <Panel title="Recent Submissions to Grade" icon={ClipboardList}>
              {assignments.flatMap(a => a.submissions.filter(s => s.marks === null).map(s => ({ ...s, assignTitle: a.title }))).slice(0, 4).map((s, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-secondary/60 p-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{s.studentName}</p>
                    <p className="text-xs text-muted-foreground">{s.assignTitle}</p>
                  </div>
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-600">Ungraded</span>
                </div>
              ))}
              {pendingGrading === 0 && <p className="text-sm text-muted-foreground">All submissions graded! 🎉</p>}
            </Panel>

            <Panel title="Messages" icon={Send}>
              {TEACHER_MESSAGES.map((m) => (
                <div key={m.id} className="rounded-xl bg-secondary/60 p-3">
                  <p className="text-sm font-semibold text-foreground">{m.from} <span className="font-normal text-muted-foreground">· {m.time}</span></p>
                  <p className="mt-0.5 text-sm text-foreground/80">{m.message}</p>
                </div>
              ))}
            </Panel>

            <Panel title="My Courses" icon={BookOpen} action={
              <button onClick={() => navigate("/portal")} className="text-xs font-semibold text-primary hover:underline">View All</button>
            }>
              {courses.map((c) => (
                <div key={c.id} onClick={() => navigate(`/portal/teacher/courses/${c.id}`)}
                  className="flex cursor-pointer items-center justify-between rounded-xl bg-secondary/60 p-3 transition-all hover:bg-accent">
                  <div>
                    <p className="font-semibold text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.students} students</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </Panel>
          </TabsContent>

          {/* ── COURSES ── */}
          <TabsContent value="courses" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="teacher-courses">
            {courses.map((c) => (
              <div key={c.id} data-testid={`teacher-course-${c.id}`}
                onClick={() => navigate(`/portal/teacher/courses/${c.id}`)}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary">
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-muted-foreground">{c.students} students</span>
                </div>
                <h3 className="mt-3 font-heading text-base font-bold text-foreground">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> {c.materials.length} materials</span>
                  <span className="flex items-center gap-1"><ClipboardList className="h-3.5 w-3.5" /> {c.assignments.length} assignments</span>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:underline">
                  View Course <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </TabsContent>

          {/* ── ASSIGNMENTS ── */}
          <TabsContent value="assignments" className="mt-6 flex flex-col gap-4" data-testid="teacher-assignments">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{assignments.length} assignments</p>
              <button onClick={() => setCreateAssignmentOpen(true)} data-testid="create-assignment-button"
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90">
                <Plus className="h-4 w-4" /> Create Assignment
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {assignments.map((a) => (
                <div key={a.id} data-testid={`teacher-assignment-${a.id}`}
                  onClick={() => navigate(`/portal/teacher/assignments/${a.id}`)}
                  className="cursor-pointer rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary hover:-translate-y-0.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-heading text-base font-bold text-foreground">{a.title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{a.subject} · Due {a.dueDate}</p>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{a.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-heading text-lg font-bold text-foreground">{a.submissions.length}</p>
                      <p className="text-xs text-muted-foreground">submissions</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 font-bold text-emerald-600">
                      {a.submissions.filter(s => s.marks !== null).length} graded
                    </span>
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-1 font-bold text-amber-600">
                      {a.submissions.filter(s => s.marks === null).length} pending
                    </span>
                    <span className="ml-auto flex items-center gap-1 font-semibold text-primary">View Submissions <ChevronRight className="h-3.5 w-3.5" /></span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ── TESTS ── */}
          <TabsContent value="tests" className="mt-6 flex flex-col gap-4" data-testid="teacher-tests">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{tests.length} tests</p>
              <button onClick={() => setCreateTestOpen(true)} data-testid="create-test-button"
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90">
                <Plus className="h-4 w-4" /> Create Test
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {tests.map((t) => (
                <div key={t.id} data-testid={`teacher-test-${t.id}`}
                  onClick={() => navigate(`/portal/teacher/tests/${t.id}`)}
                  className="cursor-pointer rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary hover:-translate-y-0.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-heading text-base font-bold text-foreground">{t.title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{t.subject} · {t.scheduledDate}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{t.duration} min · {t.totalMarks} marks · {t.questions.length} questions</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${t.published ? "bg-emerald-500/10 text-emerald-600" : "bg-secondary text-muted-foreground"}`}>
                      {t.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary">
                    View Results ({t.results.length} students) <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ── GRADEBOOK ── */}
          <TabsContent value="gradebook" className="mt-6" data-testid="teacher-gradebook">
            <div className="overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-secondary/40">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Student</th>
                    {courses.map((c) => (
                      <th key={c.id} className="px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">{c.name.split("—")[0].trim()}</th>
                    ))}
                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">Overall</th>
                  </tr>
                </thead>
                <tbody>
                  {TEACHER_STUDENTS.map((s) => (
                    <tr key={s.id} className="cursor-pointer border-b border-border/50 transition-all hover:bg-secondary/40">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <img src={s.avatar} alt={s.name} className="h-8 w-8 rounded-full object-cover" />
                          <span className="font-semibold text-foreground">{s.name}</span>
                        </div>
                      </td>
                      {courses.map((c) => (
                        <td key={c.id} className="px-4 py-3 text-center font-semibold text-foreground">{s.grade}</td>
                      ))}
                      <td className="px-4 py-3 text-center">
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">{s.grade}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* ── SCHEDULE ── */}
          <TabsContent value="schedule" className="mt-6" data-testid="teacher-schedule">
            <div className="overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-secondary/40">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Time</th>
                    {TEACHER_WEEK_DAYS.map((d) => (
                      <th key={d} className="px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TEACHER_PERIODS.map((period) => (
                    <tr key={period} className="border-b border-border/50">
                      <td className="px-4 py-3 font-semibold text-primary">{period}</td>
                      {TEACHER_WEEK_DAYS.map((day) => {
                        const slot = TEACHER_SCHEDULE[`${day}-${period}`];
                        return (
                          <td key={day} className="px-3 py-2 text-center">
                            {slot ? (
                              <button onClick={() => toast.info(`${slot.subject} in ${slot.room}`)}
                                className="w-full rounded-xl bg-primary/10 p-2 text-center text-xs font-semibold text-primary hover:bg-primary/20">
                                <p>{slot.subject}</p>
                                <p className="font-normal text-primary/70">{slot.room}</p>
                              </button>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* ── ANNOUNCEMENTS ── */}
          <TabsContent value="announcements" className="mt-6 flex flex-col gap-4" data-testid="teacher-announcements">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Send announcements to your students.</p>
              <button onClick={() => setAnnouncementOpen(true)} data-testid="send-announcement-button"
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90">
                <Megaphone className="h-4 w-4" /> Send Announcement
              </button>
            </div>
            <div className="rounded-2xl border border-dashed border-border py-12 text-center text-muted-foreground">
              <Megaphone className="mx-auto mb-2 h-8 w-8 opacity-40" />
              <p>Announcement history will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Assignment Modal */}
      <Dialog open={createAssignmentOpen} onOpenChange={setCreateAssignmentOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Create Assignment</DialogTitle>
            <DialogDescription>Students will be notified immediately.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <input value={assignForm.title} onChange={(e) => setAssignForm({ ...assignForm, title: e.target.value })}
              placeholder="Assignment title"
              className="h-11 w-full rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
            <textarea value={assignForm.description} onChange={(e) => setAssignForm({ ...assignForm, description: e.target.value })}
              placeholder="Description / instructions..."
              rows={3}
              className="w-full resize-none rounded-2xl border border-border bg-input p-4 text-foreground outline-none ring-primary focus:ring-2" />
            <Select value={assignForm.courseId} onValueChange={(v) => setAssignForm({ ...assignForm, courseId: v })}>
              <SelectTrigger className="h-11 rounded-2xl border-border bg-input"><SelectValue placeholder="Select course" /></SelectTrigger>
              <SelectContent>{courses.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-3">
              <input value={assignForm.dueDate} onChange={(e) => setAssignForm({ ...assignForm, dueDate: e.target.value })}
                placeholder="Due date (e.g. Jun 20, 2026)"
                className="h-11 rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
              <input type="number" value={assignForm.totalMarks} onChange={(e) => setAssignForm({ ...assignForm, totalMarks: e.target.value })}
                placeholder="Total marks"
                className="h-11 rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
            </div>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-border p-3 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary">
              <Upload className="h-4 w-4" /> Attach file (optional)
              <input type="file" hidden />
            </label>
            <button onClick={createAssignment} className="h-11 rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90">Create Assignment</button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Test Modal */}
      <Dialog open={createTestOpen} onOpenChange={setCreateTestOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Create MCQ Test</DialogTitle>
            <DialogDescription>Add questions and configure security settings.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <input value={testForm.title} onChange={(e) => setTestForm({ ...testForm, title: e.target.value })}
                placeholder="Test title"
                className="h-11 rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
              <input value={testForm.subject} onChange={(e) => setTestForm({ ...testForm, subject: e.target.value })}
                placeholder="Subject"
                className="h-11 rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
            </div>
            <Select value={testForm.courseId} onValueChange={(v) => setTestForm({ ...testForm, courseId: v })}>
              <SelectTrigger className="h-11 rounded-2xl border-border bg-input"><SelectValue placeholder="Select course" /></SelectTrigger>
              <SelectContent>{courses.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
            <div className="grid grid-cols-3 gap-3">
              <input type="number" value={testForm.duration} onChange={(e) => setTestForm({ ...testForm, duration: e.target.value })}
                placeholder="Duration (min)"
                className="h-11 rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
              <input type="number" value={testForm.totalMarks} onChange={(e) => setTestForm({ ...testForm, totalMarks: e.target.value })}
                placeholder="Total marks"
                className="h-11 rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
              <input value={testForm.scheduledDate} onChange={(e) => setTestForm({ ...testForm, scheduledDate: e.target.value })}
                placeholder="Date (e.g. Jun 20)"
                className="h-11 rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
            </div>

            <div className="rounded-2xl border border-border bg-secondary/40 p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Security Settings</p>
              {[
                { label: "Disable copy/paste", key: "disableCopy" },
                { label: "Tab switch warning", key: "tabWarning" },
                { label: "Auto-submit on tab switch", key: "autoSubmit" },
              ].map(({ label, key }) => (
                <div key={key} className="flex items-center justify-between py-1.5">
                  <span className="text-sm font-medium text-foreground">{label}</span>
                  <Switch checked={testForm[key]} onCheckedChange={(v) => setTestForm({ ...testForm, [key]: v })} />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Questions</p>
              {testForm.questions.map((q, qi) => (
                <div key={qi} className="rounded-2xl border border-border bg-card p-4">
                  <input value={q.q} onChange={(e) => updateQuestion(qi, "q", e.target.value)}
                    placeholder={`Question ${qi + 1}`}
                    className="mb-3 h-10 w-full rounded-xl border border-border bg-input px-3 text-sm text-foreground outline-none ring-primary focus:ring-2" />
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => (
                      <div key={oi} className="flex items-center gap-2">
                        <button onClick={() => updateQuestion(qi, "answer", oi)}
                          className={`h-6 w-6 shrink-0 rounded-full border-2 transition-all ${q.answer === oi ? "border-emerald-500 bg-emerald-500" : "border-border"}`} />
                        <input value={opt} onChange={(e) => updateOption(qi, oi, e.target.value)}
                          placeholder={`Option ${oi + 1}`}
                          className="h-9 flex-1 rounded-xl border border-border bg-input px-3 text-xs text-foreground outline-none ring-primary focus:ring-2" />
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Click the circle next to the correct answer.</p>
                </div>
              ))}
              <button onClick={addQuestion} className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-3 text-sm font-semibold text-primary hover:bg-accent">
                <Plus className="h-4 w-4" /> Add Question
              </button>
            </div>

            <button onClick={publishTest} className="h-11 rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90">Publish Test</button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Announcement Modal */}
      <Dialog open={announcementOpen} onOpenChange={setAnnouncementOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Send Announcement</DialogTitle>
            <DialogDescription>Select a course and write your message.</DialogDescription>
          </DialogHeader>
          <Select value={announcement.course} onValueChange={(v) => setAnnouncement({ ...announcement, course: v })}>
            <SelectTrigger className="h-11 rounded-2xl border-border bg-input"><SelectValue placeholder="Select course (or leave for all)" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">All My Students</SelectItem>
              {courses.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <textarea value={announcement.message} onChange={(e) => setAnnouncement({ ...announcement, message: e.target.value })}
            placeholder="Your announcement..."
            rows={4}
            className="w-full resize-none rounded-2xl border border-border bg-input p-4 text-foreground outline-none ring-primary focus:ring-2" />
          <button onClick={sendAnnouncement} className="h-11 rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90">Send</button>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
