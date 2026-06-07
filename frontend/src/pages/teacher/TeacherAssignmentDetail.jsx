import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { TEACHER_ASSIGNMENTS } from "@/utils/mockData";
import { ArrowLeft, FileText, CheckCircle2, Clock, Download } from "lucide-react";
import { toast } from "sonner";

export default function TeacherAssignmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState(TEACHER_ASSIGNMENTS);

  const assignment = assignments.find((a) => a.id === id);

  if (!assignment) return (
    <MainLayout showRight={false}>
      <div className="grid min-h-[60vh] place-items-center">
        <p className="font-heading text-xl font-bold text-foreground">Assignment not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Go Back</button>
      </div>
    </MainLayout>
  );

  const saveGrade = (studentId, marks, feedback) => {
    setAssignments((as) => as.map((a) => a.id === id ? {
      ...a,
      submissions: a.submissions.map((s) => s.studentId === studentId ? { ...s, marks: Number(marks), feedback } : s),
    } : a));
    toast.success("Grade saved!", { position: "bottom-right" });
  };

  return (
    <MainLayout showRight={false}>
      <div data-testid={`teacher-assignment-detail-${id}`} className="flex flex-col gap-6">
        <div>
          <button onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Assignments
          </button>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h1 className="font-heading text-2xl font-bold text-foreground">{assignment.title}</h1>
            <p className="mt-1 text-muted-foreground">{assignment.subject} · Due {assignment.dueDate} · {assignment.totalMarks} marks</p>
            <p className="mt-3 text-sm text-foreground">{assignment.description}</p>
            <div className="mt-4 flex gap-3">
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600">
                {assignment.submissions.filter(s => s.marks !== null).length} graded
              </span>
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600">
                {assignment.submissions.filter(s => s.marks === null).length} pending
              </span>
              <button onClick={() => toast.info("Downloading all submissions...")}
                className="ml-auto flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground hover:bg-accent">
                <Download className="h-3.5 w-3.5" /> Download All
              </button>
            </div>
          </div>
        </div>

        {/* Submissions */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Student Submissions</h2>
          {assignment.submissions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No submissions yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {assignment.submissions.map((s) => (
                <SubmissionRow key={s.studentId} submission={s} totalMarks={assignment.totalMarks} onSave={saveGrade} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

function SubmissionRow({ submission: s, totalMarks, onSave }) {
  const [marks, setMarks] = useState(s.marks ?? "");
  const [feedback, setFeedback] = useState(s.feedback ?? "");

  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-5">
      <div className="flex items-center gap-3">
        <img src={s.avatar} alt={s.studentName} className="h-10 w-10 rounded-full object-cover" />
        <div className="flex-1">
          <p className="font-semibold text-foreground">{s.studentName}</p>
          <p className="text-xs text-muted-foreground">Submitted {s.submittedAt}</p>
        </div>
        <button onClick={() => toast.info(`Opening ${s.file}`)}
          className="flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-semibold text-primary hover:bg-accent">
          <FileText className="h-3.5 w-3.5" /> {s.file}
        </button>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[120px_1fr_auto]">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Marks / {totalMarks}</label>
          <input type="number" value={marks} onChange={(e) => setMarks(e.target.value)}
            min={0} max={totalMarks}
            className="h-10 w-full rounded-xl border border-border bg-input px-3 text-foreground outline-none ring-primary focus:ring-2" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Feedback</label>
          <input value={feedback} onChange={(e) => setFeedback(e.target.value)}
            placeholder="Optional feedback for student..."
            className="h-10 w-full rounded-xl border border-border bg-input px-3 text-foreground outline-none ring-primary focus:ring-2" />
        </div>
        <div className="flex items-end">
          <button onClick={() => onSave(s.studentId, marks, feedback)}
            className="flex h-10 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <CheckCircle2 className="h-4 w-4" /> Save
          </button>
        </div>
      </div>
      {s.marks !== null && (
        <div className="mt-2 flex items-center gap-2 text-xs text-emerald-600">
          <CheckCircle2 className="h-3.5 w-3.5" /> Graded: {s.marks}/{totalMarks}
        </div>
      )}
    </div>
  );
}
