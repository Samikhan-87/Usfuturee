import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Mail, Lock, ShieldCheck, Loader2, Eye, EyeOff } from "lucide-react";
import { useSuperAdminStore } from "@/store/superAdminStore";
import { toast } from "sonner";

export default function SuperAdminLogin() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useSuperAdminStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark"); // admin always dark-friendly visual
    return () => {};
  }, []);

  if (isAuthenticated) return <Navigate to="/superadmin/dashboard" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const ok = login(form);
    setLoading(false);
    if (!ok) {
      toast.error("Invalid credentials. Access denied.");
      return;
    }
    toast.success("Welcome back, Super Admin.");
    navigate("/superadmin/dashboard");
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-background via-background to-primary/10 px-4 font-body" data-testid="sa-login-page">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl shadow-primary/10 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <span className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-primary to-violet-500 text-white shadow-xl shadow-primary/30">
            <ShieldCheck className="h-7 w-7" />
          </span>
          <h1 className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-foreground">Super Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Restricted console — authorized personnel only.</p>
        </div>

        <form onSubmit={submit} className="mt-8 flex flex-col gap-4" data-testid="sa-login-form">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              data-testid="sa-email"
              type="email"
              required
              placeholder="superadmin@usfuturee.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="h-12 w-full rounded-2xl border border-border bg-input pl-11 pr-4 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              data-testid="sa-password"
              type={showPw ? "text" : "password"}
              required
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="h-12 w-full rounded-2xl border border-border bg-input pl-11 pr-11 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-accent"
              aria-label="Toggle password"
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <button
            type="submit"
            data-testid="sa-submit"
            disabled={loading}
            className="mt-2 flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-violet-500 font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:opacity-95 disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Access console
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          This area is hidden from the main app. Activity is monitored.
        </p>
      </div>
    </div>
  );
}
