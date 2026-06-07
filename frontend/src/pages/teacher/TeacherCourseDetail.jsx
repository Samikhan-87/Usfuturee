import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { TEACHER_COURSES, TEACHER_STUDENTS } from "@/utils/mockData";
import { ArrowLeft, BookOpen, Users, FileText, Upload, Plus, Trash2, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function TeacherCourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState(TEACHER_COURSES);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [matForm, setMatForm] = useState({ title: "", desc: "" });

  const course = courses.find((c) => c.id === id);

  if (!course) return (
    <MainLayout showRight={false}>
      <div className="grid min-h-[60vh] place-items-center">
        <p className="font-heading text-xl font-bold text-foreground">Course not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Go Back</button>
      </div>
    </MainLayout>
  );

  const uploadMaterial = () => {
    if (!matForm.title) { toast.error("Please enter a material title."); return; }
    setCourses((cs) => cs.map((c) => c.id === id ? {
      ...c,
      materials: [...c.materials, { id: "m_" + Date.now(), ...matForm, date: "Jun 7" }],
    } : c));
    toast.success("Material uploaded!");
    setMatForm({ title: "", desc: "" });
    setUploadOpen(false);
  };

  const deleteMaterial = (mid) => {
    setCourses((cs) => cs.map((c) => c.id === id ? { ...c, materials: c.materials.filter(m => m.id !== mid) } : c));
    toast.info("Material removed.");
  };

  return (
    <MainLayout showRight={false}>
      <div data-testid={`teacher-course-detail-${id}`} className="flex flex-col gap-6">
        <div>
          <button onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Courses
          </button>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                <BookOpen className="h-8 w-8" />
              </div>
              <div>
                <h1 className="font-heading text-2xl font-bold text-foreground">{course.name}</h1>
                <p className="mt-1 text-muted-foreground">{course.description}</p>
                <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {course.students} students</span>
                  <span className="flex items-center gap-1.5"><FileText className="h-4 w-4" /> {course.materials.length} materials</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Students enrolled */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Enrolled Students</h2>
          <div className="flex flex-col gap-2">
            {TEACHER_STUDENTS.slice(0, course.students > 5 ? 5 : course.students).map((s) => (
              <div key={s.id} className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3">
                <img src={s.avatar} alt={s.name} className="h-9 w-9 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.email}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${s.grade.startsWith("A") ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>{s.grade}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Materials */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-foreground">Course Materials</h2>
            <button onClick={() => setUploadOpen(true)}
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <Upload className="h-4 w-4" /> Upload Material
            </button>
          </div>
          {course.materials.length === 0 ? (
            <p className="text-sm text-muted-foreground">No materials uploaded yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {course.materials.map((m) => (
                <div key={m.id} className="flex items-center justify-between rounded-xl bg-secondary/60 p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-card text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{m.title}</p>
                      <p className="text-xs text-muted-foreground">{m.desc} · {m.date}</p>
                    </div>
                  </div>
                  <button onClick={() => deleteMaterial(m.id)}
                    className="grid h-9 w-9 place-items-center rounded-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-white">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Upload Material</DialogTitle>
            <DialogDescription>Add a new resource for students in this course.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <input value={matForm.title} onChange={(e) => setMatForm({ ...matForm, title: e.target.value })}
              placeholder="Material title"
              className="h-11 w-full rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
            <input value={matForm.desc} onChange={(e) => setMatForm({ ...matForm, desc: e.target.value })}
              placeholder="Brief description"
              className="h-11 w-full rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-border p-4 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary">
              <Upload className="h-5 w-5" /> Click to upload file
              <input type="file" hidden onChange={() => toast.info("File selected")} />
            </label>
            <button onClick={uploadMaterial} className="h-11 rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90">Upload</button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
