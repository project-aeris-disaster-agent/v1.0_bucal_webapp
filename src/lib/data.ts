import {
  matches,
  players,
  standings,
  teamMap,
  teamPpg,
  teams,
  winProbabilityTrend,
} from "../data";
import type { Match, Player, Standing } from "../data/types";

export function getTeam(id: string) {
  return teamMap[id];
}

export function getFeaturedMatch(): Match {
  return matches.find((m) => m.status === "live") ?? matches[0];
}

export function getLiveMatches(): Match[] {
  return matches.filter((m) => m.status === "live");
}

export function getOtherLiveMatches(excludeId: string): Match[] {
  return getLiveMatches().filter((m) => m.id !== excludeId);
}

export function getLiveMatch(): Match | undefined {
  return getLiveMatches()[0];
}

export function getMatchesByDate(dateKey: string): Match[] {
  return matches.filter((m) => m.scheduledAt.startsWith(dateKey));
}

export function getMatchDates(): string[] {
  const dates = [...new Set(matches.map((m) => m.scheduledAt.slice(0, 10)))];
  return dates.sort();
}

export function getUpcomingMatches(limit = 4): Match[] {
  return matches
    .filter((m) => m.status === "scheduled" || m.status === "live")
    .sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
    )
    .slice(0, limit);
}

export function getStandings(group?: string): Standing[] {
  const list = group
    ? standings.filter((s) => s.group === group)
    : standings;
  return [...list].sort((a, b) => a.rank - b.rank);
}

export function getStandingsGroups(): string[] {
  return [...new Set(standings.map((s) => s.group))].sort();
}

export function getTopPlayers(
  stat: keyof Pick<Player, "pointsPerGame" | "reboundsPerGame" | "assistsPerGame">,
  limit = 5,
): Player[] {
  return [...players]
    .sort((a, b) => b[stat] - a[stat])
    .slice(0, limit);
}

export function getWinProbabilityTrend() {
  return winProbabilityTrend;
}

export function getTeamPpg() {
  return teamPpg.map((entry) => ({
    ...entry,
    team: teamMap[entry.teamId],
  }));
}

export function getAllTeams() {
  return teams;
}

export function enrichMatch(match: Match) {
  return {
    match,
    home: teamMap[match.homeTeamId],
    away: teamMap[match.awayTeamId],
  };
}
