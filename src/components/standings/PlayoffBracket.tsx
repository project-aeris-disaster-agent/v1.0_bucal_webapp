import { Trophy } from "lucide-react";
import { Card } from "../ui/Card";
import { TeamLogo } from "../team/TeamLogo";
import { getStandings, getTeam } from "../../lib/data";
import type { Standing, Team } from "../../data/types";

type PlayoffBracketProps = {
  group: string;
};

type BracketSlotProps = {
  team: Team | null;
  seed?: number;
  placeholder?: string;
  highlight?: boolean;
};

function BracketSlot({ team, seed, placeholder = "TBD", highlight }: BracketSlotProps) {
  if (!team) {
    return (
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-3 py-2 last:border-b-0">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--border)]" />
        <span className="text-xs font-medium text-[var(--text-muted)]">{placeholder}</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 border-b border-[var(--border)] px-3 py-2 last:border-b-0 ${
        highlight ? "bg-[var(--accent)]/10" : ""
      }`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <TeamLogo team={team} size="xs" />
        <span className="truncate text-xs font-semibold">{team.abbreviation}</span>
      </div>
      {seed != null && (
        <span className="shrink-0 text-[10px] font-bold text-[var(--text-muted)]">
          #{seed}
        </span>
      )}
    </div>
  );
}

type MatchupCardProps = {
  label: string;
  top: BracketSlotProps;
  bottom: BracketSlotProps;
};

function MatchupCard({ label, top, bottom }: MatchupCardProps) {
  return (
    <div className="w-36 shrink-0">
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </p>
      <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg)]">
        <BracketSlot {...top} />
        <BracketSlot {...bottom} />
      </div>
    </div>
  );
}

function BracketLines() {
  return (
    <svg
      className="h-full w-10 shrink-0"
      viewBox="0 0 40 160"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 40 H16 V80 H40"
        stroke="var(--border)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M0 120 H16 V80 H40"
        stroke="var(--border)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function standingToSlot(standing: Standing | undefined): BracketSlotProps {
  if (!standing) {
    return { team: null };
  }
  const team = getTeam(standing.teamId);
  if (!team) {
    return { team: null };
  }
  return { team, seed: standing.rank, highlight: standing.rank === 1 };
}

export function PlayoffBracket({ group }: PlayoffBracketProps) {
  const rows = getStandings(group);
  const [first, second, third, fourth] = rows;

  return (
    <Card className="mb-4 overflow-x-auto p-4">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold uppercase tracking-wider">Playoff Bracket</h2>
        <span className="rounded-md bg-[var(--border)]/60 px-2 py-0.5 text-[10px] font-semibold text-[var(--text-muted)]">
          {group}
        </span>
      </div>

      <div className="flex min-w-[420px] items-center gap-2">
        <div className="flex flex-col justify-between gap-10 py-2">
          <MatchupCard
            label="Semi 1"
            top={standingToSlot(first)}
            bottom={standingToSlot(fourth)}
          />
          <MatchupCard
            label="Semi 2"
            top={standingToSlot(second)}
            bottom={standingToSlot(third)}
          />
        </div>

        <div className="flex h-40 items-center">
          <BracketLines />
        </div>

        <div className="flex flex-col items-center gap-3">
          <MatchupCard
            label="Final"
            top={{ team: null, placeholder: "Winner SF1" }}
            bottom={{ team: null, placeholder: "Winner SF2" }}
          />
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            <Trophy className="h-3.5 w-3.5 text-[var(--accent)]" strokeWidth={2.5} />
            <span>Champion</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
