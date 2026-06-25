export type FormResult = "W" | "L" | "D";

export type MatchStatus = "scheduled" | "live" | "final";

export type Team = {
  id: string;
  name: string;
  abbreviation: string;
  school: string;
  seed: number;
  color: string;
  logo?: string;
  form: FormResult[];
};

export type Match = {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  status: MatchStatus;
  venue: string;
  scheduledAt: string;
  homeScore?: number;
  awayScore?: number;
  group: string;
  sport: string;
};

export type Standing = {
  teamId: string;
  rank: number;
  wins: number;
  losses: number;
  draws: number;
  points: number;
  group: string;
};

export type Player = {
  id: string;
  name: string;
  teamId: string;
  position: string;
  pointsPerGame: number;
  reboundsPerGame: number;
  assistsPerGame: number;
  gamesPlayed: number;
};

export type WinProbabilityPoint = {
  label: string;
  home: number;
  away: number;
};

export type TeamPpg = {
  teamId: string;
  ppg: number;
};
