import { Card } from "../ui/Card";
import { getTeam, getTopPlayers } from "../../lib/data";
import type { Player } from "../../data/types";

type StatKey = "pointsPerGame" | "reboundsPerGame" | "assistsPerGame";

const statLabels: Record<StatKey, string> = {
  pointsPerGame: "Points",
  reboundsPerGame: "Rebounds",
  assistsPerGame: "Assists",
};

type PlayerLeadersProps = {
  stat: StatKey;
  limit?: number;
};

export function PlayerLeaders({ stat, limit = 5 }: PlayerLeadersProps) {
  const leaders = getTopPlayers(stat, limit);

  return (
    <Card className="p-0">
      <div className="border-b border-[var(--border)] px-4 py-3">
        <h3 className="text-sm font-bold">{statLabels[stat]} Leaders</h3>
      </div>
      <ul>
        {leaders.map((player, index) => (
          <LeaderRow key={player.id} player={player} rank={index + 1} stat={stat} />
        ))}
      </ul>
    </Card>
  );
}

function LeaderRow({
  player,
  rank,
  stat,
}: {
  player: Player;
  rank: number;
  stat: StatKey;
}) {
  const team = getTeam(player.teamId);

  return (
    <li className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 last:border-0">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--border)] text-xs font-bold">
          {rank}
        </span>
        <div>
          <p className="text-sm font-semibold">{player.name}</p>
          <p className="text-xs text-[var(--text-muted)]">
            {team?.abbreviation} · {player.position}
          </p>
        </div>
      </div>
      <p className="text-lg font-black text-[var(--accent)]">
        {player[stat].toFixed(1)}
      </p>
    </li>
  );
}
