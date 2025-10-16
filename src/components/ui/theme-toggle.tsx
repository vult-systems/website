"use client";
 
import React from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme;
      }
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "dark"; // Default to dark theme
  });

  React.useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="border border-border rounded-lg w-10 h-10 flex items-center justify-center bg-transparent transition-colors hover:bg-card"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-foreground-secondary" />
      ) : (
        <Moon className="h-4 w-4 text-foreground-secondary" />
      )}
    </button>
  );
}