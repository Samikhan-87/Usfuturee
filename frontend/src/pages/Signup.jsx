import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { mockRequest } from "@/services/api";
import { ROLES } from "@/utils/roles";
import { Mail, Lock, User, Building2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const SIGNUP_ROLES = ["student", "teacher", "principal"];

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    institution: "",
  });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirm, institution } = form;
    if (!name || !email || !password || !confirm || !institution) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    await mockRequest(null, 800);
    setLoading(false);
    login({ name, email, role, institution });
    toast.success("Account created 🎉 Welcome to Usfuturee!");
    navigate("/");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Branding panel */}
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <img
          src="https://images.pexels.com/photos/8199249/pexels-photo-8199249.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=900"
          alt="students"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b4fa8] via-primary/90 to-primary" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <Logo size="lg" />
          <div>
            <h1 className="font-heading text-4xl font-black leading-tight tracking-tighter sm:text-5xl">
              Start your journey<br />with Usfuturee
            </h1>
            <p className="mt-4 max-w-md text-lg text-white/85">
              Join a thriving community of students, teachers, and schools building the future of learning together.
            </p>
          </div>
          <p className="text-sm text-white/60">© 2026 Usfuturee. Built for the next generation.</p>
        </div>
      </div>

      {/* Form panel */}
      <div className="relative flex items-center justify-center bg-background px-6 py-12">
        <div className="absolute right-6 top-6">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Create your account
          </h2>
          <p className="mt-2 text-muted-foreground">Choose your role to get started.</p>

          {/* Role selector */}
          <div className="mt-6 grid grid-cols-3 gap-3" data-testid="role-selector">
            {SIGNUP_ROLES.map((r) => {
              const Icon = ROLES[r].icon;
              const active = role === r;
              return (
                <button
                  key={r}
                  type="button"
                  data-testid={`role-${r}-button`}
                  onClick={() => setRole(r)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all duration-200 ${
                    active
                      ? "border-primary bg-accent text-primary"
                      : "border-border bg-card text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-semibold">{ROLES[r].label}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={submit} className="mt-6 flex flex-col gap-4" data-testid="signup-form">
            <Field icon={User} type="text" placeholder="Full name" value={form.name} onChange={update("name")} testid="signup-name-input" />
            <Field icon={Mail} type="email" placeholder="Email address" value={form.email} onChange={update("email")} testid="signup-email-input" />
            <Field icon={Building2} type="text" placeholder="Institution name" value={form.institution} onChange={update("institution")} testid="signup-institution-input" />
            <Field icon={Lock} type="password" placeholder="Password" value={form.password} onChange={update("password")} testid="signup-password-input" />
            <Field icon={Lock} type="password" placeholder="Confirm password" value={form.confirm} onChange={update("confirm")} testid="signup-confirm-input" />

            <button
              type="submit"
              data-testid="signup-submit-button"
              disabled={loading}
              className="mt-2 flex h-12 items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover disabled:opacity-60"
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" data-testid="goto-login-link" className="font-semibold text-primary transition-colors hover:underline">
              Log in
            </Link>
          </p>
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
