import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";

export const ThemeProvider = ({ children }) => {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return children;
};
