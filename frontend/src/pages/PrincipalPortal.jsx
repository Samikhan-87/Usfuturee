import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { StatCard, portalToast } from "@/components/PortalStat";
import {
  PRINCIPAL_STUDENTS, PRINCIPAL_TEACHERS, PRINCIPAL_ADMISSIONS, PRINCIPAL_FEE_CLASSES,
} from "@/utils/mockData";
import {
  Users, GraduationCap, UserPlus, DollarSign, Check, X, AlertTriangle, Save,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

const feeStatusStyle = {
  Paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Overdue: "bg-destructive/10 text-destructive",
};

export default function PrincipalPortal() {
  const [admissions, setAdmissions] = useState(PRINCIPAL_ADMISSIONS);
  const [students, setStudents] = useState(PRINCIPAL_STUDENTS);
  const [fees, setFees] = useState(PRINCIPAL_FEE_CLASSES);
  const [editingId, setEditingId] = useState(null);
  const [editAmt, setEditAmt] = useState("");

  const decide = (id, decision) => {
    const a = admissions.find((x) => x.id === id);
    setAdmissions((arr) => arr.map((x) => (x.id === id ? { ...x, status: decision } : x)));
    if (decision === "Approved") {
      console.log(`[Email] Admission approved for ${a.name} → notify@usfuturee.com`);
      portalToast(toast, `Approved · email sent to ${a.name}`);
    } else {
      portalToast(toast, `Rejected · ${a.name}`);
    }
  };

  const markPaid = (sid) => {
    setStudents((arr) => arr.map((s) => (s.id === sid ? { ...s, feeStatus: "Paid" } : s)));
    portalToast(toast, "Fee marked as Paid");
  };

  const saveFee = (id) => {
    const v = Number(editAmt);
    if (!v) return;
    setFees((arr) => arr.map((f) => (f.id === id ? { ...f, amount: v } : f)));
    portalToast(toast, "Fee amount updated");
    setEditingId(null);
  };

  const pendingCount = admissions.filter((a) => a.status === "Pending").length;
  const overdueStudents = students.filter((s) => s.feeStatus === "Overdue").length;

  return (
    <MainLayout showRight={false}>
      <div data-testid="principal-portal" className="flex flex-col gap-6">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Principal Portal</h1>
          <p className="mt-1 text-muted-foreground">Institution overview, admissions and fee management.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={Users} label="Total Students" value={String(students.length * 84)} />
          <StatCard icon={GraduationCap} label="Total Teachers" value={String(PRINCIPAL_TEACHERS.length * 6)} accent="bg-violet-500/10 text-violet-500" />
          <StatCard icon={UserPlus} label="Pending Admissions" value={String(pendingCount)} accent="bg-amber-500/10 text-amber-500" />
          <StatCard icon={DollarSign} label="Revenue (Month)" value="$184k" accent="bg-emerald-500/10 text-emerald-500" />
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="flex w-full flex-wrap justify-start gap-1 rounded-2xl bg-card p-1" data-testid="principal-tabs">
            {[
              { v: "dashboard", l: "Dashboard" },
              { v: "students", l: "Students" },
              { v: "teachers", l: "Teachers" },
              { v: "admissions", l: "Admissions" },
              { v: "fees", l: "Fee Management" },
            ].map((t) => (
              <TabsTrigger key={t.v} value={t.v} data-testid={`principal-tab-${t.v}`}
                className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t.l}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="mt-6 grid gap-6 lg:grid-cols-2" data-testid="principal-dashboard">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-heading text-base font-bold text-foreground">Pending Admissions</h3>
              <p className="mt-2 font-heading text-5xl font-black text-primary">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">Awaiting your review</p>
            </div>
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
              <h3 className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
                <AlertTriangle className="h-4 w-4 text-amber-500" /> Fee Alerts
              </h3>
              <p className="mt-2 font-heading text-5xl font-black text-amber-600">{overdueStudents}</p>
              <p className="text-xs text-muted-foreground">Students with overdue fees · fine applied</p>
            </div>
          </TabsContent>

          {/* Students */}
          <TabsContent value="students" className="mt-6" data-testid="principal-students">
            <Table headers={["Name", "Class", "Fee Status", "Actions"]}>
              {students.map((s) => (
                <tr key={s.id} data-testid={`student-row-${s.id}`} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold text-foreground">{s.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.grade}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-3 py-1 text-xs font-bold ${feeStatusStyle[s.feeStatus]}`}>{s.feeStatus}</span></td>
                  <td className="px-4 py-3">
                    {s.feeStatus !== "Paid" && (
                      <button data-testid={`mark-paid-${s.id}`} onClick={() => markPaid(s.id)}
                        className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20">
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </Table>
          </TabsContent>

          {/* Teachers */}
          <TabsContent value="teachers" className="mt-6" data-testid="principal-teachers">
            <Table headers={["Name", "Subject", "Actions"]}>
              {PRINCIPAL_TEACHERS.map((t) => (
                <tr key={t.id} data-testid={`teacher-row-${t.id}`} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold text-foreground">{t.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.subject}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => portalToast(toast, `Opening profile of ${t.name}`)}
                      className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground hover:bg-accent">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </Table>
          </TabsContent>

          {/* Admissions */}
          <TabsContent value="admissions" className="mt-6 flex flex-col gap-3" data-testid="principal-admissions">
            {admissions.map((a) => (
              <div key={a.id} data-testid={`admission-${a.id}`}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-foreground">{a.name}</p>
                  <p className="text-xs text-muted-foreground">Applied for {a.classApplied} · {a.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                    a.status === "Approved" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : a.status === "Rejected" ? "bg-destructive/10 text-destructive"
                      : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  }`}>{a.status}</span>
                  {a.status === "Pending" && (
                    <>
                      <button data-testid={`approve-${a.id}`} onClick={() => decide(a.id, "Approved")}
                        className="flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600">
                        <Check className="h-3.5 w-3.5" /> Approve
                      </button>
                      <button data-testid={`reject-${a.id}`} onClick={() => decide(a.id, "Rejected")}
                        className="flex items-center gap-1 rounded-full bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground hover:opacity-90">
                        <X className="h-3.5 w-3.5" /> Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Fees */}
          <TabsContent value="fees" className="mt-6 grid gap-6 lg:grid-cols-2" data-testid="principal-fees">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-4 font-heading text-base font-bold text-foreground">Set Fee per Class</h3>
              <div className="flex flex-col gap-2">
                {fees.map((f) => (
                  <div key={f.id} data-testid={`fee-class-${f.id}`} className="flex items-center justify-between rounded-xl bg-secondary/60 p-3">
                    <p className="font-semibold text-foreground">{f.grade}</p>
                    {editingId === f.id ? (
                      <div className="flex items-center gap-2">
                        <input value={editAmt} onChange={(e) => setEditAmt(e.target.value)}
                          type="number" inputMode="numeric"
                          data-testid={`fee-input-${f.id}`}
                          className="h-9 w-24 rounded-lg border border-border bg-background px-2 text-sm font-semibold text-foreground outline-none focus:border-primary" />
                        <button data-testid={`fee-save-${f.id}`} onClick={() => saveFee(f.id)}
                          className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover">
                          <Save className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <p className="font-heading text-lg font-bold text-foreground">${f.amount}</p>
                        <button data-testid={`fee-edit-${f.id}`} onClick={() => { setEditingId(f.id); setEditAmt(String(f.amount)); }}
                          className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground hover:bg-accent">
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-4 font-heading text-base font-bold text-foreground">Fee Status Overview</h3>
              <div className="flex flex-col gap-2">
                {students.map((s) => (
                  <div key={s.id} className="flex items-center justify-between rounded-xl bg-secondary/60 p-3">
                    <div>
                      <p className="font-semibold text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.grade}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${feeStatusStyle[s.feeStatus]}`}>{s.feeStatus}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">
                <AlertTriangle className="mr-1 inline h-3 w-3" /> Fines auto-add for overdue fees past due date.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

const Table = ({ headers, children }) => (
  <div className="overflow-x-auto rounded-2xl border border-border bg-card">
    <table className="w-full min-w-[500px] text-left text-sm">
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);
