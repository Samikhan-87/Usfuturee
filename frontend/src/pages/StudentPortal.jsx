import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { StatCard, portalToast } from "@/components/PortalStat";
import { TestRunner } from "@/components/TestRunner";
import {
  STUDENT_TODAY_SCHEDULE, STUDENT_ANNOUNCEMENTS, STUDENT_ASSIGNMENTS,
  STUDENT_TESTS, STUDENT_FEES,
} from "@/utils/mockData";
import {
  BookOpen, ClipboardList, FileCheck2, Wallet, Clock, MapPin, Megaphone,
  Calendar, Bell, CreditCard, Upload, ShieldAlert, QrCode, Landmark,
  Download, Printer, X, Play, Link2,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

const statusStyle = {
  Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Submitted: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Late: "bg-destructive/10 text-destructive",
  "Under Review": "bg-primary/10 text-primary",
  Paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

export default function StudentPortal() {
  const [assignments, setAssignments] = useState(STUDENT_ASSIGNMENTS);
  const [uploadFor, setUploadFor] = useState(null);
  const [warnTest, setWarnTest] = useState(null);
  const [activeTest, setActiveTest] = useState(null);
  const [feeStatus, setFeeStatus] = useState("Pending");
  const totalDue = STUDENT_FEES.reduce((s, f) => s + f.amount, 0);

  const submitAssignment = () => {
    setAssignments((a) => a.map((x) => (x.id === uploadFor.id ? { ...x, status: "Submitted" } : x)));
    setUploadFor(null);
    portalToast(toast, `"${uploadFor.title}" submitted successfully!`);
  };

  return (
    <MainLayout showRight={false}>
      <div data-testid="student-portal" className="flex flex-col gap-6">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Student Portal</h1>
          <p className="mt-1 text-muted-foreground">Your courses, assignments, tests and fees in one place.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={BookOpen} label="Enrolled Courses" value="6" />
          <StatCard icon={ClipboardList} label="Pending Assignments" value="2" accent="bg-amber-500/10 text-amber-500" />
          <StatCard icon={FileCheck2} label="Upcoming Tests" value="2" accent="bg-violet-500/10 text-violet-500" />
          <StatCard icon={Wallet} label="Fee Status" value={feeStatus} accent="bg-destructive/10 text-destructive" />
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="flex w-full flex-wrap justify-start gap-1 rounded-2xl bg-card p-1" data-testid="student-tabs">
            {["dashboard", "assignments", "tests", "fees"].map((t) => (
              <TabsTrigger key={t} value={t} data-testid={`student-tab-${t}`} className="flex-1 rounded-xl capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t === "fees" ? "Fee & Payments" : t}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="mt-6 grid gap-6 lg:grid-cols-2" data-testid="student-dashboard">
            <Panel title="Today's Schedule" icon={Calendar}>
              {STUDENT_TODAY_SCHEDULE.map((s) => (
                <div key={s.id} className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3">
                  <div className="grid h-11 w-16 shrink-0 place-items-center rounded-xl bg-card text-xs font-bold text-primary">{s.time}</div>
                  <div>
                    <p className="font-semibold text-foreground">{s.subject}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {s.room}</p>
                  </div>
                </div>
              ))}
            </Panel>

            <Panel title="Recent Announcements" icon={Megaphone}>
              {STUDENT_ANNOUNCEMENTS.map((a) => (
                <div key={a.id} className="rounded-xl bg-secondary/60 p-3">
                  <p className="text-sm font-semibold text-foreground">{a.teacher} <span className="font-normal text-muted-foreground">· {a.subject} · {a.time}</span></p>
                  <p className="mt-1 text-sm text-foreground/80">{a.message}</p>
                </div>
              ))}
            </Panel>

            <Panel title="Quick Links" icon={Link2} className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "My Grades", icon: FileCheck2 },
                  { label: "Time Table", icon: Calendar },
                  { label: "Library", icon: BookOpen },
                  { label: "Notifications", icon: Bell },
                ].map((q) => (
                  <button key={q.label} data-testid={`quick-${q.label.toLowerCase().replace(/ /g, "-")}`} onClick={() => portalToast(toast, `${q.label} opened`)} className="flex flex-col items-center gap-2 rounded-2xl border border-border p-4 text-center transition-all hover:-translate-y-0.5 hover:border-primary">
                    <q.icon className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium text-foreground">{q.label}</span>
                  </button>
                ))}
              </div>
            </Panel>
          </TabsContent>

          {/* Assignments */}
          <TabsContent value="assignments" className="mt-6 flex flex-col gap-3" data-testid="student-assignments">
            {assignments.map((a) => (
              <div key={a.id} data-testid={`assignment-${a.id}`} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">{a.subject}</p>
                  <p className="font-semibold text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">Due {a.due}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyle[a.status]}`}>{a.status}</span>
                  <button
                    data-testid={`submit-assignment-${a.id}`}
                    onClick={() => setUploadFor(a)}
                    disabled={a.status === "Submitted"}
                    className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-hover disabled:opacity-40"
                  >
                    <Upload className="h-4 w-4" /> Submit
                  </button>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Tests */}
          <TabsContent value="tests" className="mt-6 flex flex-col gap-3" data-testid="student-tests">
            {STUDENT_TESTS.map((t) => (
              <div key={t.id} data-testid={`test-${t.id}`} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-heading text-lg font-bold text-foreground">{t.subject}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t.date} · {t.duration} · {t.marks} marks</p>
                </div>
                <button
                  data-testid={`start-test-${t.id}`}
                  onClick={() => setWarnTest(t)}
                  className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-hover"
                >
                  <Play className="h-4 w-4" /> Start Test
                </button>
              </div>
            ))}
          </TabsContent>

          {/* Fee & Payments */}
          <TabsContent value="fees" className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]" data-testid="student-fees">
            <div className="flex flex-col gap-6">
              <Panel title="Pending Fees" icon={CreditCard}>
                {STUDENT_FEES.map((f) => (
                  <div key={f.id} className="flex items-center justify-between rounded-xl bg-secondary/60 p-3">
                    <div>
                      <p className="font-semibold text-foreground">{f.item}</p>
                      <p className="text-xs text-muted-foreground">Due {f.due}</p>
                    </div>
                    <p className="font-heading text-lg font-bold text-foreground">${f.amount}</p>
                  </div>
                ))}
              </Panel>

              <Panel title="Payment Methods" icon={Wallet}>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex flex-col items-center gap-2 rounded-2xl border border-border p-4 text-center">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=Usfuturee-Fee-${totalDue}`} alt="QR" className="h-28 w-28 rounded-lg bg-white p-1" data-testid="fee-qr-code" />
                    <span className="flex items-center gap-1 text-xs font-semibold text-foreground"><QrCode className="h-3.5 w-3.5" /> Scan to Pay</span>
                  </div>
                  <button data-testid="bank-transfer" onClick={() => portalToast(toast, "Bank transfer details copied")} className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border p-4 transition-all hover:border-primary">
                    <Landmark className="h-7 w-7 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Bank Transfer</span>
                  </button>
                  <label data-testid="upload-receipt" className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border p-4 transition-all hover:border-primary">
                    <Upload className="h-7 w-7 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Upload Receipt</span>
                    <input type="file" hidden onChange={() => { setFeeStatus("Under Review"); portalToast(toast, "Receipt uploaded — status: Under Review"); }} />
                  </label>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button data-testid="download-statement" onClick={() => portalToast(toast, "Fee statement downloaded")} className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-accent">
                    <Download className="h-4 w-4" /> Download Statement
                  </button>
                  <button data-testid="print-voucher" onClick={() => portalToast(toast, "Voucher sent to printer")} className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-accent">
                    <Printer className="h-4 w-4" /> Print Voucher
                  </button>
                </div>
              </Panel>
            </div>

            {/* Summary */}
            <div className="h-fit rounded-2xl border border-border bg-card p-5" data-testid="fee-summary">
              <h3 className="font-heading text-base font-bold text-foreground">Fee Summary</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Total Due</span><span className="font-heading text-xl font-bold text-foreground">${totalDue}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Due Date</span><span className="font-semibold text-foreground">Jun 20, 2026</span></div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Status</span><span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyle[feeStatus]}`}>{feeStatus}</span></div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload assignment modal */}
      <Dialog open={!!uploadFor} onOpenChange={(o) => !o && setUploadFor(null)}>
        <DialogContent className="rounded-2xl sm:max-w-md" data-testid="upload-assignment-modal">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Submit Assignment</DialogTitle>
            <DialogDescription>{uploadFor?.title}</DialogDescription>
          </DialogHeader>
          <label className="flex h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border text-muted-foreground transition-all hover:border-primary hover:text-primary">
            <Upload className="h-7 w-7" />
            <span className="text-sm font-medium">Click to upload your file</span>
            <input type="file" hidden data-testid="assignment-file-input" />
          </label>
          <button data-testid="confirm-submit-assignment" onClick={submitAssignment} className="h-11 rounded-full bg-primary font-semibold text-primary-foreground transition-all hover:bg-primary-hover">Submit Assignment</button>
        </DialogContent>
      </Dialog>

      {/* Test security warning */}
      <Dialog open={!!warnTest} onOpenChange={(o) => !o && setWarnTest(null)}>
        <DialogContent className="rounded-2xl sm:max-w-md" data-testid="test-warning-modal">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-heading text-xl text-amber-600 dark:text-amber-400">
              <ShieldAlert className="h-5 w-5" /> Secure Test Warning
            </DialogTitle>
            <DialogDescription>Please read before you begin.</DialogDescription>
          </DialogHeader>
          <p className="rounded-2xl bg-amber-500/10 p-4 text-sm font-medium text-amber-700 dark:text-amber-400">
            This test will lock your browser. Tab switching will end the test automatically. Right-click is disabled during the test.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setWarnTest(null)} className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-accent">Cancel</button>
            <button
              data-testid="confirm-start-test"
              onClick={() => { setActiveTest(warnTest); setWarnTest(null); }}
              className="flex-1 rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-hover"
            >
              Confirm & Start
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {activeTest && <TestRunner test={activeTest} onExit={() => setActiveTest(null)} />}
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
