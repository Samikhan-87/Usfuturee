import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { TEACHER_TESTS } from "@/utils/mockData";
import { ArrowLeft, Download, TrendingUp, Users, BookOpen, Clock } from "lucide-react";
import { toast } from "sonner";

export default function TeacherTestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const test = TEACHER_TESTS.find((t) => t.id === id);

  if (!test) return (
    <MainLayout showRight={false}>
      <div className="grid min-h-[60vh] place-items-center">
        <p className="font-heading text-xl font-bold text-foreground">Test not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Go Back</button>
      </div>
    </MainLayout>
  );

  const avg = test.results.length
    ? Math.round(test.results.reduce((s, r) => s + r.percentage, 0) / test.results.length)
    : 0;

  const highest = test.results.length ? Math.max(...test.results.map(r => r.percentage)) : 0;
  const lowest = test.results.length ? Math.min(...test.results.map(r => r.percentage)) : 0;

  return (
    <MainLayout showRight={false}>
      <div data-testid={`teacher-test-detail-${id}`} className="flex flex-col gap-6">
        <div>
          <button onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Tests
          </button>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-heading text-2xl font-bold text-foreground">{test.title}</h1>
                <p className="mt-1 text-muted-foreground">{test.subject} · {test.scheduledDate}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{test.duration} minutes · {test.totalMarks} marks · {test.questions.length} questions</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${test.published ? "bg-emerald-500/10 text-emerald-600" : "bg-secondary text-muted-foreground"}`}>
                {test.published ? "Published" : "Draft"}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        {test.results.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Users, label: "Students Attempted", value: test.results.length },
              { icon: TrendingUp, label: "Class Average", value: `${avg}%` },
              { icon: TrendingUp, label: "Highest Score", value: `${highest}%` },
              { icon: TrendingUp, label: "Lowest Score", value: `${lowest}%` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-border bg-card p-4 text-center">
                <Icon className="mx-auto mb-1 h-5 w-5 text-primary" />
                <p className="font-heading text-xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Results table */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-foreground">Student Results</h2>
            <button onClick={() => toast.info("Downloading results CSV...")}
              className="flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-semibold text-foreground hover:bg-accent">
              <Download className="h-4 w-4" /> Download CSV
            </button>
          </div>
          {test.results.length === 0 ? (
            <p className="text-sm text-muted-foreground">No results yet. Students have not taken the test.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-secondary/40">
                  <tr>
                    {["Student", "Score", "Percentage", "Time Taken", "Grade"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {test.results.map((r, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="px-4 py-3 font-semibold text-foreground">{r.studentName}</td>
                      <td className="px-4 py-3 text-foreground">{r.score}/{r.total}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${r.percentage >= 80 ? "bg-emerald-500/10 text-emerald-600" : r.percentage >= 60 ? "bg-amber-500/10 text-amber-600" : "bg-destructive/10 text-destructive"}`}>
                          {r.percentage}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{r.timeTaken}</td>
                      <td className="px-4 py-3 font-bold text-foreground">{r.percentage >= 90 ? "A+" : r.percentage >= 80 ? "A" : r.percentage >= 70 ? "B" : r.percentage >= 60 ? "C" : "D"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Question analysis */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Question Analysis</h2>
          <div className="flex flex-col gap-3">
            {test.questions.map((q, i) => (
              <div key={i} className="rounded-xl bg-secondary/60 p-4">
                <p className="text-sm font-semibold text-foreground">{i + 1}. {q.q}</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className={`rounded-lg px-3 py-2 text-xs ${oi === q.answer ? "bg-emerald-500/10 text-emerald-600 font-semibold" : "bg-background text-muted-foreground"}`}>
                      {oi === q.answer ? "✓ " : ""}{opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
