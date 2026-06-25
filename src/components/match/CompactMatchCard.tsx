import { Card } from "../ui/Card";
import { TeamLogo } from "../team/TeamLogo";
import { enrichMatch } from "../../lib/data";
import type { Match } from "../../data/types";

type CompactMatchCardProps = {
  match: Match;
};

function LiveDot() {
  return (
    <span className="relative flex h-1.5 w-1.5 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 animate-live-dot rounded-full bg-red-500" />
    </span>
  );
}

export function CompactMatchCard({ match }: CompactMatchCardProps) {
  const { home, away } = enrichMatch(match);
  const isLive = match.status === "live";
  const homeScore = match.homeScore ?? 0;
  const awayScore = match.awayScore ?? 0;
  const homeLeading = homeScore > awayScore;
  const awayLeading = awayScore > homeScore;

  return (
    <Card
      className={`py-3 ${
        isLive ? "border-red-500/30 bg-gradient-to-r from-red-500/[0.04] to-transparent" : ""
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          {match.group} · {match.sport}
        </p>
        {isLive && (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-red-400">
            <LiveDot />
            Live
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <TeamLogo team={home} size="md" />
          <span
            className={`truncate text-sm font-bold ${
              homeLeading ? "text-[var(--text)]" : "text-[var(--text-muted)]"
            }`}
          >
            {home.abbreviation}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 px-1">
          <span
            className={`tabular-nums text-lg font-black leading-none ${
              homeLeading ? "text-[var(--accent)]" : "text-[var(--text)]/70"
            }`}
          >
            {homeScore}
          </span>
          <span className="text-xs font-bold text-[var(--text-muted)]/50">–</span>
          <span
            className={`tabular-nums text-lg font-black leading-none ${
              awayLeading ? "text-[var(--accent)]" : "text-[var(--text)]/70"
            }`}
          >
            {awayScore}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
          <span
            className={`truncate text-sm font-bold ${
              awayLeading ? "text-[var(--text)]" : "text-[var(--text-muted)]"
            }`}
          >
            {away.abbreviation}
          </span>
          <TeamLogo team={away} size="md" />
        </div>
      </div>
    </Card>
  );
}
