import { GraduationCap } from "lucide-react";

export const Logo = ({ size = "default" }) => {
  const dims = size === "lg" ? "h-12 w-12" : "h-9 w-9";
  const text = size === "lg" ? "text-3xl" : "text-2xl";
  return (
    <div className="flex items-center gap-2.5" data-testid="app-logo">
      <div
        className={`grid ${dims} place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30`}
      >
        <GraduationCap className={size === "lg" ? "h-7 w-7" : "h-5 w-5"} />
      </div>
      <span className={`font-heading ${text} font-extrabold tracking-tight text-foreground`}>
        Usfuturee
      </span>
    </div>
  );
};
