import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { mockRequest } from "@/services/api";
import { Mail, Lock, User, Loader2, GraduationCap, Users, BookOpen } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || (mode === "register" && !form.name)) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    await mockRequest(null, 700); // simulate network
    login({ email: form.email, name: form.name });
    setLoading(false);
    toast.success(mode === "login" ? "Welcome back!" : "Account created 🎉");
    navigate("/");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left visual panel */}
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <img
          src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBsYXB0b3B8ZW58MHx8fHwxNzgwNjg4NzgzfDA&ixlib=rb-4.1.0&q=85&w=1200"
          alt="students"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-[#0b4fa8]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <Logo size="lg" />
          <div>
            <h1 className="font-heading text-4xl font-black leading-tight tracking-tighter sm:text-5xl">
              Where curious minds<br />learn together.
            </h1>
            <p className="mt-4 max-w-md text-lg text-white/80">
              Join thousands of students sharing notes, forming study groups, and building their future — one post at a time.
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

      {/* Right form panel */}
      <div className="relative flex items-center justify-center bg-background px-6 py-12">
        <div className="absolute right-6 top-6">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            {mode === "login" ? "Welcome back 👋" : "Create your account"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {mode === "login"
              ? "Log in to continue your learning journey."
              : "Start connecting with learners worldwide."}
          </p>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-4" data-testid="auth-form">
            {mode === "register" && (
              <Field icon={User} type="text" placeholder="Full name" value={form.name} onChange={update("name")} testid="register-name-input" />
            )}
            <Field icon={Mail} type="email" placeholder="Email address" value={form.email} onChange={update("email")} testid="auth-email-input" />
            <Field icon={Lock} type="password" placeholder="Password" value={form.password} onChange={update("password")} testid="auth-password-input" />

            <button
              type="submit"
              data-testid="auth-submit-button"
              disabled={loading}
              className="mt-2 flex h-12 items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover disabled:opacity-60"
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              {mode === "login" ? "Log In" : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? "New to Usfuturee?" : "Already have an account?"}{" "}
            <button
              data-testid="auth-toggle-mode"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="font-semibold text-primary transition-colors hover:underline"
            >
              {mode === "login" ? "Create an account" : "Log in"}
            </button>
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
