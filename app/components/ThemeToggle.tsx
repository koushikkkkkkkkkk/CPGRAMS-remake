"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial state
    setIsDark(document.documentElement.classList.contains("dark-mode"));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark-mode")) {
      html.classList.remove("dark-mode");
      setIsDark(false);
    } else {
      html.classList.add("dark-mode");
      setIsDark(true);
    }
  };

  return (
    <button className="icon-btn" onClick={toggleTheme} title="Toggle Dark Mode">
      {isDark ? "☀️" : "☾"}
    </button>
  );
}
