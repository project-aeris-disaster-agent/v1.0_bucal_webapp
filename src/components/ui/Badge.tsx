import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "live" | "accent";
  className?: string;
};

const variants = {
  default:
    "bg-[var(--border)] text-[var(--text-muted)]",
  live: "bg-red-500/20 text-red-400 animate-pulse",
  accent:
    "bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs uppercase tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
