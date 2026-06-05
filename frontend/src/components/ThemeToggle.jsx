import { useThemeStore } from "@/store/themeStore";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      data-testid="theme-toggle-button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
        }`}
      />
    </button>
  );
};
