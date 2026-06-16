/**
 * @file ThemeToggle.tsx
 * @description Renders a button to switch between light and dark visual themes.
 */

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Theme toggle button implementing class-based dark mode.
 */
export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className="p-1.5 rounded-lg border border-border bg-surface hover:bg-bg text-textSecondary hover:text-textPrimary transition-all duration-200"
      aria-label="Toggle light or dark theme"
    >
      {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
    </button>
  );
};
export default ThemeToggle;
