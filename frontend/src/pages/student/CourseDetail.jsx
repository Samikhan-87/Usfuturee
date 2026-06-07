import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { STUDENT_COURSES, STUDENT_ASSIGNMENTS } from "@/utils/mockData";
import { ArrowLeft, BookOpen, Download, ClipboardList, ChevronRight, FileText, Users } from "lucide-react";
import { toast } from "sonner";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = STUDENT_COURSES.find((c) => c.id === id);

  if (!course) return (
    <MainLayout showRight={false}>
      <div className="grid min-h-[60vh] place-items-center text-center">
        <div>
          <p className="font-heading text-xl font-bold text-foreground">Course not found.</p>
          <button onClick={() => navigate(-1)} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Go Back</button>
        </div>
      </div>
    </MainLayout>
  );

  const courseAssignments = STUDENT_ASSIGNMENTS.filter((a) => a.courseId === id);

  const materials = [
    { id: "m1", title: "Chapter 1 — Introduction", desc: "Lecture notes and reading materials", size: "2.4 MB", date: "Jun 01" },
    { id: "m2", title: "Chapter 2 — Core Concepts", desc: "Worked examples and exercises", size: "1.8 MB", date: "Jun 05" },
    { id: "m3", title: "Mid-Term Review Sheet", desc: "Summary and practice problems", size: "0.9 MB", date: "Jun 10" },
  ];

  return (
    <MainLayout showRight={false}>
      <div data-testid={`course-detail-${id}`} className="flex flex-col gap-6">
        {/* Back + header */}
        <div>
          <button onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Courses
          </button>
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl ${course.color}`}>
                <BookOpen className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h1 className="font-heading text-2xl font-bold text-foreground">{course.name}</h1>
                <p className="mt-1 text-muted-foreground">{course.teacher}</p>
                <p className="mt-2 text-sm text-foreground">{course.description}</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-muted-foreground">Course Progress</span>
                <span className="font-semibold text-foreground">{course.progress}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
            <div className="mt-4 flex gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><FileText className="h-4 w-4" /> {course.lessons} Lessons</span>
              <span className="flex items-center gap-1.5"><ClipboardList className="h-4 w-4" /> {course.assignments} Assignments</span>
            </div>
          </div>
        </div>

        {/* Materials */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Course Materials</h2>
          <div className="flex flex-col gap-3">
            {materials.map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-xl bg-secondary/60 p-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-card text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.desc} · {m.size} · {m.date}</p>
                  </div>
                </div>
                <button onClick={() => toast.success(`Downloading ${m.title}...`)}
                  className="flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-semibold text-foreground transition-all hover:bg-accent">
                  <Download className="h-4 w-4" /> Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Assignments for this Course</h2>
          {courseAssignments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No assignments for this course yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {courseAssignments.map((a) => (
                <div key={a.id} onClick={() => navigate(`/portal/assignments/${a.id}`)}
                  className="flex cursor-pointer items-center justify-between rounded-xl bg-secondary/60 p-4 transition-all hover:bg-accent">
                  <div>
                    <p className="font-semibold text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">Due {a.due}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      a.status === "Submitted" ? "bg-emerald-500/10 text-emerald-600" :
                      a.status === "Late" ? "bg-destructive/10 text-destructive" :
                      "bg-amber-500/10 text-amber-600"
                    }`}>{a.status}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
