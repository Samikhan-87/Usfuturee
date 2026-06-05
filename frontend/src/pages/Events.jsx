import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import {
  EVENTS_UPCOMING, EVENTS_PAST, EVENT_CATEGORIES, EVENT_REGIONS, EVENT_INSTITUTIONS,
} from "@/utils/mockData";
import {
  CalendarDays, Clock, MapPin, Search, SlidersHorizontal, CalendarRange,
  Plus, Building2, X, Image as ImageIcon,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const CAT_STYLES = {
  Academic: "bg-primary/10 text-primary",
  Sports: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Cultural: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

const EventCard = ({ ev, past }) => (
  <div data-testid={`event-${ev.id}`} className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1">
    <div className="relative h-40">
      <img src={ev.cover} alt={ev.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${CAT_STYLES[ev.category]}`}>{ev.category}</span>
    </div>
    <div className="p-5">
      <h3 className="font-heading text-lg font-bold text-foreground">{ev.title}</h3>
      <div className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
        <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> {ev.date}</span>
        <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {ev.time}</span>
        <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {ev.location}</span>
      </div>
      <p className="mt-3 text-xs font-medium text-muted-foreground">
        Organized by: <span className="text-foreground">{ev.organizer}</span>
      </p>
      <div className="mt-4 flex items-center gap-3">
        <button
          data-testid={`register-${ev.id}`}
          disabled={past}
          onClick={() => toast.success(`Registered for ${ev.title}!`)}
          className="flex-1 rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover disabled:opacity-40"
        >
          {past ? "Ended" : "Register"}
        </button>
        <button data-testid={`details-${ev.id}`} className="text-sm font-semibold text-primary transition-colors hover:underline">
          Details
        </button>
      </div>
    </div>
  </div>
);

export default function Events() {
  const { role } = useAuth();
  const isPrincipal = role === "principal";
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ region: "all", institution: "all", category: "all" });
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ title: "", category: "", date: "", time: "", location: "", organizer: "", cover: null });

  const applyFilters = (list) =>
    list.filter((ev) => {
      const q = query.toLowerCase();
      const matchesQuery = !q || ev.title.toLowerCase().includes(q) || ev.location.toLowerCase().includes(q) || ev.category.toLowerCase().includes(q);
      const matchesRegion = filters.region === "all" || ev.region === filters.region;
      const matchesInst = filters.institution === "all" || ev.institution === filters.institution;
      const matchesCat = filters.category === "all" || ev.category === filters.category;
      return matchesQuery && matchesRegion && matchesInst && matchesCat;
    });

  const pickCover = (e) => {
    const file = e.target.files?.[0];
    if (file) setForm((f) => ({ ...f, cover: URL.createObjectURL(file) }));
  };

  const createEvent = () => {
    if (!form.title.trim() || !form.category || !form.date) {
      toast.error("Please fill in title, category and date");
      return;
    }
    toast.success(`Event "${form.title}" created!`);
    setForm({ title: "", category: "", date: "", time: "", location: "", organizer: "", cover: null });
    setCreateOpen(false);
  };

  const FilterSelect = ({ label, value, onChange, options }) => (
    <div>
      <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-10 rounded-xl border-border bg-input"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <MainLayout>
      <div data-testid="events-page" className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Events</h1>
            <p className="mt-1 text-muted-foreground">Discover upcoming educational and extracurricular activities</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              data-testid="calendar-view-toggle"
              onClick={() => toast.info("Calendar view coming soon")}
              className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground transition-all hover:bg-accent"
            >
              <CalendarRange className="h-5 w-5" />
            </button>
            <Popover>
              <PopoverTrigger asChild>
                <button data-testid="filter-button" className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-foreground transition-all hover:bg-accent">
                  <SlidersHorizontal className="h-4 w-4" /> Filter
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 rounded-2xl" data-testid="filter-panel">
                <div className="flex flex-col gap-4">
                  <FilterSelect label="By Region" value={filters.region} onChange={(v) => setFilters({ ...filters, region: v })} options={EVENT_REGIONS} />
                  <FilterSelect label="By Institution" value={filters.institution} onChange={(v) => setFilters({ ...filters, institution: v })} options={EVENT_INSTITUTIONS} />
                  <FilterSelect label="By Category" value={filters.category} onChange={(v) => setFilters({ ...filters, category: v })} options={EVENT_CATEGORIES} />
                  <button
                    data-testid="clear-filters"
                    onClick={() => setFilters({ region: "all", institution: "all", category: "all" })}
                    className="rounded-full border border-border py-2 text-sm font-semibold text-foreground transition-all hover:bg-accent"
                  >
                    Clear Filters
                  </button>
                </div>
              </PopoverContent>
            </Popover>
            {isPrincipal && (
              <button
                data-testid="create-event-button"
                onClick={() => setCreateOpen(true)}
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-hover"
              >
                <Plus className="h-4 w-4" /> Create Event
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            data-testid="events-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events by name, location, or category..."
            className="h-12 w-full rounded-2xl border border-border bg-input pl-12 pr-4 text-foreground outline-none ring-primary transition-all focus:ring-2"
          />
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-card p-1" data-testid="events-tabs">
            <TabsTrigger value="upcoming" data-testid="events-tab-upcoming" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past" data-testid="events-tab-past" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6" data-testid="events-upcoming">
            <EventGrid list={applyFilters(EVENTS_UPCOMING)} />
          </TabsContent>
          <TabsContent value="past" className="mt-6" data-testid="events-past">
            <EventGrid list={applyFilters(EVENTS_PAST)} past />
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Event modal (principal only) */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="rounded-2xl sm:max-w-lg" data-testid="create-event-modal">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Create an Event</DialogTitle>
          </DialogHeader>
          {form.cover ? (
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <img src={form.cover} alt="cover" className="h-36 w-full object-cover" />
              <button onClick={() => setForm((f) => ({ ...f, cover: null }))} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border text-muted-foreground transition-all hover:border-primary hover:text-primary">
              <ImageIcon className="h-6 w-6" />
              <span className="text-sm font-medium">Upload cover image</span>
              <input type="file" accept="image/*" hidden onChange={pickCover} />
            </label>
          )}
          <input data-testid="event-title-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Event title" className="h-12 rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
          <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
            <SelectTrigger data-testid="event-category-select" className="h-12 rounded-2xl border-border bg-input"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>{EVENT_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
          <div className="grid grid-cols-2 gap-3">
            <input data-testid="event-date-input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="Date (e.g. Jul 5, 2026)" className="h-12 rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
            <input data-testid="event-time-input" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="Time" className="h-12 rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
          </div>
          <input data-testid="event-location-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" className="h-12 rounded-2xl border border-border bg-input px-4 text-foreground outline-none ring-primary focus:ring-2" />
          <div className="relative">
            <Building2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input data-testid="event-organizer-input" value={form.organizer} onChange={(e) => setForm({ ...form, organizer: e.target.value })} placeholder="Organizing department" className="h-12 w-full rounded-2xl border border-border bg-input pl-12 pr-4 text-foreground outline-none ring-primary focus:ring-2" />
          </div>
          <button data-testid="submit-create-event" onClick={createEvent} className="h-11 rounded-full bg-primary font-semibold text-primary-foreground transition-all hover:bg-primary-hover">Create Event</button>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}

const EventGrid = ({ list, past }) => {
  if (list.length === 0)
    return <p className="rounded-2xl border border-dashed border-border py-12 text-center text-muted-foreground" data-testid="no-events">No events match your filters.</p>;
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {list.map((ev) => <EventCard key={ev.id} ev={ev} past={past} />)}
    </div>
  );
};
