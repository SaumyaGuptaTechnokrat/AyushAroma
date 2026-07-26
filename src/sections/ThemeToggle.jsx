import { useEffect, useState } from "react";

const THEME_KEY = "theme-preference";

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  // Always start in light mode for first-time visitors, regardless of the
  // device's OS-level dark mode setting. Dark mode only turns on if the
  // user explicitly taps the toggle.
  return "light";
}

/**
 * ThemeToggle
 * -----------------------------------------------------------------------
 * A sliding pill switch that flips the whole site between light and dark
 * by setting data-theme="light" | "dark" on <html>. Every color across
 * every stylesheet is a CSS variable (see base.css :root), so this single
 * attribute re-skins the entire site — no per-page theming needed.
 *
 * - Always starts in light mode for first-time visitors, ignoring the
 *   device's OS-level dark mode setting — dark mode only turns on when
 *   the user explicitly taps the toggle. The choice is then remembered
 *   via localStorage for their next visit.
 * - index.html has a tiny inline script that applies the saved theme
 *   before React even mounts, so there's no flash of the wrong theme.
 */
export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb">
          <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
          <svg className="icon-moon" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </span>
      </span>
    </button>
  );
}