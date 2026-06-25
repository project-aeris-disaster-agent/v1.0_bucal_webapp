import { Link } from "react-router-dom";
import { Radio } from "lucide-react";

type WatchBadgeProps = {
  className?: string;
};

export function WatchBadge({ className = "" }: WatchBadgeProps) {
  return (
    <Link
      to="/live"
      className={`inline-flex items-center gap-1 rounded-full bg-[var(--accent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--accent-foreground)] transition-transform hover:brightness-110 active:scale-[0.98] ${className}`}
    >
      <Radio size={12} />
      Watch
    </Link>
  );
}
