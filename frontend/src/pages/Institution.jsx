import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { INSTITUTION } from "@/utils/mockData";
import {
  BadgeCheck, GraduationCap, BookOpen, Shirt, Megaphone, ArrowRight, ArrowLeft,
  Check, QrCode, Upload, UserPlus, Users,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

const STEPS = ["Personal info", "Class selection", "Terms", "Payment"];

export default function Institution() {
  const inst = INSTITUTION;
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", dob: "", parent: "", contact: "",
    grade: "", agree: false, receipt: false,
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const canNext =
    (step === 0 && form.name && form.dob && form.parent && form.contact) ||
    (step === 1 && form.grade) ||
    (step === 2 && form.agree) ||
    step === 3;

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const submit = () => {
    console.log(`[Email] Admission application submitted for ${form.name} (${form.contact})`);
    toast.success("Admission application submitted! We've emailed you a confirmation.", { position: "bottom-right" });
    setOpen(false);
    setStep(0);
    setForm({ name: "", dob: "", parent: "", contact: "", grade: "", agree: false, receipt: false });
  };

  return (
    <MainLayout showRight={false}>
      <div data-testid="institution-page" className="flex flex-col gap-6">
        {/* Banner + identity */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="h-40 w-full bg-cover bg-center sm:h-56" style={{ backgroundImage: `url(${inst.banner})` }} />
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:gap-6 sm:p-7">
            <img src={inst.avatar} alt={inst.name}
              className="-mt-16 h-24 w-24 rounded-2xl border-4 border-card object-cover shadow-lg sm:-mt-20 sm:h-32 sm:w-32" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">{inst.name}</h1>
                {inst.verified && (
                  <span data-testid="verified-badge" className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                    <BadgeCheck className="h-3.5 w-3.5 fill-primary text-primary-foreground" /> Verified
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{inst.tagline}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" /> {inst.followers} followers
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button data-testid="follow-button" onClick={() => toast.success("You are now following " + inst.name, { position: "bottom-right" })}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-accent">
                Follow
              </button>
              <button data-testid="admission-button" onClick={() => setOpen(true)}
                className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-hover">
                <UserPlus className="h-4 w-4" /> Apply for Admission
              </button>
            </div>
          </div>
        </div>

        {/* Message */}
        <Card icon={Megaphone} title="A message from the school">
          <p className="text-sm leading-relaxed text-foreground/90">{inst.message}</p>
        </Card>

        {/* Books */}
        <Card icon={BookOpen} title="Recommended Books" testid="books-section">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {inst.books.map((b) => (
              <div key={b.id} data-testid={`book-${b.id}`} className="overflow-hidden rounded-2xl border border-border bg-secondary/40">
                <div className="aspect-[3/4] w-full bg-cover bg-center" style={{ backgroundImage: `url(${b.img})` }} />
                <p className="p-3 text-sm font-semibold text-foreground">{b.title}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Uniforms */}
        <Card icon={Shirt} title="Uniforms" testid="uniforms-section">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {inst.uniforms.map((u) => (
              <div key={u.id} data-testid={`uniform-${u.id}`} className="overflow-hidden rounded-2xl border border-border bg-secondary/40">
                <div className="h-44 w-full bg-cover bg-center" style={{ backgroundImage: `url(${u.img})` }} />
                <p className="p-3 text-sm font-semibold text-foreground">{u.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Admission Form Modal */}
      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setStep(0); }}>
        <DialogContent className="rounded-2xl sm:max-w-lg" data-testid="admission-modal">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Apply for Admission</DialogTitle>
            <DialogDescription>{inst.name} · 2026–27 Intake</DialogDescription>
          </DialogHeader>

          {/* Stepper */}
          <div className="mb-2 flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-2">
                <div data-testid={`step-${i}`} className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                  i < step ? "bg-emerald-500 text-white" : i === step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 ${i < step ? "bg-emerald-500" : "bg-border"}`} />}
              </div>
            ))}
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Step {step + 1}: {STEPS[step]}</p>

          {step === 0 && (
            <div className="flex flex-col gap-3">
              <Field testid="adm-name" label="Full name" value={form.name} onChange={(v) => set("name", v)} />
              <Field testid="adm-dob" label="Date of birth" type="date" value={form.dob} onChange={(v) => set("dob", v)} />
              <Field testid="adm-parent" label="Parent / Guardian name" value={form.parent} onChange={(v) => set("parent", v)} />
              <Field testid="adm-contact" label="Contact (email or phone)" value={form.contact} onChange={(v) => set("contact", v)} />
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-3">
              <label className="text-xs font-semibold text-muted-foreground">Class / course</label>
              <select data-testid="adm-grade" value={form.grade} onChange={(e) => set("grade", e.target.value)}
                className="h-11 rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary">
                <option value="">Select a class…</option>
                {inst.classes.map((c) => <option key={c}>{c}</option>)}
              </select>
              <div className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3 text-sm text-foreground">
                <GraduationCap className="h-4 w-4 text-primary" />
                <p>Class strength is limited — apply early.</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-3">
              <div className="max-h-48 overflow-auto rounded-xl border border-border bg-secondary/40 p-3 text-xs leading-relaxed text-foreground/80">
                <p className="font-semibold">Terms & Conditions</p>
                <p className="mt-2">By applying, you agree to abide by the institution's code of conduct, attendance policy, and academic integrity standards. Applications are reviewed by the principal's office. Admission is non-transferable.</p>
                <p className="mt-2">Once approved, fees must be paid within 7 days to confirm the seat. Refunds follow the standard refund policy of the institution.</p>
              </div>
              <label className="flex cursor-pointer items-start gap-2 text-sm text-foreground">
                <input data-testid="adm-agree" type="checkbox" checked={form.agree} onChange={(e) => set("agree", e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border accent-primary" />
                I have read and agree to the terms and conditions.
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-3">
              <div className="rounded-xl bg-primary/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Admission Fee</p>
                <p className="font-heading text-3xl font-black text-primary">${inst.admissionFee}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col items-center gap-2 rounded-2xl border border-border p-4 text-center">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=Usfuturee-Admission-${inst.admissionFee}`} alt="QR" className="h-32 w-32 rounded-lg bg-white p-1" data-testid="admission-qr" />
                  <span className="flex items-center gap-1 text-xs font-semibold text-foreground"><QrCode className="h-3.5 w-3.5" /> Scan to Pay</span>
                </div>
                <label data-testid="admission-upload-receipt" className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border p-4 text-center transition-all hover:border-primary">
                  <Upload className="h-7 w-7 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Upload receipt</span>
                  <span className="text-xs text-muted-foreground">{form.receipt ? "1 file selected" : "PDF / JPG / PNG"}</span>
                  <input type="file" hidden onChange={() => set("receipt", true)} />
                </label>
              </div>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between gap-3">
            <button onClick={prev} disabled={step === 0}
              className="flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-accent disabled:opacity-30">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button data-testid="adm-next" onClick={next} disabled={!canNext}
                className="flex items-center gap-1 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-hover disabled:opacity-40">
                Next <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button data-testid="adm-submit" onClick={submit}
                className="flex items-center gap-1 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-hover">
                Submit Application <Check className="h-4 w-4" />
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}

const Card = ({ icon: Icon, title, children, testid }) => (
  <div data-testid={testid} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
    <h3 className="mb-4 flex items-center gap-2 font-heading text-base font-bold text-foreground">
      <Icon className="h-4 w-4 text-primary" /> {title}
    </h3>
    {children}
  </div>
);

const Field = ({ testid, label, type = "text", value, onChange }) => (
  <div>
    <label className="text-xs font-semibold text-muted-foreground">{label}</label>
    <input data-testid={testid} type={type} value={value} onChange={(e) => onChange(e.target.value)}
      className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary" />
  </div>
);
