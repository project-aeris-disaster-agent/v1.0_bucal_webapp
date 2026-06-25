import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 shadow-[var(--card-shadow)] ${className}`}
    >
      {children}
    </div>
  );
}
