import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { PRINCIPAL_STUDENTS, PRINCIPAL_FEE_RECEIPTS, STUDENT_ASSIGNMENTS } from "@/utils/mockData";
import { ArrowLeft, Mail, Phone, User, Calendar, GraduationCap, DollarSign, ClipboardList } from "lucide-react";

const statusStyle = {
  Paid: "bg-emerald-500/10 text-emerald-600",
  Pending: "bg-amber-500/10 text-amber-600",
  Overdue: "bg-destructive/10 text-destructive",
  "Under Review": "bg-primary/10 text-primary",
  Submitted: "bg-emerald-500/10 text-emerald-600",
  Late: "bg-destructive/10 text-destructive",
};

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = PRINCIPAL_STUDENTS.find((s) => s.id === id);
  const feeHistory = PRINCIPAL_FEE_RECEIPTS.filter((r) => r.studentId === id);

  if (!student) return (
    <MainLayout showRight={false}>
      <div className="grid min-h-[60vh] place-items-center">
        <p className="font-heading text-xl font-bold text-foreground">Student not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Go Back</button>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout showRight={false}>
      <div data-testid={`student-detail-${id}`} className="flex flex-col gap-6">
        <div>
          <button onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Students
          </button>

          {/* Profile card */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start gap-5">
              <img src={student.avatar} alt={student.name} className="h-20 w-20 rounded-2xl object-cover" />
              <div>
                <h1 className="font-heading text-2xl font-bold text-foreground">{student.name}</h1>
                <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusStyle[student.feeStatus]}`}>Fee: {student.feeStatus}</span>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Mail, label: "Email", value: student.email },
                { icon: GraduationCap, label: "Class", value: student.grade },
                { icon: Calendar, label: "Joined", value: student.joinDate },
                { icon: User, label: "Parent", value: student.parentName },
                { icon: Phone, label: "Parent Contact", value: student.parentContact },
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

        {/* Fee history */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-bold text-foreground">
            <DollarSign className="h-5 w-5 text-primary" /> Fee History
          </h2>
          {feeHistory.length === 0 ? (
            <p className="text-sm text-muted-foreground">No fee records found.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {feeHistory.map((f) => (
                <div key={f.id} className="flex items-center justify-between rounded-xl bg-secondary/60 p-4">
                  <div>
                    <p className="font-semibold text-foreground">{f.grade} — ${f.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Due: {f.dueDate}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusStyle[f.status]}`}>{f.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Assignment history */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 flex items-center gap-2 font-heading text-lg font-bold text-foreground">
            <ClipboardList className="h-5 w-5 text-primary" /> Assignment History
          </h2>
          <div className="flex flex-col gap-3">
            {STUDENT_ASSIGNMENTS.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-xl bg-secondary/60 p-4">
                <div>
                  <p className="font-semibold text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.subject} · Due {a.due}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusStyle[a.status] || "bg-secondary text-muted-foreground"}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
