import { GraduationCap } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";

const LIGHT_LOGO = "https://customer-assets.emergentagent.com/job_debug-module-paths/artifacts/dn2gijxd_Lightmode.png";
const DARK_LOGO = "https://customer-assets.emergentagent.com/job_debug-module-paths/artifacts/9u0zo95g_Darkmode.png";

export const Logo = ({ size = "default" }) => {
  const theme = useThemeStore((s) => s.theme);
  const src = theme === "dark" ? DARK_LOGO : LIGHT_LOGO;
  const dims = size === "lg" ? "h-12 w-12" : "h-9 w-9";
  const text = size === "lg" ? "text-3xl" : "text-2xl";
  return (
    <div className="flex items-center gap-2.5" data-testid="app-logo">
      <img
        src={src}
        alt="Usfuturee"
        className={`${dims} shrink-0 object-contain`}
      />
      <span className={`font-heading ${text} font-extrabold tracking-tight text-foreground`}>
        Usfuturee
      </span>
    </div>
  );
};

export const BrandMark = () => {
  const theme = useThemeStore((s) => s.theme);
  const src = theme === "dark" ? DARK_LOGO : LIGHT_LOGO;
  return (
    <img src={src} alt="Usfuturee" className="h-9 w-9 shrink-0 object-contain" />
  );
};

// keep graduation cap available for other uses
export const LogoIcon = GraduationCap;
