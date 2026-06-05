import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { ArrowLeft, CalendarDays, Clock, MapPin, Building2, Users, Check, Share2 } from "lucide-react";
import { UPCOMING_EVENTS, EVENTS_UPCOMING } from "@/utils/mockData";
import { toast } from "sonner";

const ALL = [...UPCOMING_EVENTS, ...EVENTS_UPCOMING];

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ev = ALL.find((e) => e.id === id);
  const [registered, setRegistered] = useState(false);

  if (!ev) {
    return (
      <MainLayout showRight={false}>
        <div className="grid min-h-[60vh] place-items-center text-center">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Event not found</h1>
            <button onClick={() => navigate("/")} className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground hover:bg-primary-hover">
              <ArrowLeft className="h-4 w-4" /> Back to feed
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const cover = ev.cover || "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&w=1400&q=70";
  const dateStr = ev.date && typeof ev.date === "object" ? `${ev.date.month} ${ev.date.day}` : ev.date;
  const timeStr = ev.time || "10:00 AM";
  const organizer = ev.organizer || ev.host || "Usfuturee Community";
  const institution = ev.institution || "Usfuturee";
  const category = ev.category || "Academic";
  const desc = ev.description || "Join our community for an inspiring session — meet peers, hear from experts, and walk away with practical knowledge you can use right away. Light refreshments will be provided.";

  return (
    <MainLayout showRight={false}>
      <div className="flex flex-col gap-6" data-testid="event-detail">
        <button
          data-testid="back-to-feed"
          onClick={() => navigate(-1)}
          className="flex w-fit items-center gap-1 rounded-full bg-card px-3 py-1.5 text-sm font-semibold text-foreground transition-all hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="h-56 w-full bg-cover bg-center sm:h-72" style={{ backgroundImage: `url(${cover})` }} />
          <div className="p-5 sm:p-7">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">{category}</span>
            <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{ev.title}</h1>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Row icon={CalendarDays} label="Date" value={dateStr} />
              <Row icon={Clock} label="Time" value={timeStr} />
              <Row icon={MapPin} label="Location" value={ev.location} />
              <Row icon={Building2} label="Organized by" value={`${organizer} · ${institution}`} />
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-foreground/90">{desc}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                data-testid="register-event"
                onClick={() => {
                  if (registered) return;
                  setRegistered(true);
                  toast.success("You're registered — we sent the details to your email.");
                }}
                className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                  registered ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground hover:bg-primary-hover"
                }`}
              >
                {registered ? <><Check className="h-4 w-4" /> Registered</> : <>Register</>}
              </button>
              <button
                data-testid="share-event"
                onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success("Event link copied!"); }}
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-accent"
              >
                <Share2 className="h-4 w-4" /> Share
              </button>
              <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" /> 240+ going
              </span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

const Row = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3">
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-card text-primary"><Icon className="h-4 w-4" /></span>
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="truncate text-sm font-semibold text-foreground">{value}</p>
    </div>
  </div>
);
