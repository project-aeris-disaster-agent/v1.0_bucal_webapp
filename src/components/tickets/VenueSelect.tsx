import { MapPin } from "lucide-react";
import type { Venue } from "../../data/venues";

type VenueSelectProps = {
  venues: Venue[];
  value: string;
  onChange: (venueId: string) => void;
  compact?: boolean;
};

export function VenueSelect({
  venues,
  value,
  onChange,
  compact = false,
}: VenueSelectProps) {
  const selected = venues.find((v) => v.id === value) ?? venues[0];
  const selectId = compact ? "venue-select-header" : "venue-select";

  return (
    <div className={compact ? "shrink-0 text-left" : "w-full text-left"}>
      <label
        htmlFor={selectId}
        className={
          compact
            ? "sr-only"
            : "mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]"
        }
      >
        Select Venue
      </label>
      <div className="relative">
        <MapPin
          size={compact ? 12 : 16}
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--accent)]"
        />
        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          title={
            selected
              ? `${selected.name} · ${selected.capacity.toLocaleString()} capacity`
              : undefined
          }
          className={`appearance-none rounded-xl border border-[var(--border)] bg-[var(--bg)] font-semibold text-[var(--text)] outline-none transition-colors focus:border-[var(--accent)]/50 ${
            compact
              ? "max-w-[11rem] truncate py-1.5 pl-7 pr-7 text-[11px]"
              : "w-full py-3 pl-10 pr-10 text-sm"
          }`}
        >
          {venues.map((venue) => (
            <option key={venue.id} value={venue.id}>
              {venue.name} — {venue.city}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[var(--text-muted)]">
          ▾
        </span>
      </div>
      {!compact && selected && (
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          Capacity: {selected.capacity.toLocaleString()} · {selected.city}
        </p>
      )}
    </div>
  );
}
