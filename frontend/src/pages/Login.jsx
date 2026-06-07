import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { mockRequest } from "@/services/api";
import { DEMO_ACCOUNTS } from "@/utils/mockData";
import { ROLES } from "@/utils/roles";
import { Mail, Lock, Loader2, GraduationCap, Users, BookOpen } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const finishLogin = (account, message) => {
    login(account);
    toast.success(message);
    navigate("/");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please enter your email and password");
      return;
    }
    setLoading(true);
    await mockRequest(null, 700);
    setLoading(false);
    finishLogin({ email: form.email }, "Welcome back!");
  };

  const handleDemoClick = (role) => {
    const acc = DEMO_ACCOUNTS.find((d) => d.role === role);
    if (acc) {
      finishLogin(acc, `Logged in as ${acc.name} (${ROLES[acc.role].label})`);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Form panel */}
      <div className="relative flex items-center justify-center bg-white px-6 py-12 dark:bg-background lg:order-1">
        <div className="absolute right-6 top-6">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Logo />
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Welcome back 👋
          </h2>
          <p className="mt-2 text-muted-foreground">Log in to continue your learning journey.</p>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-4" data-testid="login-form">
            <Field icon={Mail} type="email" placeholder="Email address" value={form.email} onChange={update("email")} testid="login-email-input" />
            <Field icon={Lock} type="password" placeholder="Password" value={form.password} onChange={update("password")} testid="login-password-input" />

            <div className="flex flex-col items-end gap-1">
              <button
                type="button"
                data-testid="forgot-password-link"
                onClick={() => setResetSent(true)}
                className="text-sm font-medium text-primary transition-colors hover:underline"
              >
                Forgot password?
              </button>
              {resetSent && (
                <span data-testid="reset-sent-message" className="text-sm font-semibold text-primary">
                  Reset link sent!
                </span>
              )}
            </div>

            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={loading}
              className="flex h-12 items-center justify-center gap-2 rounded-[10px] bg-primary font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover disabled:opacity-60"
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              Log In
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Or continue with demo account
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-3" data-testid="demo-accounts-grid">
              {DEMO_ACCOUNTS.map((acc) => {
                const Icon = ROLES[acc.role].icon;
                return (
                  <button
                    key={acc.role}
                    data-testid={`demo-${acc.role}-button`}
                    onClick={() => handleDemoClick(acc.role)}
                    className="flex items-center justify-center gap-2 rounded-[10px] border-2 border-primary bg-white px-4 py-3 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white dark:bg-transparent"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    {ROLES[acc.role].label}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" data-testid="goto-signup-link" className="font-semibold text-primary transition-colors hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Branding panel */}
      <div className="relative hidden overflow-hidden bg-primary lg:order-2 lg:block">
        <img
          src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBsYXB0b3B8ZW58MHx8fHwxNzgwNjg4NzgzfDA&ixlib=rb-4.1.0&q=85&w=1200"
          alt="students"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-[#0b4fa8]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <div />
          <div>
            <h1 className="font-heading text-4xl font-black leading-tight tracking-tighter sm:text-5xl">
              Welcome to Usfuturee
            </h1>
            <p className="mt-4 max-w-md text-lg text-white/85">
              Connect with your educational community — share knowledge, join study groups, and build your future together.
            </p>
            <div className="mt-8 flex gap-6">
              {[
                { icon: GraduationCap, label: "50k+ Learners" },
                { icon: Users, label: "2k+ Study Groups" },
                { icon: BookOpen, label: "Endless Knowledge" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <Icon className="h-5 w-5" /> {label}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-white/60">© 2026 Usfuturee. Built for the next generation.</p>
        </div>
      </div>
    </div>
  );
}

const Field = ({ icon: Icon, testid, ...props }) => (
  <div className="relative">
    <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
    <input
      {...props}
      data-testid={testid}
      className="h-12 w-full rounded-2xl border border-border bg-input pl-12 pr-4 text-foreground outline-none ring-primary transition-all duration-200 focus:border-primary focus:ring-2"
    />
  </div>
);
