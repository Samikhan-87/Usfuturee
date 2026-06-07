import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { STUDENT_ASSIGNMENTS } from "@/utils/mockData";
import { ArrowLeft, Upload, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const statusStyle = {
  Pending: { cls: "bg-amber-500/10 text-amber-600", icon: Clock },
  Submitted: { cls: "bg-emerald-500/10 text-emerald-600", icon: CheckCircle2 },
  Late: { cls: "bg-destructive/10 text-destructive", icon: AlertCircle },
  "Under Review": { cls: "bg-primary/10 text-primary", icon: Clock },
};

export default function AssignmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState(STUDENT_ASSIGNMENTS);
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState(null);

  const assignment = assignments.find((a) => a.id === id);

  if (!assignment) return (
    <MainLayout showRight={false}>
      <div className="grid min-h-[60vh] place-items-center text-center">
        <p className="font-heading text-xl font-bold text-foreground">Assignment not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Go Back</button>
      </div>
    </MainLayout>
  );

  const StatusIcon = statusStyle[assignment.status]?.icon || Clock;
  const now = new Date();
  const dueDate = new Date(assignment.due);
  const isPastDue = now > dueDate;

  const handleSubmit = () => {
    if (!text.trim() && !fileName) {
      toast.error("Please add text or upload a file before submitting.");
      return;
    }
    setAssignments((a) => a.map((x) => x.id === id ? { ...x, status: "Submitted" } : x));
    toast.success(`"${assignment.title}" submitted successfully!`, { position: "bottom-right" });
  };

  return (
    <MainLayout showRight={false}>
      <div data-testid={`assignment-detail-${id}`} className="flex flex-col gap-6">
        <div>
          <button onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Assignments
          </button>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{assignment.subject}</span>
                <h1 className="mt-1 font-heading text-2xl font-bold text-foreground">{assignment.title}</h1>
                <p className="mt-1 text-sm text-muted-foreground">Due: {assignment.due}</p>
              </div>
              <div className={`flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-sm font-bold ${statusStyle[assignment.status]?.cls}`}>
                <StatusIcon className="h-4 w-4" />
                {assignment.status}
                {isPastDue && assignment.status !== "Submitted" && (
                  <span className="ml-1 rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">LATE</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-3 font-heading text-base font-bold text-foreground">Instructions</h2>
          <p className="text-sm leading-relaxed text-foreground">{assignment.description}</p>
          {assignment.files.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Attached Files</p>
              {assignment.files.map((f, i) => (
                <button key={i} onClick={() => toast.info(`Opening ${f}`)}
                  className="flex items-center gap-2 rounded-xl border border-border bg-secondary/60 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-accent">
                  <FileText className="h-4 w-4" /> {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Submission */}
        {assignment.status !== "Submitted" && (
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-4 font-heading text-base font-bold text-foreground">Your Submission</h2>
            <textarea value={text} onChange={(e) => setText(e.target.value)}
              placeholder="Type your answer here (optional if uploading a file)..."
              rows={5}
              className="w-full resize-none rounded-2xl border border-border bg-input p-4 text-foreground outline-none ring-primary transition-all focus:ring-2" />
            <div className="mt-3">
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border p-4 text-sm font-medium text-muted-foreground transition-all hover:border-primary hover:text-primary">
                <Upload className="h-5 w-5 shrink-0" />
                <span>{fileName || "Upload a file (PDF, DOC, image...)"}</span>
                <input type="file" hidden onChange={(e) => setFileName(e.target.files?.[0]?.name || null)} />
              </label>
            </div>
            <button onClick={handleSubmit} data-testid="submit-assignment-detail"
              className="mt-4 flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90">
              <Upload className="h-4 w-4" /> Submit Assignment
            </button>
          </div>
        )}

        {assignment.status === "Submitted" && (
          <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/10 p-5 text-emerald-600">
            <CheckCircle2 className="h-6 w-6 shrink-0" />
            <div>
              <p className="font-heading font-bold">Assignment Submitted</p>
              <p className="text-sm">Your assignment has been submitted and is under review.</p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
