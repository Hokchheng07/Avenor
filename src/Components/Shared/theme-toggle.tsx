"use client";

import { useEffect } from "react";

const THEME_KEY = "avenor-theme";

export function ThemeToggle() {
  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_KEY);

    if (savedTheme === "dark" || savedTheme === "light") {
      document.documentElement.dataset.theme = savedTheme;
    }
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

    root.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_KEY, nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle grid size-10 shrink-0 place-items-center rounded-full text-primary/70 outline-none transition-colors hover:bg-primary/6 hover:text-primary focus-visible:ring-2 focus-visible:ring-accent"
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
    >
      <svg className="theme-toggle__sun size-5" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" strokeLinecap="round" />
      </svg>
      <svg className="theme-toggle__moon size-5" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M20.3 15.1A8.5 8.5 0 0 1 8.9 3.7 8.5 8.5 0 1 0 20.3 15.1Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
