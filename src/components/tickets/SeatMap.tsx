import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Venue } from "../../data/venues";

type SeatMapProps = {
  venue: Venue;
};

const sectionPaths: Record<string, { d: string }> = {
  ga: { d: "M 20 8 H 180 V 28 Q 100 38 20 28 Z" },
  upper: {
    d: "M 12 32 H 188 V 52 Q 100 62 12 52 Z M 8 56 V 144 H 28 V 56 Z M 172 56 V 144 H 192 V 56 Z",
  },
  lower: {
    d: "M 32 148 H 168 V 168 Q 100 176 32 168 Z M 32 60 V 144 H 52 V 72 Q 100 64 148 72 V 144 H 168 V 60 Q 100 52 32 60 Z",
  },
  vip: { d: "M 58 172 H 142 V 192 Q 100 198 58 192 Z" },
};

export function SeatMap({ venue }: SeatMapProps) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const count = venue.sections.length;

  useEffect(() => {
    setSectionIndex(0);
  }, [venue.id]);

  const activeSection = venue.sections[sectionIndex];
  const goPrev = () => setSectionIndex((i) => (i - 1 + count) % count);
  const goNext = () => setSectionIndex((i) => (i + 1) % count);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Seat Map
        </h3>
        <span className="text-[10px] font-medium tabular-nums text-[var(--text-muted)]">
          {sectionIndex + 1}/{count}
        </span>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3">
        <svg
          viewBox="0 0 200 200"
          role="img"
          aria-label={`Seat map for ${venue.name}, ${activeSection.label} selected`}
          className="mx-auto w-full max-w-[200px]"
        >
          {venue.sections.map((section) => {
            const path = sectionPaths[section.id];
            if (!path) return null;

            const isActive = activeSection.id === section.id;

            return (
              <path
                key={section.id}
                d={path.d}
                fill={section.color}
                fillOpacity={isActive ? 0.85 : 0.35}
                stroke={isActive ? section.color : "transparent"}
                strokeWidth={2}
                className="cursor-pointer transition-all duration-200"
                onClick={() =>
                  setSectionIndex(
                    venue.sections.findIndex((s) => s.id === section.id),
                  )
                }
              />
            );
          })}

          <rect
            x="72"
            y="88"
            width="56"
            height="36"
            rx="2"
            fill="#1a1a1a"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <line x1="100" y1="88" x2="100" y2="124" stroke="#333" strokeWidth="0.5" />
          <circle cx="100" cy="106" r="6" fill="none" stroke="#444" strokeWidth="0.5" />
          <text
            x="100"
            y="106"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#666"
            fontSize="6"
            fontWeight="600"
          >
            COURT
          </text>
        </svg>

        <div className="mt-2 flex items-center gap-1.5">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous seat tier"
            className="shrink-0 rounded-lg border border-[var(--border)] p-1.5 transition-colors hover:border-[var(--accent)]/30"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-[var(--accent)]/50 bg-[var(--accent)]/10 px-2.5 py-1.5">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: activeSection.color }}
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11px] font-semibold leading-tight">
                {activeSection.label}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">
                from {activeSection.priceLabel}
              </span>
            </span>
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next seat tier"
            className="shrink-0 rounded-lg border border-[var(--border)] p-1.5 transition-colors hover:border-[var(--accent)]/30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
