import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { StatCard, portalToast } from "@/components/PortalStat";
import {
  PRINCIPAL_STUDENTS, PRINCIPAL_TEACHERS, PRINCIPAL_ADMISSIONS,
  PRINCIPAL_FEE_CLASSES, PRINCIPAL_FEE_RECEIPTS, PRINCIPAL_ANNOUNCEMENTS_SENT,
  INSTITUTION, EVENTS_UPCOMING,
} from "@/utils/mockData";
import {
  Users, BookOpen, ClipboardList, DollarSign, FileCheck2, Building2,
  Plus, Pencil, Trash2, Eye, Check, X, ChevronRight, Bell,
  Upload, Download, BadgeCheck, MapPin, Mail, Phone, Globe,
  Settings, AlertTriangle, Calendar, Megaphone, Image as ImageIcon,
  TrendingUp, UserPlus,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const statusStyle = {
  Paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Under Review": "bg-primary/10 text-primary",
  Overdue: "bg-destructive/10 text-destructive",
  Approved: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Rejected: "bg-destructive/10 text-destructive",
};

const Panel = ({ title, icon: Icon, children, className = "", action }) => (
  <div className={`rounded-2xl border border-border bg-card p-5 ${className}`}>
    <div className="mb-4 flex items-center justify-between">
      <h3 className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
        <Icon className="h-4 w-4 text-primary" /> {title}
      </h3>
      {action}
    </div>
    <div className="flex flex-col gap-3">{children}</div>
  </div>
);

export default function PrincipalPortal() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(PRINCIPAL_STUDENTS);
  const [teachers, setTeachers] = useState(PRINCIPAL_TEACHERS);
  const [admissions, setAdmissions] = useState(PRINCIPAL_ADMISSIONS);
  const [feeClasses, setFeeClasses] = useState(PRINCIPAL_FEE_CLASSES);
  const [receipts, setReceipts] = useState(PRINCIPAL_FEE_RECEIPTS);
  const [announcements, setAnnouncements] = useState(PRINCIPAL_ANNOUNCEMENTS_SENT);
  const [institution, setInstitution] = useState(INSTITUTION);

  // Modals
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [addTeacherOpen, setAddTeacherOpen] = useState(false);
  const [admissionDetailId, setAdmissionDetailId] = useState(null);
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [fineModal, setFineModal] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(false);
  const [admissionTab, setAdmissionTab] = useState("Pending");

  // Forms
  const [studentForm, setStudentForm] = useState({ name: "", email: "", grade: "", parentName: "", parentContact: "" });
  const [teacherForm, setTeacherForm] = useState({ name: "", email: "", subject: "", qualification: "" });
  const [fineSettings, setFineSettings] = useState({ finePerDay: 15, gracePeriod: 5 });
  const [announcementForm, setAnnouncementForm] = useState({ title: "", message: "", target: "All" });
  const [instForm, setInstForm] = useState({ name: institution.name, tagline: institution.tagline, message: institution.message, location: institution.location, email: institution.email, phone: institution.phone, website: institution.website });

  const addStudent = () => {
    if (!studentForm.name || !studentForm.email || !studentForm.grade) {
      toast.error("Please fill in name, email, and grade.");
      return;
    }
    const tempPassword = "Temp@" + Math.random().toString(36).slice(2, 8);
    console.log(`[EMAIL] Sending credentials to ${studentForm.email} — Password: ${tempPassword}`);
    setStudents((s) => [...s, { id: "ps_" + Date.now(), ...studentForm, feeStatus: "Pending", joinDate: "Jun 2026", avatar: "https://images.pexels.com/photos/6338370/pexels-photo-6338370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200" }]);
    toast.success(`Student "${studentForm.name}" added. Credentials sent! (see console)`);
    setStudentForm({ name: "", email: "", grade: "", parentName: "", parentContact: "" });
    setAddStudentOpen(false);
  };

  const removeStudent = (id, name) => {
    setStudents((s) => s.filter((x) => x.id !== id));
    portalToast(toast, `${name} removed from institution.`);
  };

  const addTeacher = () => {
    if (!teacherForm.name || !teacherForm.email || !teacherForm.subject) {
      toast.error("Please fill in name, email, and subject.");
      return;
    }
    const tempPassword = "Temp@" + Math.random().toString(36).slice(2, 8);
    console.log(`[EMAIL] Sending credentials to ${teacherForm.email} — Password: ${tempPassword}`);
    setTeachers((t) => [...t, { id: "pt_" + Date.now(), ...teacherForm, joinDate: "Jun 2026", avatar: "https://images.pexels.com/photos/6338370/pexels-photo-6338370.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200", courses: [], students: 0 }]);
    toast.success(`Teacher "${teacherForm.name}" added. Credentials sent! (see console)`);
    setTeacherForm({ name: "", email: "", subject: "", qualification: "" });
    setAddTeacherOpen(false);
  };

  const removeTeacher = (id, name) => {
    setTeachers((t) => t.filter((x) => x.id !== id));
    portalToast(toast, `${name} removed from institution.`);
  };

  const approveAdmission = (id) => {
    setAdmissions((a) => a.map((x) => x.id === id ? { ...x, status: "Approved" } : x));
    const app = admissions.find((x) => x.id === id);
    console.log(`[EMAIL] Admission approved for ${app?.name}. Welcome message + classroom info sent.`);
    toast.success(`${app?.name} admitted! Welcome email sent (see console).`);
  };

  const confirmReject = () => {
    if (!rejectReason.trim()) { toast.error("Please provide a rejection reason."); return; }
    setAdmissions((a) => a.map((x) => x.id === rejectModal ? { ...x, status: "Rejected", rejectReason } : x));
    const app = admissions.find((x) => x.id === rejectModal);
    console.log(`[EMAIL] Rejection email sent to ${app?.email} — Reason: ${rejectReason}`);
    toast.info("Application rejected. Email sent (see console).");
    setRejectModal(null);
    setRejectReason("");
  };

  const markPaid = (id, name) => {
    setReceipts((r) => r.map((x) => x.id === id ? { ...x, status: "Paid", receiptUrl: null } : x));
    portalToast(toast, `${name}'s fee marked as Paid.`);
  };

  const sendAnnouncement = () => {
    if (!announcementForm.title.trim() || !announcementForm.message.trim()) {
      toast.error("Please fill in title and message.");
      return;
    }
    setAnnouncements((a) => [{ id: "pa_" + Date.now(), ...announcementForm, date: "Jun 7, 2026" }, ...a]);
    portalToast(toast, `Announcement sent to ${announcementForm.target}!`);
    setAnnouncementForm({ title: "", message: "", target: "All" });
    setAnnouncementOpen(false);
  };

  const saveInstitution = () => {
    setInstitution((i) => ({ ...i, ...instForm }));
    portalToast(toast, "Institution profile updated!");
  };

  const admissionDetail = admissions.find((a) => a.id === admissionDetailId);
  const pendingAdmissions = admissions.filter((a) => a.status === "Pending").length;
  const pendingReceipts = receipts.filter((r) => r.status === "Under Review").length;
  const monthlyRevenue = receipts.filter((r) => r.status === "Paid").reduce((s, r) => s + r.amount, 0);

  return (
    <MainLayout showRight={false}>
      <div data-testid="principal-portal" className="flex flex-col gap-6">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Principal Portal</h1>
          <p className="mt-1 text-muted-foreground">Manage your institution — students, teachers, fees, and more.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <StatCard icon={Users} label="Total Students" value={students.length} />
          <StatCard icon={BookOpen} label="Total Teachers" value={teachers.length} accent="bg-emerald-500/10 text-emerald-500" />
          <StatCard icon={ClipboardList} label="Pending Admissions" value={pendingAdmissions} accent="bg-amber-500/10 text-amber-500" />
          <StatCard icon={TrendingUp} label="Monthly Revenue" value={`$${monthlyRevenue.toLocaleString()}`} accent="bg-violet-500/10 text-violet-500" />
          <StatCard icon={FileCheck2} label="Pending Receipts" value={pendingReceipts} accent="bg-destructive/10 text-destructive" />
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="flex w-full flex-wrap justify-start gap-1 rounded-2xl bg-card p-1" data-testid="principal-tabs">
            {["dashboard", "institution", "students", "teachers", "admissions", "fees", "events", "announcements", "settings"].map((t) => (
              <TabsTrigger key={t} value={t} data-testid={`principal-tab-${t}`}
                className="rounded-xl capitalize text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── DASHBOARD ── */}
          <TabsContent value="dashboard" className="mt-6 grid gap-6 lg:grid-cols-2" data-testid="principal-dashboard">
            <Panel title="Recent Activity" icon={Bell}>
              {[
                { msg: `${admissions.find(a => a.status === "Pending")?.name || "Sophie Turner"} submitted an admission application`, time: "2h" },
                { msg: "Emma Davis uploaded a fee receipt — Under Review", time: "4h" },
                { msg: "Staff meeting rescheduled to Thursday 4 PM", time: "5h" },
                { msg: "Priya Sharma's fee is now overdue (+15 days)", time: "1d" },
                { msg: "David Okafor uploaded Physics test results", time: "2d" },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-secondary/60 p-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm text-foreground">{a.msg}</p>
                    <p className="text-xs text-muted-foreground">{a.time} ago</p>
                  </div>
                </div>
              ))}
            </Panel>

            <Panel title="Fee Overview" icon={DollarSign}>
              {[
                { label: "Paid", count: receipts.filter(r => r.status === "Paid").length, color: "bg-emerald-500" },
                { label: "Pending", count: receipts.filter(r => r.status === "Pending").length, color: "bg-amber-500" },
                { label: "Under Review", count: receipts.filter(r => r.status === "Under Review").length, color: "bg-primary" },
                { label: "Overdue", count: receipts.filter(r => r.status === "Overdue").length, color: "bg-destructive" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between rounded-xl bg-secondary/60 p-3">
                  <div className="flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-full ${s.color}`} />
                    <span className="text-sm font-medium text-foreground">{s.label}</span>
                  </div>
                  <span className="font-heading text-lg font-bold text-foreground">{s.count}</span>
                </div>
              ))}
              <div className="mt-2 rounded-xl bg-primary/10 p-3 text-center">
                <p className="text-xs text-muted-foreground">Monthly Revenue</p>
                <p className="font-heading text-2xl font-black text-primary">${monthlyRevenue.toLocaleString()}</p>
              </div>
            </Panel>

            <Panel title="Pending Admissions" icon={UserPlus} className="lg:col-span-2"
              action={<span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600">{pendingAdmissions} pending</span>}>
              {admissions.filter(a => a.status === "Pending").slice(0, 3).map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-xl bg-secondary/60 p-3">
                  <div>
                    <p className="font-semibold text-foreground">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.classApplied} · {a.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => approveAdmission(a.id)}
                      className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600 transition-all hover:bg-emerald-500 hover:text-white">
                      <Check className="h-3 w-3" /> Approve
                    </button>
                    <button onClick={() => setRejectModal(a.id)}
                      className="flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive transition-all hover:bg-destructive hover:text-white">
                      <X className="h-3 w-3" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </Panel>
          </TabsContent>

          {/* ── MY INSTITUTION ── */}
          <TabsContent value="institution" className="mt-6 flex flex-col gap-6" data-testid="principal-institution">
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative h-40">
                <img src={institution.banner} alt="cover" className="h-full w-full object-cover" />
                <label className="absolute bottom-3 right-3 flex cursor-pointer items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white hover:bg-black/80">
                  <ImageIcon className="h-4 w-4" /> Change Cover
                  <input type="file" accept="image/*" hidden onChange={() => portalToast(toast, "Cover updated!")} />
                </label>
              </div>
              <div className="flex items-end gap-4 px-6 pb-5">
                <div className="-mt-10 relative">
                  <img src={institution.avatar} alt="logo" className="h-20 w-20 rounded-2xl border-4 border-card object-cover" />
                  <label className="absolute -bottom-1 -right-1 grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-primary text-white hover:bg-primary/80">
                    <Pencil className="h-3.5 w-3.5" />
                    <input type="file" accept="image/*" hidden onChange={() => portalToast(toast, "Logo updated!")} />
                  </label>
                </div>
                <div className="pb-1">
                  <p className="flex items-center gap-1.5 font-heading text-xl font-bold text-foreground">
                    {institution.name}
                    {institution.verified && <BadgeCheck className="h-5 w-5 fill-primary text-card" />}
                  </p>
                  <p className="text-sm text-muted-foreground">{institution.tagline}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="flex flex-col gap-4">
                {[
                  { label: "Institution Name", key: "name", placeholder: "Enter institution name" },
                  { label: "Tagline", key: "tagline", placeholder: "Enter tagline" },
                  { label: "Location", key: "location", placeholder: "Full address" },
                  { label: "Contact Email", key: "email", placeholder: "contact@school.edu" },
                  { label: "Phone", key: "phone", placeholder: "+1 (555) 000-0000" },
                  { label: "Website", key: "website", placeholder: "www.yourschool.edu" },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</label>
                    <input value={instForm[key]} onChange={(e) => setInstForm({ ...instForm, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="h-11 w-full rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Custom Admission Message</label>
                  <textarea value={instForm.message} onChange={(e) => setInstForm({ ...instForm, message: e.target.value })}
                    rows={5} placeholder="Message shown to students after admission approval..."
                    className="w-full resize-none rounded-2xl border border-border bg-input p-4 text-foreground outline-none ring-primary focus:ring-2" />
                </div>

                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="mb-3 font-heading text-sm font-bold text-foreground">Book List</p>
                  {institution.books.map((b) => (
                    <div key={b.id} className="mb-2 flex items-center gap-3 rounded-xl bg-secondary/60 p-2">
                      <img src={b.img} alt={b.title} className="h-10 w-10 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{b.title}</p>
                        <p className="text-xs text-muted-foreground">{b.subject} · ${b.price}</p>
                      </div>
                      <button onClick={() => portalToast(toast, "Book removed")} className="text-destructive hover:text-destructive/80"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                  <button onClick={() => portalToast(toast, "Add book form coming soon")}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-2 text-sm font-semibold text-primary hover:bg-accent">
                    <Plus className="h-4 w-4" /> Add Book
                  </button>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="mb-3 font-heading text-sm font-bold text-foreground">Uniform Info</p>
                  {institution.uniforms.map((u) => (
                    <div key={u.id} className="mb-2 flex items-center gap-3 rounded-xl bg-secondary/60 p-2">
                      <img src={u.img} alt={u.label} className="h-10 w-10 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{u.label}</p>
                        <p className="text-xs text-muted-foreground">{u.desc}</p>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => portalToast(toast, "Add uniform form coming soon")}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-2 text-sm font-semibold text-primary hover:bg-accent">
                    <Plus className="h-4 w-4" /> Add Uniform
                  </button>
                </div>
              </div>
            </div>
            <button onClick={saveInstitution}
              className="self-start rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90">
              Save Changes
            </button>
          </TabsContent>

          {/* ── STUDENTS ── */}
          <TabsContent value="students" className="mt-6 flex flex-col gap-4" data-testid="principal-students">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{students.length} students enrolled</p>
              <button onClick={() => setAddStudentOpen(true)} data-testid="add-student-button"
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90">
                <UserPlus className="h-4 w-4" /> Add Student
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-secondary/40">
                  <tr>
                    {["Student", "Class", "Fee Status", "Joined", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.id} data-testid={`student-row-${s.id}`}
                      onClick={() => navigate(`/portal/students/${s.id}`)}
                      className="cursor-pointer border-b border-border/50 transition-all hover:bg-secondary/40">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={s.avatar} alt={s.name} className="h-9 w-9 rounded-full object-cover" />
                          <div>
                            <p className="font-semibold text-foreground">{s.name}</p>
                            <p className="text-xs text-muted-foreground">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-foreground">{s.grade}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusStyle[s.feeStatus]}`}>{s.feeStatus}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{s.joinDate}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => navigate(`/portal/students/${s.id}`)} className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground hover:bg-accent"><Eye className="h-4 w-4" /></button>
                          <button onClick={() => removeStudent(s.id, s.name)} className="grid h-8 w-8 place-items-center rounded-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-white"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* ── TEACHERS ── */}
          <TabsContent value="teachers" className="mt-6 flex flex-col gap-4" data-testid="principal-teachers">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{teachers.length} teachers</p>
              <button onClick={() => setAddTeacherOpen(true)} data-testid="add-teacher-button"
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90">
                <UserPlus className="h-4 w-4" /> Add Teacher
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-secondary/40">
                  <tr>
                    {["Teacher", "Subject", "Qualification", "Joined", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((t) => (
                    <tr key={t.id} data-testid={`teacher-row-${t.id}`}
                      onClick={() => navigate(`/portal/teachers/${t.id}`)}
                      className="cursor-pointer border-b border-border/50 transition-all hover:bg-secondary/40">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={t.avatar} alt={t.name} className="h-9 w-9 rounded-full object-cover" />
                          <div>
                            <p className="font-semibold text-foreground">{t.name}</p>
                            <p className="text-xs text-muted-foreground">{t.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-foreground">{t.subject}</td>
                      <td className="px-4 py-3 text-muted-foreground">{t.qualification}</td>
                      <td className="px-4 py-3 text-muted-foreground">{t.joinDate}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => navigate(`/portal/teachers/${t.id}`)} className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-foreground hover:bg-accent"><Eye className="h-4 w-4" /></button>
                          <button onClick={() => removeTeacher(t.id, t.name)} className="grid h-8 w-8 place-items-center rounded-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-white"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* ── ADMISSIONS ── */}
          <TabsContent value="admissions" className="mt-6 flex flex-col gap-4" data-testid="principal-admissions">
            <div className="flex gap-2">
              {["Pending", "Approved", "Rejected"].map((tab) => (
                <button key={tab} onClick={() => setAdmissionTab(tab)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${admissionTab === tab ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}>
                  {tab} ({admissions.filter(a => a.status === tab).length})
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {admissions.filter((a) => a.status === admissionTab).map((a) => (
                <div key={a.id} data-testid={`admission-${a.id}`}
                  className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-heading text-base font-bold text-foreground">{a.name}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{a.classApplied} · Applied {a.date}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">Parent: {a.parentName} · {a.parentContact}</p>
                      <p className="mt-1 text-sm text-foreground">{a.reason}</p>
                      {a.rejectReason && <p className="mt-1 text-sm text-destructive">Rejection reason: {a.rejectReason}</p>}
                    </div>
                    {a.status === "Pending" && (
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => setAdmissionDetailId(a.id)} className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-accent"><Eye className="h-4 w-4" /> View</button>
                        <button onClick={() => approveAdmission(a.id)} className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-500 hover:text-white"><Check className="h-4 w-4" /> Approve</button>
                        <button onClick={() => setRejectModal(a.id)} className="flex items-center gap-1.5 rounded-full bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive hover:text-white"><X className="h-4 w-4" /> Reject</button>
                      </div>
                    )}
                    {a.status !== "Pending" && (
                      <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${statusStyle[a.status]}`}>{a.status}</span>
                    )}
                  </div>
                </div>
              ))}
              {admissions.filter((a) => a.status === admissionTab).length === 0 && (
                <p className="rounded-2xl border border-dashed border-border py-10 text-center text-muted-foreground">No {admissionTab.toLowerCase()} applications.</p>
              )}
            </div>
          </TabsContent>

          {/* ── FEE MANAGEMENT ── */}
          <TabsContent value="fees" className="mt-6 flex flex-col gap-6" data-testid="principal-fees">
            {/* Fee structure */}
            <Panel title="Fee Structure per Class" icon={DollarSign}
              action={<button onClick={() => setFineModal(true)} className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground hover:bg-accent"><Settings className="h-3.5 w-3.5" /> Fine Settings</button>}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      {["Class", "Tuition", "Exam Fee", "Other", "Total"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {feeClasses.map((fc) => (
                      <tr key={fc.id} className="border-b border-border/50">
                        <td className="px-3 py-3 font-semibold text-foreground">{fc.grade}</td>
                        <td className="px-3 py-3 text-foreground">${fc.tuition}</td>
                        <td className="px-3 py-3 text-foreground">${fc.exam}</td>
                        <td className="px-3 py-3 text-foreground">${fc.other}</td>
                        <td className="px-3 py-3 font-bold text-primary">${fc.tuition + fc.exam + fc.other}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Late fine: ${fineSettings.finePerDay}/day after {fineSettings.gracePeriod}-day grace period.</p>
            </Panel>

            {/* Student fee status */}
            <Panel title="All Students Fee Status" icon={FileCheck2}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      {["Student", "Class", "Amount Due", "Due Date", "Status", "Receipt", "Actions"].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {receipts.map((r) => (
                      <tr key={r.id} className="border-b border-border/50">
                        <td className="px-3 py-3 font-semibold text-foreground">{r.studentName}</td>
                        <td className="px-3 py-3 text-foreground">{r.grade}</td>
                        <td className="px-3 py-3 font-bold text-foreground">${r.amount.toLocaleString()}</td>
                        <td className="px-3 py-3 text-muted-foreground">{r.dueDate}</td>
                        <td className="px-3 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusStyle[r.status]}`}>{r.status}</span>
                        </td>
                        <td className="px-3 py-3">
                          {r.receiptUrl
                            ? <button onClick={() => portalToast(toast, `Viewing ${r.receiptUrl}`)} className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"><Eye className="h-3.5 w-3.5" /> View</button>
                            : <span className="text-xs text-muted-foreground">—</span>}
                        </td>
                        <td className="px-3 py-3">
                          {r.status === "Under Review" && (
                            <button onClick={() => markPaid(r.id, r.studentName)}
                              className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600 hover:bg-emerald-500 hover:text-white">
                              <Check className="h-3 w-3" /> Mark Paid
                            </button>
                          )}
                          {r.status === "Paid" && <span className="text-xs text-muted-foreground">—</span>}
                          {(r.status === "Pending" || r.status === "Overdue") && (
                            <button onClick={() => portalToast(toast, `Fee voucher generated for ${r.studentName}`)}
                              className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent">
                              <Download className="h-3 w-3" /> Voucher
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </TabsContent>

          {/* ── EVENTS ── */}
          <TabsContent value="events" className="mt-6 flex flex-col gap-4" data-testid="principal-events">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">You can create events visible to all students and teachers.</p>
              <button onClick={() => navigate("/events")}
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90">
                <Plus className="h-4 w-4" /> Create Event
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {EVENTS_UPCOMING.map((ev) => (
                <div key={ev.id} data-testid={`principal-event-${ev.id}`}
                  onClick={() => navigate(`/events/${ev.id}`)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1">
                  <img src={ev.cover} alt={ev.title} className="h-32 w-full object-cover transition-transform group-hover:scale-105" />
                  <div className="p-4">
                    <p className="font-heading font-bold text-foreground">{ev.title}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar className="h-3.5 w-3.5" /> {ev.date} · {ev.time}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {ev.location}</p>
                    <div className="mt-3 flex gap-2">
                      <button onClick={(e) => { e.stopPropagation(); portalToast(toast, "Event updated!"); }}
                        className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent">
                        <Pencil className="h-3 w-3" /> Edit
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); portalToast(toast, "Event deleted."); }}
                        className="flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive hover:text-white">
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ── ANNOUNCEMENTS ── */}
          <TabsContent value="announcements" className="mt-6 flex flex-col gap-4" data-testid="principal-announcements">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Send announcements to students and teachers.</p>
              <button onClick={() => setAnnouncementOpen(true)} data-testid="create-announcement-button"
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90">
                <Megaphone className="h-4 w-4" /> New Announcement
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {announcements.map((a) => (
                <div key={a.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-heading font-bold text-foreground">{a.title}</p>
                      <p className="mt-1 text-sm text-foreground">{a.message}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{a.target}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{a.date}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ── SETTINGS ── */}
          <TabsContent value="settings" className="mt-6 flex flex-col gap-4" data-testid="principal-settings">
            <Panel title="Account Settings" icon={Settings}>
              {[
                { label: "Institution Email", placeholder: "institution@email.com" },
                { label: "New Password", placeholder: "Enter new password", type: "password" },
                { label: "Confirm Password", placeholder: "Confirm new password", type: "password" },
              ].map(({ label, placeholder, type = "text" }) => (
                <div key={label}>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</label>
                  <input type={type} placeholder={placeholder}
                    className="h-11 w-full rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
                </div>
              ))}
              <button onClick={() => portalToast(toast, "Settings saved!")}
                className="self-start rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90">
                Save Changes
              </button>
            </Panel>

            <div className="rounded-2xl border-2 border-destructive/30 bg-card p-5">
              <h3 className="flex items-center gap-2 font-heading text-base font-bold text-destructive">
                <AlertTriangle className="h-4 w-4" /> Danger Zone
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">Deactivating your institution account will remove all data and cannot be undone.</p>
              <button onClick={() => toast.error("This action is irreversible. Contact support to deactivate.")}
                className="mt-4 rounded-full border-2 border-destructive px-5 py-2 text-sm font-semibold text-destructive transition-all hover:bg-destructive hover:text-white">
                Deactivate Institution Account
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Student Modal */}
      <Dialog open={addStudentOpen} onOpenChange={setAddStudentOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md" data-testid="add-student-modal">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Add New Student</DialogTitle>
            <DialogDescription>A temporary password will be generated and logged to console.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            {[
              { label: "Full Name", key: "name", placeholder: "Student full name" },
              { label: "Email Address", key: "email", placeholder: "student@email.com" },
              { label: "Parent Name", key: "parentName", placeholder: "Parent/guardian name" },
              { label: "Parent Contact", key: "parentContact", placeholder: "+1 555-000-0000" },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</label>
                <input value={studentForm[key]} onChange={(e) => setStudentForm({ ...studentForm, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="h-11 w-full rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
              </div>
            ))}
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Class/Grade</label>
              <Select value={studentForm.grade} onValueChange={(v) => setStudentForm({ ...studentForm, grade: v })}>
                <SelectTrigger className="h-11 rounded-2xl border-border bg-input"><SelectValue placeholder="Select grade" /></SelectTrigger>
                <SelectContent>
                  {["Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <button onClick={addStudent} data-testid="confirm-add-student"
              className="mt-2 h-11 rounded-full bg-primary font-semibold text-primary-foreground transition-all hover:bg-primary/90">
              Add Student & Send Credentials
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Teacher Modal */}
      <Dialog open={addTeacherOpen} onOpenChange={setAddTeacherOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md" data-testid="add-teacher-modal">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Add New Teacher</DialogTitle>
            <DialogDescription>A temporary password will be generated and logged to console.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            {[
              { label: "Full Name", key: "name", placeholder: "Teacher full name" },
              { label: "Email Address", key: "email", placeholder: "teacher@email.com" },
              { label: "Subject", key: "subject", placeholder: "e.g. Mathematics" },
              { label: "Qualification", key: "qualification", placeholder: "e.g. M.Sc. Mathematics" },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</label>
                <input value={teacherForm[key]} onChange={(e) => setTeacherForm({ ...teacherForm, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="h-11 w-full rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
              </div>
            ))}
            <button onClick={addTeacher} data-testid="confirm-add-teacher"
              className="mt-2 h-11 rounded-full bg-primary font-semibold text-primary-foreground transition-all hover:bg-primary/90">
              Add Teacher & Send Credentials
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Admission Detail Modal */}
      <Dialog open={!!admissionDetail} onOpenChange={(o) => !o && setAdmissionDetailId(null)}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Admission Application</DialogTitle>
            <DialogDescription>Full application details</DialogDescription>
          </DialogHeader>
          {admissionDetail && (
            <div className="flex flex-col gap-3 text-sm">
              {[
                { label: "Student Name", value: admissionDetail.name },
                { label: "Class Applied For", value: admissionDetail.classApplied },
                { label: "Email", value: admissionDetail.email },
                { label: "Parent Name", value: admissionDetail.parentName },
                { label: "Parent Contact", value: admissionDetail.parentContact },
                { label: "Date Submitted", value: admissionDetail.date },
                { label: "Reason", value: admissionDetail.reason },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between rounded-xl bg-secondary/60 px-3 py-2">
                  <span className="font-bold text-muted-foreground">{label}</span>
                  <span className="font-semibold text-foreground">{value}</span>
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <button onClick={() => { approveAdmission(admissionDetail.id); setAdmissionDetailId(null); }}
                  className="flex-1 rounded-full bg-emerald-500/10 py-2.5 text-sm font-bold text-emerald-600 hover:bg-emerald-500 hover:text-white">
                  <Check className="mr-1 inline h-4 w-4" /> Approve
                </button>
                <button onClick={() => { setAdmissionDetailId(null); setRejectModal(admissionDetail.id); }}
                  className="flex-1 rounded-full bg-destructive/10 py-2.5 text-sm font-bold text-destructive hover:bg-destructive hover:text-white">
                  <X className="mr-1 inline h-4 w-4" /> Reject
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={!!rejectModal} onOpenChange={(o) => !o && setRejectModal(null)}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-destructive">Reject Application</DialogTitle>
            <DialogDescription>Provide a reason — it will be sent to the applicant.</DialogDescription>
          </DialogHeader>
          <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Reason for rejection..."
            rows={4}
            className="w-full resize-none rounded-2xl border border-border bg-input p-4 text-foreground outline-none ring-primary focus:ring-2" />
          <div className="flex gap-3">
            <button onClick={() => setRejectModal(null)} className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold text-foreground hover:bg-accent">Cancel</button>
            <button onClick={confirmReject} className="flex-1 rounded-full bg-destructive py-2.5 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90">Confirm Rejection</button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fine Settings Modal */}
      <Dialog open={fineModal} onOpenChange={setFineModal}>
        <DialogContent className="rounded-2xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Fine Settings</DialogTitle>
            <DialogDescription>Configure late fee fine rules.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Fine Amount per Day ($)</label>
              <input type="number" value={fineSettings.finePerDay} onChange={(e) => setFineSettings({ ...fineSettings, finePerDay: Number(e.target.value) })}
                className="h-11 w-full rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Grace Period (days)</label>
              <input type="number" value={fineSettings.gracePeriod} onChange={(e) => setFineSettings({ ...fineSettings, gracePeriod: Number(e.target.value) })}
                className="h-11 w-full rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
            </div>
            <button onClick={() => { setFineModal(false); portalToast(toast, "Fine settings saved!"); }}
              className="h-11 rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90">
              Save Fine Settings
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Announcement Modal */}
      <Dialog open={announcementOpen} onOpenChange={setAnnouncementOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Send Announcement</DialogTitle>
            <DialogDescription>This will appear in the targeted users' notification feed.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <input value={announcementForm.title} onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
              placeholder="Announcement title"
              className="h-11 w-full rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
            <textarea value={announcementForm.message} onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })}
              placeholder="Announcement message..."
              rows={4}
              className="w-full resize-none rounded-2xl border border-border bg-input p-4 text-foreground outline-none ring-primary focus:ring-2" />
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Send To</label>
              <Select value={announcementForm.target} onValueChange={(v) => setAnnouncementForm({ ...announcementForm, target: v })}>
                <SelectTrigger className="h-11 rounded-2xl border-border bg-input"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["All", "All Students", "All Teachers", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <button onClick={sendAnnouncement} className="h-11 rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90">
              Send Announcement
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
