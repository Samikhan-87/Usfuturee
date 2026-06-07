import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { EVENTS_UPCOMING, EVENTS_PAST } from "@/utils/mockData";
import { ArrowLeft, CalendarDays, Clock, MapPin, Building2, Users } from "lucide-react";
import { toast } from "sonner";

const CAT_STYLES = {
  Academic: "bg-primary/10 text-primary",
  Sports: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Cultural: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const allEvents = [...EVENTS_UPCOMING, ...EVENTS_PAST];
  const event = allEvents.find((e) => e.id === id);
  const isPast = EVENTS_PAST.some((e) => e.id === id);

  if (!event) return (
    <MainLayout showRight={false}>
      <div className="grid min-h-[60vh] place-items-center">
        <p className="font-heading text-xl font-bold text-foreground">Event not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Go Back</button>
      </div>
    </MainLayout>
  );

  return (
    <MainLayout showRight={false}>
      <div data-testid={`event-detail-${id}`} className="flex flex-col gap-6">
        <button onClick={() => navigate(-1)}
          className="flex w-fit items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Events
        </button>

        {/* Hero */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="relative h-56 sm:h-72">
            <img src={event.cover} alt={event.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold ${CAT_STYLES[event.category]}`}>{event.category}</span>
          </div>
          <div className="p-6">
            <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">{event.title}</h1>
            <p className="mt-4 text-foreground">{event.description}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { icon: CalendarDays, label: "Date", value: event.date },
                { icon: Clock, label: "Time", value: event.time },
                { icon: MapPin, label: "Location", value: event.location },
                { icon: Building2, label: "Organized by", value: event.organizer },
                { icon: Building2, label: "Institution", value: event.institution },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-card text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
                    <p className="font-semibold text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                disabled={isPast}
                onClick={() => toast.success(`Registered for ${event.title}!`)}
                className="rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40"
              >
                {isPast ? "Event Ended" : "Register Now"}
              </button>
              <button onClick={() => toast.info("Event shared!")}
                className="rounded-full border border-border px-6 py-2.5 font-semibold text-foreground transition-all hover:bg-accent">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
