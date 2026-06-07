import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { PRINCIPAL_TEACHERS, TEACHER_STUDENTS } from "@/utils/mockData";
import { ArrowLeft, Mail, BookOpen, GraduationCap, Calendar, Users } from "lucide-react";

export default function TeacherDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const teacher = PRINCIPAL_TEACHERS.find((t) => t.id === id);

  if (!teacher) return (
    <MainLayout showRight={false}>
      <div className="grid min-h-[60vh] place-items-center">
        <p className="font-heading text-xl font-bold text-foreground">Teacher not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Go Back</button>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout showRight={false}>
      <div data-testid={`teacher-detail-${id}`} className="flex flex-col gap-6">
        <div>
          <button onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Teachers
          </button>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start gap-5">
              <img src={teacher.avatar} alt={teacher.name} className="h-20 w-20 rounded-2xl object-cover" />
              <div>
                <h1 className="font-heading text-2xl font-bold text-foreground">{teacher.name}</h1>
                <p className="mt-1 text-muted-foreground">{teacher.subject} Teacher</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Mail, label: "Email", value: teacher.email },
                { icon: BookOpen, label: "Subject", value: teacher.subject },
                { icon: GraduationCap, label: "Qualification", value: teacher.qualification },
                { icon: Calendar, label: "Joined", value: teacher.joinDate },
                { icon: Users, label: "Total Students", value: teacher.students },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-card text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
                    <p className="font-semibold text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Courses They Teach</h2>
          {teacher.courses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No courses assigned.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {teacher.courses.map((course, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-secondary/60 p-4">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <p className="font-semibold text-foreground">{course}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Students in their classes */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Students in Their Classes</h2>
          <div className="flex flex-col gap-3">
            {TEACHER_STUDENTS.map((s) => (
              <div key={s.id} className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3">
                <img src={s.avatar} alt={s.name} className="h-9 w-9 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.course}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${s.grade.startsWith("A") ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>{s.grade}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
