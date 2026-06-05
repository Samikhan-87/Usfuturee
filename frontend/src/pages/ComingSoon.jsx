import { MainLayout } from "@/layouts/MainLayout";
import { Bot, Calendar } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function ComingSoon() {
  const { pathname } = useLocation();
  const isAi = pathname.includes("ai");
  const Icon = isAi ? Bot : Calendar;
  const title = isAi ? "AI Chat" : "Events";
  const desc = isAi
    ? "Your personal AI study assistant is on the way — ask questions, summarize notes, and learn faster."
    : "Discover and join educational events, webinars, and campus meetups. Launching soon.";

  return (
    <MainLayout showRight={false}>
      <div className="grid min-h-[60vh] place-items-center" data-testid="coming-soon-page">
        <div className="max-w-md text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-accent text-primary">
            <Icon className="h-10 w-10" />
          </div>
          <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          <p className="mt-3 text-muted-foreground">{desc}</p>
          <span className="mt-6 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
            Coming Soon 🚀
          </span>
        </div>
      </div>
    </MainLayout>
  );
}
