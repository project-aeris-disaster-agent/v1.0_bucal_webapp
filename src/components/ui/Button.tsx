import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  fullWidth?: boolean;
};

const base =
  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold uppercase tracking-wide transition-transform active:scale-[0.98]";

const variants = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-foreground)] hover:brightness-110",
  secondary:
    "border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text)] hover:bg-[var(--border)]",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  fullWidth = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
