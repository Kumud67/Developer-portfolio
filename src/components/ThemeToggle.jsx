import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative flex h-8 w-14 items-center rounded-full px-1 transition-colors"
      style={{
        background: isDark ? "var(--bg-surface-raised)" : "var(--bg-glass)",
        border: "1px solid var(--border-hairline-strong)",
      }}
    >
      <motion.div
        className="flex h-6 w-6 items-center justify-center rounded-full text-[11px]"
        style={{
          background: isDark ? "var(--accent-stream)" : "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
        }}
        animate={{ x: isDark ? 0 : 22 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      >
        {isDark ? "🌙" : "☀️"}
      </motion.div>
    </button>
  );
}
