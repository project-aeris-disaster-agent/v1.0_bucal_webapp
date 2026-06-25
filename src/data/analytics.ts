import type { TeamPpg, WinProbabilityPoint } from "./types";

export const winProbabilityTrend: WinProbabilityPoint[] = [
  { label: "Mon", home: 52, away: 48 },
  { label: "Tue", home: 54, away: 46 },
  { label: "Wed", home: 51, away: 49 },
  { label: "Thu", home: 58, away: 42 },
  { label: "Fri", home: 55, away: 45 },
  { label: "Sat", home: 57, away: 43 },
  { label: "Today", home: 56.7, away: 43.3 },
];

export const teamPpg: TeamPpg[] = [
  { teamId: "bu", ppg: 84.2 },
  { teamId: "adnu", ppg: 79.6 },
  { teamId: "cspc", ppg: 76.8 },
  { teamId: "cbsua", ppg: 71.4 },
  { teamId: "partido", ppg: 74.1 },
  { teamId: "sorsogon", ppg: 73.5 },
];
