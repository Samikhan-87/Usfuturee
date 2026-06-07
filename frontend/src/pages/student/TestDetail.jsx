import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { TestRunner } from "@/components/TestRunner";
import { STUDENT_TESTS } from "@/utils/mockData";
import { ArrowLeft, ShieldAlert, Play, Clock, FileCheck2, BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function TestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const test = STUDENT_TESTS.find((t) => t.id === id);
  const [warnOpen, setWarnOpen] = useState(false);
  const [activeTest, setActiveTest] = useState(null);

  if (!test) return (
    <MainLayout showRight={false}>
      <div className="grid min-h-[60vh] place-items-center text-center">
        <p className="font-heading text-xl font-bold text-foreground">Test not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Go Back</button>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout showRight={false}>
      <div data-testid={`test-detail-${id}`} className="flex flex-col gap-6">
        <div>
          <button onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Tests
          </button>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h1 className="font-heading text-2xl font-bold text-foreground">{test.subject} Test</h1>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Clock, label: "Date", value: test.date },
                { icon: Clock, label: "Duration", value: test.duration },
                { icon: FileCheck2, label: "Total Marks", value: `${test.marks} marks` },
                { icon: BookOpen, label: "Questions", value: `${test.questions.length} MCQs` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-2xl bg-secondary/60 p-4 text-center">
                  <Icon className="mx-auto mb-1 h-5 w-5 text-primary" />
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-0.5 font-heading font-bold text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security info */}
        <div className="flex items-start gap-3 rounded-2xl bg-amber-500/10 p-5 text-amber-700 dark:text-amber-400">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-heading font-bold">Secure Test Mode</p>
            <p className="mt-1 text-sm">This test runs in secure mode. Tab switching will auto-submit your test. Right-click is disabled. Ensure you're in a distraction-free environment before starting.</p>
          </div>
        </div>

        {/* Questions preview */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-heading text-base font-bold text-foreground">Test Preview</h2>
          <div className="flex flex-col gap-3">
            {test.questions.map((q, i) => (
              <div key={i} className="rounded-xl bg-secondary/60 p-4">
                <p className="text-sm font-semibold text-foreground">{i + 1}. {q.q}</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
                      {String.fromCharCode(65 + oi)}. {opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => setWarnOpen(true)} data-testid="start-test-detail"
          className="flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90">
          <Play className="h-5 w-5" /> Start Test Now
        </button>
      </div>

      <Dialog open={warnOpen} onOpenChange={setWarnOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-heading text-xl text-amber-600 dark:text-amber-400">
              <ShieldAlert className="h-5 w-5" /> Confirm Test Start
            </DialogTitle>
            <DialogDescription>This test uses secure browser mode.</DialogDescription>
          </DialogHeader>
          <p className="rounded-2xl bg-amber-500/10 p-4 text-sm font-medium text-amber-700 dark:text-amber-400">
            Switching tabs or windows will auto-submit your test. Make sure you're ready before confirming.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setWarnOpen(false)} className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold text-foreground hover:bg-accent">Cancel</button>
            <button onClick={() => { setActiveTest(test); setWarnOpen(false); }}
              className="flex-1 rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Start Test
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {activeTest && <TestRunner test={activeTest} onExit={() => setActiveTest(null)} />}
    </MainLayout>
  );
}
