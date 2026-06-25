import { REQUEST_TICKETS_URL } from "../../config/constants";

type TicketCTAProps = {
  fullWidth?: boolean;
  className?: string;
};

export function TicketCTA({ fullWidth = false, className = "" }: TicketCTAProps) {
  return (
    <a
      href={REQUEST_TICKETS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-black uppercase tracking-wide text-[var(--accent-foreground)] transition-transform hover:brightness-110 active:scale-[0.98] ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      BUY TICKETS NOW
    </a>
  );
}
