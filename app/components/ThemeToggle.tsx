"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <button 
      aria-label="Toggle Theme" 
      onClick={toggleTheme} 
      title="Toggle Theme"
      className="text-sm font-semibold transition-colors hover:text-[var(--color-accent)]"
      style={{ color: "var(--label-secondary)" }}
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
