import { MainLayout } from "@/layouts/MainLayout";
import { INSTITUTION } from "@/utils/mockData";
import { BadgeCheck, MapPin, Mail, Phone, Globe, Users, BookOpen, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Institution() {
  const navigate = useNavigate();
  const inst = INSTITUTION;

  return (
    <MainLayout showRight={false}>
      <div data-testid="institution-page" className="flex flex-col gap-6">
        {/* Hero */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="relative h-48">
            <img src={inst.banner} alt={inst.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end">
            <div className="-mt-12 relative">
              <img src={inst.avatar} alt={inst.name} className="h-24 w-24 rounded-2xl border-4 border-card object-cover" />
            </div>
            <div className="flex flex-1 flex-col gap-1 sm:pb-1">
              <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-foreground">
                {inst.name}
                {inst.verified && <BadgeCheck className="h-6 w-6 fill-primary text-card" />}
              </h1>
              <p className="text-muted-foreground">{inst.tagline}</p>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="h-4 w-4" /> {inst.followers} followers
              </p>
            </div>
            <button onClick={() => toast.success("Now following Lincoln Academy!")}
              className="shrink-0 rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90">
              Follow
            </button>
          </div>
        </div>

        {/* Welcome message */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-3 font-heading text-base font-bold text-foreground">Welcome</h2>
          <p className="text-foreground leading-relaxed">{inst.message}</p>
        </div>

        {/* Contact info */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MapPin, label: "Location", value: inst.location },
            { icon: Mail, label: "Email", value: inst.email },
            { icon: Phone, label: "Phone", value: inst.phone },
            { icon: Globe, label: "Website", value: inst.website },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
                <p className="truncate text-sm font-semibold text-foreground">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Classes offered */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-heading text-base font-bold text-foreground">Classes Offered</h2>
          <div className="flex flex-wrap gap-2">
            {inst.classes.map((c) => (
              <span key={c} className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">{c}</span>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Admission fee: <span className="font-semibold text-foreground">${inst.admissionFee}</span></p>
        </div>

        {/* Books */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-heading text-base font-bold text-foreground">Required Books</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {inst.books.map((b) => (
              <div key={b.id} className="overflow-hidden rounded-2xl border border-border">
                <img src={b.img} alt={b.title} className="h-32 w-full object-cover" />
                <div className="p-3">
                  <p className="text-sm font-semibold text-foreground">{b.title}</p>
                  <p className="text-xs text-muted-foreground">{b.subject}</p>
                  <p className="mt-1 font-heading font-bold text-primary">${b.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uniforms */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-heading text-base font-bold text-foreground">Uniforms</h2>
          <div className="grid grid-cols-2 gap-4">
            {inst.uniforms.map((u) => (
              <div key={u.id} className="overflow-hidden rounded-2xl border border-border">
                <img src={u.img} alt={u.label} className="h-40 w-full object-cover" />
                <div className="p-3">
                  <p className="font-semibold text-foreground">{u.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
