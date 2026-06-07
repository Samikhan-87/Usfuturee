import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";

export const ThemeProvider = ({ children }) => {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;

    // Apply dark class to <html>
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Swap favicon to match in-app theme (overrides OS preference)
    const favicon = document.getElementById("favicon-default");
    if (favicon) {
      favicon.href = theme === "dark"
        ? "/logo-dark.png"
        : "/logo-light.png";
    }

    // Also update theme-color meta for mobile browser chrome
    const themeColorMetas = document.querySelectorAll('meta[name="theme-color"]');
    themeColorMetas.forEach((meta) => {
      const media = meta.getAttribute("media");
      if (!media) {
        // no media attribute — set to current theme color
        meta.setAttribute("content", theme === "dark" ? "#0f0f0f" : "#1877F2");
      }
    });
  }, [theme]);

  return children;
};
