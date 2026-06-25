import type { FormResult } from "../../data/types";
import { Card } from "../ui/Card";
import { getTeam } from "../../lib/data";

type TeamFormStripProps = {
  teamId: string;
};

const formColors: Record<FormResult, string> = {
  W: "bg-emerald-500 text-white",
  L: "bg-red-500 text-white",
  D: "bg-gray-400 text-white",
};

export function TeamFormStrip({ teamId }: TeamFormStripProps) {
  const team = getTeam(teamId);
  if (!team) return null;

  const wins = team.form.filter((r) => r === "W").length;
  const total = team.form.length;
  const pct = total ? Math.round((wins / total) * 100) : 0;

  return (
    <Card className="py-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold">{team.abbreviation}</p>
        <p className="text-xs text-[var(--text-muted)]">
          {wins}-{total - wins} · {pct}%
        </p>
      </div>
      <div className="flex gap-1.5">
        {team.form.map((result, i) => (
          <span
            key={`${teamId}-${i}`}
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${formColors[result]}`}
          >
            {result}
          </span>
        ))}
      </div>
    </Card>
  );
}
