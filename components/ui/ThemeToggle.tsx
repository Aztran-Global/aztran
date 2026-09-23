"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import type { ReactElement } from "react";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  variant?: "marketing" | "admin";
  className?: string;
};

/**
 * Icon button that switches between light and dark mode, crossfading the sun/moon glyph.
 */
export function ThemeToggle({
  variant = "marketing",
  className,
}: ThemeToggleProps): ReactElement {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useHydrated();
  const isDark = mounted && resolvedTheme === "dark";

  const toggle = (): void => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!mounted}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative flex size-9 shrink-0 items-center justify-center rounded-full border outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] focus-visible:ring-offset-2",
        variant === "marketing"
          ? "border-[color-mix(in_srgb,var(--color-white)_28%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_8%,transparent)] backdrop-blur-sm focus-visible:ring-offset-[var(--color-navy)]"
          : "border-white/15 bg-zinc-800/80 focus-visible:ring-offset-zinc-950",
        className,
      )}
    >
      {mounted ? (
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -80, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 80, scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className="flex text-cyan-200"
            >
              <Moon className="size-4" strokeWidth={2.25} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 80, scale: 0.4, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -80, scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className="flex text-amber-500"
            >
              <Sun className="size-4" strokeWidth={2.25} />
            </motion.span>
          )}
        </AnimatePresence>
      ) : null}
    </button>
  );
}
