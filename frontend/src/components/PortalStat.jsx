export const StatCard = ({ icon: Icon, label, value, accent = "bg-accent text-primary" }) => (
  <div className="rounded-2xl border border-border bg-card p-4 sm:p-5" data-testid={`stat-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
    <span className={`grid h-11 w-11 place-items-center rounded-xl ${accent}`}>
      <Icon className="h-5 w-5" />
    </span>
    <p className="mt-3 font-heading text-2xl font-bold text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

export const portalToast = (toast, msg) =>
  toast.success(msg, { position: "bottom-right" });
