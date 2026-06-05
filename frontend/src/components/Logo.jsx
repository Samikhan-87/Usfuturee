import { GraduationCap } from "lucide-react";

export const Logo = ({ size = "default" }) => {
  const dims = size === "lg" ? "h-12 w-12" : "h-9 w-9";
  const text = size === "lg" ? "text-3xl" : "text-2xl";
  const icon = size === "lg" ? "text-xl" : "text-base";
  return (
    <div className="flex items-center gap-2.5" data-testid="app-logo">
      <div
        className={`grid ${dims} place-items-center rounded-full bg-primary font-heading ${icon} font-black text-primary-foreground shadow-lg shadow-primary/30`}
      >
        EC
      </div>
      <span className={`font-heading ${text} font-extrabold tracking-tight text-foreground`}>
        EduConnect
      </span>
    </div>
  );
};

export const BrandMark = () => (
  <div className="grid h-9 w-9 place-items-center rounded-full bg-primary font-heading text-base font-black text-primary-foreground shadow-lg shadow-primary/30">
    EC
  </div>
);

// keep graduation cap available for other uses
export const LogoIcon = GraduationCap;
