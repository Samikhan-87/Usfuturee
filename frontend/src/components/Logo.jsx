import { useThemeStore } from "@/store/themeStore";
import logoLight from "@/assets/logos/Lightmode.png";
import logoDark  from "@/assets/logos/Darkmode.png";

export const Logo = ({ size = "default" }) => {
  const theme = useThemeStore((s) => s.theme);
  const imgSrc = theme === "dark" ? logoDark : logoLight;

  const imgDims  = size === "lg" ? "h-14 w-14" : "h-10 w-10";
  const textSize = size === "lg" ? "text-3xl"  : "text-2xl";

  return (
    <div className="flex items-center gap-2.5" data-testid="app-logo">
      <img
        src={imgSrc}
        alt="Usfuturee logo"
        className={`${imgDims} shrink-0 rounded-xl object-contain`}
      />
      <span className={`font-heading ${textSize} font-extrabold tracking-tight text-foreground`}>
        Usfuturee
      </span>
    </div>
  );
};

/** Standalone icon-only mark — tight spaces like mobile drawers */
export const BrandMark = () => {
  const theme = useThemeStore((s) => s.theme);
  const imgSrc = theme === "dark" ? logoDark : logoLight;

  return (
    <img
      src={imgSrc}
      alt="Usfuturee"
      className="h-9 w-9 shrink-0 rounded-xl object-contain"
    />
  );
};
