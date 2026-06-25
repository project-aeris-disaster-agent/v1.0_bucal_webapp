import { Card } from "../ui/Card";
import { TeamLogo } from "../team/TeamLogo";
import { getStandings, getTeam } from "../../lib/data";

type StandingsTableProps = {
  group?: string;
  compact?: boolean;
};

export function StandingsTable({ group, compact = false }: StandingsTableProps) {
  const rows = getStandings(group);

  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] text-left text-xs uppercase text-[var(--text-muted)]">
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Team</th>
            <th className="px-4 py-3 text-center">W-L-D</th>
            {!compact && <th className="px-4 py-3 text-center">PTS</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const team = getTeam(row.teamId);
            if (!team) return null;
            return (
              <tr
                key={row.teamId}
                className="border-b border-[var(--border)] last:border-0"
              >
                <td className="px-4 py-3 font-bold">{row.rank}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <TeamLogo team={team} size="sm" />
                    <span className="font-medium">{team.abbreviation}</span>
                    {!compact && (
                      <span className="hidden text-xs text-[var(--text-muted)] sm:inline">
                        {team.school}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-[var(--text-muted)]">
                  {row.wins}-{row.losses}-{row.draws}
                </td>
                {!compact && (
                  <td className="px-4 py-3 text-center font-bold">
                    {row.points}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
